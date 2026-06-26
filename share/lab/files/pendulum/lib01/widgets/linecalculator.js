import { Widget } from './widget.js';
import { Input } from './input.js';
import { Button } from './button.js';

class LineCalculator extends Widget {
    constructor(options) {
        super(options);

        this.options.name = "LineCalculator" + this.options.id;
        this.options = {
            x: options.x || 0,
            y: options.y || 0,
            width: options.width || 200,
            height: options.height || 50,
            padding: options.padding || 5,
            fontSize: options.fontSize || 14,
            fontFamily: options.fontFamily || 'Courier',
            fontColor: options.fontColor || 'black',

            // Rectangle (Πλαίσιο)
            rectFill: options.rectFill || "white",
            rectStroke: options.rectStroke || "gray",
            rectStrokeWidth: options.rectStrokeWidth || 1,
            rectCornerRadius: options.rectCornerRadius || 0,

            // Input
            inputFill: options.inputFill || "white",
            inputStroke: options.inputStroke || "gray",
            inputStrokeWidth: options.inputStrokeWidth || 1,
            inputCornerRadius: options.inputCornerRadius || 0,

            // Calculate Button
            calcButtonFill: options.calcButtonFill || "lightgray",
            calcButtonStroke: options.calcButtonStroke || "gray",
            calcButtonStrokeWidth: options.calcButtonStrokeWidth || 1,
            calcButtonCornerRadius: options.calcButtonCornerRadius || 0,
            calcButtonMouseoverFill: options.calcButtonMouseoverFill || "gray",

            // Info Button
            infoButtonFill: options.infoButtonFill || "lightgray",
            infoButtonStroke: options.infoButtonStroke || "gray",
            infoButtonStrokeWidth: options.infoButtonStrokeWidth || 1,
            infoButtonCornerRadius: options.infoButtonCornerRadius || 0,
            infoButtonMouseoverFill: options.infoButtonMouseoverFill || "gray"
        };

        this.expression = "";

        this.infoButton = new Button({
            x: this.options.width - this.options.fontSize - 3* this.options.padding,
            y: this.options.padding,
            width: this.options.fontSize + 2*this.options.padding,
            height: this.options.fontSize + 2*this.options.padding,
            imageSrc: './widgets/icons/info.png',
            fill: this.options.infoButtonFill,
            stroke: this.options.infoButtonStroke,
            strokeWidth: this.options.infoButtonStrokeWidth,
            cornerRadius: this.options.infoButtonCornerRadius,
            mouseoverFill: this.options.infoButtonMouseoverFill,
            onClick: () => {
                //this.expression = this.input.getText();
                //this.calculate();
                //this.input.fire('focus');
            }
        });

        this.calculateButton = new Button({
            x: this.options.width - 2 * this.options.fontSize - 6 * this.options.padding,
            y: this.options.padding,
            width: this.options.fontSize + 2*this.options.padding,
            height: this.options.fontSize + 2*this.options.padding,
            imageSrc: './widgets/icons/equal.png',
            fill: this.options.calcButtonFill,
            stroke: this.options.calcButtonStroke,
            strokeWidth: this.options.calcButtonStrokeWidth,
            cornerRadius: this.options.calcButtonCornerRadius,
            mouseoverFill: this.options.calcButtonMouseoverFill,
            onClick: () => {
                this.expression = this.input.getText();
                this.calculate();
                this.input.fire('focus');
            }
        });


        this.input = new Input({
            x: this.options.padding,
            y: this.options.padding,
            width: this.options.width - 4 * this.options.padding -
                this.infoButton.width() - this.calculateButton.width(),
            height: this.options.fontSize+2*this.options.padding,
            fontColor: this.options.fontColor,
            fontFamily: this.options.fontFamily,
            fontSize: this.options.fontSize,
            fill: this.options.inputFill,
            stroke: this.options.inputStroke,
            strokeWidth: this.options.inputStrokeWidth,
            cornerRadius: this.options.inputCornerRadius,
            placeHolder: "Αριθμητικές πράξεις...",
            text: this.expression,
            padding:this.options.padding,
            onInput: () => {
                this.expression = this.input.getText();
                this.calculate();
                this.input.fire('focus');
            }
        });



        this.rect = new Konva.Rect({
            width: this.options.width,
            height:  this.options.fontSize + 4 * this.options.padding,
            fill: this.options.rectFill,
            stroke: this.options.rectStroke,
            strokeWidth: this.options.rectStrokeWidth,
            cornerRadius: this.options.rectCornerRadius,
        });

        this.add(this.rect);
        this.add(this.input);
        this.add(this.calculateButton);
        this.add(this.infoButton);

        this.on('blur', this.handleBlur.bind(this));
    }



    calculate() {
        try {
            const result = eval(this.expression); // Προσωρινά χρησιμοποιούμε eval()
            this.input.setText(result.toString());
            this.expression = result.toString();
        } catch (error) {
            this.input.setText("Error");
            this.expression = "";
        }
    }

    handleBlur(event) {
        this.input.fire('blur');
    }
}

export { LineCalculator };