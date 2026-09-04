import { UIElement } from './UIElement.js';
import { Selector } from './Selector.js';
import { Button } from './Button.js';

export class DataLogger extends UIElement {
    constructor(x, y, width, sensors, onRecord, onShowTable) {
        super(x, y, width, 100); // Το ύψος (100) είναι προσωρινό, θα το υπολογίσουμε δυναμικά
        this.sensors = sensors;
        this.onRecord = onRecord;
        this.onShowTable = onShowTable;

        let sensorNames = this.sensors.map(s => s.label);
        let selectorHeight = sensorNames.length * 25; // Κατά προσέγγιση ύψος του κάθε Selector

        // 1. Selector για τον Άξονα X
        let currentY = this.y + 45;
        this.selectorX = new Selector(this.x + 10, currentY, sensorNames, 0);
        
        // 2. Selector για τον Άξονα Y
        currentY += selectorHeight + 25; 
        this.selectorY = new Selector(this.x + 10, currentY, sensorNames, 1);

        // 3. Κουμπί Καταγραφής
        currentY += selectorHeight + 15;
        this.btnRecord = new Button(this.x + 10, currentY, this.width - 20, 35, "⏺ Καταγραφή", "#d32f2f", () => {
            let valX = this.sensors[this.selectorX.selectedIndex].getValue();
            let valY = this.sensors[this.selectorY.selectedIndex].getValue();
            
            // Καλούμε τη συνάρτηση που δόθηκε από τη σκηνή, περνώντας τα δεδομένα και τα ονόματα των αξόνων
            if (this.onRecord) {
                this.onRecord(valX, valY, sensorNames[this.selectorX.selectedIndex], sensorNames[this.selectorY.selectedIndex]);
            }
        });

        // 4. Κουμπί Εμφάνισης Πίνακα
        currentY += 45;
        this.btnShowTable = new Button(this.x + 10, currentY, this.width - 20, 35, "📊 Πίνακας Τιμών", "#2196F3", () => {
            if (this.onShowTable) {
                this.onShowTable();
            }
        });

        // Τελικός υπολογισμός του συνολικού ύψους του πάνελ
        this.height = currentY + 45 - this.y;
    }

    update(dt, sim) {
        // Ενημέρωση των περιεχομένων στοιχείων
        this.selectorX.update(dt, sim);
        this.selectorY.update(dt, sim);
        this.btnRecord.update(dt, sim);
        this.btnShowTable.update(dt, sim);
    }

    draw(ctx) {
        ctx.save();

        // 1. Φόντο και Περίγραμμα Πάνελ
        ctx.fillStyle = "#f8f9fa";
        ctx.strokeStyle = "#ced4da";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 8);
        ctx.fill();
        ctx.stroke();

        // 2. Μπάρα Τίτλου
        ctx.fillStyle = "#343a40";
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, 30, [8, 8, 0, 0]);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "bold 13px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("💾 Καταγραφέας", this.x + this.width / 2, this.y + 15);

        // 3. Ετικέτες πάνω από τους επιλογείς
        ctx.fillStyle = "#495057";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "left";
        
        ctx.fillText("Άξονας X (Οριζόντιος):", this.x + 10, this.selectorX.y - 10);
        ctx.fillText("Άξονας Y (Κάθετος):", this.x + 10, this.selectorY.y - 10);

        // 4. Σχεδίαση των UI στοιχείων
        this.selectorX.draw(ctx);
        this.selectorY.draw(ctx);
        this.btnRecord.draw(ctx);
        this.btnShowTable.draw(ctx);

        ctx.restore();
    }
}