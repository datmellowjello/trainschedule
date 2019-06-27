$(document).ready(function() {
    console.log( "ready!" );

    var firebaseConfig = {
        apiKey: "AIzaSyBQNUR2T2U1opMVZEvGeYYVMUaoACh2TyU",
        authDomain: "trainproject-1b5e2.firebaseapp.com",
        databaseURL: "https://trainproject-1b5e2.firebaseio.com",
        projectId: "trainproject-1b5e2",
        storageBucket: "",
        messagingSenderId: "97815541965",
        appId: "1:97815541965:web:3fadfeb7f618efd7"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
     
      var trainData = firebase.database();

      $("#add-train").on("click", function(event) {
        event.preventDefault();

        var trainName = $("#train-name-input").val().trim();

        var destinationInput = $("#dest-name-input").val().trim();

        var firstTime = $("#first-train-input").val().trim();

        var frequencyInput = $("#freq-input").val().trim();

        var newTrain = {
            name: trainName,
            destination: destinationInput,
            firstTrain: firstTrain,
            frequency: frequencyInput,
        };

        trainData.ref().push(newTrain);

        $("#freq-input").empty();
        $("#train-name-input").empty();
        $("#dest-name-input").empty();
        $("#first-train-input").empty();


      })


});