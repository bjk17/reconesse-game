//~ var apiUrl = 'http://localhost/django'; //inga
//~ var apiUrl = 'http://localhost:8000'; //bjarni

var currentLevel = 1;
var questionsInLevel;
var currentAnswers;
var wrongAnswerCount=0;
var characterChosen = false;
var lastLatitude;
var lastLongitude;
var numberOfQuestionsInLevel = 10;

$(document).ready(function () {
    $("#chooseCharacterDialog").dialog({
        autoOpen: false, position: [ 1000, 50]
    });
    $("#levelDialog").dialog({
        autoOpen: false, position: [ 1000, 50]
    });
    $("#questionDialog").dialog({
        autoOpen: false, position: [ 1000, 50]
    });

    $("#play").click(function () {
        $(function () {
            $("#chooseCharacterDialog").dialog("open");
            console.log("Choose Character Dialog: Open");
        });
    });

    $(document).on('click', '#startGame', function () {
        console.log(apiUrl);
        $("#chooseCharacterDialog").dialog("close");
        console.log("Choose Character Dialog: Close");
        
        if (!characterChosen) {
            var startLocation = new google.maps.LatLng(65, -165);

            lastLatitude = 65;
            lastLongitude = -150;

            var image = {
                //~ url: 'http://localhost:8000/game/img/characters/EarhartSmall.png', //inga
                //~ url: 'img/characters/EarhartSmall.png', //bjarni
                size: new google.maps.Size(80, 112)
            };

            var markerImage = new google.maps.Marker({
                position: startLocation,
                map: map,
                icon: image,
                title: 'Avatar'
            });

            characterChosen = true;
        }
        $("#questionDialog").dialog("close");
        $.getJSON(apiUrl + '/api/level/' + currentLevel + '/', { format: "json"})
            .done(function (data) {

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(data.latitude, data.longitude),
                    map: map,
                    title: 'Hello World!'
                });

                var line = new google.maps.Polyline({
                    path: [new google.maps.LatLng(lastLatitude, lastLongitude), new google.maps.LatLng(data.latitude, data.longitude)],
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 10,
                    clickable: false,
                    map: map
                });

                lastLatitude = data.latitude;
                lastLongitude = data.longitude;

                questionsInLevel = shuffle(data.questions).splice(0, numberOfQuestionsInLevel);

                var source = $("#level-template").html();

                var template = Handlebars.compile(source);
                var html = template(data);

                $("#levelDialog").html(html);
                $("#levelDialog").dialog("open");

            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ', ' + error;
                console.log("Request Failed: " + err);
            });
    });
    $(document).on('click', '#start-level', function () {
        if (questionsInLevel.length > 0) {
            var nextQuestionsID = questionsInLevel[0].id;

            questionsInLevel = questionsInLevel.splice(1);

            $.getJSON(apiUrl + '/api/question/' + nextQuestionsID + '/', { format: "json"})
                .done(function (data) {
                    currentAnswers = data.answers;

                    var source = $("#question-template").html();
                    var template = Handlebars.compile(source);
                    var html = template(data);

                    $("#questionDialog").dialog("close");
                    $("#levelDialog").dialog("close");
                    $("#questionDialog").html(html);
                    var questionNumber = numberOfQuestionsInLevel - questionsInLevel.length;
                    $("#questionDialog").dialog('option', 'title', 'Question ' + questionNumber + ' of ' + numberOfQuestionsInLevel)
                    $("#questionDialog").dialog("open");

                }).fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log("Request Failed: " + err);
                });
        } else {


        }

    });

    $(document).on('click', '#answers a', function () {
        var index = $("#answers a").index(this);

        if ($(this).attr('href') !== undefined) {
            if (currentAnswers[index].rightAnswer) {
                $(this).css("color", "green");
                $("#answers a").removeAttr('href');
                if (questionsInLevel.length == 0) {
                    currentLevel = currentLevel + 1;
                    $("#nextLevel").show();
                }
                else {
                    $("#nextQuestion").show();
                }
                wrongAnswerCount = 0; // New question means player hasn't anwsered wrong yet.
            } else {
                $(this).css("color", "red");
                wrongAnswerCount++;
            }
        }
        
        //~ If the player has answered to many wrong questions we want to provide
        //~ an link for the player to read more about the women.
        if (wrongAnswerCount >= 2) {
            //~ alert is a placeholder
            //~ alert("Please read more about her.");
            
            //~ Trying to append text/link at the bottom of question dialog.
            $("#readMoreCarefully").html("Please read more about <i>insert name</i> <a href='http://example.org/'>here</a>.")
        }
    });
});

//http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}