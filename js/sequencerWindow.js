/* For the Sequencer window. Javascript is used to create main part of the 
   window since the rows are so repetitive. */

let sequencerObject = {
  STEPS: 255,
  VISIBLE_STEPS: 16,
  
  // When to use hightlight background color
  highlightNthLine: 4,

  // Defines which cell cursor is on
  cursorTracks: 0,
  cursorSteps: 0,

  // Keeps track of each cells html element 
  MAX_TRACKS: 8,
  MAX_STEPS: 64,
  
  // Note that the constants are not yet set when cells is created. So need to create
  // the array in a constructor method. The null is just a placeholder.
  cells: null,
  

  // Fill in the sequences table
  createSequences: function() {
    // Initialize cells in this method so that constants are available
    this.cells = Array.from(Array(this.MAX_STEPS), () => new Array(this.MAX_TRACKS));
    
    // Get the table for the sequences (not the full sequencer)
    const seqTbl = $('#sequencesTable')[0];

    // For each step add a row of cells
    for (let step=0; step<this.MAX_STEPS; ++step) {
      // Create row
      let row = seqTbl.insertRow();
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
    this.moveCursor(this.cursorSteps, this.cursorTracks);
  },

  /* Displays the specified cell as being selected. First changes the old cell so that is not selected. */
  moveCursor: function(newStep, newTrack) {
    // Determine the HTML element of cell that was selected. Then remove 'selected' class from it
    let oldTd = this.cells[this.cursorSteps][this.cursorTracks];
    oldTd.classList.remove('selected');

    // Determine the new element to be selected and add 'selected' class to it
    let newTd = this.cells[newStep][newTrack];
    newTd.classList.add('selected');
  }
}