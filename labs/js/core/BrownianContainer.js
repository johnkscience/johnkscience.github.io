import { Entity } from './Entity.js';

export class BrownianContainer extends Entity {
    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.particles = [];
        
        // Στόχος θερμοκρασίας (επηρεάζει την ταχύτητα)
        this.targetTemperature = 1.0; 
        this.currentTemperature = 1.0;

        this.initParticles();
    }

    initParticles() {
        this.particles = [];
        
        let waterCount = 180; // Μόρια νερού
        let inkCount = 30;    // Μόρια μελανιού
        
        let centerX = this.x + this.width / 2;
        let centerY = this.y + this.height / 2;

        // 1. Δημιουργία Μελανιού (Μαζεμένα στο κέντρο)
        for (let i = 0; i < inkCount; i++) {
            this.particles.push({
                x: centerX + (Math.random() - 0.5) * 40,
                y: centerY + (Math.random() - 0.5) * 40,
                vx: (Math.random() - 0.5) * 50,
                vy: (Math.random() - 0.5) * 50,
                radius: 6,
                mass: 4,
                color: "#e74c3c", // Κόκκινο μελάνι
                type: "ink"
            });
        }

        // 2. Δημιουργία Νερού (Διάσπαρτα παντού, εκτός από το κέντρο)
        for (let i = 0; i < waterCount; i++) {
            let px, py;
            do {
                px = this.x + 10 + Math.random() * (this.width - 20);
                py = this.y + 10 + Math.random() * (this.height - 20);
            } while (Math.abs(px - centerX) < 30 && Math.abs(py - centerY) < 30); // Αποφυγή κέντρου

            this.particles.push({
                x: px,
                y: py,
                vx: (Math.random() - 0.5) * 150,
                vy: (Math.random() - 0.5) * 150,
                radius: 4,
                mass: 1,
                color: "rgba(33, 150, 243, 0.7)", // Μπλε νερό
                type: "water"
            });
        }
    }

    // Υπολογίζει τη μέση απόσταση των μορίων μελανιού από το κέντρο (Δείκτης Διάχυσης)
    getInkSpread() {
        let centerX = this.x + this.width / 2;
        let centerY = this.y + this.height / 2;
        let totalDist = 0;
        let count = 0;

        for (let p of this.particles) {
            if (p.type === "ink") {
                let dx = p.x - centerX;
                let dy = p.y - centerY;
                totalDist += Math.sqrt(dx * dx + dy * dy);
                count++;
            }
        }
        return count > 0 ? totalDist / count : 0;
    }

    update(dt) {
        // Ομαλή μετάβαση ταχυτήτων (Θερμοστάτης)
        if (Math.abs(this.currentTemperature - this.targetTemperature) > 0.01) {
            let factor = this.targetTemperature > this.currentTemperature ? 1.02 : 0.98;
            this.currentTemperature *= factor;
            for (let p of this.particles) {
                p.vx *= factor;
                p.vy *= factor;
            }
        }

        // Φυσική Σωματιδίων (Υποδιαίρεση χρόνου για σταθερότητα στις υψηλές ταχύτητες)
        let subSteps = 2;
        let stepDt = dt / subSteps;

        for (let step = 0; step < subSteps; step++) {
            // Κίνηση & Όρια
            for (let p of this.particles) {
                p.x += p.vx * stepDt;
                p.y += p.vy * stepDt;

                if (p.x < this.x + p.radius) { p.x = this.x + p.radius; p.vx *= -1; }
                if (p.x > this.x + this.width - p.radius) { p.x = this.x + this.width - p.radius; p.vx *= -1; }
                if (p.y < this.y + p.radius) { p.y = this.y + p.radius; p.vy *= -1; }
                if (p.y > this.y + this.height - p.radius) { p.y = this.y + this.height - p.radius; p.vy *= -1; }
            }

            // Κρούσεις (O(N^2) αλλά βελτιστοποιημένο)
            for (let i = 0; i < this.particles.length; i++) {
                let p1 = this.particles[i];
                for (let j = i + 1; j < this.particles.length; j++) {
                    let p2 = this.particles[j];
                    
                    let dx = p2.x - p1.x;
                    let dy = p2.y - p1.y;
                    let distSq = dx * dx + dy * dy;
                    let minDist = p1.radius + p2.radius;

                    if (distSq < minDist * minDist) {
                        let dist = Math.sqrt(distSq);
                        if (dist === 0) { dx = 1; dy = 0; dist = 1; }
                        
                        let nx = dx / dist;
                        let ny = dy / dist;

                        // Αποτροπή αλληλοκάλυψης (Penetration Resolution)
                        let overlap = minDist - dist;
                        p1.x -= nx * overlap / 2;
                        p2.x += nx * overlap / 2;
                        p1.y -= ny * overlap / 2;
                        p2.y += ny * overlap / 2;

                        // Ελαστική Κρούση (Impulse)
                        let dvx = p2.vx - p1.vx;
                        let dvy = p2.vy - p1.vy;
                        let dotProduct = dvx * nx + dvy * ny;

                        if (dotProduct < 0) {
                            let impulse = -(2.0) * dotProduct / (1 / p1.mass + 1 / p2.mass);
                            let ix = impulse * nx;
                            let iy = impulse * ny;
                            p1.vx -= ix / p1.mass;
                            p1.vy -= iy / p1.mass;
                            p2.vx += ix / p2.mass;
                            p2.vy += iy / p2.mass;
                        }
                    }
                }
            }
        }
    }

    draw(ctx) {
        ctx.save();
        
        // Σχεδίαση Δοχείου
        ctx.fillStyle = "rgba(236, 240, 241, 0.5)";
        ctx.strokeStyle = "#7f8c8d";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 8);
        ctx.fill();
        ctx.stroke();

        // Σχεδίαση Σωματιδίων
        for (let p of this.particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Λεπτό περίγραμμα για το μελάνι ώστε να ξεχωρίζει
            if (p.type === "ink") {
                ctx.lineWidth = 1;
                ctx.strokeStyle = "#c0392b";
                ctx.stroke();
            }
        }
        
        ctx.restore();
    }
}