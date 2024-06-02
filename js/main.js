
/* Hides all tables and then makes the table with the specified id visible */
function makeTableVisible(id) {
    // Hide all the NerdSeq screens 
    var allTables = $(".virtualScreen");
    Array.from(allTables).forEach(function(domTable) { 
        domTable.style.visibility = "hidden";});

    // Make the table with the specified id visible
    var table = $("#" + id)[0];
    table.style.visibility = "visible";
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

