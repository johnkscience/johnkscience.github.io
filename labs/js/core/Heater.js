import { LabInstrument } from './LabInstrument.js';

export class Heater extends LabInstrument {
    constructor(x, y, width = 120) {
        super(x, y);
        this.width = width;
        this.height = 20;
        this.time = 0; // Χρησιμοποιείται για το animation της φλόγας
        // Η μεταβλητή this.isOn κληρονομείται από την LabInstrument
    }

    update(dt, sim) {
        if (this.isOn) {
            this.time += dt * 10; // Ταχύτητα κίνησης της φλόγας
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // 1. Σχεδίαση της βάσης / εστίας (Hot plate)
        ctx.fillStyle = "#455a64"; // Σκούρο γκρι-μπλε
        ctx.fillRect(-this.width / 2, 0, this.width, this.height);
        
        ctx.strokeStyle = "#263238";
        ctx.lineWidth = 2;
        ctx.strokeRect(-this.width / 2, 0, this.width, this.height);

        // Προειδοποιητικό φωτάκι λειτουργίας
        ctx.beginPath();
        ctx.arc(-this.width / 2 + 15, this.height / 2, 4, 0, 2 * Math.PI);
        ctx.fillStyle = this.isOn ? "#4CAF50" : "#f44336"; // Πράσινο αν δουλεύει, κόκκινο αν είναι κλειστό
        ctx.fill();

        // 2. Σχεδίαση Φλόγας (αν είναι αναμμένο)
        if (this.isOn) {
            ctx.fillStyle = "rgba(255, 87, 34, 0.8)"; // Ημιδιαφανές Πορτοκαλί-Κόκκινο
            ctx.strokeStyle = "#ffeb3b"; // Κίτρινο περίγραμμα
            ctx.lineWidth = 1;

            let flameBaseY = 0;
            let numFlames = 5;
            let flameWidth = this.width / (numFlames + 1);

            for (let i = 1; i <= numFlames; i++) {
                let flameX = -this.width / 2 + i * flameWidth;
                
                // Χρησιμοποιούμε ημίτονο σε συνδυασμό με τον χρόνο και το index για τυχαία, "κυματιστή" κίνηση
                let wave = Math.sin(this.time + i) * 10;
                let flameHeight = 25 + Math.random() * 10 + wave; 

                ctx.beginPath();
                ctx.moveTo(flameX - 10, flameBaseY);
                // Κορυφή της φλόγας (μετακινείται αριστερά-δεξιά ελαφρώς λόγω του wave)
                ctx.quadraticCurveTo(flameX + wave / 2, flameBaseY - flameHeight / 2, flameX + wave / 3, flameBaseY - flameHeight);
                // Επιστροφή στη βάση
                ctx.quadraticCurveTo(flameX + 5, flameBaseY - flameHeight / 2, flameX + 10, flameBaseY);
                ctx.fill();
                ctx.stroke();
            }
        }

        ctx.restore();
    }
}