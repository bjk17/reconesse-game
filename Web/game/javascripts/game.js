var apiUrl = 'http://localhost/django';

$(document).ready(function () {
    $("#chooseCharacterDialog").dialog({
        autoOpen: false
    });
    $("#levelDialog").dialog({
        autoOpen: false
    });
    $("#L1questionDialog").dialog({
        autoOpen: false
    });

    $("#play").click(function () {
        $(function () {
            $("#chooseCharacterDialog").dialog("open");
        });
    });

    $("#startGame").click(function () {
        $("#chooseCharacterDialog").dialog("close");
        $(function () {
            $("#levelDialog").dialog("open");
        });
    });

    $("#level1").click(function () {
        $("#levelDialog").dialog("close");
        $(function () {
            $("#L1questionDialog").dialog("open");
        });
    });

    $("#test").click(function(){

    $.getJSON(apiUrl + '/api/level/', { format: "json"})
            .done(function (data) {
                alert(JSON.stringify(data));
                var source = $("#level-template").html();
                var template = Handlebars.compile(source);
                var html = template(data.objects[0]);


                $("#levelDialog").html(html);
                $("#levelDialog").dialog("open");
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ', ' + error;
                console.log("Request Failed: " + err);
            });
    });


});