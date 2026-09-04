import { UIElement } from './UIElement.js';
import { Button } from './Button.js';

export class DataLogger extends UIElement {
    constructor(x, y, width, labelX, labelY, onRecord, onToggleChart, onToggleTable) {
        super(x, y, width, 140); // Σταθερό, compact ύψος
        this.labelX = labelX;
        this.labelY = labelY;
        this.onRecord = onRecord;
        this.onToggleChart = onToggleChart;
        this.onToggleTable = onToggleTable;

        // Υπολογισμός πλάτους για τα 3 κουμπιά στη σειρά (με μικρά κενά μεταξύ τους)
        let btnWidth = (this.width - 40) / 3;
        let btnY = this.y + 90;

        // 1. Κουμπί Γραφικής Παράστασης [Γ.Π.]
        this.btnChart = new Button(this.x + 10, btnY, btnWidth, 35, "Γ.Π.", "#455a64", () => {
            if (this.onToggleChart) this.onToggleChart();
        });

        // 2. Κουμπί Πίνακα Τιμών [Π.Τ.]
        this.btnTable = new Button(this.x + 20 + btnWidth, btnY, btnWidth, 35, "Π.Τ.", "#455a64", () => {
            if (this.onToggleTable) this.onToggleTable();
        });

        // 3. Κουμπί Καταγραφής
        this.btnRecord = new Button(this.x + 30 + (btnWidth * 2), btnY, btnWidth, 35, "Καταγραφή", "#d32f2f", () => {
            if (this.onRecord) this.onRecord();
        });
    }

    update(dt, sim) {
        this.btnChart.update(dt, sim);
        this.btnTable.update(dt, sim);
        this.btnRecord.update(dt, sim);
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

        // 2. Μπάρα Τίτλου Οργάνου
        ctx.fillStyle = "#343a40";
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, 30, [8, 8, 0, 0]);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "bold 13px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("💾 Καταγραφέας Δεδομένων", this.x + this.width / 2, this.y + 15);

        // 3. Εμφάνιση Σταθερών Καναλιών (X και Y)
        ctx.fillStyle = "#212529";
        ctx.font = "12px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        
        ctx.fillText(`Άξονας X: ${this.labelX}`, this.x + 12, this.y + 48);
        ctx.fillText(`Άξονας Y: ${this.labelY}`, this.x + 12, this.y + 72);

        // Διαχωριστική γραμμή πάνω από τα κουμπιά
        ctx.strokeStyle = "#dee2e6";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x + 10, this.y + 82);
        ctx.lineTo(this.x + this.width - 10, this.y + 82);
        ctx.stroke();

        // 4. Σχεδίαση Κουμπιών
        this.btnChart.draw(ctx);
        this.btnTable.draw(ctx);
        this.btnRecord.draw(ctx);

        ctx.restore();
    }
}