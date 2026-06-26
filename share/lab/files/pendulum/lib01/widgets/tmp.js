this.clipGroup = new Konva.Group({ // Δημιουργία του group για το clip
    //x: this.options.padding, // Τοποθέτηση του group με padding
    //y: this.options.padding,
    clip: { // Ορισμός της περιοχής clip
        x: 0,
        y: 0,
        width: this.options.width - 2 * this.options.padding, // Αφαίρεση του padding από το πλάτος
        height: this.options.height - 2 * this.options.padding // Αφαίρεση του padding από το ύψος
    }
});

/**
* Βασική προηπόθεση είναι να έχει φορτωθεί η βιβλιοθήκη Konva.js
* Μέσα στην αρχική ιστοσελίδα του έργου που χρησιμοποιεί τις
* παρακάτω κλάσεις.
*
* <script src="./konva/konva.js"></script>
*/

// widgets/widget.js
class Widget extends Konva.Group {
    static _nextId = 0;
    static MAX_ID = Number.MAX_SAFE_INTEGER;

    /**
    * Επιστρέφει ένα μοναδικό μη αρνητικό αναγνωριστικό ID.
    * @method nextId
    * @return {Number} Μοναδικό μη αρνητικό αναγνωριστικό ID
    */
    static nextId() {
    if (this._nextId >= this.MAX_ID) {
        console.error("nextId(): Έφτασε το μέγιστο όριο ID!");
        return null;
    }
    return this._nextId++;
    };

    /**
     * @constructor
     * @param {Object} options - Οι επιλογές για τη δημιουργία του widget.
     * @param {number} [options.x=0] - Η θέση x του widget.
     * @param {number} [options.y=0] - Η θέση y του widget.
     * @param {number} [options.width=100] - Το πλάτος του widget.
     * @param {number} [options.height=10] - Το ύψος του widget.
     * @param {boolean} [options.isActive=false] - Αν το widget είναι ενεργό.
     * @param {boolean} [options.draggable=false] - Αν το widget είναι draggable.
     * @param {function} [options.handleClick] - Η συνάρτηση που καλείται στο click event.
     * @param {function} [options.handleMouseOver] - Η συνάρτηση που καλείται στο mouseover event.
     * @param {function} [options.handleMouseOut] - Η συνάρτηση που καλείται στο mouseout event.
     */
    constructor(options, globalEventManager) {
      super();

      //Ο μοναδικός κωδικός του widgets
      const id = Widget.nextId();

      this.options = { 
        x: options.x || 0, 
        y: options.y || 0,
        width: options.width || 100,
        height: options.height || 10,
        padding: options.padding || 5,
        id: id,
        name: options.name || "Widget"+ id,
        isActive: options.isActive || false,
        draggable: options.draggable || false,
        handleClick: options.handleClick || this.handleClick,
        handleMouseOver: options.handleMouseOver || this.handleMouseOver,
        handleMouseOut: options.handleMouseOut || this.handleMouseOut,
        handleFocus: options.handleFocus || this.handleFocus,
        handleBlur: options.handleBlur || this.handleBlur,
    };
  
      // Θέτουμε τη θέση του widget
      this.setPosition({ x: this.options.x , y: this.options.y });
  
      // Κάνουμε το widget να είναι draggable αν το επιθυμούμε
      this.draggable(this.options.draggable);

      //Προσδιορίζουμε το πλάτος και το ύψος
      this.width(this.options.width);
      this.height(this.options.height);

          
      // Προσθέτουμε event listeners για τα events που μας ενδιαφέρουν
      this.on('click', this.options.handleClick);
      this.on('mouseover', this.options.handleMouseOver);
      this.on('mouseout', this.options.handleMouseOut);
      this.on('focus', this.options.handleFocus);
      this.on('blur', this.options.handleBlur);
      this.on('destroy', this.options.handleDestroy);
    }

    /**
     * @function getAllWidgetsFromThisStage
     * @description Αποθηκεύει όλα τα αντικείμενα Widget που βρίσκονται μέσα στο this.stage 
     *              σε έναν νέο πίνακα και τον επιστρέφει.
     * @param {Konva.Stage} stage - Το Konva Stage από το οποίο θα αναζητηθούν τα Widgets.
     * @returns {Array<Widget>} Ένας πίνακας που περιέχει όλα τα αντικείμενα Widget που βρέθηκαν 
     *                           στο stage, ή ένας άδειος πίνακας αν δεν βρεθούν Widgets.
     */
    getAllWidgetsFromThisStage(stage) {
        const widgets = [];
    
        // Έλεγχος αν το stage είναι null ή undefined
        if (!stage) {
        console.error("Το stage δεν έχει οριστεί.");
        return widgets; // Επιστρέφουμε έναν άδειο πίνακα
        }
    
        // Επανάληψη σε όλα τα παιδιά του stage
        stage.getChildren().forEach(child => {
        // Έλεγχος αν το παιδί είναι instance της κλάσης Widget
        if (child instanceof Widget) {
            widgets.push(child);
        } else if (child instanceof Konva.Layer) { // Ελέγχουμε αν είναι layer
            child.getChildren().forEach(grandchild => { // Αν είναι layer παίρνουμε τα παιδιά του
            if (grandchild instanceof Widget) {
                widgets.push(grandchild);
            }
            });
        }
        });
    
        return widgets;
    }
  
  
    /**
     * Μέθοδος που καλείται όταν ο χρήστης κάνει κλικ στο widget.
     * @method handleClick
     * @param {Event} event - Το event του click.
     */
    handleClick(event) {
        this.fire('focus');
    }

