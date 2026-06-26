import { Widget } from './widget.js';

class Checkbox extends Widget {
    constructor(options) {
        super(options);

        this.options.name = "CheckBox"+this.options.id;
        this.options = {
            ...this.options,
            checked: options.checked || false, // Αρχική κατάσταση (checked ή unchecked)
            width: options.width || 20,       // Πλάτος του checkbox
            height: options.height || 20,     // Ύψος του checkbox
            fill: options.fill || 'white',     // Χρώμα γεμίσματος
            stroke: options.stroke || 'black',   // Χρώμα περιγράμματος
            strokeWidth: options.strokeWidth || 1, // Πάχος περιγράμματος
            onChange: options.onChange || (() =>{}),
            cornerRadius: options.cornerRadius || 0,
            checkmarkStroke: options.checkmarkStroke || 'black',
        };

        this.createRect();
        this.createCheckMark();

        this.add(this.rect);
        this.add(this.checkMark);

        this.on('click', this.handleClick.bind(this));
        this.on('blur', this.handleBlur.bind(this));
        this.on('focus', this.handleFocus.bind(this));
        
    }

    createRect() {
        this.rect = new Konva.Rect({
            width: this.options.width,
            height: this.options.height,
            fill: this.options.fill,
            stroke: this.options.stroke,
            strokeWidth: this.options.strokeWidth,
            cornerRadius: this.options.cornerRadius,
        });
    }

    createCheckMark() {
        this.checkMark = new Konva.Line({
            points: [
                this.options.width / 4, this.options.height / 2,
                this.options.width / 2, this.options.height * 3 / 4,
                this.options.width * 3 / 4, this.options.height / 4,
            ],
            stroke: this.options.checkmarkStroke, // Χρώμα του τσεκ
            strokeWidth: 3,   // Πάχος του τσεκ
            visible: this.options.checked, // Εμφάνιση/απόκρυψη ανάλογα με την αρχική κατάσταση
        });
    }

    toggle() {
        this.options.checked = !this.options.checked; // Αλλαγή κατάστασης
        this.checkMark.visible(this.options.checked);   // Ενημέρωση εμφάνισης τσεκ
        this.fireEventToAllOthers('checkBox'); // Ενημέρωση άλλων widgets
        this.options.onChange();
    }

    handleClick(event){
        this.fire('focus');
        this.fireEventToAllOthers('blur');
        this.toggle();
    }

    handleFocus(event){
        this.options.isActive = true;
        //console.log('CheckBox Focus');
    }

    handleBlur(event){
        this.options.isActive = false;
        //console.log('CheckBox Blur');
    }

    isChecked() {
        return this.options.checked;
    }
}

export { Checkbox };