import { UIElement } from './UIElement.js';

export class Button extends UIElement {
    constructor(x, y, width, height, text, color, onClick) {
        super(x, y, width, height);
        this.text = text;
        this.color = color;
        this.onClick = onClick;
        this.wasMouseDown = false; // Για να μην εκτελείται συνεχώς όσο κρατάμε το κλικ
    }

    update(dt, sim) {
        this.isHovered = this.containsPoint(sim.mouseX, sim.mouseY);

        // Αν το ποντίκι είναι πάνω στο κουμπί, έγινε κλικ τώρα, και δεν ήταν πατημένο στο προηγούμενο καρέ
        if (this.isHovered && sim.isMouseDown && !this.wasMouseDown) {
            this.onClick(); // Εκτέλεσε την ενέργεια του κουμπιού
        }

        this.wasMouseDown = sim.isMouseDown;
    }

    draw(ctx) {
        // Αλλαγή χρώματος αν το ποντίκι είναι από πάνω (hover effect)
        ctx.fillStyle = this.isHovered ? this.lightenColor(this.color, 20) : this.color;
        
        // Σχεδίαση του κουμπιού (Ορθογώνιο με στρογγυλεμένες γωνίες)
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

    // Βοηθητική μέθοδος για να "φωτίζει" το χρώμα στο hover
    lightenColor(color, percent) {
        let num = parseInt(color.replace("#",""), 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            G = (num >> 8 & 0x00FF) + amt,
            B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
    }
}