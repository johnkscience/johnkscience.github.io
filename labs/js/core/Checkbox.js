import { UIElement } from './UIElement.js';

export class Checkbox extends UIElement {
    constructor(x, y, label, isChecked = false, onChange = null) {
        super(x, y, 20, 20); // 20x20 pixels το κουτάκι
        this.label = label;
        this.isChecked = isChecked;
        this.onChange = onChange;
        this.wasMouseDown = false;
    }

    update(dt, sim) {
        // Έλεγχος αν το ποντίκι είναι πάνω στο κουτάκι ή στο κείμενο
        let totalWidth = 20 + 10 + ctxMeasureWidthApprox(this.label); // απλοποιημένος έλεγχος περιοχής
        let isHovered = sim.mouseX >= this.x && sim.mouseX <= this.x + 180 &&
                        sim.mouseY >= this.y && sim.mouseY <= this.y + this.height;

        this.isHovered = isHovered;

        if (this.isHovered && sim.isMouseDown && !this.wasMouseDown) {
            this.isChecked = !this.isChecked;
            if (this.onChange) {
                this.onChange(this.isChecked);
            }
        }
        this.wasMouseDown = sim.isMouseDown;
    }

    draw(ctx) {
        ctx.save();
        
        // 1. Σχεδίαση τετραγώνου checkbox
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.isHovered ? "#2196F3" : "#6c757d";
        ctx.stroke();

        // 2. Αν είναι επιλεγμένο, σχεδίασε ένα "check" (✔)
        if (this.isChecked) {
            ctx.beginPath();
            ctx.moveTo(this.x + 4, this.y + 10);
            ctx.lineTo(this.x + 8, this.y + 15);
            ctx.lineTo(this.x + 16, this.y + 5);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#4CAF50";
            ctx.stroke();
        }

        // 3. Σχεδίαση κειμένου διπλά στο checkbox
        ctx.fillStyle = "#333";
        ctx.font = "14px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(this.label, this.x + 30, this.y + this.height / 2);

        ctx.restore();
    }
}

// Βοηθητική συνάρτηση εκτίμησης πλάτους κειμένου αν χρειαστεί
function ctxMeasureWidthApprox(text) {
    return text.length * 7;
}