/* JS for the System Menu */
function displaySystemMenu() {
    // Initialize object
    menuInitialize(systemMenuObject);
    
    makeMenuVisible(systemMenuObject);
}

let systemMenuObject = {
    elementId: 'systemMenu',

    // 1 based since row 0 is the header
    currentRow: null,

    /* Handles incrementing or decrementing the curreent editable value */
    upOrDownClicked: function(increment, shiftKey) {
        // Determine current editable value and its ID.
        const id = menuIdOfEditableElement(this);

        // Handle depending on ID of the current editable value
        switch(id) {
            case 'xxx':
                this.handleTempoChange(increment, shiftKey);
                break;
            default:
                alert("systemMenu.js error: Don't have list of values for id=" + id);
                return null;
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

    rightArrowClicked: function(shiftKey) { alert('RIGHT' + (shiftKey ? ' shift' : '')); }, 

    /* Increment the editable value */
    upClicked: function(shiftKey) { this.upOrDownClicked(1, shiftKey); },

    /* Decrement the editable value */
    downClicked: function(shiftKey) { this.upOrDownClicked(-1, shiftKey); },

    /* If on Close Menu row then will close the menu. Otherwise does nothing */
    okClicked: function(shiftKey) { 
        menuOkClicked(shiftKey, this);
    },
};