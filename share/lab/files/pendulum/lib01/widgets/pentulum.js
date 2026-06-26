import { Konva } from 'konva';
import { Widget } from './widget.js'; // Υποθέτουμε ότι το widget.js βρίσκεται στον ίδιο φάκελο

class Pendulum extends Widget {
    constructor(options) {
        super(options); // Καλείται ο constructor της κλάσης Widget

        this.options.name = "Pendulum" + this.options.id;
        this.options = {
            ...this.options, // Κληρονομούμε τις ιδιότητες από το Widget
            ropeLength: options.ropeLength || 100, // Μήκος σχοινιού
            initialAngle: options.initialAngle || 0, // Αρχική γωνία
            mass: options.mass || 1, // Μάζα
            gravity: options.gravity || 9.81, // Επιτάχυνση βαρύτητας
            // ... (άλλες ιδιότητες που μπορεί να χρειαστούν)

        };

        this.sphere = this.createSphere();
        this.rope = this.createRope();

        this.add(this.rope);
        this.add(this.sphere);

        // ... (δημιουργία σφαίρας, σχοινιού, μοιρογνωμονίου, βοηθητικής γραμμής)

        // ... (event listeners για drag-and-drop, αλλαγή L, m, g)

        // ... (συνάρτηση για την κίνηση του εκκρεμούς)
    }

    createSphere() {
        const radius = this.calculateSphereRadius();
        const sphere = new Konva.Circle({
            x: this.options.x, // Αρχική θέση (θα ενημερωθεί αργότερα)
            y: this.options.y, // Αρχική θέση (θα ενημερωθεί αργότερα)
            radius: radius,
            fill: this.getSphereFill(), // Χρώμα ή εικόνα
            draggable: true, // Δυνατότητα μετακίνησης
        });

        return sphere;
    }

    createRope() {
        const rope = new Konva.Line({
            points: [this.options.x, this.options.y, this.sphere.x(), this.sphere.y()], // Αρχικές θέσεις
            stroke: 'black',
            strokeWidth: 2,
        });

        return rope;
    }

    calculateSphereRadius() {
        // Συνάρτηση για τη μετατροπή της μάζας σε ακτίνα
        // (π.χ. γραμμική σχέση, λογαριθμική, κ.λπ.)
        return Math.sqrt(this.options.mass) * 10; // Παράδειγμα
    }

    getSphereFill() {
        // Συνάρτηση για την επιλογή χρώματος ή εικόνας με βάση το υλικό
        switch (this.options.material) {
            case 'wood':
                return 'brown';
            case 'metal':
                return 'gray';
            // ... (άλλα υλικά)
            default:
                return 'red';
        }
    }

    // ... (άλλες μέθοδοι)
}

export {Pendulum};