/* JS for the project menu */

function displayProjectMenu() {
    // Initialize object
    Menus.initialize(projectMenuObject);

    // Make Project Menu visible
    Menus.makeVisible(projectMenuObject);
}

let projectMenuObject = {
    elementId: 'projectMenu',

    // 1 based since row 0 is the header
    currentRow: null,
    
    handleTempoChange: function(increment, shiftKey) {
        // Set the new value and update UI
        _project.setTempo(_project.getTempo() + increment * (!shiftKey ? 1 : 10));
    },

    handleSwingChange: function(increment, shiftKey) {
        // Can only set swing if ClockIn is set to Internal
        if (_project.getClockIn() !== 'Internal') {
            Menus.helpStr('Clock In must be Internal', this);
            // Clear help message after 2.5 seconds
            setTimeout(() => { enus.helpStr('', this); }, 2500);
            return;
        }
        
        // Set the new value and update UI
        _project.setSwing(_project.getSwing() + increment * (!shiftKey ? 1 : 5));
    },

    handleMainClockChange: function(increment, shiftKey) {
        _project.incrementMainClock(increment);
    },

    handleLiveCuePointsChange: function(increment, shiftKey) {
        _project.setLiveCuePoints(_project.getLiveCuePoints() + increment * (!shiftKey ? 1 : 5));
    },

    handleClockInChange: function(increment, shiftKey) {
        _project.incrementClockIn(increment);
    },

    handleClockOutChange: function(increment, shiftKey) {
        _project.incrementClockOut(increment);
    },

    handleTransposeChange: function(increment, shiftKey) {
        _project.setTranspose(_project.getTranspose() + increment * (!shiftKey ? 1 : 12));

        // The sequencer window also displays the this info, but changes visibility of
        // the item. So call its own display method for this param.
        sequencerObject.elementChangedSoUpdateVisibility();
    },

    handleScaleChange: function(increment, shiftKey) {
        _project.incrementScale(increment * (!shiftKey ? 1 : 5));
    },

    handleEditingChange: function(increment, shiftKey) {
        // Toggle the value
        _project.setEditing(!_project.getEditing());

        // The sequencer window also displays the this info, but changes visibility of
        // the item. So call its own display method for this param.
        sequencerObject.elementChangedSoUpdateVisibility();
    },
    
    /* Handles incrementing or decrementing the curreent editable value */
    upOrDownClicked: function(increment, shiftKey) {
        // Determine current editable value and its ID.
        const id = Menus.idOfEditableElement(this);

        // Handle depending on ID of the current editable value
        switch(id) {
            case 'tempo':
                this.handleTempoChange(increment, shiftKey);
                break;
            case 'swing':
                this.handleSwingChange(increment, shiftKey);
                break;
            case 'mainClock':
                this.handleMainClockChange(increment, shiftKey);
                break;
            case 'liveCuePoints':
                this.handleLiveCuePointsChange(increment, shiftKey);
                break;
            case 'clockIn':
                this.handleClockInChange(increment, shiftKey);
                break;
            case 'clockOut':
                this.handleClockOutChange(increment, shiftKey);
                break;
            case 'transpose':
                this.handleTransposeChange(increment, shiftKey);
                break;
            case 'scale':
                this.handleScaleChange(increment, shiftKey);
                break;
            case 'editElement':
                this.handleEditingChange(increment, shiftKey);
                break;
            default:
                alert("projectMenu.js error: Don't have list of values for id=" + id);
                return null;
        }
    },

    /* Updates help info. Called by menuSelectRow(). */
    newRowSelected: function() {
         // Determine current editable value and its ID.
        const id = Menus.idOfEditableElement(this);

        // Handle depending on ID of the current editable value
        switch(id) {
            case 'closeMenu':
                Menus.helpStr('[OK] or [<-] to close', this);
                break;
            default:
                Menus.helpStr('', this);
        }
    },

    /* Scroll down */
    upArrowClicked: function(shiftKey) {
        Menus.selectRow(this.currentRow - 1, this);        
    },

    /* Scroll up */
    downArrowClicked: function(shiftKey) {
        Menus.selectRow(this.currentRow + 1, this);
    },

    /* Hide the menu and have the last screen get UI events */
    leftArrowClicked: function(shiftKey) {
        Menus.handlePossibleCloseMenu(this);
        
        closeMenuAndRestoreScreen(this);
    },

    rightArrowClicked: function(shiftKey) { 
        Menus.handlePossibleCloseMenu(this);
    }, 

    /* Increment the editable value */
    upClicked: function(shiftKey) { this.upOrDownClicked(1, shiftKey); },

    /* Decrement the editable value */
    downClicked: function(shiftKey) { this.upOrDownClicked(-1, shiftKey); },

    /* If on Close Menu row then will close the menu. Otherwise does nothing */
    okClicked: function(shiftKey) { 
        Menus.handlePossibleCloseMenu(this);
    },
};