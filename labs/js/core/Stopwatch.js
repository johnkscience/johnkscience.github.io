import { LabInstrument } from './LabInstrument.js';
import { Button } from './Button.js';

export class Stopwatch extends LabInstrument {
    constructor(x, y) {
        super(x, y);
        this.elapsedTime = 0;
        this.isRunning = false;

        // Ενσωματωμένα κουμπιά οργάνου
        // Κουμπί Παύσης/Εκκίνησης
        this.btnToggle = new Button(x, y + 30, 80, 30, "Εκκίνηση", "#4CAF50", () => {
            this.isRunning = !this.isRunning;
            this.btnToggle.text = this.isRunning ? "Παύση" : "Εκκίνηση";
            this.btnToggle.color = this.isRunning ? "#f44336" : "#4CAF50";
        });

        // Κουμπί Επαναφοράς
        this.btnReset = new Button(x + 90, y + 30, 90, 30, "Επαναφορά", "#2196F3", () => {
            this.isRunning = false;
            this.elapsedTime = 0;
            this.btnToggle.text = "Εκκίνηση";
            this.btnToggle.color = "#4CAF50";
        });
    }

    update(dt, sim) {
        // Ενημέρωση των κουμπιών του οργάνου ώστε να αποκρίνονται στο ποντίκι
        this.btnToggle.update(dt, sim);
        this.btnReset.update(dt, sim);

        // Αν το χρονόμετρο είναι ενεργό, μετράει χρόνο
        if (this.isRunning) {
            this.elapsedTime += dt;
        }
    }

    draw(ctx) {
        // 1. Σχεδίαση πλαισίου οργάνου
        ctx.fillStyle = "#f8f9fa";
        ctx.strokeStyle = "#ced4da";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(this.x - 10, this.y - 10, 200, 80, 8);
        ctx.fill();
        ctx.stroke();

        // 2. Οθόνη ψηφιακής ένδειξης χρόνου
        ctx.fillStyle = "#212529";
        ctx.font = "bold 18px monospace";
        ctx.textAlign = "left";
        ctx.fillText(`Χρόνος: ${this.elapsedTime.toFixed(2)}s`, this.x, this.y + 18);

        // 3. Σχεδίαση κουμπιών του οργάνου
        this.btnToggle.draw(ctx);
        this.btnReset.draw(ctx);
    }
}