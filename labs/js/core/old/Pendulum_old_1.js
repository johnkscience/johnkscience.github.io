import { PhysicsBody } from './PhysicsBody.js';

export class Pendulum extends PhysicsBody {
    constructor(x, y, length = 1.0, mass = 1.0, initialAngle = Math.PI / 4) {
        super(x, y, mass);
        this.L = length;
        this.theta = initialAngle;
        this.omega = 0;
        this.alpha = 0;
        
        this.g = 9.81;
        this.b = 0.0;
        this.scalePx = 150;

        // Επιλογές εμφάνισης
        this.showTrail = false;
        this.showExtremes = false;
        this.trail = []; // Αποθήκευση συντεταγμένων (x, y) για το ίχνος
        this.maxTrailLength = 50; // Μέγιστο μήκος ιχνών
    }

    update(dt) {
        const substeps = 10;
        const stepDt = dt / substeps;

        for (let i = 0; i < substeps; i++) {
            this.alpha = -(this.g / this.L) * Math.sin(this.theta) - (this.b / this.mass) * this.omega;
            this.omega += this.alpha * stepDt;
            this.theta += this.omega * stepDt;
        }

        // Υπολογισμός τρέχουσας θέσης σφαίρας
        let bobX = this.x + this.L * this.scalePx * Math.sin(this.theta);
        let bobY = this.y + this.L * this.scalePx * Math.cos(this.theta);

        // Διαχείριση Ιχνών (Trail)
        if (this.showTrail) {
            this.trail.push({ x: bobX, y: bobY });
            if (this.trail.length > this.maxTrailLength) {
                this.trail.shift(); // Αφαίρεση του παλαιότερου σημείου
            }
        } else {
            this.trail = [];
        }
    }

    draw(ctx) {
        let bobX = this.x + this.L * this.scalePx * Math.sin(this.theta);
        let bobY = this.y + this.L * this.scalePx * Math.cos(this.theta);

        // 1. Σχεδίαση Ακραίων Θέσεων (Φαντάσματα / Γραμμές μέγιστης γωνίας)
        if (this.showExtremes) {
            // Η αρχική γωνία καθορίζει το πλάτος ταλάντωσης (αγνοώντας την απόσβεση για απλότητα οπτικοποίησης ή παίρνοντας την απόλυτη τιμή)
            let maxAngle = Math.abs(this.theta); // ή αποθηκευμένη αρχική γωνία
            let extX = this.x + this.L * this.scalePx * Math.sin(maxAngle);
            let extY = this.y + this.L * this.scalePx * Math.cos(maxAngle);
            let extXNeg = this.x + this.L * this.scalePx * Math.sin(-maxAngle);
            let extYNeg = this.y + this.L * this.scalePx * Math.cos(-maxAngle);

            ctx.save();
            ctx.strokeStyle = "rgba(200, 200, 200, 0.6)";
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]); // Διακεκομμένη γραμμή

            // Δεξιά ακραία θέση
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(extX, extY);
            ctx.stroke();

            // Αριστερή ακραία θέση
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(extXNeg, extYNeg);
            ctx.stroke();

            ctx.restore();
        }

        // 2. Σχεδίαση Ιχνών Διαδρομής (Trail)
        if (this.showTrail && this.trail.length > 1) {
            ctx.save();
            for (let i = 1; i < this.trail.length; i++) {
                let alpha = i / this.trail.length; // Εφέ ξεθωριάσματος (fade out)
                ctx.beginPath();
                ctx.moveTo(this.trail[i - 1].x, this.trail[i - 1].y);
                ctx.lineTo(this.trail[i].x, this.trail[i].y);
                ctx.strokeStyle = `rgba(33, 150, 243, ${alpha * 0.5})`;
                ctx.lineWidth = 3;
                ctx.stroke();
            }
            ctx.restore();
        }

        // 3. Σχεδίαση Ταβανιού / Σημείου Ανάρτησης
        ctx.beginPath();
        ctx.moveTo(this.x - 40, this.y);
        ctx.lineTo(this.x + 40, this.y);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#555";
        ctx.stroke();

        // 4. Σχεδίαση Νήματος
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(bobX, bobY);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#888";
        ctx.stroke();

        // 5. Σχεδίαση Σφαίρας
        let radius = 10 + Math.sqrt(this.mass) * 5; 
        ctx.beginPath();
        ctx.arc(bobX, bobY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#2196F3";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000";
        ctx.stroke();
    }
}