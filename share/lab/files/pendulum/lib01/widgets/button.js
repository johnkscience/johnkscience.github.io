/*
Εδώ είναι η λίστα με τις ιδιότητες και τις μεθόδους της κλάσης Button με υπογραφές και σύντομες περιγραφές:

Ιδιότητες (που μπορούν να χρησιμοποιηθούν κατά την αρχικοποίηση):

    x: number (προεπιλογή: 0): Η οριζόντια θέση του κουμπιού.
    y: number (προεπιλογή: 0): Η κατακόρυφη θέση του κουμπιού.
    text: string (προεπιλογή: το όνομα του κουμπιού): Το κείμενο που εμφανίζεται στο κουμπί.
    formattedText: string: Κείμενο με μορφοποίηση.
    fontSize: number (προεπιλογή: 12): Το μέγεθος της γραμματοσειράς.
    fontFamily: string (προεπιλογή: "Arial"): Η οικογένεια γραμματοσειράς.
    fontColor: string (προεπιλογή: "gray"): Το χρώμα του κειμένου.
    padding: number (προεπιλογή: 5): Η απόσταση μεταξύ του κειμένου και του περιγράμματος.
    fill: string (προεπιλογή: "white"): Το χρώμα γεμίσματος του κουμπιού.
    stroke: string (προεπιλογή: "gray"): Το χρώμα περιγράμματος του κουμπιού.
    strokeWidth: number (προεπιλογή: 1): Το πάχος του περιγράμματος.
    cornerRadius: number (προεπιλογή: 0): Η ακτίνα στρογγυλοποίησης των γωνιών.
    mouseoverFill: string: Το χρώμα γεμίσματος κατά το mouseover.
    onClick: function: Συνάρτηση που καλείται όταν το κουμπί πατηθεί.
    imageSrc: string: διαδρομή εικόνας που θα εμφανιστεί στο κουμπί.

Μέθοδοι:
    setText(newText: string) Αλλάζει το κείμενο που εμφανίζεται στο κουμπί.

Γεγονότα:
    * Το κουμπί στέλνει σε ολα τα Widgets αυτου του καμβά το σήμα "button".

    */
import { Widget } from './widget.js';
import { FormattedText } from './formattedtext.js';
// widgets/button.js

/**
 * Κλάση που δημιουργεί ένα κουμπί με δυνατότητα προσαρμογής.
 * Κληρονομεί από την κλάση `Widget`.
 * @class
 * @extends Widget
 */
class Button extends Widget {
  