    /**
     * Μέθοδος που καλείται όταν ο χρήστης μετακινεί τον δείκτη του ποντικιού πάνω από το widget.
     * @method handleMouseOver
     * @param {Event} event - Το event του mouseover.
     */
    handleMouseOver(event) {
        // Υλοποίηση της λογικής για το mouseover event
    }

    /**
     * Μέθοδος που καλείται όταν ο χρήστης μετακινεί τον δείκτη του ποντικιού έξω από το widget.
     * @method handleMouseOut
     * @param {Event} event - Το event του mouseout.
     */
    handleMouseOut(event) {
        // Υλοποίηση της λογικής για το mouseout event
    }

    handleFocus(event){
        if (event.target !== this) return; // Έλεγχος για να αποφευχθεί η ενεργοποίηση αν το focus προέρχεται από children
        console.log('focus',this.options.name);
        this.activate();
        const allWidgets = this.getAllWidgetsFromThisStage(this.getStage());

        // Παίρνουμε το widget που έχει πατηθεί (this).
        const clickedWidget = this;

        allWidgets.forEach(widget => {
            // Ελέγχουμε αν το τρέχον widget είναι διαφορετικό από αυτό που έχει πατηθεί.
            if (widget !== clickedWidget) {
                // Αν είναι διαφορετικό, προσομοιώνουμε το γεγονός 'blur'.
                widget.fire('blur');
            }
        });
    }

    handleBlur(event){
        if (event.target !== this) return; // Έλεγχος για να αποφευχθεί η ενεργοποίηση αν το focus προέρχεται από children

        this.deactivate();
        console.log('blur',this.options.name);
    }

    handleDestroy(event){

    }

    fireEventToAllOthers(event) {
        const allWidgets = this.getAllWidgetsFromThisStage(this.getStage());
        const thisWidget = this; // Αποθηκεύουμε το τρέχον widget σε μια μεταβλητή για ευκολία
    
        allWidgets.forEach(widget => {
            if (widget !== thisWidget) { // Σιγουρευόμαστε ότι δεν στέλνουμε το γεγονός στον εαυτό μας
                widget.fire(event,{sender:this});
            }
        });
    }

    /**
     * Ενεργοποιεί το widget.
     * @method activate
     * @return {boolean} Η τρέχουσα κατάσταση ενεργοποίησης του widget.
     */
    activate() {
        this.options.isActive = true; // Αποθηκεύουμε την κατάσταση στο this.options.active
        return this.options.isActive; // Επιστρέφουμε την τρέχουσα κατάσταση
    }

    /**
     * Απενεργοποιεί το widget.
     * @method deactivate
     * @return {boolean} Η τρέχουσα κατάσταση ενεργοποίησης του widget.
     */
    deactivate() {
        this.options.isActive = false; // Αποθηκεύουμε την κατάσταση στο this.options.active
        return this.options.isActive; // Επιστρέφουμε την τρέχουσα κατάσταση
    }

    isActive(){
        return !!this.options.isActive; 
    }

  }

  export { Widget };


  import { Widget } from './widget.js'; // Υποθέτουμε ότι η κλάση Widget βρίσκεται στο widget.js

class Input extends Widget {
    constructor(options) {
        super(options); // Καλεί τον constructor της κλάσης Widget

        this.options.name = "Input"+this.options.id; 
        this.options = {
            ...this.options, // Κληρονομεί τις ιδιότητες από το Widget
            placeHolder: options.placeHolder || '',
            text: options.text || '',
            maxLength: options.maxLength,
            fontColor: options.fontColor || 'black',
            fontFamily: options.fontFamily || 'Courier',
            fontSize: options.fontSize || '14',
            fill: options.fill || "white",
            stroke: options.stroke || "gray",
            strokeWidth: options.strokeWidth || 1,
            cornerRadius: options.cornerRadius || 0,
            cursorPositionInText: options.text.length,
            cursor: options.cursor || '|',
            cursorColor: options.cursorColor || 'black', // Το χρώμα του cursor
            // ... άλλες ιδιότητες που μπορεί να χρειαστούν
        };

        this.clipGroup = new Konva.Group({ // Δημιουργία του group για το clip
            //x: this.options.padding, // Τοποθέτηση του group με padding
            //y: this.options.padding,
            clip: { // Ορισμός της περιοχής clip
                x: 0,
                y: 0,
                width: this.options.width - 2 * this.options.padding, // Αφαίρεση του padding από το πλάτος
                height: this.options.height - 2 * this.options.padding // Αφαίρεση του padding από το ύψος
            }
        });

        this.textBeforeCursor = new Konva.Text({
            text: this.options.placeHolder, // Αρχικά εμφανίζουμε το placeholder
            fontSize: this.options.fontSize,
            fontFamily: this.options.fontFamily,
            fill: 'gray',
            x: this.options.padding,
            y: (this.options.height - this.options.fontSize) / 2
        });

        this.textAtCursor = new Konva.Text({
            text: '',
            fontSize: this.options.fontSize,
            fontFamily: this.options.fontFamily,
            fill: this.options.cursorColor, // Αρχικά κενό
            x: this.options.padding,
            y: (this.options.height - this.options.fontSize) / 2
        });

        this.textAfterCursor = new Konva.Text({
            text: '', // Αρχικά κενό
            fontSize: this.options.fontSize,
            fontFamily: this.options.fontFamily,
            fill: this.options.fontColor,
            x: this.options.padding,
            y: (this.options.height - this.options.fontSize) / 2
        });

        this.clipGroup.add(this.textBeforeCursor);
        this.clipGroup.add(this.textAtCursor);
        this.clipGroup.add(this.textAfterCursor);

        this.rect = new Konva.Rect({ // Το rectangle που θα περιβάλλει το input
            width: this.options.width,
            height: this.options.height,
            fill: this.options.fill,
            stroke: this.options.stroke,
            strokeWidth: this.options.strokeWidth,
            cornerRadius: this.options.cornerRadius,
        });

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
        
        this.add(this.rect); // Προσθήκη του rect (πρώτα)
        this.add(this.clipGroup); // Προσθήκη του group (μετά)
    }

