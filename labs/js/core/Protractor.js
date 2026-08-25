import { LabInstrument } from './LabInstrument.js';

export class Protractor extends LabInstrument {
    constructor(x, y, radius = 80) {
        super(x, y);
        this.radius = radius; // Ακτίνα του ημικυκλίου του μοιρογνωμονίου
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // Σχεδίαση ημικυκλίου μοιρογνωμονίου
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI, false);
        ctx.fillStyle = "rgba(255, 255, 200, 0.3)";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#888";
        ctx.stroke();

        // Σχεδίαση διαγραμμίσεων (μοίρες ανά 10)
        ctx.font = "10px Arial";
        ctx.fillStyle = "#555";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let deg = -90; deg <= 90; deg += 15) {
            let rad = (deg * Math.PI) / 180;
            // Ανάποδη φορά για το canvas
            let innerR = this.radius - 8;
            let outerR = this.radius;

            let x1 = innerR * Math.sin(rad);
            let y1 = innerR * Math.cos(rad);
            let x2 = outerR * Math.sin(rad);
            let y2 = outerR * Math.cos(rad);

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = "#333";
            ctx.stroke();

            // Γράφουμε αριθμούς στις βασικές μοίρες
            if (deg % 30 === 0) {
                let textR = this.radius - 18;
                let tx = textR * Math.sin(rad);
                let ty = textR * Math.cos(rad);
                ctx.fillText(`${Math.abs(deg)}°`, tx, ty);
            }
        }

        ctx.restore();
    }
}