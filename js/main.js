// How long to display temporary help info for 
const helpTempDisplayMsec = 2500;

// The various track types and their corresponding strings for the UI
const TrackTypeModular = 'Modular';
const TrackTypeAudio = 'Audio';
const TrackTypeTrigger16 = 'Trig16';
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

// Keeps track of which is the currenet screen or menu so that
// button clicks can be sent to it
var currentUiObject;

// For keeping track of last screen so that when a menu is closed the UI 
// events can be directed to the screen again
var lastScreenObject;

/* Hides all screens and then makes the table with the specified id visible */
function makeScreenVisible(uiObject) {
    currentUiObject = uiObject;
    lastScreenObject = uiObject;
    
    // Hide all the NerdSeq screens 
    var allScreens = $(".virtualScreenContainer");
    Array.from(allScreens).forEach(function(domTable) { 
        domTable.style.visibility = "hidden";});

    // Also, hide any  menus that are being displayed since want to see the new screen only
    var allMenus = $(".menuContainer");
    Array.from(allMenus).forEach(function(domTable) { 
        domTable.style.visibility = "hidden";});

    // Make the element with the specified id visible
    const screen = $("#" + uiObject.elementId)[0];
    screen.style.visibility = "visible";
}

/* For when done with a menu. So that UI events are sent to the screen object again */
function closeMenuAndRestoreScreen(menuObject) {
    currentUiObject = lastScreenObject;

    const menu = $('#' + menuObject.elementId)[0];
    menu.style.visibility = 'hidden';
}

// Allow use of arrow keys on keyboard in place of the virtual arrow buttons on the NerdSeq.
// Using the keyboard can be faster and more like using the mechanical buttons of the NerdSeq.
document.addEventListener('keydown', function(event) {
    console.log('keydown');
    const shiftKeyState = shiftKey(event);
    
    switch (event.key) {
    case "ArrowLeft":
        currentUiObject.leftArrowClicked(shiftKeyState);
        break;
    case "ArrowRight":
        currentUiObject.rightArrowClicked(shiftKeyState);
        break;
    case "ArrowUp":
        currentUiObject.upArrowClicked(shiftKeyState);
        break;
    case "ArrowDown":
        currentUiObject.downArrowClicked(shiftKeyState);
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

/* Convenience function for loading in css file dynamically. From https://gist.github.com/james2doyle/9456c3e145f8d0afbe25 
   Simply call $.getStylesheet('css/file.css'); */
(function($) {
  $.getStylesheet = function (href) {
		return $.ajax({
			dataType: "text",
			url: href,
		}).done( function(text){
			$("<style>").html(text).appendTo("head");
		} );
  };
})(jQuery);

/* So that can have multiple onload events, setup in different files.
   From https://www.brefere.com/fbapps/bcom.nsf/cvbdate/D514491209EE5C848725801A0074AE6E?opendocument */
function addLoadEvent(func) { 
	var oldonload = window.onload; 
	if (typeof window.onload != 'function') { 
		window.onload = func; 
	} else { 
		window.onload = function() { 
			if (oldonload) { 
				oldonload(); 
			} 
			func(); 
		} 
	} 
} 