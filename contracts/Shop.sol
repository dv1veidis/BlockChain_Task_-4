pragma solidity ^0.5.16;

contract Shop {

    struct Animal{
        uint id;
        string name;
        uint price;
        uint quantity;
    }
    struct user {
        uint userId;
        uint balance;
        uint bulldogCount;
        uint catCount;
        uint hamsterCount;
    }
    // Store accounts that have bought
    mapping(address => user) public users;
    mapping(uint => Animal) public animals;
    uint public animalCount;
    uint public userCount;

    

    constructor() public {
        addAnimal("Bulldog", 400);
        addAnimal("Cat", 100);
        addAnimal("Hamster", 700);
    }

    event transactionEvent(
          uint indexed _animalId
    );
      
    

    function addAnimal(string memory _name, uint _price) private {
        animalCount++;
        animals[animalCount] = Animal(animalCount, _name, _price, 10000);
    }

    function buy (uint _animalId) public {
        require(_animalId>0 && _animalId <= animalCount);

        require(animals[_animalId].quantity>0);
        // record the bough animal to a user
        if(users[msg.sender].balance== 0 && users[msg.sender].userId==0){
            userCount++;
            users[msg.sender] = user(userCount,5000, 0, 0, 0);
        }
        // update the amount of animals left
        animals[_animalId].quantity --;
        if(_animalId == 1){
            users[msg.sender].bulldogCount ++;
            users[msg.sender].balance =  users[msg.sender].balance- animals[_animalId].price;
        }
        else if(_animalId == 2){
            users[msg.sender].catCount ++;
            users[msg.sender].balance =  users[msg.sender].balance- animals[_animalId].price;
        }
        else{
            users[msg.sender].hamsterCount ++;
            users[msg.sender].balance =  users[msg.sender].balance- animals[_animalId].price;
        }
        emit transactionEvent(_animalId);

    }

    function sell(uint _animalId) public {
        if(_animalId == 1){
            require(users[msg.sender].bulldogCount>0);
            users[msg.sender].bulldogCount --;
            users[msg.sender].balance =  users[msg.sender].balance+ animals[_animalId].price;
            animals[_animalId].quantity ++;
        }
        else if(_animalId == 2){
            require(users[msg.sender].catCount>0);
            users[msg.sender].catCount --;
            users[msg.sender].balance =  users[msg.sender].balance+ animals[_animalId].price;
            animals[_animalId].quantity ++;
        }
        else{
            require(users[msg.sender].hamsterCount>0);
            users[msg.sender].hamsterCount --;
            users[msg.sender].balance =  users[msg.sender].balance+ animals[_animalId].price;
            animals[_animalId].quantity ++;
        }
        emit transactionEvent(_animalId);
    }
}