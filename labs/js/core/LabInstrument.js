import { Entity } from './Entity.js';

export class LabInstrument extends Entity {
    constructor(x, y) {
        super(x, y);
        this.isOn = false; // Π.χ. για ένα λύχνο Bunsen
    }

    toggle() {
        this.isOn = !this.isOn;
    }
    
    // Η σχεδίαση θα υλοποιείται στα συγκεκριμένα όργανα
}