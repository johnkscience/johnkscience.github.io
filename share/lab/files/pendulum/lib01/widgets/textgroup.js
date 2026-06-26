import { Widget } from './widget.js';

class TextGroup extends Widget {
    constructor(options) {
        super(options);

        this.options = {
            ...this.options,
            text: options.text || '',
            fontSize: options.fontSize || 12,
            fontFamily: options.fontFamily || 'Arial',
            fontColor: options.fontColor || 'black',
            padding: options.padding || 5,
            stroke: options.stroke || 'gray',
            strokeWidth: options.strokeWidth || 1,
            cornerRadius: options.cornerRadius || 5,
            opacity: options.opacity || 0.8,
            width: options.width,
            height: options.height,
        };

       

        this.textNode = new Konva.Text({
            text: this.options.text,
            fontSize: this.options.fontSize,
            fontFamily: this.options.fontFamily,
            fill: this.options.fontColor,
            padding: this.options.padding,
            align: 'center',
            verticalAlign: 'middle',
        });

        this.path = new Konva.Path({
            data: this.createRoundedRectPath(),
            stroke: this.options.stroke,
            strokeWidth: this.options.strokeWidth,
            fill: 'transparent',
            opacity: this.options.opacity,
        });

        this.add(this.path);
        this.add(this.textNode);

        this.updateTextPosition();
    }

    createRoundedRectPath() {
        const width = this.options.width || this.textNode.width() + 2 * this.options.padding;
        const height = this.options.height || this.textNode.height() + 2 * this.options.padding;
        const cornerRadius = this.options.cornerRadius;
        const textWidth = this.textNode.width() + 2 * this.options.padding;
        const textHeight = this.textNode.height() + 2 * this.options.padding;

        const pathData = [
            `M ${cornerRadius} ${textHeight / 2}`,
            `L ${(width - textWidth) / 2} ${textHeight / 2}`, // Έναρξη διακοπής πριν το κείμενο
            `M ${(width + textWidth) / 2} ${textHeight / 2}`, // Έναρξη περιγράμματος μετά το κείμενο
            `L ${width - cornerRadius} ${textHeight / 2}`,
            `A ${cornerRadius} ${cornerRadius} 0 0 1 ${width} ${textHeight / 2 + cornerRadius}`,
            `L ${width} ${height - cornerRadius}`,
            `A ${cornerRadius} ${cornerRadius} 0 0 1 ${width - cornerRadius} ${height}`,
            `L ${cornerRadius} ${height}`,
            `A ${cornerRadius} ${cornerRadius} 0 0 1 0 ${height - cornerRadius}`,
            `L 0 ${textHeight / 2 + cornerRadius}`,
            `A ${cornerRadius} ${cornerRadius} 0 0 1 ${cornerRadius} ${textHeight / 2}`,
        ].join(' ');

        return pathData;
    }

    updateTextPosition() {
        this.textNode.x((this.options.width - this.textNode.width()) / 2);
        this.textNode.y(this.options.padding / 2); // Τοποθέτηση στο κέντρο του διαστήματος
    }

    setText(text) {
        this.textNode.text(text);
        this.options.text = text;
        this.path.data(this.createRoundedRectPath()); // Ενημέρωση του περιγράμματος
        this.updateTextPosition();
        //this.getLayer().draw();
    }
}

export { TextGroup };