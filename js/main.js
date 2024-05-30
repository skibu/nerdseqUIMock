
/* Hides all tables and then makes the table with the specified id visible */
function makeTableVisible(id) {
    // Hide all the NerdSeq tables    v
    var allTables = $(".table");
    Array.from(allTables).forEach(function(domTable) { 
        domTable.style.visibility = "hidden";});

    // Make the table with the specified id visible
    var table = $("#" + id)[0];
    table.style.visibility = "visible";
}

var times = 0;
function createPatternTable() {
    // Get the DOM table
    var table = $("#sequencerTable")[0];

    // Clear out any old rows
    while (table.rows.length > 0)
        table.deleteRow(0);

    // Add new rows    
    times++;
        for (var r=0; r<times; ++r) {
        var firstRow = table.insertRow();
        for (var i=0; i<5; ++i) {
            var td = firstRow.insertCell();
            td.innerHTML = i;
        }
    }
}

function sequencer(shiftKey) {
    makeTableVisible("sequencerTable");
}

function pattern(shiftKey) {
    makeTableVisible("patternTable");
}

function automate(shiftKey) {
    alert('automate clicked. shiftKey=' + shiftKey);
}

function project(shiftKey) {
    alert('project clicked. shiftKey=' + shiftKey);
}

function upArrow(shiftKey) {
    alert('upArrow clicked. shiftKey=' + shiftKey);
}

function downArrow(shiftKey) {
    alert('downArrow clicked. shiftKey=' + shiftKey);
}

function leftArrow(shiftKey) {
    alert('leftArrow clicked. shiftKey=' + shiftKey);
}

function rightArrow(shiftKey) {
    alert('rightArrow clicked. shiftKey=' + shiftKey);
}