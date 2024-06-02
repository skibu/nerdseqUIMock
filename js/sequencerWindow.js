/* For the Sequencer window. Javascript is used to create main part of the 
   window since the rows are so repetitive. */

// When to use hightlight background color
var hightlightNthLine = 4;

function createSequences() {
  // Fill in the sequences table
  const seqTbl = $('#sequencesTable')[0];
  for (let i=0; i<20; ++i) {
    // Create row
    let row = seqTbl.insertRow();
    row.id = 'sequenceRow' + i;

    // Only first 16 rows should be visible
    if (i>=16)
      row.style.display = 'none';

    let shouldHighlight = (i % hightlightNthLine) == 1;
    
    // Create sequence number cell, which is the rowHeader
    let td = row.insertCell();
    td.innerHTML = (i<10 ? '0' : '') + i;
    td.classList.add('rowHeader', 'sequenceNumber'); 
    if (shouldHighlight)
      td.classList.add('rowToHighlight');
    
    // Create sequence cell for each track
    for (let c=1; c<=8; ++c) {
      let td = row.insertCell();
      td.innerHTML = '--';
      td.id = 'sequenceCell' + c;
      td.classList.add('sequenceCell');
      if (shouldHighlight)
        td.classList.add('rowToHighlight');
    }
  }
}
