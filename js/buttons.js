/* For the physical buttons on the NerdSeq */

/* Rectangular buttons */
function sequencer(shiftKey) {
    makeTableVisible("sequencerTable");
}

function pattern(shiftKey) {
    makeTableVisible("patternTable");
}

function patch(shiftKey) {
    alert('PATCH clicked. shiftKey=' + shiftKey);
}

function table(shiftKey) {
    alert('TABLE clicked. shiftKey=' + shiftKey);
}

function automate(shiftKey) {
    alert('AUTOMATe clicked. shiftKey=' + shiftKey);
}

function project(shiftKey) {
    alert('PROJECT clicked. shiftKey=' + shiftKey);
}

/* lower left square buttons */
function start(shiftKey) {
    alert('START clicked. shiftKey=' + shiftKey);
}

function stop(shiftKey) {
    alert('STOP clicked. shiftKey=' + shiftKey);
}

function up(shiftKey) {
    alert('UP clicked. shiftKey=' + shiftKey);
}

function ok(shiftKey) {
    alert('OK clicked. shiftKey=' + shiftKey);
}

function down(shiftKey) {
    alert('DOWN clicked. shiftKey=' + shiftKey);
}


/* Array buttons */
function upArrow(shiftKey) {
    alert('UP ARROW clicked. shiftKey=' + shiftKey);
}

function downArrow(shiftKey) {
    alert('DOWN ARROW clicked. shiftKey=' + shiftKey);
}

function leftArrow(shiftKey) {
    alert('LEFT ARROW clicked. shiftKey=' + shiftKey);
}

function rightArrow(shiftKey) {
    alert('RIGHT ARROW clicked. shiftKey=' + shiftKey);
}

/* The low-level button click calls. They simply process shift key
   and then call the above higher level functions. */
function shiftKey(ev) {     
  // Since considering contextmenu use same as using the shift
  // key need to make sure that the context menu is not displayed.
  // Using contextmenu events is nice because then can do shiftKey
  // event on a tablet.
  ev.preventDefault(); 

  return ev.shiftKey || ev.type === 'contextmenu';
}

function sequencerClicked(ev) {
  sequencer(shiftKey(ev));
}

function patternClicked(ev) {
  pattern(shiftKey(ev));
}

function patchClicked(ev) {
  patch(shiftKey(ev));
}

function tableClicked(ev) {
  table(shiftKey(ev));
}

function automateClicked(ev) {
  automate(shiftKey(ev));
}

function projectClicked(ev) {
  project(shiftKey(ev));
}

function startClicked(ev) {
  start(shiftKey(ev));
}

function stopClicked(ev) {
  stop(shiftKey(ev));
}

function upClicked(ev) {
  up(shiftKey(ev));
}

function okClicked(ev) {
  ok(shiftKey(ev));
}

function downClicked(ev) {
  down(shiftKey(ev));
}

function upArrowClicked(ev) {
  upArrow(shiftKey(ev));
}

function downArrowClicked(ev) {
  downArrow(shiftKey(ev));
}

function leftArrowClicked(ev) {
  leftArrow(shiftKey(ev));
}

function rightArrowClicked(ev) {
  rightArrow(shiftKey(ev));
}
