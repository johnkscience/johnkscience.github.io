import { LabInstrument } from './LabInstrument.js';
import { Selector } from './Selector.js';

export class Thermometer extends LabInstrument {
    constructor(x, y, minTemp = 0, maxTemp = 1000) {
        super(x, y);
        this.minTemp = minTemp;   
        this.maxTemp = maxTemp;   
        this.currentTemp = 300;   // Πάντα εσωτερικά δουλεύουμε με Kelvin
        this.currentUnit = 'C';   // Βάζουμε προεπιλογή τον Κελσίου για ευκολία
        
        this.tubeWidth = 12;
        this.tubeHeight = 150;
        this.bulbRadius = 14;

        // Ενσωματωμένος Επιλογέας Κλίμακας
        // Τον τοποθετούμε λίγο πιο κάτω και αριστερά από το κέντρο του βολβού
        this.unitSelector = new Selector(x - 45, y + 45, ["Kelvin", "Celsius", "Fahrenheit"], 1, (selected, index) => {
            if (index === 0) this.currentUnit = 'K';
            else if (index === 1) this.currentUnit = 'C';
            else if (index === 2) this.currentUnit = 'F';
        });
    }

    setTemperature(temp) {
        this.currentTemp = Math.max(this.minTemp, Math.min(temp, this.maxTemp));
    }

    update(dt, sim) {
        // Προωθούμε τα events του ποντικιού στον εσωτερικό επιλογέα
        this.unitSelector.update(dt, sim);
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // 1. Σχεδίαση γυάλινου σωλήνα
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.strokeStyle = "#888";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-this.tubeWidth / 2, -this.tubeHeight, this.tubeWidth, this.tubeHeight, 5);
        ctx.fill();
        ctx.stroke();

        // 2. Υπολογισμός και Σχεδίαση υγρού (κόκκινη στήλη)
        let tempRange = this.maxTemp - this.minTemp;
        let percentage = (this.currentTemp - this.minTemp) / tempRange;
        percentage = Math.max(0, Math.min(1, percentage));
        let fluidHeight = percentage * (this.tubeHeight - 10); 

        ctx.fillStyle = "#f44336"; 
        ctx.beginPath();
        ctx.rect(-this.tubeWidth / 2 + 2, -fluidHeight, this.tubeWidth - 4, fluidHeight);
        ctx.fill();

        // 3. Σχεδίαση του βολβού
        ctx.beginPath();
        ctx.arc(0, 5, this.bulbRadius, 0, 2 * Math.PI);
        ctx.fill(); 
        ctx.stroke();

        // 4. Δυναμικές Διαγραμμίσεις (Ticks)
        ctx.fillStyle = "#333";
        ctx.font = "10px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        
        let steps = 5;
        for (let i = 0; i <= steps; i++) {
            let tickY = - (i / steps) * (this.tubeHeight - 10);
            let tickTempK = this.minTemp + (i / steps) * tempRange;
            let tickDisplay = 0;
            
            // Μετατροπή των Ticks ανάλογα με την επιλεγμένη κλίμακα
            if (this.currentUnit === 'K') tickDisplay = Math.round(tickTempK);
            else if (this.currentUnit === 'C') tickDisplay = Math.round(tickTempK - 273);
            else if (this.currentUnit === 'F') tickDisplay = Math.round((tickTempK - 273) * 1.8 + 32);

            ctx.beginPath();
            ctx.moveTo(this.tubeWidth / 2, tickY);
            ctx.lineTo(this.tubeWidth / 2 + 6, tickY);
            ctx.strokeStyle = "#555";
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillText(tickDisplay, this.tubeWidth / 2 + 8, tickY);
        }

        // 5. Ψηφιακή ένδειξη κάτω από τον βολβό
        let displayTemp = 0;
        let unitText = "";
        
        if (this.currentUnit === 'K') {
            displayTemp = Math.round(this.currentTemp);
            unitText = "K";
        } else if (this.currentUnit === 'C') {
            displayTemp = Math.round(this.currentTemp - 273);
            unitText = "°C";
        } else if (this.currentUnit === 'F') {
            displayTemp = Math.round((this.currentTemp - 273) * 1.8 + 32);
            unitText = "°F";
        }

        ctx.font = "bold 14px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`${displayTemp} ${unitText}`, 0, this.bulbRadius + 20);

        ctx.restore();

        // 6. Σχεδίαση του Radio Button Selector
        // Το σχεδιάζουμε ΕΞΩ από το ctx.restore() γιατί έχει ήδη απόλυτες συντεταγμένες
        this.unitSelector.draw(ctx);
    }
}