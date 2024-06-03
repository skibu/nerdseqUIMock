// Keeps track of which is the currenet screen so that
// button clicks can be sent to it.
var currentScreen;

/* Hides all tables and then makes the table with the specified id visible */
function makeScreenVisible(id) {
    // Hide all the NerdSeq screens 
    var allScreens = $(".virtualScreen");
    Array.from(allScreens).forEach(function(domTable) { 
        domTable.style.visibility = "hidden";});

    // Make the table with the specified id visible
    var screen = $("#" + id)[0];
    screen.style.visibility = "visible";
}

// var times = 0;
// function createPatternTable() {
//     // Get the DOM table
//     var table = $("#patternTable")[0];

//     // Clear out any old rows
//     while (table.rows.length > 0)
//         table.deleteRow(0);

//     // Add new rows    
//     times++;
//         for (var r=0; r<times; ++r) {
//         var firstRow = table.insertRow();
//         for (var i=0; i<5; ++i) {
//             var td = firstRow.insertCell();
//             td.innerHTML = i;
//         }
//     }
// }

