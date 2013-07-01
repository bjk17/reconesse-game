$(document).ready(function () {
    $("#chooseCharacterDialog").dialog({
        autoOpen: false
    });
    $("#level1Dialog").dialog({
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
            $("#level1Dialog").dialog("open");
        });
    });

    $("#level1").click(function () {
        $("#level1Dialog").dialog("close");
        $(function () {
            $("#L1questionDialog").dialog("open");
        });
    });

});