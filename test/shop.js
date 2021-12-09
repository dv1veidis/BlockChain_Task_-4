var Shop = artifacts.require("./Shop.sol");

contract("Shop", function(accounts){
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

});