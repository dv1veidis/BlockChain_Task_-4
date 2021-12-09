App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: async function() {
    // Load pets.
    return await App.initWeb3();
  },

  initWeb3: async function() {
    if(typeof web3 != 'undefined'){
      // if a web3 instance is already provided by Meta Mask
      App.web3Provider = window.ethereum;
      web3 = new Web3(window.ethereum);
    }
    else{
      // specify default instance if no web3 instance is provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Shop.json", function(shop){
      App.contracts.Shop = TruffleContract(shop);
      App.contracts.Shop.setProvider(App.web3Provider);
      return App.render();
    });
  },
  render: function() {
    var shopInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();
    window.ethereum.enable().then(function(account) {
      web3.eth.getCoinbase(function(err, account) {
      if(err === null){
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    })
    })
    App.contracts.Shop.deployed().then(function(instance) {
      shopInstance = instance;
      return shopInstance.animalCount();
    }).then(function(animalCount) {
      var animalShop = $("#animalShop");
      animalShop.empty();
      for(var i = 1; i <= animalCount; i++) {
        shopInstance.animals(i).then(function(animal) {
          var id = animal[0];
          var name = animal[1];
          var price = animal[2];
          var quantity = animal[3];
          var animalTemplate = "<tr><th>"+id+"</th><td>"+ name + "</td><td>" + price +"</td><td>"+quantity +"</td></tr>";
          animalShop.append(animalTemplate);
        })
      }
      loader.hide();
      content.show();
    }).catch(function (error){
      console.warn(error);
    })
  },
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
