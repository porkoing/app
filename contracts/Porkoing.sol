pragma solidity ^0.4.18;

contract Porkoing {
    address owner;
    mapping(uint => Farmer) farmers;
    mapping(uint => Vet)    vets;
    mapping(uint => Seller) sellers;
    mapping(uint => Pork)   porks;

    struct Farmer {
        uint id;
        string name;
    }

    struct Vet {
        uint id;
        string name;
    }

    struct Seller {
        uint id;
        string name;
    }

    struct Pork {
        uint   id;
        Farmer farmer;
        string birthdate; 
        string breed;
        bool   vaccinated;
        Vet    vet;
        Seller seller;
    }

    function Porkoing() public {
        owner = msg.sender;
        farmers[1] = Farmer( {id: 1, name: "Pablo"} );
        farmers[2] = Farmer( {id: 2, name: "Jose"} );
        vets[1] = Vet( {id: 3, name: "Lucia"} );
        sellers[1] = Seller( {id: 4, name: "Victor"} );
        sellers[1] = Seller( {id: 4, name: "Alex"} );
    }

    function create(uint farmerId, uint porkId, string birthdate, string breed) public {
        require(
            (msg.sender == owner)
            // &&
            //farmers[farmerId] &&
            //porks[porkId]
        );
        porks[porkId] = Pork({id:porkId,
                             farmer: farmers[farmerId],
                             birthdate: birthdate,
                             breed: breed,
                             vaccinated: false,
                             vet: Vet({id: 0, name: ""}),
                             seller: Seller({id: 0, name: ""})
                            });
    }

    function vacine(uint porkId, uint vetId) public {
        porks[porkId].vaccinated = true;
        porks[porkId].vet = vets[vetId];
    }

    function sell(uint porkId, uint sellerId) public {
        porks[porkId].seller = sellers[sellerId];
    }

    function findPork(uint porkId) public view returns (Pork) {
        return porks[porkId];
    }
}