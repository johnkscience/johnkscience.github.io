import { Scene } from '../core/Scene.js';
import { Battery, Switch, Lamp } from '../core/CircuitComponents.js';
import { WirePath } from '../core/WirePath.js';
import { Button } from '../core/Button.js';
import { Selector } from '../core/Selector.js';

export class SeriesCircuitScene extends Scene {
    setup() {
        this.isRunning = true;
        this.timeScale = 1.0;
        this.isSwitchClosed = false;

        // 1. Δημιουργία Εξαρτημάτων Κυκλώματος
        this.battery = new Battery(400, 450, true);
        
        // Ο διακόπτης έχει μήκος 60px. Τοποθετείται στο (200, 450), άρα οι ακροδέκτες του είναι στο 200 και στο 260.
        this.switchComp = new Switch(200, 450); 
        
        // Ο λαμπτήρας τοποθετείται ψηλά στο κέντρο
        this.lamp = new Lamp(400, 150);

        // 2. Ορισμός Διαδρομής Καλωδίου (WirePath)
        // Τα ηλεκτρόνια κινούνται από τον Αρνητικό (-) προς τον Θετικό (+) πόλο.
        // Αρνητικός πόλος = 340, Θετικός πόλος = 460
        let pathPoints = [
            { x: 340, y: 450 }, // Έξοδος από Μπαταρία (-)
            { x: 260, y: 450 }, // Δεξιός ακροδέκτης διακόπτη
            { x: 200, y: 450 }, // Αριστερός ακροδέκτης διακόπτη
            { x: 200, y: 155 }, // Πάνω αριστερή γωνία
            { x: 390, y: 155 }, // Αριστερή επαφή ντουί λαμπτήρα
            
            // --- Νήμα Πυράκτωσης Λαμπτήρα ---
            { x: 395, y: 135 }, 
            { x: 400, y: 125 }, 
            { x: 405, y: 135 }, 
            // --------------------------------
            
            { x: 410, y: 155 }, // Δεξιά επαφή ντουί λαμπτήρα
            { x: 600, y: 155 }, // Πάνω δεξιά γωνία
            { x: 600, y: 450 }, // Κάτω δεξιά γωνία
            { x: 460, y: 450 }, // Είσοδος σε Μπαταρία (+)
            { x: 340, y: 450 }  // Κλείσιμο βρόχου (εσωτερικά στη μπαταρία)
        ];

        // 60 ηλεκτρόνια στη διαδρομή
        this.wire = new WirePath(pathPoints, 60);

        this.physicsBodies.push(this.battery, this.switchComp, this.lamp);

        // 3. Δημιουργία UI Χειριστηρίων (Αριστερή Στήλη)
        this.btnPause = new Button(20, 30, 150, 35, "Παύση", "#f44336", () => {
            this.isRunning = !this.isRunning;
            this.btnPause.text = this.isRunning ? "Παύση" : "Εκκίνηση";
            this.btnPause.color = this.isRunning ? "#f44336" : "#4CAF50";
        });

        this.btnSwitch = new Button(20, 75, 150, 35, "Κλείσιμο Διακόπτη", "#2196F3", () => {
            this.isSwitchClosed = !this.isSwitchClosed;
            this.btnSwitch.text = this.isSwitchClosed ? "Άνοιγμα Διακόπτη" : "Κλείσιμο Διακόπτη";
            this.btnSwitch.color = this.isSwitchClosed ? "#ff9800" : "#2196F3";
        });

        this.speedSelector = new Selector(20, 130, ["Αργά", "Κανονικά", "Γρήγορα"], 1, (selected, index) => {
            if (index === 0) this.timeScale = 0.3;
            else if (index === 1) this.timeScale = 1.0;
            else if (index === 2) this.timeScale = 3.0;
        });

        this.uiElements.push(this.btnPause, this.btnSwitch, this.speedSelector);
    }

    update(dt, sim) {
        this.uiElements.forEach(ui => ui.update(dt, sim));

        if (this.isRunning) {
            // Ο λαμπτήρας και ο διακόπτης ενημερώνονται με την κατάσταση του κυκλώματος
            this.lamp.isOn = this.isSwitchClosed;
            this.switchComp.isClosed = this.isSwitchClosed;

            // Τα ηλεκτρόνια κινούνται μόνο αν ο διακόπτης είναι κλειστός
            let flowSpeed = 0.12 * this.timeScale; 
            this.wire.update(dt, flowSpeed, this.isSwitchClosed);
        }
    }

    draw(ctx) {
        // 1. Ζωγραφίζουμε το καλώδιο και τα ηλεκτρόνια ΠΡΩΤΑ
        this.wire.draw(ctx);

        // ΤΡΙΚ: Κάνουμε *διαφανή* (όχι λευκή) την περιοχή ανάμεσα στους ακροδέκτες του διακόπτη, 
        // ώστε όταν είναι ανοιχτός να φαίνεται καθαρά η διακοπή στο καλώδιο.
        ctx.clearRect(206, 440, 48, 20);

        // 2. Ζωγραφίζουμε τα Εξαρτήματα ΑΠΟ ΠΑΝΩ
        this.physicsBodies.forEach(body => body.draw(ctx));

        // 3. Ζωγραφίζουμε το Βέλος της Συμβατικής Φοράς Ρεύματος (Από + προς -)
        if (this.isSwitchClosed) {
            this.drawConventionalCurrent(ctx);
        }

        // 4. Πληροφοριακό Κείμενο
        this.drawInfoText(ctx);

        // 5. UI Elements
        this.uiElements.forEach(ui => ui.draw(ctx));
    }

    // Σχεδίαση βέλους (Συμβατική Φορά I)
    drawConventionalCurrent(ctx) {
        let arrowX = 500;
        let arrowY = 135;
        let headlen = 10;
        
        ctx.save();
        ctx.strokeStyle = "#e74c3c"; // Κόκκινο βέλος
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        // Το ρεύμα πάει από δεξιά προς αριστερά στο πάνω καλώδιο (Αντίθετα από τα ηλεκτρόνια)
        ctx.moveTo(arrowX + 30, arrowY);
        ctx.lineTo(arrowX - 30, arrowY);
        // Μύτη βέλους (προς τα αριστερά)
        ctx.lineTo(arrowX - 30 + headlen, arrowY - headlen);
        ctx.moveTo(arrowX - 30, arrowY);
        ctx.lineTo(arrowX - 30 + headlen, arrowY + headlen);
        ctx.stroke();

        ctx.fillStyle = "#e74c3c";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.fillText("I", arrowX, arrowY - 15);
        ctx.restore();
    }

    drawInfoText(ctx) {
        ctx.save();
        ctx.fillStyle = "#333";
        ctx.font = "italic 14px Arial";
        ctx.textAlign = "center";
        ctx.fillText("* Εμφανίζεται αποκλειστικά η προσανατολισμένη (Drift) κίνηση των ελεύθερων ηλεκτρονίων", 400, 550);
        ctx.restore();
    }
}