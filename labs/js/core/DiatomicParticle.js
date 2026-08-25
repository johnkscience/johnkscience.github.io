import { Particle } from './Particle.js';

export class DiatomicParticle extends Particle {
    constructor(x, y, mass, radius, color) {
        super(x, y, mass, radius, color);
        
        // Ιδιότητες περιστροφής
        this.angle = Math.random() * Math.PI * 2; // Τυχαία αρχική γωνία
        this.omega = (Math.random() - 0.5) * 10;  // Τυχαία γωνιακή ταχύτητα
        
        // Γεωμετρία του διατομικού μορίου
        this.atomRadius = radius * 0.6; // Το κάθε άτομο είναι λίγο μικρότερο
        this.bondLength = radius * 0.7; // Η απόσταση από το κέντρο
    }

    update(dt) {
        super.update(dt); // Ενημερώνει τη θέση βάσει των vx, vy
        this.angle += this.omega * dt; // Ενημερώνει την περιστροφή
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // 1. Σχεδίαση του "δεσμού" (η γραμμή που τα ενώνει)
        ctx.beginPath();
        ctx.moveTo(-this.bondLength, 0);
        ctx.lineTo(this.bondLength, 0);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#555";
        ctx.stroke();

        // 2. Σχεδίαση Άτομο 1 (Αριστερά)
        ctx.beginPath();
        ctx.arc(-this.bondLength, 0, this.atomRadius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0,0,0,0.4)";
        ctx.stroke();

        // 3. Σχεδίαση Άτομο 2 (Δεξιά)
        ctx.beginPath();
        ctx.arc(this.bondLength, 0, this.atomRadius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0,0,0,0.4)";
        ctx.stroke();

        ctx.restore();
    }
}