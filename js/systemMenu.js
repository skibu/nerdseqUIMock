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
    rows: null,  // Array of the html tr elements to be hidden or made visible. Does not include header or help rows.
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
            // Hide that row
            let rowToHide = this.rows[row];
            rowToHide.style.display = 'none';
          }
        
          // Make visible the bottom rows that were not visible but now should be
          for (var row = this.rowNumOfFirstVisibleRow + this.VISIBLE_ROWS; row <= newRow; ++row) {
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
            // Hide that row
            let rowToHide = this.rows[row];
            rowToHide.style.display = 'none';
          }
        
          // Make visible the top rows
          for (var row = newRow; row < this.rowNumOfFirstVisibleRow; ++row) {
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
    displayScrollingHints: function(rowNumOfFirstVisibleRow) {
        // Get dimensions of the titleRow and the helpRow
        const titleRow = $('#' + this.elementId + ' .titleRow')[0];
        var titleRowRect = titleRow.getBoundingClientRect();

        const helpRow = $('#' + this.elementId + ' .helpRow')[0];
        var helpRowRect = helpRow.getBoundingClientRect();

        // Determine how much height is available, where the top should be, and what the height of scrollbar should be
        const MARGIN = 5; // Want a bit of space
        const availableHeight = helpRowRect.top - titleRowRect.bottom - 2*MARGIN;
        
        const top = (titleRowRect.bottom - titleRowRect.top) + MARGIN + (this.rowNumOfFirstVisibleRow / this.rows.length) * availableHeight;
        const height = availableHeight * this.VISIBLE_ROWS / this.rows.length;

        // Set the top and height of scrollbar
        const scrollbar = $('#' + this.elementId + ' .scrollbar')[0];
        scrollbar.style.top = top + 'px';
        scrollbar.style.height = height + 'px';
        
        // Display borders appropriately depending on whether cqn scroll up
        if (rowNumOfFirstVisibleRow != 0)
          titleRow.classList.add('menuBorderIndicatingCanScrollUp');
        else
          titleRow.classList.remove('menuBorderIndicatingCanScrollUp');
        
        // on whether can scroll down
        if (rowNumOfFirstVisibleRow < this.rows.length - this.VISIBLE_ROWS)
          helpRow.classList.add('menuBorderIndicatingCanScrollDown');
        else
          helpRow.classList.remove('menuBorderIndicatingCanScrollDown');
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