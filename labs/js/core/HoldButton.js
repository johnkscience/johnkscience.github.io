import { UIElement } from './UIElement.js';

export class HoldButton extends UIElement {
    constructor(x, y, width, height, text, baseColor, activeColor, onHold, onRelease) {
        super(x, y, width, height);
        this.text = text;
        this.baseColor = baseColor;
        this.activeColor = activeColor;
        
        // onHold: Συνάρτηση που καλείται σε κάθε καρέ όσο το ποντίκι είναι πατημένο
        this.onHold = onHold; 
        // onRelease: Συνάρτηση που καλείται τη στιγμή που αφήνουμε το ποντίκι
        this.onRelease = onRelease; 
        
        this.isBeingHeld = false;
    }

    update(dt, sim) {
        this.isHovered = this.containsPoint(sim.mouseX, sim.mouseY);

        // Αν το ποντίκι είναι από πάνω ΚΑΙ είναι πατημένο
        if (this.isHovered && sim.isMouseDown) {
            this.isBeingHeld = true;
            if (this.onHold) {
                this.onHold(dt); // Περνάμε το dt για να προσθέτει θερμότητα ομαλά με τον χρόνο
            }
        } else {
            // Αν μόλις το αφήσαμε (ή βγήκαμε εκτός)
            if (this.isBeingHeld) {
                this.isBeingHeld = false;
                if (this.onRelease) {
                    this.onRelease();
                }
            }
        }
    }

    draw(ctx) {
        // Αν πατιέται, παίρνει το activeColor, αλλιώς αν είναι hovered φωτίζει το baseColor
        ctx.fillStyle = this.isBeingHeld ? this.activeColor : (this.isHovered ? this.lightenColor(this.baseColor, 20) : this.baseColor);
        
        // Σχεδίαση κουμπιού
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 5);
        ctx.fill();

        // Σχεδίαση Κειμένου
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }
    
    // Η ίδια βοηθητική μέθοδος με το Button.js
    lightenColor(color, percent) {
        let num = parseInt(color.replace("#",""), 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            G = (num >> 8 & 0x00FF) + amt,
            B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
    }
}