/* JS for the project menu */

function displayProjectMenu() {
    // Initialize object
    projectMenuObject.initialize();

    // Make Project Menu visible
    makeMenuVisible(projectMenuObject);
}

let projectMenuObject = {
    elementId: 'projectMenu',

    // 1 based since row 0 is the header
    currentRow: null,

    initialize: function() {
        // Make sure a row is highlighted
        this.selectRow();
    },

      /* Displays specified string in the help element */
    helpStr: function(str) {
      // If blank string used that can cause the html element to resize. Therefore use
      // '&nbsp;' for that situation
      const strToUse = (str == null || str === '') ? '&nbsp;' : str;
    
      $('#projectMenuHelp').html(strToUse); 
    },
    
    // Makes the specified row the active one
    selectRow: function (rowNum) {
        // If haven't used menu before then set
        if (!this.currentRow) {
            // If rowNum not set just use first eleemnt of menu
            if (!rowNum)
                rowNum = 1;

            // Set currentRow to 2 so that it is different from rowNum so that classes get set
            this.currentRow = 2;
        } else {
            // currentRow already set so use it if rowNum not specified
            if (!rowNum)
                rowNum = this.currentRow;
        }
        
        // Get the row html elements of the table
        const rowElements = $('#projectMenu tr');

        // Limit row number to valid range of 1 <> numberOfRows-1
        rowNum = Math.min(rowElements.length - 2, Math.max(1, rowNum));

        // If row is changing then ...
        if (rowNum != this.currentRow) {
            // array of editable cells doesn't include first tr. Therefore ues zero based index
            const editableCells = rowElements.find('.editable');
                        
            // Restore the previously selected row to its initial look
            rowElements[this.currentRow].classList.remove('menuSelectedItem');
            const currentEditableElement = editableCells[this.currentRow-1];
            currentEditableElement.classList.remove('selected');
            
            // Select the new row
            this.currentRow = rowNum;
            rowElements[this.currentRow].classList.add('menuSelectedItem');
            const newEditableElement = editableCells[this.currentRow-1];
            newEditableElement.classList.add('selected');
        }
    },

    handleTempoChange: function(increment, shiftKey) {
        // Set the new value and update UI
        _project.setTempo(_project.getTempo() + increment * (!shiftKey ? 1 : 10));
    },

    handleSwingChange: function(increment, shiftKey) {
        // Can only set swing if ClockIn is set to Internal
        if (_project.getClockIn() !== 'Internal') {
            this.helpStr('Clock In must be Internal');
            // Clear help message after 2.5 seconds
            setTimeout(() => { this.helpStr(''); }, 2500);
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

    /* Returns id of the html element that is currently being edited */
    idOfEditableElement: function() {
        // Determine current editable value and its ID.
        const rowElements = $('#projectMenu tr');
        const editableCells = rowElements.find('.editable');
        const currentEditableElement = editableCells[this.currentRow-1];
        const id = currentEditableElement.id;
        return id;        
    },
    
    /* Handles incrementing or decrementing the curreent editable value */
    upOrDownClicked: function(increment, shiftKey) {
        // Determine current editable value and its ID.
        const id = this.idOfEditableElement();

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

    /* There is no context menu for the Project Menu so simply do nothing */
    displayContextMenu: function() {
        // do nothing
    },

    /* Scroll down */
    upArrowClicked: function(shiftKey) {
        this.selectRow(this.currentRow - 1);        
    },

    /* Scroll up */
    downArrowClicked: function(shiftKey) {
        this.selectRow(this.currentRow + 1);
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
        const id = this.idOfEditableElement();
        if (id === 'closeMenu') {
            // So that next time Project menu opened won't still be selecting the Close Window buttonn
            this.selectRow(1);
            
            closeMenuAndRestoreScreen(this);
        }
    },
};