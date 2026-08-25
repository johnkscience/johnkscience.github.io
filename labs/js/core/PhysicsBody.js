import { Entity } from './Entity.js';

export class PhysicsBody extends Entity {
    constructor(x, y, mass = 1) {
        super(x, y);
        this.mass = mass; // Μάζα (m)
        this.vx = 0;      // Ταχύτητα στον άξονα x
        this.vy = 0;      // Ταχύτητα στον άξονα y
        this.ax = 0;      // Επιτάχυνση στον άξονα x
        this.ay = 0;      // Επιτάχυνση στον άξονα y
    }

    applyForce(forceX, forceY) {
        // F = m * a => a = F / m
        this.ax += forceX / this.mass;
        this.ay += forceY / this.mass;
    }

    update(dt) {
        // Απλή ολοκλήρωση Euler (μπορεί να αναβαθμιστεί σε Euler-Cromer ή Verlet)
        this.vx += this.ax * dt;
        this.vy += this.ay * dt;
        this.x += this.vx * dt;
        this.y += this.vy * dt;

        // Μηδενισμός επιταχύνσεων για το επόμενο καρέ
        this.ax = 0;
        this.ay = 0;
    }
}