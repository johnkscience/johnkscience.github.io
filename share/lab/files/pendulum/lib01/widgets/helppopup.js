// widgets/help-popup.js
import { Widget } from './widget.js';
import { Button } from './button.js';

class HelpPopup extends Widget {
    constructor(options) {
        super(options);

        this.options.name = "HelpPopup"+this.options.id;
        this.options = {
            ...this.options,
            title: options.title || "Βοήθεια", // Προσθέτουμε τίτλο
            text: options.text || "Κείμενο βοήθειας",
            fontSize: options.fontSize || 12,
            fontFamily: options.fontFamily || "Arial",
            fontColor: options.fontColor || "black",
            rectFill: options.rectFill || "white",
            rectStroke: options.rectStroke || "black",
            rectStrokeWidth: options.rectStrokeWidth || 1,
            cornerRadius: options.cornerRadius || 0,
            titleFill: options.titleFill || "gray",
            titleStroke: options.titleStroke || "black",
            titleStrokeWidth: options.titleStrokeWidth || 1,
            buttonFill: options.buttonFill || "gray",
            buttonStroke: options.buttonStroke || "black",
            buttonStrokeWidth: options.buttonStrokeWidth || 1,
            buttonWidth: options.buttonWidth || 20,
            buttonCornerRadius: options.buttonCornerRadius || 0,
            buttonMouseoverFill: options.buttonMouseoverFill || 'lightgray',
            padding: options.padding || 5,
        }

        // Δημιουργία του παραθύρου βοήθειας
        this.popupRect = new Konva.Rect({
            width: this.options.width,
            height: this.options.height,
            fill: this.options.rectFill,
            stroke: this.options.rectStroke,
            strokeWidth: this.options.rectStrokeWidth,
            cornerRadius: this.options.cornerRadius,
        });
        this.add(this.popupRect);

        // Δημιουργία του κουμπιού κλεισίματος (χρησιμοποιούμε την κλάση Button)
        this.closeButton = new Button({
            x: this.options.width - this.options.buttonWidth - this.options.padding,
            y: this.options.padding, // Τοποθέτηση δίπλα στον τίτλο
            width: this.options.buttonWidth,
            height: this.options.fontSize,
            padding: 2,
            text: 'x',
            fontSize: this.options.fontSize,
            fontColor: this.options.fontColor,
            fill: this.options.buttonFill,
            stroke: this.options.buttonStroke,
            strokeWidth: this.options.buttonStrokeWidth,
            mouseoverFill: this.options.buttonMouseoverFill,
            cornerRadius:this.buttonCornerRadius,
            onClick: () => {
                this.hidePopup();
            },
        });

        // Δημιουργία της περιοχής τίτλου (Konva.Rect)
        this.titleRect = new Konva.Rect({
            width: this.options.width,
            height: this.closeButton.height()+2*this.options.padding, // Υψος περιοχής τίτλου
            fill: this.options.titleFill, // Χρώμα υποβάθρου τίτλου
            stroke: this.options.titleStroke,
            strokeWidth: this.options.titleStrokeWidth,
            cornerRadius: this.options.cornerRadius, // Στρογγυλοποίηση γωνιών
        });
       

        // Δημιουργία του τίτλου (Konva.Text)
        this.titleText = new Konva.Text({
            x: this.options.padding,
            y: this.titleRect.height()/2-this.options.fontSize/2,
            text: this.options.title,
            fontSize: this.options.fontSize,
            fill: this.options.fontColor,
            fontFamily: this.options.fontFamily
        });
        
        // Δημιουργία του κειμένου βοήθειας (Konva.Text με wrap)
        this.popupText = new Konva.Text({
            x: this.options.padding,
            y: this.titleRect.height()+this.options.padding, // Τοποθέτηση κάτω από την περιοχή τίτλου
            width: this.options.width - 2*this.options.padding,
            //height: this.options.height - 50, // Προσαρμογή ύψους
            text: this.options.text,
            fontSize: this.options.fontSize+2,
            fill: this.options.fontColor,
            fontFamily: this.options.fontFamily,
            wrap: 'word',
        });

        this.popupRect.height(this.popupText.height()+2*this.options.padding+this.titleRect.height());
        
        this.add(this.titleRect);
        this.add(this.titleText);
        this.add(this.closeButton);
        this.add(this.popupText);

        //this.on('click', this.handleClick.bind(this));
        this.on('blur', this.handleBlur.bind(this));
        this.on('focus', this.handleFocus.bind(this));

        this.hidePopup(); // Αρχικά κρυφό

    }

    handleBlur(event){
        this.hidePopup();
    }

    handleFocus(event){
        this.showPopup();
    }

    showPopup(){
        this.options.isActive = true;
        this.show();
        this.fireEventToAllOthers('blur');
    }

    hidePopup(){
        this.options.isActive = false;
        this.hide();
    }

    // ... (show() και hide() μέθοδοι όπως πριν)
}

export { HelpPopup };