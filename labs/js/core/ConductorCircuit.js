import { Entity } from './Entity.js';

export class ConductorCircuit extends Entity {
    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;
        
        this.electrons = [];
        this.ions = [];
        
        this.motionMode = 'both'; 
        
        this.initGrid();
    }

    initGrid() {
        this.ions = [];
        this.electrons = [];

        let rows = 4;
        let cols = 18;
        let spacingX = this.width / (cols + 1);
        let spacingY = this.height / (rows + 1);

        for (let r = 1; r <= rows; r++) {
            for (let c = 1; c <= cols; c++) {
                this.ions.push({
                    x: this.x + c * spacingX,
                    y: this.y + r * spacingY,
                    baseX: this.x + c * spacingX,
                    baseY: this.y + r * spacingY
                });
            }
        }

        let numElectrons = 35;
        for (let i = 0; i < numElectrons; i++) {
            this.electrons.push({
                x: this.x + Math.random() * this.width,
                y: this.y + Math.random() * this.height,
                vxThermal: (Math.random() - 0.5) * 150,
                vyThermal: (Math.random() - 0.5) * 150,
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    update(dt, timeScale) {
        let actualDt = dt * timeScale;

        let driftSpeed = (this.motionMode === 'drift' || this.motionMode === 'both') ? 40 : 0;
        let thermalActive = (this.motionMode === 'thermal' || this.motionMode === 'both');

        for (let e of this.electrons) {
            if (thermalActive) {
                e.vxThermal += (Math.random() - 0.5) * 400 * actualDt;
                e.vyThermal += (Math.random() - 0.5) * 400 * actualDt;
                
                let maxThermal = 120;
                e.vxThermal = Math.max(-maxThermal, Math.min(maxThermal, e.vxThermal));
                e.vyThermal = Math.max(-maxThermal, Math.min(maxThermal, e.vyThermal));
            } else {
                e.vxThermal = 0;
                e.vyThermal = 0;
            }

            let totalVx = e.vxThermal + driftSpeed;
            let totalVy = e.vyThermal;

            e.x += totalVx * actualDt;
            e.y += totalVy * actualDt;

            if (e.x < this.x + 10) { e.x = this.x + 10; e.vxThermal *= -1; }
            if (e.x > this.x + this.width - 10) { 
                e.x = this.x + 10; 
            }
            if (e.y < this.y + 10) { e.y = this.y + 10; e.vyThermal *= -1; }
            if (e.y > this.y + this.height - 10) { e.y = this.y + this.height - 10; e.vyThermal *= -1; }
        }
    }

    draw(ctx) {
        ctx.save();

        // 1. Σχεδίαση Καλωδίων Σύνδεσης & Μπαταρίας
        let battW = 180, battH = 65;
        // Κεντράρουμε την μπαταρία κάτω από τον αγωγό
        let battX = this.x + (this.width / 2) - (battW / 2); 
        let battY = 460;
        let bumpW = 12, bumpH = 26;

        // Καλώδιο Μπλε (Αρνητικός πόλος) -> Πάει στην αριστερή πλευρά του αγωγού
        ctx.strokeStyle = "#1976d2";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.height / 2);
        ctx.lineTo(this.x - 30, this.y + this.height / 2);
        ctx.lineTo(this.x - 30, battY + battH / 2);
        ctx.lineTo(battX, battY + battH / 2);
        ctx.stroke();

        // Καλώδιο Κόκκινο (Θετικός πόλος) -> Πάει στη δεξιά πλευρά του αγωγού
        ctx.strokeStyle = "#d32f2f"; 
        ctx.beginPath();
        ctx.moveTo(this.x + this.width, this.y + this.height / 2);
        ctx.lineTo(this.x + this.width + 30, this.y + this.height / 2);
        ctx.lineTo(this.x + this.width + 30, battY + battH / 2);
        ctx.lineTo(battX + battW + bumpW, battY + battH / 2);
        ctx.stroke();

        // Σώμα Μπαταρίας
        ctx.fillStyle = "#ffeb3b";
        ctx.strokeStyle = "#f57c00";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(battX, battY, battW, battH, 8);
        ctx.fill();
        ctx.stroke();

        // Εξόγκωμα Θετικού Πόλου (Bump)
        ctx.beginPath();
        ctx.roundRect(battX + battW - 2, battY + (battH / 2) - (bumpH / 2), bumpW, bumpH, [0, 4, 4, 0]);
        ctx.fill();
        ctx.stroke();
        
        // Καλύπτουμε τη γραμμή ένωσης μεταξύ σώματος και πόλου
        ctx.beginPath();
        ctx.moveTo(battX + battW, battY + (battH / 2) - (bumpH / 2) + 2);
        ctx.lineTo(battX + battW, battY + (battH / 2) + (bumpH / 2) - 2);
        ctx.strokeStyle = "#ffeb3b";
        ctx.lineWidth = 4;
        ctx.stroke();

        // Κείμενο Μπαταρίας
        ctx.fillStyle = "#333";
        ctx.font = "bold 13px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("johnkscience Power", battX + battW / 2, battY + 20);
        ctx.font = "bold 16px monospace";
        ctx.fillText("9 Volt", battX + battW / 2, battY + 45);

        // Σύμβολα + και - πάνω στη μπαταρία
        ctx.font = "bold 18px Arial";
        ctx.fillStyle = "#d32f2f";
        ctx.fillText("+", battX + battW - 15, battY + 20);
        ctx.fillStyle = "#1976d2";
        ctx.fillText("-", battX + 15, battY + 20);

        // 2. Σχεδίαση Ευθύγραμμου Αγωγού
        ctx.fillStyle = "rgba(236, 240, 241, 0.85)";
        ctx.strokeStyle = "#7f8c8d";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#7f8c8d";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "left";
        ctx.fillText("Μεταλλικός Αγωγός", this.x + 15, this.y - 8);

        // 3. Σχεδίαση Σταθερών Ιόντων
        for (let ion of this.ions) {
            ctx.beginPath();
            ctx.arc(ion.baseX, ion.baseY, 8, 0, 2 * Math.PI);
            ctx.fillStyle = "#e74c3c";
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#c0392b";
            ctx.stroke();

            ctx.fillStyle = "#fff";
            ctx.font = "bold 10px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("+", ion.baseX, ion.baseY);
        }

        // 4. Σχεδίαση Ελεύθερων Ηλεκτρονίων
        for (let e of this.electrons) {
            ctx.beginPath();
            ctx.arc(e.x, e.y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "#2980b9";
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#1abc9c";
            ctx.stroke();

            ctx.fillStyle = "#fff";
            ctx.font = "bold 10px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("-", e.x, e.y);
        }

        ctx.restore();
    }
}