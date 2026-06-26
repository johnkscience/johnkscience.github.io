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
            fill: options.fill || "white",
            stroke: options.stroke || "gray",
            strokeWidth: options.strokeWidth || 1,
            cornerRadius: options.cornerRadius || 0,
            buttonFill: options.buttonFill || "lightgray",
            buttonStroke: options.buttonStroke || "gray",
            buttonStrokeWidth: options.buttonStrokeWidth || 1,
            buttonCornerRadius: options.buttonCornerRadius || 0,
            buttonMouseoverFill: options.buttonMouseoverFill || "gray"
        };

        this.expression = "";

        this.input = new Input({
            x: this.options.padding,
            y: this.options.padding,
            width: this.options.width - 2 * this.options.padding - 50, // Αφήνουμε χώρο για το κουμπί
            height: this.options.height - 2 * this.options.padding,
            fontColor: this.options.fontColor,
            fontFamily: this.options.fontFamily,
            fontSize: this.options.fontSize,
            fill: this.options.fill,
            stroke: this.options.stroke,
            strokeWidth: this.options.strokeWidth,
            cornerRadius: this.options.cornerRadius,
            placeHolder: "Enter expression...",
            text: this.expression
        });
        this.add(this.input);

        this.calculateButton = new Button({
            x: this.options.width - 50 + this.options.padding,
            y: this.options.padding,
            width: 40,
            height: this.options.height - 2 * this.options.padding,
            text: "=",
            fill: this.options.buttonFill,
            stroke: this.options.buttonStroke,
            strokeWidth: this.options.buttonStrokeWidth,
            cornerRadius: this.options.buttonCornerRadius,
            mouseoverFill: this.options.buttonMouseoverFill,
            onClick: () => {
                this.calculate();
            }
        });
        this.add(this.calculateButton);

        this.input.on('input', () => {
            this.expression = this.input.getText();
        });

        this.rect = new Konva.Rect({
            width: this.options.width,
            height: this.options.height,
            fill: this.options.fill,
            stroke: this.options.stroke,
            strokeWidth: this.options.strokeWidth,
            cornerRadius: this.options.cornerRadius,
        });

        this.add(this.rect);
        this.add(this.input);
        this.add(this.calculateButton);
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
}

export { LineCalculator };