# BlockChain_Task_-4
DAPP with smart contracts, solidity

# V0.1
Sukurtas gyvūnų parduotuvės karkasas

# V1.0
  1.  Sukurta DAPP programa kuri leidžia nusipirkti gyvūnus bei juos parduoti
  2.  Atlikti testai su Ropsten, etherscan, ganache bei su mano sukurtais testo atvejais
  3.  Programa turi potencialių tradinimo patternų

# Programos verslo modelio logika
Į programą galime pridėti skirtingų prekių su skirtingomis kainomis, bei prekes pirkti, parduoti.
Smart contract būdu galime pridėti prekių bei redaguoti jų kieki, kainą ir pavadinimą.
Kol kas nėra įgyvendinta logika, bet panaudojus tam tikras matematines formulės sistema gali būti paversta į NFT tipo blockchain programą. Kurioje vartotojai nusprendžia kainą arba kainą keičiasi nuo daikto kiekio programoje.
Mano tikslas buvo suprasti kaip veikia Smart kontraktai, kaip juos testuojame, kaip veikia etheriai, gas ir testavimo networkai.

# Kaip pradėti programą lokaliame tinkle
1. Parsisiunčiama ganache ir pasileidžiame su quickstart
2. Tada console parašome ``` npm install ```, kad įsikeltume visus reikiamus dependency
3. Tada nuėję į programos aplanką mes terminale parašome ```Truffle migrate ``` arba ``` Truffle migrate --reset```, kad atnaujinti smart contract logiką ir įkelti duomenis per naujo.
4. Tada rašome ``` npm run dev``` ir einame http://localhost:3000/ kurioje yra naudotojo sąsaja
5. Tada parsisiunčiame MetaMask ir į jį importuojame viena iš ganache paskyrų ir prijungiame prie svetainės


