// How long to display temporary help info for 
const helpTempDisplayMsec = 2500;

// The various track types and their corresponding strings for the UI
const TrackTypeModular = 'Modular';
const TrackTypeAudio = 'Audio';
const TrackTypeTrigger16 = 'Trigger16';
const TrackTypeCV16 = 'CV16';
const TrackTypeMidi = 'Midi';
const TrackTypeI2c = 'I2C';
const TrackTypeUnkown = 'Unknown';

// Initialize type of each track
var trackTypes = [TrackTypeModular, TrackTypeModular, 
                  TrackTypeModular, TrackTypeModular, 
                  TrackTypeModular, TrackTypeModular,
                  TrackTypeAudio, TrackTypeAudio];

/* Returns the string specifying the current type of the track. 
   trackNum is zero based (0-7). */
function getTrackType(trackNum) {
    return trackTypes[trackNum];
}

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

// Allow use of arrow keys on keyboard in place of the virtual arrow buttons on the NerdSeq.
// Using the keyboard can be faster and more like using the mechanical buttons of the NerdSeq.
document.addEventListener('keydown', function(event) {
    console.log('keydown');
    const shiftKeyState = shiftKey(event);
    
    switch (event.key) {
    case "ArrowLeft":
        currentScreen.leftArrowClicked(shiftKeyState);
        break;
    case "ArrowRight":
        currentScreen.rightArrowClicked(shiftKeyState);
        break;
    case "ArrowUp":
        currentScreen.upArrowClicked(shiftKeyState);
        break;
    case "ArrowDown":
        currentScreen.downArrowClicked(shiftKeyState);
        break;
}
});

/* Returns zero padded string */
function zeroPad(value) {
    // Convert to string if necessary
    const str = '' + value; 

    // Return zero padded string
    return str.padStart(2, '0');
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

