/* For the Sequencer screen. Javascript is used to create main part of the 
   window since the rows are so repetitive. */

function sequencer(shiftKey) {
    currentScreen = sequencerObject;
    makeScreenVisible("sequencerTable");
}

let sequencerObject = {
  STEPS: 255,
  VISIBLE_STEPS: 16,
  
  // When to use hightlight background color
  highlightNthLine: 4,

  // Defines which cell cursor is on. Uses base zero.
  cursorStep: 0,
  cursorTrack: 0,

  // For handling scrolling
  stepOfFirstRow: 0,
  
  // Keeps track of each cells html element 
  MAX_TRACKS: 8,
  MAX_STEPS: 64,
  
  // Note that the constants are not yet set when cells is created. So need to create
  // the array in a constructor method. The null is just a placeholder.
  cells: null,

  rows: null,
  

  // Fill in the sequences table
  createSequences: function() {
    // Initialize cells in this method so that constants are available
    this.cells = Array.from(Array(this.MAX_STEPS), () => new Array(this.MAX_TRACKS));

    // Also create array of rows so that can control their visibility when scrolling
    this.rows = new Array(this.MAX_STEPS);
    
    // Get the table for the sequences (not the full sequencer)
    const seqTbl = $('#sequencesTable')[0];

    // For each step add a row of cells
    for (let step=0; step<this.MAX_STEPS; ++step) {
      // Create row
      let row = seqTbl.insertRow();
      this.rows[step] = row;
      row.id = 'sequenceRow' + step;
  
      // Only first VISIBLE_STEPS rows/steps should be visible
      if (step >= this.VISIBLE_STEPS)
        row.style.display = 'none';
  
      let shouldHighlight = (step % sequencerObject.highlightNthLine) == 0;
      
      // Create sequence number cell, which is the rowHeader
      let td = row.insertCell();
      td.innerHTML = (step<10 ? '0' : '') + step;
      td.classList.add('rowHeader', 'sequenceNumber'); 
      if (shouldHighlight)
        td.classList.add('rowToHighlight');
      
      // Create sequence cell for each track
      for (let track=1; track<=8; ++track) {
        let td = row.insertCell();
        td.innerHTML = '--';
        td.id = 'sequenceCell_' + step + '_' + track;
        td.classList.add('sequenceCell');
        if (shouldHighlight)
          td.classList.add('rowToHighlight');

        this.cells[step][track-1] = td; 
      }
    }

    // Display the current cell as being selected
    this.moveCursor(this.cursorStep, this.cursorTrack);
  },

  /* After cursor is moved then need to possibly scroll the screen */
  scrollScreenIfNeeded: function(newStep) {
    // If need to scroll down
    if (newStep >= this.stepOfFirstRow + this.VISIBLE_STEPS) {
      // Scroll down. First determine how many steps to scroll
      let newStepOfFirstRow = newStep - this.VISIBLE_STEPS + 1;

      // Hide the top rows that were visible but no longer should be
      for (var step = this.stepOfFirstRow; step < newStepOfFirstRow; ++step) {
        console.log('hiding step ' + step);
        // Hide that row
        let rowToHide = this.rows[step];
        rowToHide.style.display = 'none';
      }

      // Make visible the bottom rows that were not visible but now should be
      for (var step = this.stepOfFirstRow + this.VISIBLE_STEPS; step <= newStep; ++step) {
        console.log('making visible step ' + step);
        // Make that row visible
        let rowToHide = this.rows[step];
        rowToHide.style.display = 'table-row';  
      }

      // Remember where scrolled to
      this.stepOfFirstRow = newStepOfFirstRow;  
    } else if (newStep < this.stepOfFirstRow) {
      // scroll up
      let newStepOfFirstRow = newStep;

      // Hide the bottom rows
      for (var step = newStep + this.VISIBLE_STEPS; step < this.stepOfFirstRow + this.VISIBLE_STEPS; ++step) {
        console.log('hiding step ' + step);
        // Hide that row
        let rowToHide = this.rows[step];
        rowToHide.style.display = 'none';
      }

      // Make visible the top rows
      for (var step = newStep; step < this.stepOfFirstRow; ++step) {
        console.log('making visible step ' + step);
        // Make that row visible
        let rowToHide = this.rows[step];
        rowToHide.style.display = 'table-row';  
      }

      // Remember where scrolled to
      this.stepOfFirstRow = newStepOfFirstRow;  
    }
  },
    
  /* Displays the specified cell as being selected. First changes the old cell so that is not selected. */
  moveCursor: function(newStep, newTrack) {
    // Determine the HTML element of cell that was selected. Then remove 'selected' class from it
    let oldTd = this.cells[this.cursorStep][this.cursorTrack];
    oldTd.classList.remove('selected');

    // Make sure not exceeding limits
    if (newStep < 0) newStep = 0;
    if (newStep >= this.MAX_STEPS) newStep = this.MAX_STEPS - 1;
    if (newTrack < 0) newTrack = 0;
    if (newTrack >= this.MAX_TRACKS) newTrack = this.MAX_TRACKS - 1;
    
    // Determine the new element to be selected and add 'selected' class to it
    let newTd = this.cells[newStep][newTrack];
    newTd.classList.add('selected');

    // Handle scrolling
    if (newStep != this.cursorStep)
      this.scrollScreenIfNeeded(newStep);

    // Store new cursor location
    this.cursorStep = newStep;
    this.cursorTrack =  newTrack;
  },

  leftArrowClicked: function(shift) {
    this.moveCursor(this.cursorStep, this.cursorTrack - 1);
  },

  rightArrowClicked: function(shift) {
    this.moveCursor(this.cursorStep, this.cursorTrack + 1);
  },

  upArrowClicked: function(shift) {
    this.moveCursor(this.cursorStep - 1, this.cursorTrack);
  },

  downArrowClicked: function(shift) {
    this.moveCursor(this.cursorStep + 1, this.cursorTrack);
  },

  upClicked: function(shift) {
    alert('sequencerScreen up clicked shift=' + shift);
  },

  downClicked: function(shift) {
    alert('sequencerScreen down clicked shift=' + shift);
  },

  okClicked: function(shift) {
    alert('sequencerScreen ok clicked shift=' + shift);
  },}