function displayScreenSelectMenu() {
    // Initialize object
    screenSelectMenuObject.initialize();
    
    makeMenuVisible(screenSelectMenuObject);
}

let screenSelectMenuObject = {
    elementId: 'screenSelectMenu',

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
    
      $('#screenSelectMenuHelp').html(strToUse); 
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
        const rowElements = $('#screenSelectMenu tr');

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

    /* Returns id of the html element that is currently being edited */
    idOfEditableElement: function() {
        // Determine current editable value and its ID.
        const rowElements = $('#screenSelectMenu tr');
        const editableCells = rowElements.find('.editable');
        const currentEditableElement = editableCells[this.currentRow-1];
        const id = currentEditableElement.id;
        return id;        
    },

    /* User wants to go to specified screen */
    gotoScreen: function() {
        const id = this.idOfEditableElement();
        if (id === 'closeMenu') {
            // So that next time Project menu opened won't still be selecting the Close Window buttonn
            this.selectRow(1);
            
            closeMenuAndRestoreScreen(this);
        } else {
            // All choices besides closeMenu mean should jump to that screen
            switch(id) {
                case 'patch':
                    displayPatchScreen();
                    break;
                case 'pattern':
                    displayPatternScreen();
                    break;
                case 'sequencer':
                    displaySequencerScreen();
                    break;
                case 'table':
                    displayTableScreen();
                    break;
                    
                case 'automate':
                    displayAutomateScreen();
                    break;
                case 'track':
                    displayTrackScreen();
                    break;                    
                default:
                    alert('Not configured to handle displaying screen id=' + id);
            }
        }
    },
    
    /* There is no context menu for the Screen Select Menu so do nothing */
    displayContextMenu: function() {
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