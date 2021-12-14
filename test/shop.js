var Shop = artifacts.require("./Shop.sol");

contract("Shop", (accounts)=>{
    const buyer = accounts;

    var shopInstance;
    it("Initializes with 3 animals", function(){
        return Shop.deployed().then(function(instance){
            return instance.animalCount();
        }).then(function(count){
            assert.equal(count, 3);
        });
    });

    it("Initializes the animals with the correct attributes", function(){
        return Shop.deployed().then(function(instance){
            shopInstance = instance;
            return shopInstance.animals(1);
        }).then(function(animal){
            assert.equal(animal[0], 1, "Correct Id");
            assert.equal(animal[1], "Bulldog", "Correct name");
            assert.equal(animal[2], 400, "Correct price");
            assert.equal(animal[3], 10000, "Correct starting quantity");
            return shopInstance.animals(2);
        }).then(function(animal){
            assert.equal(animal[0], 2, "Correct Id");
            assert.equal(animal[1], "Cat", "Correct name");
            assert.equal(animal[2], 100, "Correct price");
            assert.equal(animal[3], 10000, "Correct starting quantity");
            return shopInstance.animals(3);
        }).then(function(animal) {
            assert.equal(animal[0], 3, "Correct Id");
            assert.equal(animal[1], "Hamster", "Correct name");
            assert.equal(animal[2], 700, "Correct price");
            assert.equal(animal[3], 10000, "Correct starting quantity");
        })
    })

    it("allows a user to buy", function () {
        return Shop.deployed().then(function (instance) {
            shopInstance = instance;
            animalId = 1;
            return shopInstance.buy(animalId, {from: buyer[2]});
        }).then(function(receipt){
            assert.equal(receipt.logs.length, 1, "an event was triggered");
            assert.equal(receipt.logs[0].event,"transactionEvent", "the event type is correct");
            assert.equal(receipt.logs[0].args._animalId.toNumber(), animalId, "the animal id is correct");
            return shopInstance.users(buyer[2]);
        }).then(function(bought){
            assert.equal(bought[2], 1, "The items was bought");
            assert.equal(bought[1], 4600, "The balance was set correctly")
            return shopInstance.animals(animalId);
        }).then(function(animal){
            var quantity= animal[3];
            assert.equal(quantity, 9999, "This removes one item from the shop");
        })
    })

    it("Throws an exception for invalid purchases", function(){
        return Shop.deployed().then(function(instance){
            shopInstance = instance;
            return shopInstance.buy(99, {from: buyer[2]});
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0, "error must contain revert message");
            return shopInstance.animals(1)
        }).then(function(animal1){
            var quantity = animal1[3];
            assert.equal(quantity, 9999, "animal 1 didnt lose quantity");
            return shopInstance.animals(2);
        }).then(function(animal2){
            var quantity = animal2[3];
            assert.equal(quantity, 10000, "animal 2 didnt lose quantity");
        });
    });

});