    handleClick(event) {
        super.handleClick(event);
        this.textBeforeCursor.fill(this.options.fontColor);
        this.updateTextInDisplay();
    }

    handleFocus(event){
        super.handleFocus(event);
        this.textBeforeCursor.fill(this.options.fontColor);
        this.textAtCursor.fill(this.options.fontColor);
        this.textAfterCursor.fill(this.options.fontColor);
        this.updateTextInDisplay();
    }

    handleBlur(event) {
        super.handleBlur(event);

        if (this.options.text === '') { // Αν το text είναι άδειο
            this.textBeforeCursor.text(this.options.placeHolder); // Επαναφέρουμε το placeholder
            this.textAtCursor.text("");
            this.textAfterCursor.text("");
            this.textBeforeCursor.fill('gray');
        }else{
            this.textBeforeCursor.fill('gray');
            this.textAtCursor.fill('gray');
            this.textAfterCursor.fill('gray');
            this.updateTextInDisplay();
        }
    }

    handleKeyDown(event) {
       
        //Εαν είναι ενεργο δεχεται την είσοδο
        if (!this.isActive()) return;
        event.preventDefault();

        if(event.ctrlKey && (event.key=='d' ||  event.key=='D' || event.key=='δ' || event.key=='Δ')){
            this.options.text='';
            this.options.cursorPositionInText=0;
        }else if(event.ctrlKey && (event.key=='E' ||  event.key=='e' || event.key=='Ε' || event.key=='ε')){
            this.options.cursorPositionInText=this.options.text.length;
        }else if(event.ctrlKey && (event.key=='A' ||  event.key=='a' || event.key=='Α' || event.key=='α')){
            this.options.cursorPositionInText=0;
        }else if(event.shiftKey && (event.keyCode>=65 && event.keyCode<=90) ){
            this.options.text=this.options.text.substring(0,this.options.cursorPositionInText)+event.key+this.options.text.substring(this.options.cursorPositionInText);
            this.options.cursorPositionInText++;
        }else if(event.key>='a' && event.key<='z' ){
            this.options.text=this.options.text.substring(0,this.options.cursorPositionInText)+event.key+this.options.text.substring(this.options.cursorPositionInText);
            this.options.cursorPositionInText++;
        }else if(event.key>='0' && event.key<='9'){
            this.options.text=this.options.text.substring(0,this.options.cursorPositionInText)+event.key+this.options.text.substring(this.options.cursorPositionInText);
            this.options.cursorPositionInText++;
        }else if(event.key>='Ά' && event.key<='ώ'){
            this.options.text=this.options.text.substring(0,this.options.cursorPositionInText)+event.key+this.options.text.substring(this.options.cursorPositionInText);
            this.options.cursorPositionInText++;
        }else if(event.key=='/' || event.key=='*' || event.key=='-' || event.key=='+' || event.key=='.' || event.key=='!' || event.key=='@' || event.key=='#'|| event.key=='$' || event.key=='%' || event.key=='^' || event.key=='&' || event.key=='(' || event.key==')' || event.key=='_' || event.key=='=' || event.key=='{' || event.key=='}' || event.key=='[' || event.key==']' || event.key=='|' || event.key==';' || event.key=="'" || event.key==',' || event.key=='?' || event.key=='<' || event.key=='>' || event.key==':' || event.key=='~' ){
            this.options.text=this.options.text.substring(0,this.options.cursorPositionInText)+event.key+this.options.text.substring(this.options.cursorPositionInText);
            this.options.cursorPositionInText++;
        }else if(event.key==' '){
            this.options.text=this.options.text.substring(0,this.options.cursorPositionInText)+event.key+this.options.text.substring(this.options.cursorPositionInText);
            this.options.cursorPositionInText++;
        }else if(event.key=='Backspace'){
            if(this.options.cursorPositionInText>0){
                this.options.text=this.options.text.substring(0,this.options.cursorPositionInText-1)+this.options.text.substring(this.options.cursorPositionInText);
                this.options.cursorPositionInText--;
            }
        }else if(event.key=='Delete'){
            if(this.options.cursorPositionInText<this.options.text.length){
                this.options.text=this.options.text.substring(0,this.options.cursorPositionInText)+this.options.text.substring(this.options.cursorPositionInText+1);
            }
        }else if(event.key=='ArrowLeft'){
            if(this.options.cursorPositionInText>0){
                this.options.cursorPositionInText--;
            }
        }else if(event.key=='ArrowRight'){
            if(this.options.cursorPositionInText<this.options.text.length){
                this.options.cursorPositionInText++;
            }
        }else if(event.key=='Enter'){
            this.fireEventToAllOthers('input');
            this.fire('blur');
            return;
        }
            
        this.updateTextInDisplay();
        //this.updateCursorPosition();
        this.autoScroll(); // Αυτόματη κύλιση

    }

