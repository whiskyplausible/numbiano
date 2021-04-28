/* 
 *
 * This code has been adapted (2016) from the following project:
 *
 *
 * Qwerty Hancock keyboard library v0.5.1
 * The web keyboard for now people.
 * Copyright 2012-15, Stuart Memo
 *
 * Licensed under the MIT License
 * http://opensource.org/licenses/mit-license.php
 *
 * http://stuartmemo.com/qwerty-hancock
 */

(function () {
    var root = this;
    /* In <script> context, `this` is the window.
     * In node context (browserify), `this` is the node global.
     */
    var globalWindow = typeof global === 'undefined' ? root : root.window;
    var version = '0.5.1',
        settings = {},
        mouse_is_down = false,
        keysDown = {},
        key_map = {
            65: 'Cl',
            87: 'C#l',
            83: 'Dl',
            69: 'D#l',
            68: 'El',
            70: 'Fl',
            84: 'F#l',
            71: 'Gl',
            89: 'G#l',
            90: 'G#l',
            72: 'Al',
            85: 'A#l',
            74: 'Bl',
            75: 'Cu',
            79: 'C#u',
            76: 'Du',
            80: 'D#u',
            59: 'Eu',
            186: 'Eu',
            222: 'Fu',
            221: 'F#u',
            220: 'Gu'
        },
        keyDownCallback,
        keyUpCallback,

        //master_key = window.location.search.substring(1,3),
        key_lookup = { // first two chars = key, second two chars = that note on keyboard, 5th char = octave, 6th char = position on key
            CNCN11: "CircleRed1.png", CNCN12: "Red1.png", CNCN13: "SquareRed1.png", CNCS11: "CircleBlue2.png", CNCS12: "Blue2.png", CNCS13: "SquareBlue2.png", CNDN11: "CircleRed2.png", CNDN12: "Red2.png", CNDN13: "SquareRed2.png", CNDS11: "CircleBlue3.png", CNDS12: "Blue3.png", CNDS13: "SquareBlue3.png", CNEN11: "CircleRed3.png", CNEN12: "Red3.png", CNEN13: "SquareRed3.png", CNFN11: "CircleRed4.png", CNFN12: "Red4.png", CNFN13: "SquareRed4.png", CNFS11: "CircleBlue5.png", CNFS12: "Blue5.png", CNFS13: "SquareBlue5.png", CNGN11: "CircleRed5.png", CNGN12: "Red5.png", CNGN13: "SquareRed5.png", CNGS11: "CircleBlue6.png", CNGS12: "Blue6.png", CNGS13: "SquareBlue6.png", CNAN11: "CircleRed6.png", CNAN12: "Red6.png", CNAN13: "SquareRed6.png", CNAS11: "CircleBlue7.png", CNAS12: "Blue7.png", CNAS13: "SquareBlue7.png", CNBN11: "CircleRed7.png", CNBN12: "Red7.png", CNBN13: "SquareRed7.png", CSCN11: "Red7.png", CSCN12: "SquareRed7.png", CSCN13: "PentagonRed7.png", CSCS11: "CircleRed1.png", CSCS12: "Red1.png", CSCS13: "SquareRed1.png", CSDN11: "CircleBlue2.png", CSDN12: "Blue2.png", CSDN13: "SquareBlue2.png", CSDS11: "CircleRed2.png", CSDS12: "Red2.png", CSDS13: "SquareRed2.png", CSEN11: "CircleBlue3.png", CSEN12: "Blue3.png", CSEN13: "SquareBlue3.png", CSFN11: "CircleRed3.png", CSFN12: "Red3.png", CSFN13: "SquareRed3.png", CSFS11: "CircleRed4.png", CSFS12: "Red4.png", CSFS13: "SquareRed4.png", CSGN11: "CircleBlue5.png", CSGN12: "Blue5.png", CSGN13: "SquareBlue5.png", CSGS11: "CircleRed5.png", CSGS12: "Red5.png", CSGS13: "SquareRed5.png", CSAN11: "CircleBlue6.png", CSAN12: "Blue6.png", CSAN13: "SquareBlue6.png", CSAS11: "CircleRed6.png", CSAS12: "Red6.png", CSAS13: "SquareRed6.png", CSBN11: "CircleBlue7.png", CSBN12: "Blue7.png", CSBN13: "SquareBlue7.png", DNCN11: "Blue7.png", DNCN12: "SquareBlue7.png", DNCN13: "PentagonBlue7.png", DNCS11: "Red7.png", DNCS12: "SquareRed7.png", DNCS13: "PentagonRed7.png", DNDN11: "CircleRed1.png", DNDN12: "Red1.png", DNDN13: "SquareRed1.png", DNDS11: "CircleBlue2.png", DNDS12: "Blue2.png", DNDS13: "SquareBlue2.png", DNEN11: "CircleRed2.png", DNEN12: "Red2.png", DNEN13: "SquareRed2.png", DNFN11: "CircleBlue3.png", DNFN12: "Blue3.png", DNFN13: "SquareBlue3.png", DNFS11: "CircleRed3.png", DNFS12: "Red3.png", DNFS13: "SquareRed3.png", DNGN11: "CircleRed4.png", DNGN12: "Red4.png", DNGN13: "SquareRed4.png", DNGS11: "CircleBlue5.png", DNGS12: "Blue5.png", DNGS13: "SquareBlue5.png", DNAN11: "CircleRed5.png", DNAN12: "Red5.png", DNAN13: "SquareRed5.png", DNAS11: "CircleBlue6.png", DNAS12: "Blue6.png", DNAS13: "SquareBlue6.png", DNBN11: "CircleRed6.png", DNBN12: "Red6.png", DNBN13: "SquareRed6.png", DSCN11: "Red6.png", DSCN12: "SquareRed6.png", DSCN13: "PentagonRed6.png", DSCS11: "Blue7.png", DSCS12: "SquareBlue7.png", DSCS13: "PentagonBlue7.png", DSDN11: "Red7.png", DSDN12: "SquareRed7.png", DSDN13: "PentagonRed7.png", DSDS11: "CircleRed1.png", DSDS12: "Red1.png", DSDS13: "SquareRed1.png", DSEN11: "CircleBlue2.png", DSEN12: "Blue2.png", DSEN13: "SquareBlue2.png", DSFN11: "CircleRed2.png", DSFN12: "Red2.png", DSFN13: "SquareRed2.png", DSFS11: "CircleBlue3.png", DSFS12: "Blue3.png", DSFS13: "SquareBlue3.png", DSGN11: "CircleRed3.png", DSGN12: "Red3.png", DSGN13: "SquareRed3.png", DSGS11: "CircleRed4.png", DSGS12: "Red4.png", DSGS13: "SquareRed4.png", DSAN11: "CircleBlue5.png", DSAN12: "Blue5.png", DSAN13: "SquareBlue5.png", DSAS11: "CircleRed5.png", DSAS12: "Red5.png", DSAS13: "SquareRed5.png", DSBN11: "CircleBlue6.png", DSBN12: "Blue6.png", DSBN13: "SquareBlue6.png", ENCN11: "Blue6.png", ENCN12: "SquareBlue6.png", ENCN13: "PentagonBlue6.png", ENCS11: "Red6.png", ENCS12: "SquareRed6.png", ENCS13: "PentagonRed6.png", ENDN11: "Blue7.png", ENDN12: "SquareBlue7.png", ENDN13: "PentagonBlue7.png", ENDS11: "Red7.png", ENDS12: "SquareRed7.png", ENDS13: "PentagonRed7.png", ENEN11: "CircleRed1.png", ENEN12: "Red1.png", ENEN13: "SquareRed1.png", ENFN11: "CircleBlue2.png", ENFN12: "Blue2.png", ENFN13: "SquareBlue2.png", ENFS11: "CircleRed2.png", ENFS12: "Red2.png", ENFS13: "SquareRed2.png", ENGN11: "CircleBlue3.png", ENGN12: "Blue3.png", ENGN13: "SquareBlue3.png", ENGS11: "CircleRed3.png", ENGS12: "Red3.png", ENGS13: "SquareRed3.png", ENAN11: "CircleRed4.png", ENAN12: "Red4.png", ENAN13: "SquareRed4.png", ENAS11: "CircleBlue5.png", ENAS12: "Blue5.png", ENAS13: "SquareBlue5.png", ENBN11: "CircleRed5.png", ENBN12: "Red5.png", ENBN13: "SquareRed5.png", FNCN11: "Red5.png", FNCN12: "SquareRed5.png", FNCN13: "PentagonRed5.png", FNCS11: "Blue6.png", FNCS12: "SquareBlue6.png", FNCS13: "PentagonBlue6.png", FNDN11: "Red6.png", FNDN12: "SquareRed6.png", FNDN13: "PentagonRed6.png", FNDS11: "Blue7.png", FNDS12: "SquareBlue7.png", FNDS13: "PentagonBlue7.png", FNEN11: "Red7.png", FNEN12: "SquareRed7.png", FNEN13: "PentagonRed7.png", FNFN11: "CircleRed1.png", FNFN12: "Red1.png", FNFN13: "SquareRed1.png", FNFS11: "CircleBlue2.png", FNFS12: "Blue2.png", FNFS13: "SquareBlue2.png", FNGN11: "CircleRed2.png", FNGN12: "Red2.png", FNGN13: "SquareRed2.png", FNGS11: "CircleBlue3.png", FNGS12: "Blue3.png", FNGS13: "SquareBlue3.png", FNAN11: "CircleRed3.png", FNAN12: "Red3.png", FNAN13: "SquareRed3.png", FNAS11: "CircleRed4.png", FNAS12: "Red4.png", FNAS13: "SquareRed4.png", FNBN11: "CircleBlue5.png", FNBN12: "Blue5.png", FNBN13: "SquareBlue5.png", FSCN11: "CircleBlue5.png", FSCN12: "Blue5.png", FSCN13: "SquareBlue5.png", FSCS11: "CircleRed5.png", FSCS12: "Red5.png", FSCS13: "SquareRed5.png", FSDN11: "CircleBlue6.png", FSDN12: "Blue6.png", FSDN13: "SquareBlue6.png", FSDS11: "CircleRed6.png", FSDS12: "Red6.png", FSDS13: "SquareRed6.png", FSEN11: "CircleBlue7.png", FSEN12: "Blue7.png", FSEN13: "SquareBlue7.png", FSFN11: "CircleRed7.png", FSFN12: "Red7.png", FSFN13: "SquareRed7.png", FSFS11: "TriangleRed1.png", FSFS12: "CircleRed1.png", FSFS13: "Red1.png", FSGN11: "TriangleBlue2.png", FSGN12: "CircleBlue2.png", FSGN13: "Blue2.png", FSGS11: "TriangleRed2.png", FSGS12: "CircleRed2.png", FSGS13: "Red2.png", FSAN11: "TriangleBlue3.png", FSAN12: "CircleBlue3.png", FSAN13: "Blue3.png", FSAS11: "TriangleRed3.png", FSAS12: "CircleRed3.png", FSAS13: "Red3.png", FSBN11: "TriangleRed4.png", FSBN12: "CircleRed4.png", FSBN13: "Red4.png", GNCN11: "CircleRed4.png", GNCN12: "Red4.png", GNCN13: "SquareRed4.png", GNCS11: "CircleBlue5.png", GNCS12: "Blue5.png", GNCS13: "SquareBlue5.png", GNDN11: "CircleRed5.png", GNDN12: "Red5.png", GNDN13: "SquareRed5.png", GNDS11: "CircleBlue6.png", GNDS12: "Blue6.png", GNDS13: "SquareBlue6.png", GNEN11: "CircleRed6.png", GNEN12: "Red6.png", GNEN13: "SquareRed6.png", GNFN11: "CircleBlue7.png", GNFN12: "Blue7.png", GNFN13: "SquareBlue7.png", GNFS11: "CircleRed7.png", GNFS12: "Red7.png", GNFS13: "SquareRed7.png", GNGN11: "TriangleRed1.png", GNGN12: "CircleRed1.png", GNGN13: "Red1.png", GNGS11: "TriangleBlue2.png", GNGS12: "CircleBlue2.png", GNGS13: "Blue2.png", GNAN11: "TriangleRed2.png", GNAN12: "CircleRed2.png", GNAN13: "Red2.png", GNAS11: "TriangleBlue3.png", GNAS12: "CircleBlue3.png", GNAS13: "Blue3.png", GNBN11: "TriangleRed3.png", GNBN12: "CircleRed3.png", GNBN13: "Red3.png", GSCN11: "CircleRed3.png", GSCN12: "Red3.png", GSCN13: "SquareRed3.png", GSCS11: "CircleRed4.png", GSCS12: "Red4.png", GSCS13: "SquareRed4.png", GSDN11: "CircleBlue5.png", GSDN12: "Blue5.png", GSDN13: "SquareBlue5.png", GSDS11: "CircleRed5.png", GSDS12: "Red5.png", GSDS13: "SquareRed5.png", GSEN11: "CircleBlue6.png", GSEN12: "Blue6.png", GSEN13: "SquareBlue6.png", GSFN11: "CircleRed6.png", GSFN12: "Red6.png", GSFN13: "SquareRed6.png", GSFS11: "CircleBlue7.png", GSFS12: "Blue7.png", GSFS13: "SquareBlue7.png", GSGN11: "CircleRed7.png", GSGN12: "Red7.png", GSGN13: "SquareRed7.png", GSGS11: "TriangleRed1.png", GSGS12: "CircleRed1.png", GSGS13: "Red1.png", GSAN11: "TriangleBlue2.png", GSAN12: "CircleBlue2.png", GSAN13: "Blue2.png", GSAS11: "TriangleRed2.png", GSAS12: "CircleRed2.png", GSAS13: "Red2.png", GSBN11: "TriangleBlue3.png", GSBN12: "CircleBlue3.png", GSBN13: "Blue3.png", ANCN11: "CircleBlue3.png", ANCN12: "Blue3.png", ANCN13: "SquareBlue3.png", ANCS11: "CircleRed3.png", ANCS12: "Red3.png", ANCS13: "SquareRed3.png", ANDN11: "CircleRed4.png", ANDN12: "Red4.png", ANDN13: "SquareRed4.png", ANDS11: "CircleBlue5.png", ANDS12: "Blue5.png", ANDS13: "SquareBlue5.png", ANEN11: "CircleRed5.png", ANEN12: "Red5.png", ANEN13: "SquareRed5.png", ANFN11: "CircleBlue6.png", ANFN12: "Blue6.png", ANFN13: "SquareBlue6.png", ANFS11: "CircleRed6.png", ANFS12: "Red6.png", ANFS13: "SquareRed6.png", ANGN11: "CircleBlue7.png", ANGN12: "Blue7.png", ANGN13: "SquareBlue7.png", ANGS11: "CircleRed7.png", ANGS12: "Red7.png", ANGS13: "SquareRed7.png", ANAN11: "TriangleRed1.png", ANAN12: "CircleRed1.png", ANAN13: "Red1.png", ANAS11: "TriangleBlue2.png", ANAS12: "CircleBlue2.png", ANAS13: "Blue2.png", ANBN11: "TriangleRed2.png", ANBN12: "CircleRed2.png", ANBN13: "Red2.png", ASCN11: "CircleRed2.png", ASCN12: "Red2.png", ASCN13: "SquareRed2.png", ASCS11: "CircleBlue3.png", ASCS12: "Blue3.png", ASCS13: "SquareBlue3.png", ASDN11: "CircleRed3.png", ASDN12: "Red3.png", ASDN13: "SquareRed3.png", ASDS11: "CircleRed4.png", ASDS12: "Red4.png", ASDS13: "SquareRed4.png", ASEN11: "CircleBlue5.png", ASEN12: "Blue5.png", ASEN13: "SquareBlue5.png", ASFN11: "CircleRed5.png", ASFN12: "Red5.png", ASFN13: "SquareRed5.png", ASFS11: "CircleBlue6.png", ASFS12: "Blue6.png", ASFS13: "SquareBlue6.png", ASGN11: "CircleRed6.png", ASGN12: "Red6.png", ASGN13: "SquareRed6.png", ASGS11: "CircleBlue7.png", ASGS12: "Blue7.png", ASGS13: "SquareBlue7.png", ASAN11: "CircleRed7.png", ASAN12: "Red7.png", ASAN13: "SquareRed7.png", ASAS11: "TriangleRed1.png", ASAS12: "CircleRed1.png", ASAS13: "Red1.png", ASBN11: "TriangleBlue2.png", ASBN12: "CircleBlue2.png", ASBN13: "Blue2.png", BNCN11: "CircleBlue2.png", BNCN12: "Blue2.png", BNCN13: "SquareBlue2.png", BNCS11: "CircleRed2.png", BNCS12: "Red2.png", BNCS13: "SquareRed2.png", BNDN11: "CircleBlue3.png", BNDN12: "Blue3.png", BNDN13: "SquareBlue3.png", BNDS11: "CircleRed3.png", BNDS12: "Red3.png", BNDS13: "SquareRed3.png", BNEN11: "CircleRed4.png", BNEN12: "Red4.png", BNEN13: "SquareRed4.png", BNFN11: "CircleBlue5.png", BNFN12: "Blue5.png", BNFN13: "SquareBlue5.png", BNFS11: "CircleRed5.png", BNFS12: "Red5.png", BNFS13: "SquareRed5.png", BNGN11: "CircleBlue6.png", BNGN12: "Blue6.png", BNGN13: "SquareBlue6.png", BNGS11: "CircleRed6.png", BNGS12: "Red6.png", BNGS13: "SquareRed6.png", BNAN11: "CircleBlue7.png", BNAN12: "Blue7.png", BNAN13: "SquareBlue7.png", BNAS11: "CircleRed7.png", BNAS12: "Red7.png", BNAS13: "SquareRed7.png", BNBN11: "TriangleRed1.png", BNBN12: "CircleRed1.png", BNBN13: "Red1.png"
        }


    /**
     * Calculate width of white key.
     * @return {number} Width of a single white key in pixels.
     */
    var getWhiteKeyWidth = function (number_of_white_keys) {
        return Math.floor((settings.width - number_of_white_keys) / number_of_white_keys);
    };

    let onTouchLeaveEvents = [];
    let onTouchEnterEvents = [];
    const onTouchEnter = function (selector, fn) {
        onTouchEnterEvents.push([selector, fn]);
        return function () {
            onTouchEnterEvents.slice().map(function (e, i) {
                if (e[0] === selector && e[1] === fn) {
                    onTouchEnterEvents.splice(1, i);
                }
            });
        };
    };

    const onTouchLeave = function (selector, fn) {
        onTouchLeaveEvents.push([selector, fn]);
        return function () {
            onTouchLeaveEvents.slice().map(function (e, i) {
                if (e[0] === selector && e[1] === fn) {
                    onTouchLeaveEvents.splice(1, i);
                }
            });
        };
    };

    let lastTouchLeave;
    let lastTouchEnter;
    document.addEventListener('touchmove', function (e) {
        var el = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
        if (!el) return;

        onTouchLeaveEvents.map((event) => {
            if (el != lastTouchEnter && lastTouchEnter && lastTouchEnter.matches(event[0])) {


                if (lastTouchEnter !== lastTouchLeave) {
                    event[1](lastTouchEnter, e);
                    lastTouchLeave = lastTouchEnter;
                    lastTouchEnter = null
                }

            }
        });

        onTouchEnterEvents.map((event) => {
            if (el.matches(event[0]) && el !== lastTouchEnter) {
                lastTouchEnter = el;
                lastTouchLeave = null;
                event[1](el, e);
            }
        });

    });

    onTouchEnter('.area', function (el, e) {
        el.classList.add('hover')
    })
    onTouchLeave('.area', function (el, e) {
        el.classList.remove('hover')
    })

    /**
     * Merge user settings with defaults.
     * @param  {object} user_settings
     */
    var init = function (us) {
        var container;

        user_settings = us || {};

        settings = {
            id: user_settings.id || 'keyboard',
            octaves: user_settings.octaves || 3,
            width: user_settings.width,
            height: user_settings.height,
            startNote: user_settings.startNote || 'A3',
            whiteKeyColour: user_settings.whiteKeyColour || '#fff',
            blackKeyColour: user_settings.blackKeyColour || '#fff',
            activeColour: user_settings.activeColour || 'yellow',
            borderColour: user_settings.borderColour || '#000',
            keyboardLayout: user_settings.keyboardLayout || 'en',
            numberKeys: user_settings.numberKeys || 7,
            key: user_settings.key || 'CN'
        };

        container = document.getElementById(settings.id);

        if (typeof settings.width === 'undefined') {
            settings.width = container.offsetWidth;
        }

        if (typeof settings.height === 'undefined') {
            settings.height = container.offsetHeight;
        }

        settings.startOctave = parseInt(settings.startNote.charAt(1), 10);

        createKeyboard();
        addListeners.call(this, container);
    };

    /**
     * Get frequency of a given note.
     * @param  {string} note Musical note to convert into hertz.
     * @return {number} Frequency of note in hertz.
     */
    var getFrequencyOfNote = function (note) {
        var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
            key_number,
            octave;

        if (note.length === 3) {
            octave = note.charAt(2);
        } else {
            octave = note.charAt(1);
        }

        key_number = notes.indexOf(note.slice(0, -1));


        if (key_number < 3) {

            key_number = key_number + 12 + ((octave - 1) * 12) + 1;

        } else {
            key_number = key_number + ((octave - 1) * 12) + 1;
        }
        key_number = key_number + 5

        return (440 * Math.pow(2, (key_number - 49) / 12)) * 3;
    };

    /**
     * Lighten up man. Change the colour of a key.
     * @param  {element} el DOM element to change colour of.
     */
    var lightenUp = function lightenUp(el) {
        if (el !== null || typeof el === undefined) {
            el.style.backgroundColor = settings.activeColour;
        }
    };

    /**
     * Revert key to original colour.
     * @param  {element} el DOM element to change colour of.
     */
    var darkenDown = function darkenDown(el) {
        if (el !== null) {
            if (el.getAttribute('data-note-type') === 'white') {
                el.style.backgroundColor = settings.whiteKeyColour;
            } else {
                el.style.backgroundColor = settings.blackKeyColour;
            }
        }
    };

    /**
     * Order notes into order defined by starting key in settings.
     * @param {array} notes_to_order Notes to be ordered.
     * @return {array{ ordered_notes Ordered notes.
     */
    var orderNotes = function (notes_to_order) {
        var i,
            keyOffset = 0,
            number_of_notes_to_order = notes_to_order.length,
            ordered_notes = [];

        for (i = 0; i < number_of_notes_to_order; i++) {
            if (settings.startNote.charAt(0) === notes_to_order[i]) {
                keyOffset = i;
                break;
            }
        }

        for (i = 0; i < number_of_notes_to_order; i++) {
            if (i + keyOffset > number_of_notes_to_order - 1) {
                ordered_notes[i] = notes_to_order[i + keyOffset - number_of_notes_to_order];
            } else {
                ordered_notes[i] = notes_to_order[i + keyOffset];
            }
        }

        return ordered_notes;
    };

    /**
     * Add styling to individual white key.
     * @param  {element} el White key DOM element.
     */

    var styleWhiteKey = function (key) {
        key.el.style.backgroundColor = settings.whiteKeyColour;

        key.el.style.height = Math.round(settings.height / 6) + 'px';
        key.el.style.backgroundRepeat = 'no-repeat';
        key.el.style.backgroundPosition = 'center center';
        key.el.style.position = 'absolute';
        key.el.style.left = ((key.width + 1) * (key.xpos - 1)) + 'px';
        key.el.style.width = key.width + 'px';

        key.el.style.backgroundSize = (key.width - 20) + 'px';

        if ((key.width - 20) > Math.round(settings.height / 6)) {
            console.log("less than...")
            key.el.style.backgroundSize = (Math.round(settings.height / 6) - 10) + 'px';
        }

        if (key.ypos == 4) {
            key.el.style.height = (Math.round(settings.height / 2) + 1) + 'px';
            key.el.style.top = '0px';

        }

        if (key.ypos == 1) {

            key.el.style.top = Math.round(settings.height / 2) + 'px';
            key.el.style.backgroundImage = 'url("' + key_lookup[settings.key + key.id.charAt(0) + "N" + (key.octave - 1) + "1"] + '")';

        }

        if (key.ypos == 2) {
            key.el.style.top = Math.round((settings.height / 2) + (settings.height / 6)) - 1 + 'px';
            key.el.style.height = key.el.style.height + 3;
            key.el.style.backgroundImage = 'url("symbol1.png")';
            key.el.style.borderBottom = '0px';
            key.el.style.backgroundImage = 'url("' + key_lookup[settings.key + key.id.charAt(0) + "N" + (key.octave - 1) + "2"] + '")';

        }

        if (key.ypos == 3) {
            key.el.style.top = Math.round((settings.height / 2) + (settings.height / 3)) - 3 + 'px';
            key.el.style.borderRadius = '0 0 5px 5px';
            key.el.style.borderTop = '0px';
            key.el.style.backgroundImage = 'url("' + key_lookup[settings.key + key.id.charAt(0) + "N" + (key.octave - 1) + "3"] + '")';

        }


    };


    /**
     * Add styling to individual black key.
     * @param  {element} el Black key DOM element.
     */

    var styleBlackKey = function (key) {
        console.log("Drawing black key...");
        //key.el.style.backgroundSize = (key.width - 30)+ 'px';
        var white_key_width = getWhiteKeyWidth(getTotalWhiteKeys()),
            black_key_width = white_key_width;
        key.el.style.zIndex = 1000;

        key.el.style.backgroundColor = settings.blackKeyColour;
        key.el.style.border = '1px solid black';
        key.el.style.backgroundRepeat = 'no-repeat';
        key.el.style.backgroundPosition = 'center center';
        key.el.style.position = 'absolute';
        key.el.style.borderTop = '10 px solid white';
        key.el.style.left = Math.floor(((white_key_width + 1) * (key.noteNumber + 1)) - (black_key_width / 2)) + 'px';

        key.el.style.width = black_key_width + 'px';

        key.el.style.height = Math.round(settings.height / 6) + 'px';

        key.el.style.backgroundSize = (key.width - 20) + 'px';

        if ((key.width - 20) > Math.round(settings.height / 6)) {
            console.log("less than...")
            key.el.style.backgroundSize = (Math.round(settings.height / 6) - 10) + 'px';
        }


        if (key.ypos == 1) {

            key.el.style.top = '0px';
            key.el.style.borderTop = '1px solid black';
            key.el.style.borderLeft = '1px solid black';
            key.el.style.borderRight = '1px solid black';
            key.el.style.borderBottom = '0px';

            key.el.style.backgroundImage = 'url("' + key_lookup[settings.key + key.id.charAt(0) + "S" + (key.octave - 1) + "1"] + '")';

        }

        if (key.ypos == 2) {
            key.el.style.borderTop = '0px';
            key.el.style.borderLeft = '1px solid black';
            key.el.style.borderRight = '1px solid black';
            key.el.style.borderBottom = '0px';
            key.el.style.height = key.el.style.height + 1;
            key.el.style.top = Math.round((settings.height / 6)) - 1 + 'px';
            key.el.style.backgroundImage = 'url("symbol1.png")';

            key.el.style.backgroundImage = 'url("' + key_lookup[settings.key + key.id.charAt(0) + "S" + (key.octave - 1) + "2"] + '")';

        }

        if (key.ypos == 3) {
            key.el.style.borderTop = '0px';
            key.el.style.borderLeft = '1px solid black';
            key.el.style.borderRight = '1px solid black';
            key.el.style.borderBottom = '1px solid black';

            key.el.style.top = Math.round((settings.height / 3)) - 3 + 'px';


            key.el.style.backgroundImage = 'url("' + key_lookup[settings.key + key.id.charAt(0) + "S" + (key.octave - 1) + "3"] + '")';
            key.el.style.borderRadius = '0 0 3px 3px';
        }

    };

    /**
    * Add styling to individual key on keyboard.
    * @param  {object} key Element of key.
    */
    var styleKey = function (key) {
        key.el.style.display = 'inline-block';
        key.el.style['-webkit-user-select'] = 'none';

        if (key.colour === 'white') {
            styleWhiteKey(key);
        } else {
            styleBlackKey(key);
        }
    };

    /**
    * Reset styles on keyboard container and list element.
    * @param {element} keyboard Keyboard container DOM element.
    */
    var styleKeyboard = function (keyboard) {
        var styleElement = function (el) {
            el.style.cursor = 'default';
            el.style.fontSize = '0px';
            el.style.height = settings.height + 'px';
            el.style.padding = 0;
            el.style.position = 'absolute';
            el.style.listStyle = 'none';
            el.style.margin = 0;
            el.style.width = settings.width + 'px';
            el.style['-webkit-user-select'] = 'none';
        };

        styleElement(keyboard.container);
        styleElement(keyboard.el);
    };

    /**
    * Call user's mouseDown event.
    */
    var mouseDown = function (element, callback) {
        if (element.tagName.toLowerCase() == 'li') {
            if (element.title.length > 1) {
                console.log("mouse down")
                mouse_is_down = true;
                lightenUp(element);
                callback(element.title, getFrequencyOfNote(element.title));
            }
        }
    };

    /**
    * Call user's mouseUp event.
    */
    var mouseUp = function (element, callback) {
        if (element.tagName.toLowerCase() == 'li') {
            mouse_is_down = false;
            console.log("mouse up asdf")
            console.log('ontouchstart' in document.documentElement)
            console.log("hello")

            if (element.title.length > 1) {

                darkenDown(element);
                callback(element.title, getFrequencyOfNote(element.title));
            }
        }
    };

    /**
    * Call user's mouseDown if required.
    */
    var mouseOver = function (element, callback) {
        if (mouse_is_down) {
            if (element.title.length > 1) {
                lightenUp(element);
                callback(element.title, getFrequencyOfNote(element.title));
            }
        }
    };

    /**
    * Call user's mouseUp if required.
    */
    var mouseOut = function (element, callback) {
        if (mouse_is_down) {
            if (element.title.length > 1) {

                darkenDown(element);
                callback(element.title, getFrequencyOfNote(element.title));
            }
        }
    };

    /**
    * Create key DOM element.
    * @return {object} Key DOM element.
    */
    var createKey = function (key) {
        key.el = document.createElement('li');
        key.el.id = key.id;
        key.el.title = key.id;
        key.el.setAttribute('data-note-type', key.colour);

        styleKey(key);

        return key;
    };

    var getTotalWhiteKeys = function () {
        //return settings.octaves * 7;
        return settings.numberKeys;
    };

    var createKeys = function () {
        var that = this,
            c,
            i,
            xp,
            key,
            keys = [],
            note_counter = 0,
            octave_counter = settings.startOctave,
            total_white_keys = getTotalWhiteKeys();
        c = 1;
        xp = 1;
        //window.alert(this.whiteNotes[2]);
        //window.alert(key_lookup);
        for (i = 0; i < (total_white_keys); i++) {

            if (i % this.whiteNotes.length === 0) {
                note_counter = 0;
            }

            bizarre_note_counter = this.whiteNotes[note_counter];

            if ((bizarre_note_counter === 'C') && (i !== 0)) {
                octave_counter++;
            }

            console.log("c:" + c + " xp:" + xp + " note:" + this.whiteNotes[note_counter] + octave_counter + " i:" + i + " note_counter:" + note_counter + " total_white_keys:" + total_white_keys);

            key = createKey({
                colour: 'white',
                ypos: 1,
                xpos: xp,
                octave: octave_counter,
                width: getWhiteKeyWidth(total_white_keys),
                id: this.whiteNotes[note_counter] + (octave_counter + 1),
                noteNumber: note_counter
            });
            keys.push(key.el);
            key = createKey({
                colour: 'white',
                ypos: 4,
                xpos: xp,
                octave: octave_counter,
                width: getWhiteKeyWidth(total_white_keys),
                id: this.whiteNotes[note_counter] + (octave_counter + 1),
                noteNumber: note_counter
            });

            keys.push(key.el);
            key = createKey({
                colour: 'white',
                ypos: 2,
                xpos: xp,
                octave: octave_counter,
                width: getWhiteKeyWidth(total_white_keys),
                id: this.whiteNotes[note_counter] + octave_counter,
                noteNumber: note_counter
            });

            keys.push(key.el);
            key = createKey({
                colour: 'white',
                ypos: 3,
                xpos: xp,
                octave: octave_counter,
                width: getWhiteKeyWidth(total_white_keys),
                id: this.whiteNotes[note_counter] + (octave_counter - 1),
                noteNumber: note_counter
            });

            keys.push(key.el);

            if (i !== total_white_keys - 1) {
                this.notesWithSharps.forEach(function (note, index) {
                    if (note === that.whiteNotes[note_counter]) {
                        key = createKey({
                            colour: 'black',
                            ypos: 1,
                            xpos: xp,
                            octave: octave_counter,
                            width: getWhiteKeyWidth(total_white_keys),
                            id: that.whiteNotes[note_counter] + '#' + (octave_counter + 1),
                            noteNumber: note_counter
                        });

                        keys.push(key.el);
                        key = createKey({
                            colour: 'black',
                            ypos: 2,
                            xpos: xp,
                            octave: octave_counter,
                            width: getWhiteKeyWidth(total_white_keys),
                            id: that.whiteNotes[note_counter] + '#' + octave_counter,
                            noteNumber: note_counter
                        });

                        keys.push(key.el);
                        key = createKey({
                            colour: 'black',
                            ypos: 3,
                            xpos: xp,
                            octave: octave_counter,
                            width: getWhiteKeyWidth(total_white_keys),
                            id: that.whiteNotes[note_counter] + '#' + (octave_counter - 1),
                            noteNumber: note_counter
                        });

                        keys.push(key.el);
                    }
                });
            }

            xp++;


            note_counter++;

        }

        return keys;
    };

    var addKeysToKeyboard = function (keyboard) {
        keyboard.keys.forEach(function (key) {
            keyboard.el.appendChild(key);
        });
    };

    var setKeyPressOffset = function (sorted_white_notes) {
        settings.keyPressOffset = sorted_white_notes[0] === 'C' ? 0 : 1;
    };

    var createKeyboard = function () {
        var keyboard = {
            container: document.getElementById(settings.id),
            el: document.createElement('ul'),
            whiteNotes: orderNotes(['C', 'D', 'E', 'F', 'G', 'A', 'B']),
            notesWithSharps: orderNotes(['C', 'D', 'F', 'G', 'A']),
        };

        keyboard.keys = createKeys.call(keyboard);

        setKeyPressOffset(keyboard.whiteNotes);
        styleKeyboard(keyboard);

        // Add keys to keyboard, and keyboard to container.
        addKeysToKeyboard(keyboard);

        keyboard.container.appendChild(keyboard.el);

        return keyboard;
    };

    var getKeyPressed = function (keyCode) {
        return key_map[keyCode]
            .replace('l', parseInt(settings.startOctave, 10) + settings.keyPressOffset)
            .replace('u', (parseInt(settings.startOctave, 10) + settings.keyPressOffset + 1)
                .toString());
    };

    /**
     * Handle a keyboard key being pressed.
     * @param {object} key The keyboard event of the currently pressed key.
     * @param {callback} callback The user's noteDown function.
     * @return {boolean} true if it was a key (combo) used by qwerty-hancock
     */
    var keyboardDown = function (key, callback) {
        var key_pressed;

        if (key.keyCode in keysDown) {
            return false;
        }

        keysDown[key.keyCode] = true;

        if (typeof key_map[key.keyCode] !== 'undefined') {
            key_pressed = getKeyPressed(key.keyCode);

            // Call user's noteDown function.
            callback(key_pressed, getFrequencyOfNote(key_pressed));
            lightenUp(document.getElementById(key_pressed));
            return true;
        }
        return false;
    };

    /**
     * Handle a keyboard key being released.
     * @param {element} key The DOM element of the key that was released.
     * @param {callback} callback The user's noteDown function.
     * @return {boolean} true if it was a key (combo) used by qwerty-hancock
     */
    var keyboardUp = function (key, callback) {
        var key_pressed;

        delete keysDown[key.keyCode];

        if (typeof key_map[key.keyCode] !== 'undefined') {
            key_pressed = getKeyPressed(key.keyCode);
            // Call user's noteDown function.
            callback(key_pressed, getFrequencyOfNote(key_pressed));
            darkenDown(document.getElementById(key_pressed));
            return true;
        }
        return false;
    };

    /**
     * Determine whether pressed key is a modifier key or not.
     * @param {KeyboardEvent} The keydown event of a pressed key
     */
    var isModifierKey = function (key) {
        return key.ctrlKey || key.metaKey || key.altKey;
    };

    /**
     * Add event listeners to keyboard.
     * @param {element} keyboard_element
     */
    var addListeners = function (keyboard_element) {
        var that = this;
        var lastKey = "";
        var lastTouchUp = "";
        // Key is pressed down on keyboard.
        globalWindow.addEventListener('keydown', function (key) {
            if (isModifierKey(key)) {
                return;
            }
            if (keyboardDown(key, that.keyDown)) {
                key.preventDefault();
            }
        });

        // Key is released on keyboard.
        globalWindow.addEventListener('keyup', function (key) {
            if (isModifierKey(key)) {
                return;
            }
            if (keyboardUp(key, that.keyUp)) {
                key.preventDefault();
            }
        });

        // Mouse is clicked down on keyboard element.
        keyboard_element.addEventListener('mousedown', function (event) {
            if (lastTouchUp && lastTouchUp == event.target) {
            } else {
                mouseDown(event.target, that.keyDown);
            }
            lastTouchUp = "";

        });

        // Mouse is released from keyboard element.
        keyboard_element.addEventListener('mouseup', function (event) {
            mouseUp(event.target, that.keyUp);

        });

        // Mouse is moved over keyboard element.
        keyboard_element.addEventListener('mouseover', function (event) {
            mouseOver(event.target, that.keyDown);
        });

        // Mouse is moved out of keyvoard element.
        keyboard_element.addEventListener('mouseout', function (event) {
            mouseOut(event.target, that.keyUp);
        });

        // Device supports touch events.
        if ('ontouchstart' in document.documentElement) {
            keyboard_element.addEventListener('touchstart', function (event) {
                console.log("touchstart", event.target)
                mouseDown(event.target, that.keyDown);
                lastKey = event.target;
            });

            keyboard_element.addEventListener('touchend', function (event) {
                console.log("touchend")
                if (lastKey) {
                    console.log("trying to canle, ", lastKey)
                    mouseUp(lastKey, that.keyUp);
                    lastTouchUp = lastKey
                    lastKey = ""
                } else {
                    mouseUp(event.target, that.keyUp);
                    lastTouchUp = event.target;
                }
            });
            console.log("doing stufff")

            keyboard_element.addEventListener('touchmove', function (event) {
                var el = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);
                if (el != lastKey) {
                    console.log("I think we've moved!!!!", el)
                    mouseUp(lastKey, that.keyUp);
                    mouseDown(el, that.keyDown);
                    lastKey = el
                }
                console.log("touchmove", el)
            });

            keyboard_element.addEventListener('touchleave', function (event) {
                console.log("touchleave")
                mouseOut(event.target, that.keyUp);
            });

            keyboard_element.addEventListener('touchcancel', function (event) {
                console.log("touchcancel")
                mouseOut(event.target, that.keyUp);
            });
        }
    };

    /**
     * Qwerty Hancock constructor.
     * @param {object} settings Optional user settings.
     */
    var QwertyHancock = function (settings) {
        this.version = version;

        this.keyDown = function () {
            // Placeholder function.
        };

        this.keyUp = function () {
            console.log("keyuppppppp")
            // Placeholder function.
        };

        init.call(this, settings);
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = QwertyHancock;
        }
        exports.QwertyHancock = QwertyHancock;
    } else {
        root.QwertyHancock = QwertyHancock;
    }
})(this);
