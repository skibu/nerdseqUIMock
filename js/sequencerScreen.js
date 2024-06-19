/* For the Sequencer screen. Javascript is used to create main part of the 
   window since the rows are so repetitive. */

function displaySequencerScreen() {
    makeScreenVisible(sequencerObject);
}

/* Defines info associated with a pattern */
class Pattern {
  constructor(id, name, trackType) {
    this.id = id;
    this.name = name;
    this.trackType = trackType;
  }

  // Creates a copy of the pattern, but with a new pattern ID
  clone(newId) {
    return new Pattern(newId, this.trackType);
  }

  setName(name) {
    this.name = name;
  }

  getId() {
    return this.id;
  }

  // Returns name of project so that it can be displayed
  getName() {
    return this.name ? this.name : "unnamed";
  }

  getTrackType() {
    return this.trackType;
  }
}

// The object that keeps track of everything for the Sequencer Screen  
let sequencerObject = {
  elementId: 'sequencerScreen',
  
  TRACKS: 8,
  ROWS: 255,
  VISIBLE_ROWS: 16,
  
  // When to use hightlight background color
  highlightNthRow: 4,

  // Defines which cell cursor is on. Uses base zero.
  cursorRow: 0,
  cursorTrack: 0,

  // For handling scrolling
  rowNumOfFirstVisibleRow: 0,
  
  // Note that the constants are not yet set when the arrays are created. So need to create
  // the arrays in a constructor method. The nulls are just a placeholders.
  // The html td elements
  cells: null,

  // The html tr elements
  rows: null,

  // 2D array. Contains the pattern info
  patterns: null, 

  // Keeps track of which patterns taken
  maxPatternId: -1,

  // Fill in the sequences table
  createSequences: function() {
    // Initialize cells in this method so that constants are available
    this.cells = Array.from(Array(this.ROWS), () => new Array(this.TRACKS));

    // Also create array of rows so that can control their visibility when scrolling
    this.rows = new Array(this.ROWS);

    // And create 2D array of the patterns
    this.patterns = Array.from(Array(this.ROWS), () => new Array(this.TRACKS));
    
    // Get the table for the sequences (not the full sequencer)
    const seqTbl = $('#sequencesTable')[0];

    // For each row add a row of cells
    for (let row=0; row<this.ROWS; ++row) {
      // Create row
      let rowElement = seqTbl.insertRow();
      this.rows[row] = rowElement;
      rowElement.id = 'sequenceRow' + row;
  
      // Only first VISIBLE_ROWS rows should be visible
      if (row >= this.VISIBLE_ROWS)
        rowElement.style.display = 'none';
  
      let shouldHighlight = (row % sequencerObject.highlightNthRow) == 0;
      
      // Create sequence number cell, which is the rowHeader
      let td = rowElement.insertCell();
      td.innerHTML = (row<10 ? '0' : '') + row;
      td.classList.add('rowHeader', 'sequenceNumber'); 
      if (shouldHighlight)
        td.classList.add('rowToHighlight');
      
      // Create sequence cell for each track
      for (let track=1; track<=8; ++track) {
        let td = rowElement.insertCell();
        td.innerHTML = '--';
        td.id = 'sequenceCell_' + row + '_' + track;
        td.classList.add('sequenceCell');
        if (shouldHighlight)
          td.classList.add('rowToHighlight');

        this.cells[row][track-1] = td;
      }
    }

    // Display the current cell as being selected
    this.moveCursor(this.cursorRow, this.cursorTrack);

    // Make sure everything to do with scrolling is set
    this.displayScrollingHints(this.rowNumOfFirstVisibleRow);

    // Handle visibility of special elements in the right side panel
    this.elementChangedSoUpdateVisibility();
  },

    
  /* After cursor is moved then need to possibly scroll the screen */
  scrollScreenIfNeeded: function(newRow) {
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

  /* Updates visibility of special project params in the right sidebar */
  elementChangedSoUpdateVisibility: function() {
    // Note: changing 'visibility' instead of 'display' so that elements don't 
    // take different size and cause and cause other elements to jump around.

    // Update visibility of the transpose/pitch row. Only show it if transpose is != 0
    if (_project.transpose == 0) {
      $('#transposeRow').css('visibility', 'hidden');
    } else {
      $('#transposeRow').css('visibility', 'visible');
    }
    
    // Update visibility of the editable row. Only show it if editable is false
    if (_project.editing) {
      $('#editingRow').css('visibility', 'hidden');
    } else {
      $('#editingRow').css('visibility', 'visible');
    }
  },


  /* updates the help info to display info for the selected pattern */
  displayHelpInfoForCell: function() {
    // The track info
    var str = 'T' + (this.cursorTrack+1) + '-' + getTrackType(this.cursorTrack);

    // Add pattern info to the string
    const pattern = this.patterns[this.cursorRow][this.cursorTrack];
    if (pattern) {
      // Use track and pattern info
      str += ' P' + zeroPad(pattern.id) + '-'+ pattern.getName();
    } else {
      // No pattern currently so just use track info
      str += ' no pattern';
    }

    // Actually display the string as the help info
    this.helpStr(str);
  },
  
  /* Displays the specified cell as being selected. First changes the old cell so that is not selected. */
  moveCursor: function(newRow, newTrack) {
    // Determine the HTML element of cell that was selected. Then remove 'selected' class from it
    let oldTd = this.cells[this.cursorRow][this.cursorTrack];
    oldTd.classList.remove('selected');

    // Make sure not exceeding limits
    if (newRow < 0) newRow = 0;
    if (newRow >= this.ROWS) newRow = this.ROWS - 1;
    if (newTrack < 0) newTrack = 0;
    if (newTrack >= this.TRACKS) newTrack = this.TRACKS - 1;
    
    // Determine the new element to be selected and add 'selected' class to it
    let newTd = this.cells[newRow][newTrack];
    newTd.classList.add('selected');

    // Handle scrolling
    if (newRow != this.cursorRow)
      this.scrollScreenIfNeeded(newRow);

    // Store new cursor location
    this.cursorRow = newRow;
    this.cursorTrack =  newTrack;

    // Handling marking mode
    this.updateCellsIfMarking(newRow, newTrack);

    this.displayHelpInfoForCell(newRow, newTrack);
  },

  /* For marking cells */
  marking: false,
  markingInitialRow: null,
  markingInitialTrack: null,
  markingFinalRow: null,
  markingFinalTrack: null,

  /* Unmarks all the cells that are currently marked */
  unmarkCells: function() {
    const lowestRow = Math.min(this.markingInitialRow, this.markingFinalRow);
    const highestRow = Math.max(this.markingInitialRow, this.markingFinalRow);
    const lowestTrack = Math.min(this.markingInitialTrack, this.markingFinalTrack);
    const highestTrack = Math.max(this.markingInitialTrack, this.markingFinalTrack);
  
    for (let row=lowestRow; row <= highestRow; ++row) {
      for (let track=lowestTrack; track <= highestTrack; ++track) {
        const cell = this.cells[row][track];
        cell.classList.remove('selected');
      }
    }    
  },
    
  /* Called when user clicks on the mark button. It toggles the marking mode state */
  markClicked: function() {
    const sequencerScreen = $('#sequencerScreen')[0];
    
    if (!this.marking) {
      // Wasn't marking but now is. Display border in marking color
      sequencerScreen.classList.add('markingBorderColor');

      // Remember that now marking
      this.markingInitialRow = this.cursorRow;
      this.markingInitialTrack = this.cursorTrack;
      this.marking = true;
    } else {
      // Was marking but now isn't. Display border in regular color
      sequencerScreen.classList.remove('markingBorderColor');

      // Unmark all the cells that were selected
      this.unmarkCells();
      
      // Remember not marking anymore
      this.marking = false;

      // But mark the currently selected cell
      this.moveCursor(this.cursorRow, this.cursorTrack);

      // Update the help info to indicate that successfully marked. But only do so 
      // temporarily while the info is still relevant.
      this.helpStr('Marked cells copied');
      setTimeout(() => {this.helpStr('')}, helpTempDisplayMsec);
    }
  },

  /* Displays specified string in the help element */
  helpStr: function(str) {
      // If blank string used that can cause the html element to resize. Therefore use
      // '&nbsp;' for that situation
      const strToUse = (str == null || str === '') ? '&nbsp;' : str;
    
      $('#sequencerHelp').html(strToUse); 
  },
    
  /* To be called when cursor moved. Redraws the cells to indicate which are now marked. */
  updateCellsIfMarking: function(newRow, newTrack) {
    // If not in marking state then don't do anything
    if (!this.marking) 
      return;

    // Unmark all the cells that were previously marked. This is important
    // since user might be reducing area being marked, which is complicated.
    this.unmarkCells();
    
    // Mark all the cells that have been selected
    const lowestRow = Math.min(this.markingInitialRow, newRow);
    const highestRow = Math.max(this.markingInitialRow, newRow);
    const lowestTrack = Math.min(this.markingInitialTrack, newTrack);
    const highestTrack = Math.max(this.markingInitialTrack, newTrack);
    
    for (let row=lowestRow; row <= highestRow; ++row) {
      for (let track=lowestTrack; track <= highestTrack; ++track) {
        const cell = this.cells[row][track];
        cell.classList.add('selected');
      }
    }

    // Update help info
    this.updateHelpInfoWithCellsMarked(newRow, newTrack);
    
    // Remember extent of marking
    this.markingFinalRow = newRow;
    this.markingFinalTrack = newTrack;
  },

  /* Displays in the help window which rows and tracks are currently selected */
  updateHelpInfoWithCellsMarked: function(newRow, newTrack) {
    // So can display rows and tracks as increasing values
    const r1 = Math.min(this.markingInitialRow, newRow);
    const r2 = Math.max(this.markingInitialRow, newRow);
    const t1 = Math.min(this.markingInitialTrack, newTrack);
    const t2 = Math.max(this.markingInitialTrack, newTrack);

    // Determine the string to display
    let str = 'Mark Row:';

    if (r1 === r2) {
      if (r2 < 10)
        str += '0';
      str += r2;
    } else {
      if (r1 < 10)
        str += '0';
      str += r1;
      str += '-';
      
      if (r2 < 10)
        str += '0';
      str += r2;
    }
    
    str += ' Trk:';
    if (t1 === t2)
      str += t2 + 1;
    else
      str += (t1+1) + '-' + (t2+1);

    // Set the help element with the created string
    this.helpStr(str);
  },

  /* Set the specified pattern for the currently selected cell */
  setPattern: function(pattern) {
    // Sets the pattern
    this.patterns[this.cursorRow][this.cursorTrack] = pattern;

    // Updates the screen to show the new pattern
    const cell = this.cells[this.cursorRow][this.cursorTrack];
    cell.innerHTML = zeroPad(pattern.id);
  },

  /* Increments and returns the next available pattern ID to use */
  getNextPatternId: function() {
    return ++this.maxPatternId;
  },
    
  /* For when OK button hit. If cell empty then creates a pattern. If pattern exists
     then will go to pattern window for that pattern if shift not down. If shift down
     then clones that pattern. */
  createOrClonePattern: function(shift) {
    const existingPattern = this.patterns[this.cursorRow][this.cursorTrack];
    if (!existingPattern) {
      // No existing pattern so create one
      const newPattern = new Pattern(this.getNextPatternId(), null, getTrackType(this.cursorTrack));
      this.setPattern(newPattern);

      // Temporarily display info indicating that new pattern created
      this.helpStr('New pattern ' + zeroPad(newPattern.id) + ' created');
    } else {
      // A pattern already exists
      if (!shift) {
        // Shift button is not set so display the Pattern Screen for the corresponding pattern
        displayPatternScreen(existingPattern);
      } else {
        // Shift button was set so clone the pattern
        let clonedPattern = existingPattern.clone(this.getNextPatternId());
        this.setPattern(clonedPattern);

        // Display info indicating that pattern cloned
        this.helpStr('Pattern ' + zeroPad(existingPattern.id) + ' cloned as ' + zeroPad(clonedPattern.id));
      }
    }
  },

  /* Displays the context menu for the Sequencer Screen */
  displayContextMenu: function() {
    makeScreenVisible("sequencerScreenContextMenu");
  },
    
  /* All the low-level button handlers */
  leftArrowClicked: function(shift) {
    const increment = shift ? 8 : 1;
    this.moveCursor(this.cursorRow, this.cursorTrack - increment);
  },

  rightArrowClicked: function(shift) {
    const increment = shift ? 8 : 1;
    this.moveCursor(this.cursorRow, this.cursorTrack + increment);
  },

  upArrowClicked: function(shift) {
    const increment = shift ? 8 : 1;
    this.moveCursor(this.cursorRow - increment, this.cursorTrack);
  },

  downArrowClicked: function(shift) {
    const increment = shift ? 8 : 1;
    this.moveCursor(this.cursorRow + increment, this.cursorTrack);
  },

  upClicked: function(shift) {
    alert('sequencerScreen up clicked shift=' + shift);
  },

  downClicked: function(shift) {
    alert('sequencerScreen down clicked shift=' + shift);
  },

  okClicked: function(shift) {
    this.createOrClonePattern(shift);
  },


}
