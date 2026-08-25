import { Entity } from './Entity.js';

export class Spring extends Entity {
    constructor(nodeA, nodeB, k, restLength) {
        super(0, 0); // Καλούμε τον constructor της Entity
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.k = k;                   // Σταθερά ελατηρίου (πόσο σκληρός είναι ο δεσμός)
        this.restLength = restLength; // Το φυσικό μήκος ηρεμίας του δεσμού
    }

    update(dt) {
        // Υπολογισμός διαφοράς θέσης στους άξονες X και Y
        let dx = this.nodeB.x - this.nodeA.x;
        let dy = this.nodeB.y - this.nodeA.y;
        
        // Υπολογισμός τρέχουσας απόστασης (Πυθαγόρειο)
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance === 0) return; // Αποφυγή διαίρεσης με το μηδέν

        // Δύναμη ελατηρίου: Hooke's Law
        let displacement = distance - this.restLength;
        let forceMagnitude = this.k * displacement;

        // Ανάλυση της δύναμης στους άξονες X και Y
        let fx = (dx / distance) * forceMagnitude;
        let fy = (dy / distance) * forceMagnitude;

        // Εφαρμογή της δύναμης στους δύο κόμβους (αντίθετη φορά)
        if (!this.nodeA.isFixed) this.nodeA.applyForce(fx, fy);
        if (!this.nodeB.isFixed) this.nodeB.applyForce(-fx, -fy);
    }

    draw(ctx) {
        // Υπολογισμός χρωματισμού ανάλογα με την τάση (compression/tension)
        let dx = this.nodeB.x - this.nodeA.x;
        let dy = this.nodeB.y - this.nodeA.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let displacement = distance - this.restLength;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.nodeA.x, this.nodeA.y);
        ctx.lineTo(this.nodeB.x, this.nodeB.y);
        
        // Οπτική ένδειξη: Γίνεται κοκκινωπό όταν τεντώνεται και μπλε όταν συμπιέζεται
        if (displacement > 1) {
            ctx.strokeStyle = "rgba(244, 67, 54, 0.7)"; // Κόκκινο (Tension)
        } else if (displacement < -1) {
            ctx.strokeStyle = "rgba(33, 150, 243, 0.7)"; // Μπλε (Compression)
        } else {
            ctx.strokeStyle = "rgba(150, 150, 150, 0.5)"; // Γκρι (Ισορροπία)
        }
        
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();
    }
}