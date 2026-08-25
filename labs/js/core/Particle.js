import { PhysicsBody } from './PhysicsBody.js';

export class Particle extends PhysicsBody {
    constructor(x, y, mass, radius, color) {
        super(x, y, mass);
        this.radius = radius;
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Μια ελαφριά λάμψη ή περίγραμμα για να φαίνονται ωραία
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0,0,0,0.3)";
        ctx.stroke();
    }
}