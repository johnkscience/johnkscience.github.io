import { UIElement } from './UIElement.js';

export class NumberStepper extends UIElement {
    constructor(x, y, min, max, value, label, onChange) {
        super(x, y, 140, 40); // 140px πλάτος, 40px ύψος
        this.min = min;
        this.max = max;
        this.value = value;
        this.label = label; // π.χ. "Z ="
        this.onChange = onChange;
        this.wasMouseDown = false;
    }

    update(dt, sim) {
        this.isHovered = this.containsPoint(sim.mouseX, sim.mouseY);

        if (this.isHovered && sim.isMouseDown && !this.wasMouseDown) {
            // Υπολογίζουμε τη σχετική θέση του ποντικιού μέσα στο κουμπί
            let relativeX = sim.mouseX - this.x;
            
            if (relativeX < 40) {
                // Πατήθηκε η αριστερή περιοχή (Μείωση)
                if (this.value > this.min) {
                    this.value--;
                    if (this.onChange) this.onChange(this.value);
                }
            } else if (relativeX > this.width - 40) {
                // Πατήθηκε η δεξιά περιοχή (Αύξηση)
                if (this.value < this.max) {
                    this.value++;
                    if (this.onChange) this.onChange(this.value);
                }
            }
        }
        this.wasMouseDown = sim.isMouseDown;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // 1. Βασικό πλαίσιο (Κεντρικό τμήμα)
        ctx.fillStyle = "#f8f9fa";
        ctx.strokeStyle = "#ced4da";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(0, 0, this.width, this.height, 5);
        ctx.fill();
        ctx.stroke();

        // 2. Αριστερό Κουμπί [◀]
        ctx.fillStyle = "#e9ecef";
        ctx.beginPath();
        ctx.roundRect(0, 0, 40, this.height, [5, 0, 0, 5]);
        ctx.fill();
        ctx.stroke();

        // 3. Δεξί Κουμπί [▶]
        ctx.beginPath();
        ctx.roundRect(this.width - 40, 0, 40, this.height, [0, 5, 5, 0]);
        ctx.fill();
        ctx.stroke();

        // 4. Σχεδίαση Κειμένων και Συμβόλων
        ctx.fillStyle = "#333";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText("◀", 20, this.height / 2);
        ctx.fillText("▶", this.width - 20, this.height / 2);
        
        // Κεντρικό κείμενο (π.χ. "Z = 6")
        ctx.fillText(`${this.label} ${this.value}`, this.width / 2, this.height / 2);

        ctx.restore();
    }
}