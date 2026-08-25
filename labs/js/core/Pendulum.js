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
        
        // Αποθήκευση της αρχικής μέγιστης γωνίας για τις ακραίες θέσεις
        this.maxAngle = Math.abs(initialAngle);

        // Διαχείριση κυκλικού ίχνους (ένας πλήρης κύκλος ταλάντωσης)
        this.trail = [];
        this.isCompletedCycle = false;
        this.lastSign = Math.sign(initialAngle);
    }

    update(dt) {
        const substeps = 10;
        const stepDt = dt / substeps;

        for (let i = 0; i < substeps; i++) {
            this.alpha = -(this.g / this.L) * Math.sin(this.theta) - (this.b / this.mass) * this.omega;
            this.omega += this.alpha * stepDt;
            this.theta += this.omega * stepDt;
        }

        let bobX = this.x + this.L * this.scalePx * Math.sin(this.theta);
        let bobY = this.y + this.L * this.scalePx * Math.cos(this.theta);

        // Διαχείριση κυκλικού ίχνους ταλάντωσης
        if (this.showTrail) {
            let currentSign = Math.sign(this.theta);
            
            // Αν αλλάξει πρόσημο ή ξεκινάμε, ανιχνεύουμε κύκλο/ημικύκλιο ταλάντωσης
            // Για να κάνουμε κύκλο που σβήνει και ξαναρχίζει:
            this.trail.push({ x: bobX, y: bobY });

            // Αν το ίχνος μαζέψει αρκετά σημεία (π.χ. μια πλήρης περίοδος), το μηδενίζουμε για να ξαναρχίσει
            if (this.trail.length > 80) {
                this.trail.shift(); // Διατηρούμε σταθερό μέγεθος ουράς που σβήνει σταδιακά
            }
        } else {
            this.trail = [];
        }
    }

    draw(ctx) {
        let bobX = this.x + this.L * this.scalePx * Math.sin(this.theta);
        let bobY = this.y + this.L * this.scalePx * Math.cos(this.theta);

        // 1. Σχεδίαση Σταθερών Διακεκομμένων Γραμμών (Ακραίες Θέσεις)
        if (this.showExtremes) {
            let extXRight = this.x + this.L * this.scalePx * Math.sin(this.maxAngle);
            let extYRight = this.y + this.L * this.scalePx * Math.cos(this.maxAngle);
            let extXLeft = this.x + this.L * this.scalePx * Math.sin(-this.maxAngle);
            let extYLeft = this.y + this.L * this.scalePx * Math.cos(-this.maxAngle);

            ctx.save();
            ctx.strokeStyle = "rgba(220, 53, 69, 0.7)"; // Έντονο κόκκινο/ροζ για τις ακραίες θέσεις
            ctx.lineWidth = 1.5;
            ctx.setLineDash([5, 5]); // Διακεκομμένη γραμμή

            // Δεξιά ακραία θέση
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(extXRight, extYRight);
            ctx.stroke();

            // Αριστερή ακραία θέση
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(extXLeft, extYLeft);
            ctx.stroke();

            ctx.restore();
        }

        // 2. Σχεδίαση Κυκλικού Ίχνους Ταλάντωσης (Fade-out Trail)
        if (this.showTrail && this.trail.length > 1) {
            ctx.save();
            for (let i = 1; i < this.trail.length; i++) {
                let alpha = i / this.trail.length; // Σταδιακό σβήσιμο (fade out προς την ουρά)
                ctx.beginPath();
                ctx.moveTo(this.trail[i - 1].x, this.trail[i - 1].y);
                ctx.lineTo(this.trail[i].x, this.trail[i].y);
                ctx.strokeStyle = `rgba(33, 150, 243, ${alpha * 0.7})`;
                ctx.lineWidth = 3.5;
                ctx.stroke();
            }
            ctx.restore();
        }

        // 3. Σχεδίαση Σημείου Ανάρτησης (Ταβάνι)
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