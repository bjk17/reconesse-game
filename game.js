/* At the end of 'main.js' jQuery.noConflict() is called
 * which means that the $ shortcut is not available and 
 * the longer jQuery is used, i.e. 
 * 
 *  jQuery(document).ready(function ($) {
 * 
 * instead of
 * 
 *  $(document).ready(function () {
 * 
 * For more info:
 * http://stackoverflow.com/questions/10807200/jquery-uncaught-typeerror-property-of-object-object-window-is-not-a-funct
 */


function popQuestion(line1, line2) {
    var canvas  = document.getElementById("gameCanvas");
    var context = canvas.getContext("2d");
    
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "top";
    context.font = "bold 22px sans-serif";
    context.fillText(line1, 200, 20);
    context.fillText(line2, 200, 40);
}

function playGame() {
    document.getElementById('gameButton').style.display = 'none';
    document.getElementById('container' ).style.display = 'inline-block';
    
    alert('Please note that the game is still under construction.');
}