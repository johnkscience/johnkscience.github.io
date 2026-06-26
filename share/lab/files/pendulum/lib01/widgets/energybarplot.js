import { Widget } from './widget.js';

class EnergyBarPlot extends Widget {
    constructor(options) {
        super(options);

        this.options = {
            ...this.options,
            barColors: options.barColors || ['red', 'green', 'blue'],
            barWidth: options.barWidth || 50,
            barSpacing: options.barSpacing || 20,
            energyLabels: options.energyLabels || ['Δυναμική Ενέργεια', 'Κινητική Ενέργεια', 'Συνολική Ενέργεια'],
            energyValues: options.energyValues || [0, 0, 0],
            frameStroke: options.frameStroke || 'gray', // Χρώμα περιγράμματος πλαισίου
            frameStrokeWidth: options.frameStrokeWidth || 1, // Πάχος περιγράμματος πλαισίου
            frameFill: options.frameFill || 'snow',       // χρώμα γεμίσματος πλαισίου
            fontSize: options.fontSize || 12,
            fontColor: options.fontColor || 'gray',
            fontFamily: options.fontFamily || 'Times',
            title: options.title || "",
        };

        this.draw();
    }

    draw() {
        this.destroyChildren();

        // Δημιουργία πλαισίου
        const frame = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.options.width,
            height: this.options.height,
            stroke: this.options.frameStroke,
            strokeWidth: this.options.frameStrokeWidth,
            fill: this.options.frameFill,
        });
        this.add(frame);

        //Τυπωνει τον τιτλο
        if(this.options.title){
            const title = new Konva.Text({
                text: this.options.title,
                y: -this.options.fontSize-4 - this.options.padding, // Τοποθετούμε τον τίτλο πάνω από το γράφημα
                align: 'center',
                fontSize: this.options.fontSize+4,
                fontColor: this.options.fontColor,
                fontFamily: this.options.fontFamily,
            });
            
            title.x( this.options.width / 2 - title.width()/2);
            this.add(title);
        }

        const numBars = this.options.energyValues.length;
        const startX = (this.options.width - (numBars * this.options.barWidth + (numBars - 1) * this.options.barSpacing)) / 2;

        for (let i = 0; i < numBars; i++) {
            const barHeight = this.options.energyValues[i];//this.options.height * (this.options.energyValues[i] / Math.max(...this.options.energyValues));
            const x = startX + i * (this.options.barWidth + this.options.barSpacing);
            const y = this.options.height - barHeight;

            const bar = new Konva.Rect({
                x: x,
                y: y,
                width: this.options.barWidth,
                height: barHeight,
                fill: this.options.barColors[i],
            });

            const label = new Konva.Text({
                x: x + this.options.barWidth / 2,
                y: y - this.options.fontSize-5,
                text: this.options.energyLabels[i],
                align: 'center',
                verticalAlign: 'middle', // Κεντράρισμα κάθετα
                fontSize: this.options.fontSize,
                fontFamily: this.options.fontFamily,
                fill: this.options.fontColor,
            });
            label.x(label.x()-label.width()/2);

            const value = new Konva.Text({
                x: x + this.options.barWidth / 2,
                y: y - 2*this.options.fontSize-10,
                text: this.options.energyValues[i].toString() + "J",
                align: 'center',
                verticalAlign: 'middle', // Κεντράρισμα κάθετα
                fontSize: this.options.fontSize,
                fontFamily: this.options.fontFamily,
                fill: this.options.fontColor,
            });
            value.x(value.x()-value.width()/2)

            this.add(bar, label, value);
        }
    }

    setData(data) {
        this.options.energyValues = data;
        this.draw();
    }

    removeData() {
        this.options.energyValues = [0, 0, 0];
        this.draw();
    }
}

export { EnergyBarPlot };