    updateTextInDisplay() {
        let cursor;
        if(this.isActive()){ 
            cursor = this.options.cursor;
        }else{
            cursor = "";
        }
        const textBefore = this.options.text.substring(0, this.options.cursorPositionInText-1);
        const charAtCursor =this.options.text.substring(this.options.cursorPositionInText-1, this.options.cursorPositionInText) + cursor;
        const textAfter = this.options.text.substring(this.options.cursorPositionInText);

        this.textBeforeCursor.text(textBefore); // Εμφανίζουμε το placeholder αν δεν υπάρχει κείμενο
        this.textAtCursor.text(charAtCursor);
        this.textAfterCursor.text(textAfter);

        this.updateTextPositions(); // Ενημερώνουμε τις θέσεις του κειμένου
    }

    updateTextPositions() {
        let x = this.textBeforeCursor.x();// this.options.padding;

        this.textBeforeCursor.x(x);
        x += this.textBeforeCursor.width();

        this.textAtCursor.x(x);
        x += this.textAtCursor.width();

        this.textAfterCursor.x(x);
    }

    updateCursorPosition() {
        this.textAtCursor.fill(this.options.cursorColor); // Εμφανίζουμε τον cursor
    }

    autoScroll() {
        const textWidth = this.textBeforeCursor.width() + this.textAtCursor.width() + this.textAfterCursor.width();
        const rectWidth = this.options.width - 2 * this.options.padding;

        if (textWidth > rectWidth) {
            const offsetX = this.textBeforeCursor.width() + this.textAtCursor.width() - 8 * rectWidth / 10;
            let newX = this.options.padding - offsetX;
            if(newX>=0){newX = 0;}
            this.textBeforeCursor.x(newX);
            this.updateTextPositions(); // Ενημερώνουμε τις θέσεις των υπολοίπων text elements
        } else {
            this.textBeforeCursor.x(this.options.padding);
            this.updateTextPositions(); // Ενημερώνουμε τις θέσεις των υπολοίπων text elements
        }
    }

    handleKeyUp(event) {
        
    }

    handleInput(event) {
        
    }

    getText(){
        return this.options.text;
    }

    setText(newValue){
        this.options.text = newValue;
        this.textBeforeCursor.text( this.options.text);
        this.textAtCursor.text('');
        this.textAfterCursor.text('');
        this.options.cursorPositionInText = this.options.text.length;
        if(this.isActive()){
            this.updateTextInDisplay();
        }
    }

    activate(){
        //super.activate();
        this.handleFocus({});
    }

    deactivate(){
        super.deactivate();
        this.handleBlur({});

    }

    }

export { Input };



-------------------------------------------------


import { Widget } from './widget.js';

class FormattedText extends Widget {
    constructor(options) {
        super(options);

        this.options = {
            ...this.options,
            text: options.text || '', // Το μαθηματικό κείμενο
            fontSize: options.fontSize || 12, // Μέγεθος γραμματοσειράς
            color: options.color || 'black', // Χρώμα κειμένου
            elementSpacing: options.elementSpacing || 3,
        };

        this.currentX = 0;
        this.shapes = []; // Πίνακας για την αποθήκευση των σχημάτων Konva.js

        this.render(); // Κλήση της συνάρτησης render για την απόδοση του κειμένου
    }

    render() {
        this.clear(); // Καθαρισμός προηγούμενων σχημάτων

        // 1. Ανάλυση του μαθηματικού κειμένου
        const elements = this.parseText(this.options.text);
        console.log(elements);

        // 2. Δημιουργία σχημάτων Konva.js για κάθε στοιχείο
        elements.forEach(element => {
            const shape = this.createShape(element);
            if (shape) {
                this.shapes.push(shape);
                this.add(shape);
            }
        });
        console.log(this.shapes);
        //this.draw(); // Επανασχεδίαση του widget
    }

