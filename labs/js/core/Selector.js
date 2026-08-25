import { UIElement } from './UIElement.js';

export class Selector extends UIElement {
    constructor(x, y, options, selectedIndex = 0, onChange = null) {
        // Υπολογίζουμε το συνολικό ύψος με βάση το πλήθος των επιλογών (30px ανά επιλογή)
        super(x, y, 180, options.length * 30); 
        this.options = options;
        this.selectedIndex = selectedIndex;
        this.onChange = onChange;
        this.wasMouseDown = false;
        this.optionHeight = 30;
    }

    update(dt, sim) {
        this.isHovered = this.containsPoint(sim.mouseX, sim.mouseY);

        if (this.isHovered && sim.isMouseDown && !this.wasMouseDown) {
            // Υπολογίζουμε ποια γραμμή πατήθηκε με βάση το Υ του ποντικιού
            let relativeY = sim.mouseY - this.y;
            let clickedIndex = Math.floor(relativeY / this.optionHeight);
            
            if (clickedIndex >= 0 && clickedIndex < this.options.length) {
                this.selectedIndex = clickedIndex;
                if (this.onChange) {
                    this.onChange(this.options[this.selectedIndex], this.selectedIndex);
                }
            }
        }
        this.wasMouseDown = sim.isMouseDown;
    }

    draw(ctx) {
        ctx.save();
        for (let i = 0; i < this.options.length; i++) {
            let optY = this.y + i * this.optionHeight;
            
            // Σχεδίαση εξωτερικού κύκλου (Radio button)
            ctx.beginPath();
            ctx.arc(this.x + 15, optY + this.optionHeight / 2, 8, 0, 2 * Math.PI);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#6c757d";
            ctx.stroke();

            // Αν είναι επιλεγμένο, γέμισέ το
            if (i === this.selectedIndex) {
                ctx.beginPath();
                ctx.arc(this.x + 15, optY + this.optionHeight / 2, 4, 0, 2 * Math.PI);
                ctx.fillStyle = "#2196F3";
                ctx.fill();
            }

            // Σχεδίαση κειμένου επιλογής
            ctx.fillStyle = "#333";
            ctx.font = "15px Arial";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(this.options[i], this.x + 35, optY + this.optionHeight / 2);
        }
        ctx.restore();
    }
}