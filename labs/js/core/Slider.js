import { UIElement } from './UIElement.js';

export class Slider extends UIElement {
    constructor(x, y, width, min, max, value, label = "", unit = "") {
        super(x, y, width, 40); // Αυξήσαμε το ύψος για να χωράει το κείμενο
        this.min = min;
        this.max = max;
        this.value = value;
        this.label = label;
        this.unit = unit;
        this.handleRadius = 10;
    }

    update(dt, sim) {
        let percentage = (this.value - this.min) / (this.max - this.min);
        let handleX = this.x + percentage * this.width;
        let trackY = this.y + 25; // Η ράγα κατέβηκε πιο κάτω

        let dx = sim.mouseX - handleX;
        let dy = sim.mouseY - trackY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.handleRadius && sim.isMouseDown) {
            this.isActive = true;
        }
        if (!sim.isMouseDown) {
            this.isActive = false;
        }

        if (this.isActive) {
            let newPercent = (sim.mouseX - this.x) / this.width;
            newPercent = Math.max(0, Math.min(1, newPercent)); 
            this.value = this.min + newPercent * (this.max - this.min);
        }
    }

    draw(ctx) {
        // 1. Σχεδίαση Κειμένου (Label & Τιμή)
        ctx.fillStyle = "#333";
        ctx.font = "14px Arial";
        ctx.textAlign = "left";
        let displayText = `${this.label}: ${this.value.toFixed(2)} ${this.unit}`;
        ctx.fillText(displayText, this.x, this.y + 10);

        // 2. Σχεδίαση Γραμμής (Ράγας)
        let trackY = this.y + 25;
        ctx.beginPath();
        ctx.moveTo(this.x, trackY);
        ctx.lineTo(this.x + this.width, trackY);
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#ccc';
        ctx.stroke();

        // 3. Σχεδίαση Λαβής
        let percentage = (this.value - this.min) / (this.max - this.min);
        let handleX = this.x + percentage * this.width;
        
        ctx.beginPath();
        ctx.arc(handleX, trackY, this.handleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = this.isActive ? '#4CAF50' : '#2196F3';
        ctx.fill();
    }
}