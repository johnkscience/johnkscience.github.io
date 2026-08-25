import { Entity } from './Entity.js';

export class UIElement extends Entity {
    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.isHovered = false;
        this.isActive = false;
    }

    // Έλεγχος αν το ποντίκι βρίσκεται πάνω στο στοιχείο
    containsPoint(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width &&
               mouseY >= this.y && mouseY <= this.y + this.height;
    }
}