    parseText(text) {
        const elements = [];
        let currentText = '';
    
        for (let i = 0; i < text.length; i++) {
            const char = text[i];

            // Αγνοούμε τους λευκούς χαρακτήρες
            if (char === ' ' || char === '\t' || char === '\n' || char === '\r') {
                continue; // Συνεχίζουμε στην επόμενη επανάληψη του βρόχου
            }
    
            switch (char) {
                case '{': // Έναρξη ομάδας (για κλάσματα ή ρίζες)
                    break; // Δεν κάνουμε κάτι εδώ, θα το χειριστούμε στην επόμενη περίπτωση
                case '}': // Τέλος ομάδας
                    break; // Δεν κάνουμε κάτι εδώ, θα το χειριστούμε στην επόμενη περίπτωση
                case '\\':
                if (currentText !== '') {
                    elements.push({ type: 'text', value: currentText });
                    currentText = '';
                }

                // Διαβάζουμε ολόκληρη τη λέξη μετά το '\'
                let specialChar = '\\';
                i++; // Προχωράμε στην επόμενη θέση
                while (i < text.length && text[i] !== ' ' && text[i] !== '{' && text[i] !== '}' && text[i] !== '\\' && text[i] !== '^' && text[i] !== '_') {
                    specialChar += text[i];
                    i++;
                }
                i--; // Επιστρέφουμε στην τελευταία θέση που διαβάσαμε
                let content;
                switch (specialChar) {
                    
                    case '\\cdot':
                        elements.push({ type: 'symbol', value: '·' });
                        break;
                    case '\\pi':
                        elements.push({ type: 'symbol', value: 'π' });
                        break;
                    case '\\sqrt': // sqrt -  Το χειριζόμαστε εδώ!
                        content = this.extractGroup(text, ++i); // Παίρνουμε το περιεχόμενο της ρίζας
                        elements.push({ type: 'sqrt', value: this.parseText(content) });
                        i += content.length; // Μετακινούμε τον δείκτη στο τέλος της ρίζας
                        break;
                    case '\\root': // root - Το χειριζόμαστε εδώ!
                        const index = this.extractGroup(text, ++i); // Δείκτης ρίζας
                        i += index.length + 1; // Skip μέχρι το επόμενο {
                        content = this.extractGroup(text, ++i); // Περιεχόμενο ρίζας
                        elements.push({ type: 'root', index: this.parseText(index), value: this.parseText(content) });
                        i += content.length;
                        break;
                    case '\\frac': // frac - Το χειριζόμαστε εδώ!
                        const numerator = this.extractGroup(text, ++i); // Αριθμητής
                        i += numerator.length + 1; // Skip μέχρι το /
                        const denominator = this.extractGroup(text, ++i); // Παρονομαστής
                        elements.push({ type: 'frac', numerator: this.parseText(numerator), denominator: this.parseText(denominator) });
                        i += denominator.length;
                        break;
                    case '\\eq': // =
                        elements.push({ type: 'symbol', value: '=' });
                        break;
                    case '\\lt': // <
                        elements.push({ type: 'symbol', value: '<' });
                        break;
                    case '\\gt': // >
                        elements.push({ type: 'symbol', value: '>' });
                        break;
                    case '\\le': // <=
                        elements.push({ type: 'symbol', value: '≤' }); // Unicode character for less than or equal to
                        break;
                    case '\\ge': // >=
                        elements.push({ type: 'symbol', value: '≥' }); // Unicode character for greater than or equal to
                        break;
                    case '\\ne': // !=
                        elements.push({ type: 'symbol', value: '≠' }); // Unicode character for not equal to
                        break;
                    case '\\vec': // διάνυσμα
                        const vecContent = this.extractGroup(text, ++i);
                        elements.push({ type: 'vec', value: this.parseText(vecContent) });
                        i += vecContent.length;
                        break;
                    case '\\bar': // οριζόντια γραμμή
                        const barContent = this.extractGroup(text, ++i);
                        elements.push({ type: 'bar', value: this.parseText(barContent) });
                        i += barContent.length;
                        break;
                    case '\\hat': // καπέλο
                        const hatContent = this.extractGroup(text, ++i);
                        elements.push({ type: 'hat', value: this.parseText(hatContent) });
                        i += hatContent.length;
                        break;
                    // ... (Προσθέστε και άλλες περιπτώσεις για ειδικούς χαρακτήρες εδώ)
                    default:
                        // Αν δεν αναγνωρίζεται ο ειδικός χαρακτήρας, τον προσθέτουμε ως κείμενο
                        elements.push({ type: 'text', value: specialChar });
                }
                break;
                case '^': // Υπερδείκτης (Εκθέτης)
                    if (currentText !== '') { elements.push({ type: 'text', value: currentText }); currentText = ''; }
                    const exponent = this.extractGroup(text, ++i);
                    elements.push({ type: 'sup', value: this.parseText(exponent) });
                    i += exponent.length -1; //Adjust index since extractGroup moves it forward
                    break;
                case '_': // Υποδείκτης (Δείκτης)
                    if (currentText !== '') { elements.push({ type: 'text', value: currentText }); currentText = ''; }
                    const subscript = this.extractGroup(text, ++i);
                    elements.push({ type: 'sub', value: this.parseText(subscript) });
                    i += subscript.length -1; //Adjust index since extractGroup moves it forward
                    break;
    
                default:
                    currentText += char;
            }
        }
        // Προσθήκη του τελευταίου τμήματος κειμένου, μόνο αν δεν είναι κενό
        if (currentText !== '') {
            elements.push({ type: 'text', value: currentText });
        }
        // Αφαίρεση κενών εγγραφών τύπου 'text'
        const filteredElements = elements.filter(element => {
            if (element.type === 'text' && element.value.trim() === '') {
                return false; // Αφαιρούμε την εγγραφή
            }
            return true; // Διατηρούμε την εγγραφή
        });

    return filteredElements;
    }
    
    
}

export { FormattedText };

============================================
import { Widget } from './widget.js';

class FormattedText extends Widget {
    constructor(options) {
        super(options);

        this.options = {
            ...this.options,
            text: options.text || '', // Το μαθηματικό κείμενο
            fontSize: options.fontSize || 12, // Μέγεθος γραμματοσειράς
            color: options.color || 'black', // Χρώμα κειμένου
            elementSpacing: options.elementSpacing || 3,
        };

        this.currentX = 0;
        this.shapes = []; // Πίνακας για την αποθήκευση των σχημάτων Konva.js

        this.render(); // Κλήση της συνάρτησης render για την απόδοση του κειμένου
    }

    render() {
        this.clear(); // Καθαρισμός προηγούμενων σχημάτων

        // 1. Ανάλυση του μαθηματικού κειμένου
        const elements = this.parseText(this.options.text);
        console.log(elements);

        // 2. Δημιουργία σχημάτων Konva.js για κάθε στοιχείο
        elements.forEach(element => {
            const shape = this.createShape(element);
            if (shape) {
                this.shapes.push(shape);
                this.add(shape);
            }
        });
        console.log(this.shapes);
        //this.draw(); // Επανασχεδίαση του widget
    }

