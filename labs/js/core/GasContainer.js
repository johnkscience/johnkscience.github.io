import { Entity } from './Entity.js';
import { Particle } from './Particle.js';
import { DiatomicParticle } from './DiatomicParticle.js';

export class GasContainer extends Entity {
    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.particles = [];
        this.currentTemperature = 300; // Αρχική υπολογιζόμενη θερμοκρασία
    }

    // Προσθήκη νέου σωματιδίου με τυχαία αρχική ταχύτητα
    addParticle(mass, radius, color, speedMultiplier = 50, isDiatomic = false) {
        let px = this.x + radius + Math.random() * (this.width - 2 * radius);
        let py = this.y + radius + Math.random() * (this.height - 2 * radius);
        
        let particle;
        if (isDiatomic) {
            particle = new DiatomicParticle(px, py, mass, radius, color);
        } else {
            particle = new Particle(px, py, mass, radius, color);
        }
        
        let angle = Math.random() * 2 * Math.PI;
        particle.vx = Math.cos(angle) * speedMultiplier;
        particle.vy = Math.sin(angle) * speedMultiplier;
        
        this.particles.push(particle);
    }

    // Συνάρτηση για προσθήκη ενέργειας (θερμότητας)
    heatUp(factor, dt) {
        this.particles.forEach(p => {
            p.vx += p.vx * factor * dt;
            p.vy += p.vy * factor * dt;
            // Αν το σωματίδιο έχει γωνιακή ταχύτητα (είναι διατομικό), αύξησέ την και αυτή
            if (p.omega !== undefined) {
                p.omega += p.omega * factor * dt;
            }
        });
    }

    update(dt) {
        let totalKineticEnergy = 0;

        // 1. Ενημέρωση θέσης και έλεγχος τοιχωμάτων
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            p.update(dt); // Καλεί την update του PhysicsBody

            // Ανακλάσεις στα τοιχώματα
            if (p.x - p.radius < this.x) {
                p.x = this.x + p.radius;
                p.vx *= -1;
            } else if (p.x + p.radius > this.x + this.width) {
                p.x = this.x + this.width - p.radius;
                p.vx *= -1;
            }

            if (p.y - p.radius < this.y) {
                p.y = this.y + p.radius;
                p.vy *= -1;
            } else if (p.y + p.radius > this.y + this.height) {
                p.y = this.y + this.height - p.radius;
                p.vy *= -1;
            }

            // Υπολογισμός Κινητικής Ενέργειας σωματιδίου
            let speedSq = p.vx * p.vx + p.vy * p.vy;
            totalKineticEnergy += 0.5 * p.mass * speedSq;
        }

        // 2. Έλεγχος συγκρούσεων μεταξύ σωματιδίων (Απλοποιημένος ελαστικός έλεγχος)
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                let p1 = this.particles[i];
                let p2 = this.particles[j];

                let dx = p2.x - p1.x;
                let dy = p2.y - p1.y;
                let distSq = dx * dx + dy * dy;
                let minDist = p1.radius + p2.radius;

                if (distSq < minDist * minDist) {
                    let distance = Math.sqrt(distSq);
                    let nx = dx / distance;
                    let ny = dy / distance;

                    // Ανταλλαγή ταχυτήτων στον άξονα της σύγκρουσης (απλοποίηση ίσων μαζών ή 1D-ανταλλαγή)
                    let p = 2 * (p1.vx * nx + p1.vy * ny - p2.vx * nx - p2.vy * ny) / (p1.mass + p2.mass);
                    
                    p1.vx -= p * p2.mass * nx;
                    p1.vy -= p * p2.mass * ny;
                    p2.vx += p * p1.mass * nx;
                    p2.vy += p * p1.mass * ny;

					// Ανταλλαγή γωνιακών ταχυτήτων (αν είναι διατομικά) για να φαίνεται χαοτικό
                    if (p1.omega !== undefined && p2.omega !== undefined) {
                        let temp = p1.omega;
                        p1.omega = p2.omega;
                        p2.omega = temp;
                    }

                    // Αποφυγή αλληλεπικάλυψης (ώθηση προς τα έξω)
                    let overlap = minDist - distance;
                    p1.x -= nx * overlap / 2;
                    p1.y -= ny * overlap / 2;
                    p2.x += nx * overlap / 2;
                    p2.y += ny * overlap / 2;
                }
            }
        }

        // 3. Υπολογισμός μέσης θερμοκρασίας (προσομοιωμένη κλίμακα)
        if (this.particles.length > 0) {
            let avgKe = totalKineticEnergy / this.particles.length;
            // Μετατροπή της κινητικής ενέργειας σε κλίμακα Kelvin (π.χ. πολλαπλασιαστής 0.05 για το canvas)
            this.currentTemperature = 273 + (avgKe * 0.05); 
        }
    }

    draw(ctx) {
        // Σχεδίαση του δοχείου
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        ctx.strokeStyle = "#343a40";
        ctx.lineWidth = 4;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Σχεδίαση των σωματιδίων
        this.particles.forEach(p => p.draw(ctx));
    }
}