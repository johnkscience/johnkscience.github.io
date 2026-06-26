import { Widget } from './widget.js';

class Radio extends Widget {
    constructor(options) {
        super(options);

        this.options.name = "Radio"+this.options.id;
        this.options = {
            ...this.options,
            options: options.options || [], // Λίστα των διαθέσιμων τιμών
            value: options.value || null, // Αρχική επιλεγμένη τιμή
            width: options.width || 100, // Πλάτος του widget
            height: options.height || 20, // Ύψος του κάθε radio button
            groupName: options.groupName || 'radioGroup', // Όνομα της ομάδας για τα radio buttons
            onChange: options.onChange || null, // Callback function που καλείται όταν αλλάζει η επιλεγμένη τιμή
        
            // Προσθήκη ιδιοτήτων χρωματισμού
            circleFill: options.circleFill || 'white',
            circleStroke: options.circleStroke || 'black',
            circleStrokeWidth: options.circleStrokeWidth || 1,
            radioInputFill: options.radioInputFill || 'black',
            textColor: options.textColor || 'black',
        };

        this.on('blur', this.handleBlur.bind(this));
        this.on('focus', this.handleFocus.bind(this));

        this.createRadioButtons();
    }

    createRadioButtons() {
        this.radioButtons = [];

        this.options.options.forEach((option, index) => {
            const radioButton = new Konva.Group({
                x: 0,
                y: index * this.options.height,
            });

            const circle = new Konva.Circle({
                radius: this.options.height / 3,
                fill: this.options.circleFill, // Χρήση της νέας ιδιότητας
                stroke: this.options.circleStroke, // Χρήση της νέας ιδιότητας
                strokeWidth: this.options.circleStrokeWidth, // Χρήση της νέας ιδιότητας
            });

            const radioInput = new Konva.Circle({
                radius: this.options.height / 6,
                fill: this.options.radioInputFill, // Χρήση της νέας ιδιότητας
                visible: option === this.options.value,
                x: circle.x(),
                y: circle.y(),
            });

            const text = new Konva.Text({
                text: option,
                fontSize: 12,
                fill: this.options.textColor, // Χρήση της νέας ιδιότητας
                x: this.options.height,
                y: circle.y() - 5,
            });

            radioButton.add(circle);
            radioButton.add(radioInput);
            radioButton.add(text);

            radioButton.on('click', () => {
                this.fire('focus');
                this.setValue(option);
                this.fireEventToAllOthers('blur');
            });

            this.add(radioButton);
            this.radioButtons.push(radioButton);
        });
    }

    setValue(value) {
        if (value !== this.options.value) {
            this.options.value = value;
            this.updateRadioButtons(); // Ενημέρωση της εμφάνισης των radio buttons
            this.fireEventToAllOthers('radio');
            if (this.options.onChange) {
                this.options.onChange();
            }
        }
    }

    updateRadioButtons() {
        this.radioButtons.forEach(radioButton => {
            const radioInput = radioButton.getChildren()[1]; // Το δεύτερο παιδί είναι το radioInput
            radioInput.visible(radioButton.getChildren()[2].text() === this.options.value); // Σύγκριση με την τρέχουσα τιμή
        });
    }

    handleFocus(event){
        this.options.isActive = true;
        //console.log('Radio Focus');
    }

    handleBlur(event){
        this.options.isActive = false;
        //console.log('Radio Blur');
    }

    getValue() {
        return this.options.value;
    }
}

export { Radio };