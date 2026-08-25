import { LabInstrument } from './LabInstrument.js';

export class ThermalSource extends LabInstrument {
    constructor(x, y) {
        super(x, y);
        this.state = 'idle'; // Μπορεί να είναι: 'idle', 'heating', 'cooling'
        this.time = 0; // Χρησιμοποιείται για το animation της φλόγας
    }

    update(dt, sim) {
        if (this.state === 'heating') {
            this.time += dt * 15; // Ταχύτητα κίνησης της φλόγας
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        if (this.state === 'heating' || this.state === 'idle') {
            this.drawBunsenBurner(ctx);
        } else if (this.state === 'cooling') {
            this.drawIceCubes(ctx);
        }

        ctx.restore();
    }

    // Σχεδίαση Λύχνου Bunsen
    drawBunsenBurner(ctx) {
        // Βάση λύχνου
        ctx.fillStyle = "#455a64";
        ctx.beginPath();
        ctx.roundRect(-30, 20, 60, 10, 3);
        ctx.fill();

        // Μεταλλικός σωλήνας λύχνου
        ctx.fillStyle = "#90a4ae";
        ctx.fillRect(-10, -20, 20, 40);
        
        // Στόμιο (δακτύλιος)
        ctx.fillStyle = "#607d8b";
        ctx.fillRect(-12, -20, 24, 6);

        // Αν είναι σε κατάσταση θέρμανσης, ζωγραφίζουμε τη φλόγα
        if (this.state === 'heating') {
            let flameBaseY = -20;
            
            // Εξωτερική Φλόγα (Πορτοκαλί/Κίτρινη)
            ctx.fillStyle = "rgba(255, 152, 0, 0.8)";
            ctx.beginPath();
            let wave1 = Math.sin(this.time) * 4;
            ctx.moveTo(-10, flameBaseY);
            ctx.quadraticCurveTo(-15 + wave1, flameBaseY - 20, wave1, flameBaseY - 45); // Κορυφή
            ctx.quadraticCurveTo(15 + wave1, flameBaseY - 20, 10, flameBaseY);
            ctx.fill();

            // Εσωτερική Φλόγα (Μπλε - χαρακτηριστικό του λύχνου Bunsen)
            ctx.fillStyle = "rgba(33, 150, 243, 0.9)";
            ctx.beginPath();
            let wave2 = Math.sin(this.time + 1) * 2;
            ctx.moveTo(-6, flameBaseY);
            ctx.quadraticCurveTo(-8 + wave2, flameBaseY - 10, wave2, flameBaseY - 20); // Κορυφή
            ctx.quadraticCurveTo(8 + wave2, flameBaseY - 10, 6, flameBaseY);
            ctx.fill();
        }
    }

    // Σχεδίαση Πάγου / Ψύξης
    drawIceCubes(ctx) {
        // Ένα ρηχό "πιατάκι" για να κάθονται τα παγάκια
        ctx.fillStyle = "#cfd8dc";
        ctx.beginPath();
        ctx.ellipse(0, 20, 50, 10, 0, 0, 2 * Math.PI);
        ctx.fill();

        // Λειτουργία για σχεδίαση ενός κύβου πάγου
        const drawCube = (cx, cy, rotation) => {
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(rotation);
            ctx.fillStyle = "rgba(179, 229, 252, 0.7)"; // Ημιδιαφανές γαλάζιο
            ctx.strokeStyle = "#81d4fa";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(-12, -12, 24, 24, 4);
            ctx.fill();
            ctx.stroke();
            
            // Εσωτερική λεπτομέρεια για γυαλάδα
            ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
            ctx.beginPath();
            ctx.moveTo(-6, -8);
            ctx.lineTo(6, -8);
            ctx.stroke();
            ctx.restore();
        };

        // Ζωγραφίζουμε μερικά παγάκια τοποθετημένα ακανόνιστα
        drawCube(-15, 5, 0.2);
        drawCube(15, 8, -0.15);
        drawCube(0, -5, 0.4);
        drawCube(-8, -12, -0.3);
        drawCube(12, -8, 0.1);
        
        // Εφέ "κρύου αέρα" / αχνού
        ctx.fillStyle = "rgba(224, 247, 250, 0.4)";
        let mistY = Math.sin(this.time * 0.5) * 5;
        ctx.beginPath();
        ctx.ellipse(0, -25 + mistY, 40, 15, 0, 0, 2 * Math.PI);
        ctx.fill();
    }
}