//~ bjarni: http://127.0.0.1:8000
//~ inga: http://localhost/django
var apiUrl = '';

var currentLevel = 1;
var questionsInLevel;
var currentAnswers;

$(document).ready(function () {
    $("#chooseCharacterDialog").dialog({
        autoOpen: false
    });
    $("#levelDialog").dialog({
        autoOpen: false
    });
    $("#questionDialog").dialog({
        autoOpen: false
    });

    $("#play").click(function () {
        $(function () {
            $("#chooseCharacterDialog").dialog("open");
        });
    });

    $(document).on('click', '#startGame', function () {
        console.log(apiUrl);
        $("#chooseCharacterDialog").dialog("close");
        $("#questionDialog").dialog("close");
        $.getJSON(apiUrl + '/api/level/' + currentLevel + '/', { format: "json"})
            .done(function (data) {

                questionsInLevel = shuffle(data.questions).splice(0,10);
                console.log(questionsInLevel);
                console.log(data.questions);
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

        if (currentAnswers[index].rightAnswer) {
            $(this).css("color", "green");
            if (questionsInLevel.length == 0) {
                currentLevel = currentLevel+1;
                $("#nextLevel").show();
            }
            else {
                $("#nextQuestion").show();
            }
        } else {
            $(this).css("color", "red");
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

