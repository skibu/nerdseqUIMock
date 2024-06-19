function displayScreenSelectMenu() {
    // Initialize object
    menuInitialize(screenSelectMenuObject);
    
    makeMenuVisible(screenSelectMenuObject);
}

let screenSelectMenuObject = {
    elementId: 'screenSelectMenu',

        // 1 based since row 0 is the header
    currentRow: null,

    /* User wants to go to specified screen */
    gotoScreen: function() {
        const id = menuIdOfEditableElement(this);;
        if (id === 'closeMenu') {
            // So that next time Project menu opened won't still be selecting the Close Window buttonn
            this.selectRow(1);
            
            closeMenuAndRestoreScreen(this);
        } else {
            // All choices besides closeMenu mean should jump to that screen
            switch(id) {
                case 'sequencer':
                    displaySequencerScreen();
                    break;
                case 'pattern':
                    displayPatternScreen();
                    break;
                case 'patch':
                    displayPatchScreen();
                    break;
                case 'table':
                    displayTableScreen();
                    break;
                    
                case 'automate':
                    displayAutomateScreen();
                    break;
                case 'envelope':
                    displayEnvelopeScreen();
                    break;
                case 'i2c':
                    displayI2cScreen();
                    break;
                case 'inputRecord':
                    displayInputRecordScreen();
                    break;
                case 'mapping':
                    displayMappingScreen();
                    break;
                case 'midi':
                    displayMidiScreen();
                    break;
                case 'randomRanges':
                    displayRandomRangesScreen();
                    break;
                case 'scaleQuantize':
                    displayScaleQuantizeScreen();
                    break;
                case 'track':
                    displayTrackScreen();
                    break;                    
                default:
                    alert('Not configured to handle displaying screen id=' + id);
            }
        }
    },

    /* Updates help info. Called by menuSelectRow(). */
    newRowSelected: function() {
         // Determine current editable value and its ID.
        const id = menuIdOfEditableElement(this);

        // Handle depending on ID of the current editable value
        switch(id) {
            case 'closeMenu':
                menuHelpStr('[OK] or [<-] to close', this);
                break;
            default:
                menuHelpStr('', this);
        }
    },
    
    /* Scroll down */
    upArrowClicked: function(shiftKey) {
        menuSelectRow(this.currentRow - 1, this);        
    },

    /* Scroll up */
    downArrowClicked: function(shiftKey) {
        menuSelectRow(this.currentRow + 1, this);
    },

    /* Hide the menu and have the last screen get UI events */
    leftArrowClicked: function(shiftKey) {
        closeMenuAndRestoreScreen(this);
    },

    /* If on Close Menu row then will close the menu. Otherwise will jump to the specified screen */
    rightArrowClicked: function(shiftKey) { 
        this.gotoScreen(); 
    }, 

    /* Increment the editable value */
    upClicked: function(shiftKey) { this.upOrDownClicked(1, shiftKey); },

    /* Decrement the editable value */
    downClicked: function(shiftKey) { this.upOrDownClicked(-1, shiftKey); },

    /* If on Close Menu row then will close the menu. Otherwise will jump to the specified screen */
    okClicked: function(shiftKey) { 
        this.gotoScreen();
    },
    
};