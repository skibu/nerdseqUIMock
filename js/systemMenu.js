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

    // For handling scrolling
    rows: null,  // The html tr elements to be hidden or made visible
    rowNumOfFirstVisibleRow: 0,   
    VISIBLE_ROWS: 16,

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

    /* After cursor is moved then need to possibly scroll the screen */
    scrollScreenIfNeeded: function() {
        let newRow = this.currentRow;

        // Determine the html editable rows if haven't done so yet
        if (!this.rows) {
            const allRowsInMenu = $('#' + this.elementId + ' tr');
            
            this.rows = new Array(allRowsInMenu.length - 2);
            for (i=0; i<this.rows.length; ++i) {
                this.rows[i] = allRowsInMenu[i+1];

                // Only first few rows should be visible
                if (i >= this.VISIBLE_ROWS) {
                    this.rows[i].style.display = 'none';
                }
            }
        }

        // If need to scroll down
        if (newRow >= this.rowNumOfFirstVisibleRow + this.VISIBLE_ROWS) {
          // Scroll down. First determine how many rows to scroll
          let newRowOfFirstVisibleRow = newRow - this.VISIBLE_ROWS + 1;
        
          // Hide the top rows that were visible but no longer should be
          for (var row = this.rowNumOfFirstVisibleRow; row < newRowOfFirstVisibleRow; ++row) {
            console.log('hiding row ' + row);
            // Hide that row
            let rowToHide = this.rows[row];
            rowToHide.style.display = 'none';
          }
        
          // Make visible the bottom rows that were not visible but now should be
          for (var row = this.rowNumOfFirstVisibleRow + this.VISIBLE_ROWS; row <= newRow; ++row) {
            console.log('making visible row ' + row);
            // Make that row visible
            let rowToHide = this.rows[row];
            rowToHide.style.display = 'table-row';  
          }          
            
          // Remember where scrolled to
          this.rowNumOfFirstVisibleRow = newRowOfFirstVisibleRow; 
        } else if (newRow < this.rowNumOfFirstVisibleRow) {
          // scroll up
          let newRowOfFirstVisibleRow = newRow;
        
          // Hide the bottom rows
          for (var row = newRow + this.VISIBLE_ROWS; row < this.rowNumOfFirstVisibleRow + this.VISIBLE_ROWS; ++row) {
            console.log('hiding row ' + row);
            // Hide that row
            let rowToHide = this.rows[row];
            rowToHide.style.display = 'none';
          }
        
          // Make visible the top rows
          for (var row = newRow; row < this.rowNumOfFirstVisibleRow; ++row) {
            console.log('making visible row ' + row);
            // Make that row visible
            let rowToHide = this.rows[row];
            rowToHide.style.display = 'table-row';  
          }
            
          // Remember where scrolled to
          this.rowNumOfFirstVisibleRow = newRowOfFirstVisibleRow;             
        }

        // Update UI to indicate whether can scroll sequences window
        this.displayScrollingHints(this.rowNumOfFirstVisibleRow);
    },

    /* For displaying info indicating whether can scroll up or down */
    displayScrollingHints: function(newRow) {
        const seqTbl = $('#sequencesTable')[0];
        
        // Handle whether cqn scroll up
        if (newRow != 0)
          seqTbl.classList.add('borderIndicatingCanScrollUp');
        else
          seqTbl.classList.remove('borderIndicatingCanScrollUp');
        
        // Handle whether can scroll down
        if (newRow < this.ROWS - this.VISIBLE_ROWS)
          seqTbl.classList.add('borderIndicatingCanScrollDown');
        else
          seqTbl.classList.remove('borderIndicatingCanScrollDown');
    },

    /* Updates help info. Called by menuSelectRow(). */
    newRowSelected: function() {
        this.scrollScreenIfNeeded();
        
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