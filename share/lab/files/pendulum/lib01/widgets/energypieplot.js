import { Widget } from './widget.js';

class EnergyPiePlot extends Widget {
    constructor(options) {
        super(options);

        this.options = {
            ...this.options,
            pieColors: options.pieColors || ['red', 'green', 'blue'],
            energyLabels: options.energyLabels || ['Δυναμική Ενέργεια', 'Κινητική Ενέργεια', 'Συνολική Ενέργεια'],
            energyValues: options.energyValues || [0, 0, 0],
            frameStroke: options.frameStroke || 'gray',
            frameStrokeWidth: options.frameStrokeWidth || 1,
            frameFill: options.frameFill || 'snow',
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
        if (this.options.title) {
            const title = new Konva.Text({
                text: this.options.title,
                y: -this.options.fontSize - 4 - this.options.padding,
                align: 'center',
                fontSize: this.options.fontSize + 4,
                fontColor: this.options.fontColor,
                fontFamily: this.options.fontFamily,
            });

            title.x(this.options.width / 2 - title.width() / 2);
            this.add(title);
        }

        const totalEnergy = this.options.energyValues.reduce((sum, value) => sum + value, 0); // Υπολογίζουμε τη συνολική ενέργεια
        let startAngle = 0;
        const centerX = this.options.width / 2;
        const centerY = this.options.height / 2;
        const radius = Math.min(centerX, centerY) * 0.6; // Υπολογίζουμε την ακτίνα του κύκλου, αφήνοντας λίγο χώρο

        for (let i = 0; i < this.options.energyValues.length; i++) {
            const angle = (this.options.energyValues[i] / totalEnergy) * 360; // Υπολογίζουμε τη γωνία για κάθε τμήμα
            const pieSlice = new Konva.Wedge({
                x: centerX,
                y: centerY,
                radius: radius,
                angle: angle,
                fill: this.options.pieColors[i],
                rotation: startAngle,
                clockwise: false,
            });

            const labelX = centerX + (radius + 20) * Math.cos( (startAngle + angle/2) * Math.PI / 180 );
            const labelY = centerY + (radius + 20) * Math.sin( (startAngle + angle/2) * Math.PI / 180 );

            const label = new Konva.Text({
                x: labelX,
                y: labelY,
                text: this.options.energyLabels[i] + ": " + this.options.energyValues[i].toString() + "J",
                align: 'center',
                verticalAlign: 'middle',
                fontSize: this.options.fontSize,
                fontFamily: this.options.fontFamily,
                fill: this.options.fontColor,
            });
            label.x(label.x() - label.width() / 2); // Κεντράρισμα οριζόντιας ετικέτας

            this.add(pieSlice, label);
            startAngle += angle;
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

export { EnergyPiePlot };