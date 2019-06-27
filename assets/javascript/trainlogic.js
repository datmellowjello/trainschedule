console.log("test")
$(document).ready(function () {
    console.log("ready!");

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

    $("#add-train").on("click", function (event) {
        event.preventDefault();

        var trainName = $("#train-name-input").val().trim();

        var destinationInput = $("#dest-name-input").val().trim();

        var firstTime = $("#first-train-input").val().trim();

        var frequencyInput = $("#freq-input").val().trim();

        var newTrain = {
            name: trainName,
            destination: destinationInput,
            firstTrain: firstTime,
            frequency: frequencyInput,
        };

        trainData.ref().push(newTrain);

        $("#freq-input").val("");
        $("#train-name-input").val("");
        $("#dest-name-input").val("");
        $("#first-train-input").val("");


    });
    trainData.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        var tName = childSnapshot.val().name;
        var tDestination = childSnapshot.val().destination;
        var tFrequency = childSnapshot.val().frequency;
        var tFirstTrain = childSnapshot.val().firstTrain;

        var timeArr = tFirstTrain.split(":");
        var trainTime = moment()
            .hours(timeArr[0])
            .minutes(timeArr[1]);
        var maxMoment = moment.max(moment(), trainTime);
        var tMinutes;
        var tArrival;

        if (maxMoment === trainTime) {
            tArrival = trainTime.format("hh:mm A");
            tMinutes = trainTime.diff(moment(), "minutes");
        } else {

            var differenceTimes = moment().diff(trainTime, "minutes");
            var tRemainder = differenceTimes % tFrequency;
            tMinutes = tFrequency - tRemainder;

            tArrival = moment()
                .add(tMinutes, "m")
                .format("hh:mm A");
        }

        $("#train-table > tbody").append(
            $("<tr>").append(
                $("<td>").text(tName),
                $("<td>").text(tDestination),
                $("<td>").text(tFrequency),
                $("<td>").text(tArrival),
                $("<td>").text(tMinutes)
            )
        );
    });

});