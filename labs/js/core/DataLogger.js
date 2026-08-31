import { UIElement } from './UIElement.js';
import { Button } from './Button.js';

export class DataLogger extends UIElement {
    constructor(x, y, width, labelX, labelY, onRecord, onToggleChart, onToggleTable) {
        super(x, y, width, 140); 
        this.labelX = labelX;
        this.labelY = labelY; // Μπορεί να είναι π.χ. "Θερμ. Νερού, Άμμου"
        this.onRecord = onRecord;
        this.onToggleChart = onToggleChart;
        this.onToggleTable = onToggleTable;

        let btnWidth = (this.width - 40) / 3;
        let btnY = this.y + 90;

        this.btnChart = new Button(this.x + 10, btnY, btnWidth, 35, "Γ.Π.", "#455a64", () => {
            if (this.onToggleChart) this.onToggleChart();
        });

        this.btnTable = new Button(this.x + 20 + btnWidth, btnY, btnWidth, 35, "Π.Τ.", "#455a64", () => {
            if (this.onToggleTable) this.onToggleTable();
        });

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

        ctx.fillStyle = "#f8f9fa";
        ctx.strokeStyle = "#ced4da";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#343a40";
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, 30, [8, 8, 0, 0]);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "bold 13px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("💾 Καταγραφέας Δεδομένων", this.x + this.width / 2, this.y + 15);

        ctx.fillStyle = "#212529";
        ctx.font = "12px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        
        ctx.fillText(`Άξονας X: ${this.labelX}`, this.x + 12, this.y + 48);
        
        // Αποκοπή κειμένου αν είναι πολύ μεγάλο (για πολλαπλές μεταβλητές)
        let displayY = this.labelY.length > 30 ? this.labelY.substring(0, 27) + "..." : this.labelY;
        ctx.fillText(`Άξονας Y: ${displayY}`, this.x + 12, this.y + 72);

        ctx.strokeStyle = "#dee2e6";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x + 10, this.y + 82);
        ctx.lineTo(this.x + this.width - 10, this.y + 82);
        ctx.stroke();

        this.btnChart.draw(ctx);
        this.btnTable.draw(ctx);
        this.btnRecord.draw(ctx);

        ctx.restore();
    }
}