import { Widget } from './widget.js';

class Select extends Widget {
    constructor(options) {
        super(options);

        this.options.name = "Select"+this.options.id; 
        this.options = {
            ...this.options,
            // Οι τιμές που θα εμφανίζονται στο μενού
            options: options.options || [],
            // Η αρχική επιλεγμένη τιμή
            value: options.value || null,
            // Στυλιστικές επιλογές
            rectFill: options.rectFill || 'white',
            rectStroke: options.rectStroke || 'black',
            rectStrokeWidth: options.rectStrokeWidth || 1,
            rectRadius: options.rectRadius || 0,
            menuFill: options.menuFill || 'white',
            menuStroke: options.menuStroke || 'black',
            menuStrokeWidth: options.menuStrokeWidth || 1,
            menuRadius: options.menuRadius || 0,
            fontSize: options.fontSize || 12,
            fontColor: options.fontColor || 'black',
            onSelect: options.onSelect || null, // Callback function
        };

        // Δημιουργία των γραφικών στοιχείων
        this.createRect();
        this.createText();
        this.createMenu();

        this.add(this.rect);
        this.add(this.text);

        // Αρχικοποίηση της εμφάνισης
        //this.updateText();
        this.text.text(this.options.value);

        // Συμπεριφορά όταν γίνεται κλικ στο widget
        this.on('click', (event) => {
            this.options.isActive = true;
            this.fire('focus');
            this.toggleMenu();
            this.fireEventToAllOthers('blur');
        });

        this.on('blur', this.handleBlur.bind(this));
        this.on('focus', this.handleFocus.bind(this));

    }

    createRect() {
        this.rect = new Konva.Rect({
            width: this.options.width,
            height: this.options.height,
            fill: this.options.rectFill,
            stroke: this.options.rectStroke,
            strokeWidth: this.options.rectStrokeWidth,
            cornerRadius: this.options.rectRadius,
            shadowBlur: 3, // Προσαρμόστε την τιμή για να ελέγξετε την "θόλωση"
            shadowColor: 'rgba(0, 0, 0, 0.2)', // Προσαρμόστε το χρώμα και την αδιαφάνεια
            shadowOffsetX: 3, // Προσαρμόστε την τιμή για να μετακινήσετε τη σκιά οριζόντια
            shadowOffsetY: 3, // Προσαρμόστε την τιμή για να μετακινήσετε τη σκιά κάθετα
        });
    }

    createText() {
        this.text = new Konva.Text({
            text: '',
            fontSize: this.options.fontSize,
            fill: this.options.fontColor,
            align: 'center',
            width: this.options.width,
            listening: false, // Απενεργοποίηση της "ακρόασης" και εδώ
        });
        // Υπολογισμός και προσαρμογή της θέσης y
        const textHeight = this.text.height();
        const rectHeight = this.options.height;
        const yOffset = (rectHeight - textHeight) / 2;
        this.text.y(yOffset);
    }

    createMenu() {
        this.menu = new Konva.Group({
            visible: false,
        });

        this.options.options.forEach((option, index) => {
            const menuItem = new Konva.Rect({
                width: this.options.width,
                height: this.options.height,
                fill: this.options.menuFill,
                stroke: this.options.menuStroke,
                strokeWidth: this.options.menuStrokeWidth,
                y: (index+1) * this.options.height,
                cornerRadius: this.options.menuRadius,
            });

            const menuItemText = new Konva.Text({
                text: option,
                fontSize: this.options.fontSize,
                fill: this.options.fontColor,
                align: 'center',
                verticalalign: 'middle',
                width: this.options.width,
                y: (index+1) * this.options.height,
                listening: false, // Απενεργοποίηση της "ακρόασης" και εδώ
            });

            // Υπολογισμός και προσαρμογή της θέσης y
            const textHeight = menuItemText.height();
            const rectHeight = this.options.height;
            const yOffset = (rectHeight - textHeight) / 2;
            menuItemText.y((index+1) * this.options.height + yOffset); // Προσθήκη του offset στην αρχική θέση

            menuItem.on('click', (event) => {
                event.cancelBubble = true;
                this.options.value = option;
                this.updateText();
                this.toggleMenu();
            });

            this.menu.add(menuItem);
            this.menu.add(menuItemText);
        });

        this.add(this.menu);
    }

    handleBlur(event) {
        //console.log("Select Blur");
        this.options.isActive = false;
        this.menu.visible(false); // Κλείσιμο του μενού όταν χάνεται η εστίαση
    }

    handleFocus(event){
        //console.log("Select Focus");
    }

    updateText() {
        this.text.text(this.options.value);
        this.fireEventToAllOthers('select');
        //console.log('fire Select');
        if (this.options.onSelect) {
            this.options.onSelect(this.options.value); // Κλήση της callback function
        }
    }

    toggleMenu() {
        setTimeout(() => this.menu.visible(!this.menu.visible()), 70);
        //this.menu.visible(!this.menu.visible());
    }

    getText() {
        return this.text.text();
    }
}

export { Select };