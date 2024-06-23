/* Data that defines a project */

let _project = {
    /* Initializes all the elements in the UI that display project data */
    updateUI: function() {
        this.setName();
        this.setTempo();
        this.setSwing();
        this.incrementMainClock();
        this.setLiveCuePoints();
        this.incrementClockIn();
        this.incrementClockOut();
        this.setTranspose();
        this.incrementScale();
        this.setEditing();
    },
        
    name: null,
    getName: function() { return this.name; },
    getNameStr: function() { return this.name ? this.name : 'unnamed'; },
    // Sets name of project and updates UI
    setName: function(name) { 
        if (name)
            this.name = name; 

        // Update UI. Using className since there could be several elements that need to be updated
        $('.projectName').html(this.getNameStr());
    },
    
    tempo: 128, // default
    getTempo: function() { return this.tempo; },
    // Sets the tempo and updates the UI
    setTempo: function(tempo) { 
        // if not initializing
        if (tempo) {
            // Limit the value and store it
            tempo = Math.min(Math.max(tempo, 1), 1000);
            this.tempo = tempo; 
        }

        // Update UI. Using className since there could be several elements that need to be updated
        $('.tempo').html(this.getTempo());
    },

    swing: 0, // default
    getSwing: function() { return this.swing; },
    setSwing: function(swing) { 
        // if not initializing
        if (typeof swing === "number") {
            // Limit the value and store it
            swing = Math.min(Math.max(swing, -63), +63);
            this.swing = swing; 
        }

        // Update UI. Using className since there could be several elements that need to be updated
        $('.swing').html((this.getSwing() > 0 ? '+' : '') + this.getSwing());
    },
    
    mainClock: 64, // default
    mainClockValues: [1, 2, 4, 8, 16, 32, 64],
    getMainClockIndex: function() { return this.mainClockValues.indexOf(this.mainClock); },
    getMainClock: function() { return this.mainClock; },
    incrementMainClock: function(increment) {
        // if not initializing
        if (typeof increment === "number") {
            // Limit the value and store it
            let mainClockIndex = this.getMainClockIndex() + increment;
            mainClockIndex = Math.min(Math.max(mainClockIndex, 0), this.mainClockValues.length-1);
            this.mainClock = this.mainClockValues[mainClockIndex];
        }
        
        // Update UI. Using className since there could be several elements that need to be updated
        $('.mainClock').html(this.getMainClock());
    },

    liveCuePoints: 16, // default
    getLiveCuePoints: function() { return this.liveCuePoints; },
    setLiveCuePoints: function(liveCuePoints) { 
        // if not initializing
        if (typeof liveCuePoints === "number") {
            // Limit the value and store it
            liveCuePoints = Math.min(Math.max(liveCuePoints, 1), 64);
            this.liveCuePoints = liveCuePoints; 
        }

        // Update UI. Using className since there could be several elements that need to be updated
        $('.liveCuePoints').html(this.getLiveCuePoints());
    },
    
    clockIn: 'Internal', //default
    clockInValues: ['Internal', 'Mod Clock24', 'Mod Clock', 'Midi TRS-A', 
                    'Din-Sync', 'Midi USB-Device', 'Midi USB-Host'],
    getClockInIndex: function() { return this.clockInValues.indexOf(this.clockIn); },
    getClockIn: function() { return this.clockIn; },
    incrementClockIn: function(increment) { 
        // if not initializing
        if (typeof increment === "number") {
            // Limit the value and store it
            let clockInIndex = this.getClockInIndex() + increment;
            clockInIndex = Math.min(Math.max(clockInIndex, 0), this.clockInValues.length-1);
            this.clockIn = this.clockInValues[clockInIndex];
        }
        
        // Update UI. Using className since there could be several elements that need to be updated
        $('.clockIn').html(this.getClockIn());
    },

    clockOut: 'Mod 1/16', //default
    clockOutValues: ['Mod 1/16', 'Din-Sync24', 'Doubled'],
    getClockOutIndex: function() { return this.clockOutValues.indexOf(this.clockOut); },
    getClockOut: function() { return this.clockOut; },
    incrementClockOut: function(increment) { 
        // if not initializing
        if (typeof increment === "number") {
            // Limit the value and store it
            let clockOutIndex = this.getClockOutIndex() + increment;
            clockOutIndex = Math.min(Math.max(clockOutIndex, 0), this.clockOutValues.length-1);
            this.clockOut = this.clockOutValues[clockOutIndex];
        }
        
        // Update UI. Using className since there could be several elements that need to be updated
        $('.clockOut').html(this.getClockOut());
    },

    transpose: 0,
    getTranspose: function() { return this.transpose; },
    setTranspose: function(transpose) { 
        // if not initializing
        if (typeof transpose === "number") {
            // Limit the value and store it
            transpose = Math.min(Math.max(transpose, -128), +127);
            this.transpose = transpose; 
        }

        // Update UI. Using className since there could be several elements that need to be updated
        $('.transpose').html((this.getTranspose() > 0 ? '+' : '') + this.getTranspose());
    },

    scale: '00:Chromatic', 
    scaleValues: ['00:Chromatic', '01:6 Tone Sym', '02:Altered', '03:Aug Heptat',
                 '04:Augmented', '05:Balanese', '06:Bebop', '07:Bebop Locr',
                 '08:Bebop Majo', '09:Bebop Mino', '10:Composite', '11:Diminshed',
                 '12:Dorian', '13:Dorian B2', '14:Doub Harm', '15:Egyption',
                 '16:Ebigmatic', '17:Flamenco', '18:Flat six P', '19:Flat Three',
                 '20:Half-Whole', '21:Harmonic M', '22:Harmonic M', '23:Hirajoshi',
                 '24:Hungarian', '25:Hungarian', '26:Ichikosuch', '27:In-Sen',
                 '28:Ionian Pen', '29:Iwato', '30:Kafi Raga', '31:Kumoijoshi',
                 '32:Lead Whole', '33:Locrian', '34:Locrian 2', '35:Locrian 6',
                 '36:Locrian Ma', '37:Locrian Pe', '38:Lydian', '39:Lydian 7 P',
                 '40:Lydian 9', '41:Lydian Dbl', '42:Lydian Dim', '43:Lydian Dom',
                 '44:Lydian Dom', '45:Lydian Min', '46:Lydian Pen', '47:Major', 
                 '48:Major Blue', '49:Malkos Rag', '50:Melodic Mi', '51:Messiaems',
                 '52:Messiaems', '53:Messiaems', '54:Messiaems', '55:Messiaems', 
                 '56:Min Hexato', '57:Minor', '58:Minor 11 P', '59:Minor Bebo',
                 '60:Minor Blue', '61:Minor Pent', '62:Minor Six', '63:Minor Six', 
                 '64:Mixolydian', '65:Mixolydian', '66:Mixolydian', '67:Mystery 1',
                 '68:Neopolitan', '69:Neopolitan', '70:Oriental', '71:Pelog',
                 '72:Pentatonic', '73:Persion', '74:Phrygian', '75:Phrygian M', 
                 '76:Piongio', '77:Prometheus', '78:Prometheus', '79:Purvi Raga',
                 '80:Ritusen', '81:Romanian M', '82:Scriabin', '83:Slocrian P',
                 '84:Sp Heptato', '85:Todi Raga', '86:UltraLocri', '87:Vietnamese',
                 '88:Whole Tone'],
    getScaleIndex: function() {return this.scaleValues.indexOf(this.scale); },
    getScale: function() { return this.scale; },
    incrementScale: function(increment) { 
        // if not initializing
        if (typeof increment === "number") {
            // Limit the value and store it
            let scaleIndex = this.getScaleIndex() + increment;
            scaleIndex = Math.min(Math.max(scaleIndex, 0), this.scaleValues.length-1);
            this.scale = this.scaleValues[scaleIndex];
        }
        
        // Update UI. Using className since there could be several elements that need to be updated
        $('.scale').html(this.getScale());
    },

    editing: true,
    getEditing: function() { return this.editing; },
    getEditingStr: function() { return this.editing ? 'On' : 'Off'; },
    setEditing: function(editing) { 
        // if not initializing
        if (typeof editing === "boolean") {
            // Store it
            this.editing = editing; 
        }
    
        // Update UI. Using className since there could be several elements that need to be updated
        $('.editElement').html(this.getEditingStr());
    },
};