    /**
     * @constructor
     * @param {Object} options - Οι επιλογές για τη δημιουργία του κουμπιού.
     * @param {number} [options.x=0] - Η θέση x του κουμπιού.
     * @param {number} [options.y=0] - Η θέση y του κουμπιού.
     * @param {string} [options.text] - Το κείμενο που θα εμφανίζεται στο κουμπί. Αν δεν δοθεί, χρησιμοποιείται το όνομα του κουμπιού.
     * @param {number} [options.fontSize=12] - Το μέγεθος της γραμματοσειράς.
     * @param {string} [options.fontFamily="Arial"] - Η οικογένεια γραμματοσειράς.
     * @param {string} [options.fontColor="gray"] - Το χρώμα του κειμένου.
     * @param {number} [options.padding=5] - Το padding γύρω από το κείμενο.
     * @param {string} [options.fill="white"] - Το χρώμα γεμίσματος του κουμπιού.
     * @param {string} [options.stroke="gray"] - Το χρώμα περιγράμματος του κουμπιού.
     * @param {number} [options.strokeWidth=1] - Το πάχος του περιγράμματος.
     * @param {number} [options.cornerRadius=0] - Η ακτίνα στρογγυλοποίησης των γωνιών.
     * @param {string} [options.mouseoverFill] - Το χρώμα γεμίσματος κατά το mouseover.
     */
    constructor(options) {
    super(options);
    
    this.options.name = "Button"+this.options.id; 
    this.options = {
        ...this.options,
        text: options.text || this.options.name,
        formattedText: options.formattedText,
        fontSize: options.fontSize || 12,
        fontFamily: options.fontFamily || "Arial",
        fontColor: options.fontColor || "gray",
        //padding: options.padding || 5,
        fill: options.fill || "white",
        stroke: options.stroke || "gray",
        strokeWidth: options.strokeWidth || 1,
        cornerRadius: options.cornerRadius || 0,
        mouseoverFill: options.mouseoverFill || "lightgray",
        onClick: options.onClick || ((event) => {}),
        imageSrc: options.imageSrc, // Προσθέτουμε την ιδιότητα imageSrc
        //formatedText: options.formatedText,
    }

    this.on('click', this.handleClick.bind(this));
    this.on('mouseover', this.handleMouseOver.bind(this));
    this.on('mouseout', this.handleMouseOut.bind(this));
    this.on('focus', this.handleFocus.bind(this));
    this.on('blur', this.handleBlur.bind(this));

    //το ορθογώνιο του κουμπιού
    this.rect = new Konva.Rect({
        width: this.options.width,
        height: this.options.height,
        fill: this.options.fill,        
        stroke: this.options.stroke,    
        strokeWidth: this.options.strokeWidth ,
        cornerRadius: this.options.cornerRadius,
        opacity:1, 
      });
  
      this.add(this.rect);

    if (this.options.imageSrc) {
        Konva.Image.fromURL(this.options.imageSrc, (imageObj) => {
            this.image = imageObj; // Assign the loaded image object
            this.image.width(this.options.width);
            this.image.height(this.options.height);
            this.add(this.image);
    
            if (!options.width) this.options.width = this.image.width();
            if (!options.height) this.options.height = this.image.height();
    
            this.rect.size({width: this.options.width, height: this.options.height});
            //this.getLayer().draw();
        }, (err) => {
            console.error("Error loading image:", err);
        });
    } else if(this.options.formattedText){
        this.text =  new FormattedText({
            x:this.options.padding,
            y:this.options.padding,
            source: this.options.formattedText,
            fontSize :this.options.fontSize,
            fontFamily: this.options.fontFamily,
            fontColor: this.options.fontColor,
      });
        this.options.width = this.text.width()+2.5*this.options.padding; 
        this.options.height = this.text.height()+2.5*this.options.padding;
        this.add(this.text);
    }else { // Αν δεν υπάρχει εικόνα, χρησιμοποιούμε το κείμενο
    
        //Το κείμενο που θα τυπωθεί πάνω στο κουμπί
        this.text = new Konva.Text({
            x:this.options.padding,
            y:this.options.padding,
            text: this.options.text,
            fontSize: this.options.fontSize,
            fontFamily:this.options.fontFamily,
            fill: this.options.fontColor,
        });

        // Έλεγχος αν το κείμενο είναι μεγαλύτερο από το πλάτος που έχει οριστεί για το κουμπί,
        // ή αν δεν έχει οριστεί καθόλου πλάτος (options.width).
        if (this.text.width() > this.options.width || !options.width) {
            // Αν το κείμενο είναι μεγαλύτερο ή δεν έχει οριστεί πλάτος,
            // τότε προσαρμόζουμε το πλάτος του κουμπιού στο πλάτος του κειμένου.
            this.options.width = this.text.width() + 2 * this.options.padding; // Υπολογίζουμε το νέο πλάτος
        } else {
            // Αν το κείμενο είναι μικρότερο ή ίσο με το πλάτος που έχει οριστεί,
            // τότε το κεντράρουμε οριζόντια μέσα στο κουμπί.
            this.options.x = (this.options.width - this.text.width()) / 2; // Υπολογίζουμε τη θέση x για το κείμενο
            this.text.x(this.options.x); // Θέτουμε τη θέση x του κειμένου
        }

        //Όμοια για το ύψος του κουμπιού
        if(this.text.height() > this.options.height || !options.height){
            this.options.height = this.text.height()+2*this.options.padding;
        }else{
            this.options.y = (this.options.height - this.text.height()) / 2;
            this.text.y(this.options.y);
        }
        this.add(this.text);
    }

    

    
    

    this.width(this.getClientRect().width);
    this.height(this.getClientRect().height);
  }

    handleClick(event){ 
        this.fire('focus');
        this.fireEventToAllOthers('blur');
        this.options.onClick(event);
        this.fireEventToAllOthers('button');
    }

    handleMouseOver(event){
        if(!!this.options.mouseoverFill){
            this.rect.fill(this.options.mouseoverFill)
        }else{
            this.rect.opacity(0.7);
        }
    }

    handleMouseOut(event){
        if(!!this.options.mouseoverFill){
            this.rect.fill(this.options.fill)
        }else{
            this.rect.opacity(1);
        }
    }

    handleFocus(event){
        //console.log("button Focus");
    }

    handleBlur(event){
        //console.log("Button blur");
    }

    setText(newText){
        this.text.text(newText);
    }
 
}

export { Button };
