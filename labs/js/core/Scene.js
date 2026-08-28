export class Scene {
    constructor() {
        this.physicsBodies = [];  // 1. Μάζες, εκκρεμή, ελατήρια κτλ.
        this.uiElements = [];     // 2. Sliders, κουμπιά κτλ.
        this.instruments = [];    // 3. Ποτήρια, πηγές θερμότητας κτλ.
    }

    setup() {
        // Υλοποιείται από το κάθε πείραμα ξεχωριστά
    }

    update(dt, sim) {
        // Ενημέρωση UI στοιχείων (ώστε να διαβάζουν το ποντίκι)
        this.uiElements.forEach(ui => ui.update(dt, sim));
        
        // Ενημέρωση Φυσικής
        this.physicsBodies.forEach(body => body.update(dt));
        
        // Ενημέρωση Οργάνων - ΔΙΟΡΘΩΣΗ: Προστέθηκε το sim εδώ!
        this.instruments.forEach(inst => inst.update(dt, sim));
    }

    draw(ctx) {
        // Σχεδιάζουμε πρώτα τα όργανα (στο background)
        this.instruments.forEach(inst => inst.draw(ctx));
        
        // Μετά τα φυσικά σώματα
        this.physicsBodies.forEach(body => body.draw(ctx));
        
        // Και τέλος το UI (sliders/κουμπιά) ώστε να είναι πάντα από πάνω
        this.uiElements.forEach(ui => ui.draw(ctx));
    }
}