    parseText(text) {
        const elements = [];
        let currentText = '';
    
        for (let i = 0; i < text.length; i++) {
            const char = text[i];

            // Αγνοούμε τους λευκούς χαρακτήρες
            if (char === ' ' || char === '\t' || char === '\n' || char === '\r') {
                continue; // Συνεχίζουμε στην επόμενη επανάληψη του βρόχου
            }
    
            switch (char) {
                case '{': // Έναρξη ομάδας (για κλάσματα ή ρίζες)
                    break; // Δεν κάνουμε κάτι εδώ, θα το χειριστούμε στην επόμενη περίπτωση
                case '}': // Τέλος ομάδας
                    break; // Δεν κάνουμε κάτι εδώ, θα το χειριστούμε στην επόμενη περίπτωση
                case '\\':
                if (currentText !== '') {
                    elements.push({ type: 'text', value: currentText });
                    currentText = '';
                }

                // Διαβάζουμε ολόκληρη τη λέξη μετά το '\'
                let specialChar = '\\';
                i++; // Προχωράμε στην επόμενη θέση
                while (i < text.length && text[i] !== ' ' && text[i] !== '{' && text[i] !== '}' && text[i] !== '\\' && text[i] !== '^' && text[i] !== '_') {
                    specialChar += text[i];
                    i++;
                }
                i--; // Επιστρέφουμε στην τελευταία θέση που διαβάσαμε
                let content;
                switch (specialChar) {
                    
                    case '\\cdot':
                        elements.push({ type: 'symbol', value: '·' });
                        break;
                    case '\\pi':
                        elements.push({ type: 'symbol', value: 'π' });
                        break;
                    case '\\sqrt': // sqrt -  Το χειριζόμαστε εδώ!
                        content = this.extractGroup(text, ++i); // Παίρνουμε το περιεχόμενο της ρίζας
                        elements.push({ type: 'sqrt', value: this.parseText(content) });
                        i += content.length; // Μετακινούμε τον δείκτη στο τέλος της ρίζας
                        break;
                    case '\\root': // root - Το χειριζόμαστε εδώ!
                        const index = this.extractGroup(text, ++i); // Δείκτης ρίζας
                        i += index.length + 1; // Skip μέχρι το επόμενο {
                        content = this.extractGroup(text, ++i); // Περιεχόμενο ρίζας
                        elements.push({ type: 'root', index: this.parseText(index), value: this.parseText(content) });
                        i += content.length;
                        break;
                    case '\\frac': // frac - Το χειριζόμαστε εδώ!
                        const numerator = this.extractGroup(text, ++i); // Αριθμητής
                        i += numerator.length + 1; // Skip μέχρι το /
                        const denominator = this.extractGroup(text, ++i); // Παρονομαστής
                        elements.push({ type: 'frac', numerator: this.parseText(numerator), denominator: this.parseText(denominator) });
                        i += denominator.length;
                        break;
                    case '\\eq': // =
                        elements.push({ type: 'symbol', value: '=' });
                        break;
                    case '\\lt': // <
                        elements.push({ type: 'symbol', value: '<' });
                        break;
                    case '\\gt': // >
                        elements.push({ type: 'symbol', value: '>' });
                        break;
                    case '\\le': // <=
                        elements.push({ type: 'symbol', value: '≤' }); // Unicode character for less than or equal to
                        break;
                    case '\\ge': // >=
                        elements.push({ type: 'symbol', value: '≥' }); // Unicode character for greater than or equal to
                        break;
                    case '\\ne': // !=
                        elements.push({ type: 'symbol', value: '≠' }); // Unicode character for not equal to
                        break;
                    case '\\vec': // διάνυσμα
                        const vecContent = this.extractGroup(text, ++i);
                        elements.push({ type: 'vec', value: this.parseText(vecContent) });
                        i += vecContent.length;
                        break;
                    case '\\bar': // οριζόντια γραμμή
                        const barContent = this.extractGroup(text, ++i);
                        elements.push({ type: 'bar', value: this.parseText(barContent) });
                        i += barContent.length;
                        break;
                    case '\\hat': // καπέλο
                        const hatContent = this.extractGroup(text, ++i);
                        elements.push({ type: 'hat', value: this.parseText(hatContent) });
                        i += hatContent.length;
                        break;
                    // ... (Προσθέστε και άλλες περιπτώσεις για ειδικούς χαρακτήρες εδώ)
                    default:
                        // Αν δεν αναγνωρίζεται ο ειδικός χαρακτήρας, τον προσθέτουμε ως κείμενο
                        elements.push({ type: 'text', value: specialChar });
                }
                break;
                case '^': // Υπερδείκτης (Εκθέτης)
                    if (currentText !== '') { elements.push({ type: 'text', value: currentText }); currentText = ''; }
                    const exponent = this.extractGroup(text, ++i);
                    elements.push({ type: 'sup', value: this.parseText(exponent) });
                    i += exponent.length -1; //Adjust index since extractGroup moves it forward
                    break;
                case '_': // Υποδείκτης (Δείκτης)
                    if (currentText !== '') { elements.push({ type: 'text', value: currentText }); currentText = ''; }
                    const subscript = this.extractGroup(text, ++i);
                    elements.push({ type: 'sub', value: this.parseText(subscript) });
                    i += subscript.length -1; //Adjust index since extractGroup moves it forward
                    break;
    
                default:
                    currentText += char;
            }
        }
        // Προσθήκη του τελευταίου τμήματος κειμένου, μόνο αν δεν είναι κενό
        if (currentText !== '') {
            elements.push({ type: 'text', value: currentText });
        }
        // Αφαίρεση κενών εγγραφών τύπου 'text'
        const filteredElements = elements.filter(element => {
            if (element.type === 'text' && element.value.trim() === '') {
                return false; // Αφαιρούμε την εγγραφή
            }
            return true; // Διατηρούμε την εγγραφή
        });

    return filteredElements;
    }
    
