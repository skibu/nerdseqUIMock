/* For the physical buttons on the NerdSeq */

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
  if (!shiftKey(ev)) {
    displaySequencerScreen();
  } else {
    if (currentUiObject.markClicked)
      currentUiObject.markClicked();
  }
}

function patternClicked(ev) {
  if (!shiftKey(ev)) {
    displayPatternScreen();
  } else {
    // Handle copy/paste button click
    if (currentUiObject.pasteClicked)
      currentUiObject.pasteClicked();
  }
}

function patchClicked(ev) {
  if (!shiftKey(ev)) {
    displayPatchScreen();
  } else {
    // Handle delete button click
    if (currentUiObject.deleteClicked)
      currentUiObject.deleteClicked();
  }
}

function tableClicked(ev) {
  if (!shiftKey(ev)) {
    displayTableScreen();
  } else {
    // Handle record button click
    if (currentUiObject.recordClicked)
      currentUiObject.recordClicked();
  }
}

/* Handles the Automate/Nerd button press. Displays either the Screen Select
   or the current screen's Conext menu */
function automateClicked(ev) {
  if (!shiftKey(ev))
    displayScreenSelectMenu();  // Automate button
  else
    currentUiObject.displayContextMenu(); // Nerd button
}

/* Handles the Project/Setup button press. */
function projectClicked(ev) {
  if (!shiftKey(ev))
    displayProjectMenu();
  else
    displaySystemMenu();
}

function startClicked(ev) {
  start(shiftKey(ev));
}

function stopClicked(ev) {
  stop(shiftKey(ev));
}

function upClicked(ev) {
  const shiftKeyState = shiftKey(ev);
  currentUiObject.upClicked(shiftKeyState);
}

function okClicked(ev) {
  const shiftKeyState = shiftKey(ev);
  currentUiObject.okClicked(shiftKeyState);
}

function downClicked(ev) {
  const shiftKeyState = shiftKey(ev);
  currentUiObject.downClicked(shiftKeyState);
}

function upArrowClicked(ev) {
  const shiftKeyState = shiftKey(ev);
  currentUiObject.upArrowClicked(shiftKeyState);
}

function downArrowClicked(ev) {
  const shiftKeyState = shiftKey(ev);
  currentUiObject.downArrowClicked(shiftKeyState);
}

function leftArrowClicked(ev) {
  const shiftKeyState = shiftKey(ev);
  currentUiObject.leftArrowClicked(shiftKeyState);
}

function rightArrowClicked(ev) {
  const shiftKeyState = shiftKey(ev);
  currentUiObject.rightArrowClicked(shiftKeyState);
}