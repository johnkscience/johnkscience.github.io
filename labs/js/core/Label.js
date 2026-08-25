import { UIElement } from './UIElement.js';

export class Label extends UIElement {
    constructor(x, y, textFunction) {
        super(x, y, 0, 0);
        // Δέχεται μια συνάρτηση που θα επιστρέφει το τρέχον κείμενο κάθε καρέ
        this.textFunction = textFunction; 
    }

    update(dt, sim) {
        // Δεν χρειάζεται ανίχνευση ποντικιού
    }

    draw(ctx) {
        ctx.fillStyle = "#333";
        ctx.font = "bold 16px monospace";
        ctx.textAlign = "left";
        ctx.fillText(this.textFunction(), this.x, this.y);
    }
}