    extractGroup(text, startIndex) {
        let count = 0;
        let content = '';
        if (text[startIndex] === '{') {
            startIndex++;
            for (let i = startIndex; i < text.length; i++) {
                if (text[i] === '{') {
                    count++;
                } else if (text[i] === '}') {
                    if (count === 0) {
                        return content;
                    }
                    count--;
                }
                content += text[i];
            }
        } else {
            for (let i = startIndex; i < text.length; i++) {
                if (text[i] === ' ' || text[i] === '+' || text[i] === '-' || text[i] === '*' || text[i] === '/' || text[i] === '^' || text[i] === '_') {
                    return content;
                }
                content += text[i];
            }
        }
        return content;
    }

    createShape(element) {
        switch (element.type) {
            case 'text':
            case 'symbol':
                const textShape = new Konva.Text({
                    text: element.value,
                    fontSize: this.options.fontSize,
                    fill: this.options.color,
                });
                textShape.x(this.currentX); // Τοποθετούμε το shape στην σωστή θέση
                this.currentX += textShape.width() + this.options.elementSpacing; // Ενημερώνουμε το offset
                return textShape;
            case 'sqrt':
                const groupSqrt = new Konva.Group();
                const sqrtSymbol = new Konva.Text({
                    text: '√',
                    fontSize: this.options.fontSize,
                    fill: this.options.color,
                });
                sqrtSymbol.x(this.currentX);
                groupSqrt.add(sqrtSymbol);
    
                let sqrtContentX = sqrtSymbol.width(); // Offset για το περιεχόμενο της ρίζας
                const contentShapes = element.value.map(el => this.createShape(el));
                contentShapes.forEach(shape => {
                    shape.x(sqrtContentX);
                    groupSqrt.add(shape);
                    sqrtContentX += shape.width();
                });
    
                groupSqrt.x(this.currentX) // Τοποθετούμε το group στην σωστή θέση
                this.currentX += groupSqrt.width() + this.options.elementSpacing;  // Ενημερώνουμε το offset
                return groupSqrt;
    
                case 'frac':
                    const groupFrac = new Konva.Group();
                    const numeratorShapes = element.numerator.map(el => this.createShape(el));
                    const denominatorShapes = element.denominator.map(el => this.createShape(el));
            
                    let numeratorWidth = 0;
                    let numeratorHeight = 0; // Ύψος αριθμητή
                    numeratorShapes.forEach(shape => {
                        groupFrac.add(shape);
                        numeratorWidth = Math.max(numeratorWidth, shape.width());
                        if (shape instanceof Konva.Text) { // Αν είναι Text node, παίρνουμε το ύψος
                            numeratorHeight = Math.max(numeratorHeight, this.getTextBoundingBox(shape).height);
                        }
                    });
            
                    let denominatorWidth = 0;
                    let denominatorHeight = 0; // Ύψος παρονομαστή
                    denominatorShapes.forEach(shape => {
                        groupFrac.add(shape);
                        denominatorWidth = Math.max(denominatorWidth, shape.width());
                        if (shape instanceof Konva.Text) { // Αν είναι Text node, παίρνουμε το ύψος
                            denominatorHeight = Math.max(denominatorHeight, this.getTextBoundingBox(shape).height);
                        }
                    });
            
                    const fractionLine = new Konva.Line({
                        points: [0, 0, Math.max(numeratorWidth, denominatorWidth), 0], // Αλλάζουμε το y της γραμμής
                        stroke: this.options.color,
                        strokeWidth: 1,
                    });
                    groupFrac.add(fractionLine);
            
                    // Τοποθέτηση αριθμητή και παρονομαστή - Χρησιμοποιούμε τα υπολογισμένα ύψη
                    numeratorShapes.forEach(shape => {
                        shape.x((Math.max(numeratorWidth, denominatorWidth) - shape.width()) / 2); // Κεντράρισμα
                        shape.y(-numeratorHeight); // Τοποθετούμε τον αριθμητή πιο ψηλά
                    });
                    denominatorShapes.forEach(shape => {
                        shape.x((Math.max(numeratorWidth, denominatorWidth) - shape.width()) / 2); // Κεντράρισμα
                        shape.y(this.options.fontSize); // Ο παρονομαστής παραμένει στη θέση του
                    });
            
                    groupFrac.x(this.currentX);
                    this.currentX += groupFrac.width() + this.options.elementSpacing;
                    return groupFrac;
            default:
                return null;
        }
    }

    // Helper function για τον υπολογισμό του bounding box ενός Konva.Text
    getTextBoundingBox(textNode) {
        const metrics = textNode.measureSize();
        return {
            width: metrics.width,
            height: metrics.height,
        };
    }

    clear() {
        // Αφαίρεση όλων των σχημάτων από το widget
        this.shapes.forEach(shape => shape.destroy());
        this.shapes = [];
    }

    setText(text) {
        this.options.text = text;
        this.render();
    }

    setFontSize(fontSize) {
        this.options.fontSize = fontSize;
        this.render();
    }

    setColor(color) {
        this.options.color = color;
        this.render();
    }
}

export { FormattedText };

import { Vector } from '../math/vector.js';
import { Widget } from './widget.js';

class VisualVector extends Widget {
  constructor(config) {
    super(config);
    this.arrow = new Konva.Arrow({
      points: [0, 0, 0, 0],
      stroke: config.stroke || 'black',
      strokeWidth: config.strokeWidth || 2,
      fill: config.fill || 'black',
      lineCap: config.lineCap || 'round',
      lineJoin: config.lineJoin || 'round',
      dash: config.dash,
      shadowColor: config.shadowColor,
      shadowBlur: config.shadowBlur,
      shadowOffsetX: config.shadowOffsetX,
      shadowOffsetY: config.shadowOffsetY,
      shadowOpacity: config.shadowOpacity,
    });
    this.add(this.arrow);
    this.setVector(config);
  }

