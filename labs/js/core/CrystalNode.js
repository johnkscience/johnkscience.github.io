import { PhysicsBody } from './PhysicsBody.js';

export class CrystalNode extends PhysicsBody {
    constructor(x, y, mass, radius, color, isFixed = false, damping = 0.98) {
        super(x, y, mass);
        this.radius = radius;
        this.color = color;
        this.isFixed = isFixed; // Αν είναι true, το σωματίδιο δεν κινείται
        this.damping = damping;    // 0.98 ή 0.995 Συντελεστής απόσβεσης ταχύτητας (απαραίτητος για ευστάθεια)
    }

    update(dt) {
        if (!this.isFixed) {
            super.update(dt); // Υπολογίζει ταχύτητα και θέση από τις δυνάμεις
            
            // Εφαρμογή απόσβεσης για να σταθεροποιείται το πλέγμα
            this.vx *= this.damping;
            this.vy *= this.damping;
        } else {
            // Μηδενίζουμε τις επιταχύνσεις/ταχύτητες αν είναι ακίνητο
            this.vx = 0;
            this.vy = 0;
            this.ax = 0;
            this.ay = 0;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0,0,0,0.5)";
        ctx.stroke();
    }
}