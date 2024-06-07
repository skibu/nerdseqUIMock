/* For the physical buttons on the NerdSeq */

/* Rectangular buttons */
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

/* Lower left square buttons */
function start(shiftKey) {
    alert('START clicked. shiftKey=' + shiftKey);
}

function stop(shiftKey) {
    alert('STOP clicked. shiftKey=' + shiftKey);
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
  if (!shiftKey(ev))
    displaySequencerScreen();
  else
    currentScreen.markClicked();
}

function patternClicked(ev) {
  displayPatternScreen();
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
  const shiftKeyState = shiftKey(ev);
  currentScreen.upClicked(shiftKeyState);
}

function okClicked(ev) {
  const shiftKeyState = shiftKey(ev);
  currentScreen.okClicked(shiftKeyState);
}

function downClicked(ev) {
  const shiftKeyState = shiftKey(ev);
  currentScreen.downArrowClicked(shiftKeyState);
}

function upArrowClicked(ev) {
  const shiftKeyState = shiftKey(ev);
  currentScreen.upArrowClicked(shiftKeyState);
}

function downArrowClicked(ev) {
  const shiftKeyState = shiftKey(ev);
  currentScreen.downArrowClicked(shiftKeyState);
}

function leftArrowClicked(ev) {
  const shiftKeyState = shiftKey(ev);
  currentScreen.leftArrowClicked(shiftKeyState);
}

function rightArrowClicked(ev) {
  const shiftKeyState = shiftKey(ev);
  currentScreen.rightArrowClicked(shiftKeyState);
}