pragma solidity ^0.4.18;

contract Porkoing {
    address owner;
    mapping(uint => Farmer) farmers;
    mapping(uint => Vet)    vets;
    mapping(uint => Seller) sellers;
    mapping(uint => Pork)   porks;

    struct Farmer {
        string name;
    }

    struct Vet {
        uint id;
    }

    struct Seller {
        uint id;
    }

    struct Pork {
        uint id;
        uint farmerId;
        string birthdate; 
        string breed;
    }

    function Porkoing() public {
        owner = msg.sender;
    }

    function create(uint farmerId, uint porkId, string birthdate, string breed) public {
        require(
            (msg.sender == owner)
            // &&
            //farmers[farmerId] &&
            //porks[porkId]
        );
        porks[porkId] = Pork({id:porkId, farmerId: farmerId, birthdate: birthdate, breed: breed});
    }
/*
    function vacine(porkId, vetId) {
        // el veterinadio en la lista
    }

    function sell(porkId, sellerId) {
        // tiene que estar vacunado
    }
    
    function findPork(porkId) {

    }
    */ 
}