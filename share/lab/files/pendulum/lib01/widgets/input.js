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
            onInput: options.onInput || ((event)=>{}),
            // ... άλλες ιδιότητες που μπορεί να χρειαστούν
        };

        this.clipGroup = new Konva.Group({ // Δημιουργία του group για το clip
            //x: this.options.padding, // Τοποθέτηση του group με padding
            //y: this.options.padding,
            clip: { // Ορισμός της περιοχής clip
                x: 0,
                y: 0,
                width: this.options.width - 2 * this.options.padding, // Αφαίρεση του padding από το πλάτος
                height: this.options.height + 2 * this.options.padding // Αφαίρεση του padding από το ύψος
            }
        });

        this.textBeforeCursor = new Konva.Text({
            text: this.options.placeHolder, // Αρχικά εμφανίζουμε το placeholder
            fontSize: this.options.fontSize,
            fontFamily: this.options.fontFamily,
            fill: 'gray',
            x: this.options.padding ,
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
        this.on('click', this.handleClick.bind(this));
        //this.on('mouseover', this.options.handleMouseOver);
        //this.on('mouseout', this.options.handleMouseOut);
        this.on('focus', this.handleFocus.bind(this));
        this.on('blur', this.handleBlur.bind(this));

        this.add(this.rect); // Προσθήκη του rect (πρώτα)
        this.add(this.clipGroup); // Προσθήκη του group (μετά)
    }

    handleClick(event) {
        //this.options.isActive = true;
        this.fire('focus');
        //this.fireEventToAllOthers('blur');
        //this.textBeforeCursor.fill(this.options.fontColor);
        //this.updateTextInDisplay();
    }

    handleFocus(event){
        //console.log("Input Focus");
        this.fireEventToAllOthers('blur');
        this.options.isActive = true;
        this.textBeforeCursor.fill(this.options.fontColor);
        this.textAtCursor.fill(this.options.fontColor);
        this.textAfterCursor.fill(this.options.fontColor);
        this.updateTextInDisplay();
    }

    handleBlur(event) {
        //console.log("Input Blur");
        this.options.isActive = false;
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
            this.options.onInput();
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
        let x = this.textBeforeCursor.x();

        this.textBeforeCursor.x(x);
        x += this.textBeforeCursor.width();

        this.textAtCursor.x(x);
        x += this.textAtCursor.width();

        this.textAfterCursor.x(x);
    }

    autoScroll() {
        const textWidth = this.textBeforeCursor.width() + this.textAtCursor.width() + this.textAfterCursor.width();
        const rectWidth = this.options.width - 2 * this.options.padding;

        if (textWidth > rectWidth) {
            const offsetX = this.textBeforeCursor.width() + this.textAtCursor.width() - 8 * rectWidth / 10;
            let newX = this.options.padding - offsetX;
            if(newX>=0){newX = 0;}
            this.textBeforeCursor.x(newX+5);
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

    }

export { Input };