  setVector(config) {
    const startX = config.startX || this.startX || 0;
    const startY = config.startY || this.startY || 0;

    if (config.endX && config.endY) {
      this.vector = { x: config.endX - startX, y: config.endY - startY };
      this.magnitude = Vector.magnitude(this.vector);
      this.direction = Math.atan2(this.vector.y, this.vector.x);
    } else if (config.magnitude && config.direction) {
      this.magnitude = config.magnitude;
      this.direction = config.direction;
      this.vector = {
        x: this.magnitude * Math.cos(this.direction),
        y: this.magnitude * Math.sin(this.direction),
      };
    } else {
      this.magnitude = 0;
      this.direction = 0;
      this.vector = { x: 0, y: 0 };
    }

    this.startX = startX;
    this.startY = startY;
    this.update();
  }

  setColor(color) {
    this.arrow.stroke(color);
    this.arrow.fill(color);
    this.arrow.draw();
  }

  setStrokeWidth(strokeWidth) {
    this.arrow.strokeWidth(strokeWidth);
    this.arrow.draw();
  }

  update() {
    this.arrow.points([this.startX, this.startY, this.startX + this.vector.x, this.startY + this.vector.y]);
    //this.arrow.draw();
  }
}

export { VisualVector };


startAnimation() {
    //frame.time ειναι ο χρονος σε ms απο την αρχη της προσομοιωσης
    if (this.animation) {
        this.animation.stop(); // Σταματάμε το προηγούμενο animation αν υπάρχει
    }
    this.animation = new Konva.Animation((frame) => {
        this.options.time = frame.time * this.options.timeScale;
        this.options.timeInfirstPeriod = (frame.time * this.options.timeScale) % this.options.period;
        this.options.currentAngle = this.calculateAngle(frame.time * this.options.timeScale);
        this.updateSpherePosition();
        this.fireEventToAllOthers('Pendulum');
    }, this.getLayer());

    this.animation.start();
}

import { Widget } from './widget.js';

class SpreadSheet extends Widget {
    constructor(options) {
        super(options);

        this.options = {
            ...this.options,
            cellWidth: options.cellWidth || 100,
            cellHeight: options.cellHeight || 30,
            cellPadding: options.cellPadding || 5,
            cellBackgroundColor: options.cellBackgroundColor || 'transparent',
            cellStroke: options.cellStroke || 'black',
            cellStrokeWidth: options.cellStrokeWidth || 1,
            cellStrokeEnabled: options.cellStrokeEnabled && false,
            tableBackgroundColor: options.tableBackgroundColor || 'transparent',
            tableStroke: options.tableStroke || 'black',
            tableStrokeWidth: options.tableStrokeWidth || 1,
            tableStrokeEnabled: options.tableStrokeEnabled && false,
            decimalPlaces: options.decimalPlaces || 2,
            align: options.align || 'center',
        };

        this.data = options.data || [[]];
        this.cellStyles = {};

        this.draw();
    }

    draw() {
        this.removeChildren();

        const cellWidth = this.options.cellWidth;
        const cellHeight = this.options.cellHeight;
        const cellPadding = this.options.cellPadding;
        const decimalPlaces = this.options.decimalPlaces;

        // Δημιουργία φόντου
        const tableBackground = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.data[0].length * cellWidth,
            height: this.data.length * cellHeight,
            fill: this.options.tableBackgroundColor,
        });
        this.add(tableBackground); // Προσθήκη φόντου πρώτο

        // Δημιουργία περιγράμματος
        const tableBorder = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.data[0].length * cellWidth,
            height: this.data.length * cellHeight,
            stroke: this.options.tableStroke,
            strokeWidth: this.options.tableStrokeWidth,
            strokeEnabled: !!this.options.tableStrokeEnabled,
        });
        

        this.data.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellStyle = this.cellStyles[`${rowIndex}-${colIndex}`] || {};
                const cellRect = new Konva.Rect({
                    x: colIndex * cellWidth,
                    y: rowIndex * cellHeight,
                    width: cellWidth,
                    height: cellHeight,
                    fill: cellStyle.backgroundColor || this.options.cellBackgroundColor,
                    stroke: cellStyle.stroke || this.options.cellStroke,
                    strokeWidth: cellStyle.strokeWidth || this.options.cellStrokeWidth,
                    strokeEnabled: !!this.options.cellStrokeEnabled,
                });
                this.add(cellRect);

                let textValue = cell;
                if (typeof cell === 'number') {
                    textValue = cell.toFixed(decimalPlaces);
                }

                const text = new Konva.Text({
                    x: colIndex * cellWidth + cellPadding,
                    y: rowIndex * cellHeight + cellPadding,
                    width: cellWidth - 2 * cellPadding,
                    height: cellHeight - 2 * cellPadding,
                    text: textValue,
                    align: cellStyle.align || this.options.align,
                    verticalAlign: 'middle',
                });
                this.add(text);
            });
        });

        this.add(tableBorder); // Προσθήκη περιγράμματος δεύτερο
    }

    setCell(row, col, value) {
        if (!this.data[row]) {
            this.data[row] = [];
        }
        this.data[row][col] = value;
        this.draw();
    }

    getCell(row, col) {
        return this.data[row]?.[col];
    }

    setData(data){
        this.data = data;
        this.draw();
    }

    setCellStyle(row, col, style) {
        this.cellStyles[`${row}-${col}`] = style;
        this.draw();
    }

    getCellStyle(row, col) {
        return this.cellStyles[`${row}-${col}`] || {};
    }
}

export { SpreadSheet };