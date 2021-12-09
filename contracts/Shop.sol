pragma solidity ^0.5.16;

contract Shop {

    struct Animal{
        uint id;
        string name;
        uint price;
        uint quantity;
    }
    mapping(uint => Animal) public animals;
    uint public animalCount;

    constructor() public {
        addAnimal("Bulldog", 400);
        addAnimal("Cat", 100);
        addAnimal("Hamster", 700);
    }

    function addAnimal(string memory _name, uint _price) private {
        animalCount++;
        animals[animalCount] = Animal(animalCount, _name, _price, 10000);
    }
}