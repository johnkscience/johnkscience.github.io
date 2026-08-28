import { Scene } from '../core/Scene.js';
import { Battery, Switch, Lamp } from '../core/CircuitComponents.js';
import { WirePath } from '../core/WirePath.js';
import { Button } from '../core/Button.js';
import { Selector } from '../core/Selector.js';

export class ParallelCircuitScene extends Scene {
    setup() {
        this.isRunning = true;
        this.timeScale = 1.0;
        
        this.isSwitch1Closed = false; // Κάτω κλάδος
        this.isSwitch2Closed = false; // Πάνω κλάδος

        // 1. Δημιουργία Εξαρτημάτων (Μπαταρία κάτω, δύο διακόπτες, δύο λαμπτήρες)
        this.battery = new Battery(400, 520, true);
        
        this.switch1 = new Switch(200, 320);
        this.lamp1 = new Lamp(500, 320);

        this.switch2 = new Switch(200, 140);
        this.lamp2 = new Lamp(500, 140);

        this.physicsBodies.push(this.battery, this.switch1, this.lamp1, this.switch2, this.lamp2);

        // 2. Ορισμός Διαδρομών (WirePath)
        // Κλάδος 1 (Κάτω)
        let path1Points = [
            { x: 340, y: 520 }, { x: 120, y: 520 }, { x: 120, y: 320 },
            { x: 200, y: 320 }, { x: 260, y: 320 }, // Μέσα από τον Διακόπτη 1
            { x: 490, y: 320 }, { x: 495, y: 305 }, { x: 500, y: 295 }, { x: 505, y: 305 }, { x: 510, y: 320 }, // Μέσα από Λαμπτήρα 1
            { x: 680, y: 320 }, { x: 680, y: 520 }, { x: 460, y: 520 }, { x: 340, y: 520 }
        ];

        // Κλάδος 2 (Πάνω)
        let path2Points = [
            { x: 340, y: 520 }, { x: 120, y: 520 }, { x: 120, y: 140 },
            { x: 200, y: 140 }, { x: 260, y: 140 }, // Μέσα από τον Διακόπτη 2
            { x: 490, y: 140 }, { x: 495, y: 125 }, { x: 500, y: 115 }, { x: 505, y: 125 }, { x: 510, y: 140 }, // Μέσα από Λαμπτήρα 2
            { x: 680, y: 140 }, { x: 680, y: 520 }, { x: 460, y: 520 }, { x: 340, y: 520 }
        ];

        this.wire1 = new WirePath(path1Points, 45);
        this.wire2 = new WirePath(path2Points, 55); // Λίγο περισσότερα γιατί η διαδρομή είναι μακρύτερη

        // 3. UI Χειριστήρια (Γενικά & Τοπικά)
        this.btnPause = new Button(20, 20, 120, 35, "Παύση", "#f44336", () => {
            this.isRunning = !this.isRunning;
            this.btnPause.text = this.isRunning ? "Παύση" : "Εκκίνηση";
            this.btnPause.color = this.isRunning ? "#f44336" : "#4CAF50";
        });

        this.speedSelector = new Selector(20, 75, ["Αργά", "Κανονικά", "Γρήγορα"], 1, (selected, index) => {
            if (index === 0) this.timeScale = 0.3;
            else if (index === 1) this.timeScale = 1.0;
            else if (index === 2) this.timeScale = 3.0;
        });

        // Κουμπιά κοντά στους διακόπτες
        this.btnSwitch1 = new Button(170, 340, 120, 30, "Διακόπτης 1", "#2196F3", () => {
            this.isSwitch1Closed = !this.isSwitch1Closed;
            this.btnSwitch1.color = this.isSwitch1Closed ? "#ff9800" : "#2196F3";
        });

        this.btnSwitch2 = new Button(170, 160, 120, 30, "Διακόπτης 2", "#2196F3", () => {
            this.isSwitch2Closed = !this.isSwitch2Closed;
            this.btnSwitch2.color = this.isSwitch2Closed ? "#ff9800" : "#2196F3";
        });

        this.uiElements.push(this.btnPause, this.speedSelector, this.btnSwitch1, this.btnSwitch2);
    }

    update(dt, sim) {
        this.uiElements.forEach(ui => ui.update(dt, sim));

        if (this.isRunning) {
            this.lamp1.isOn = this.isSwitch1Closed;
            this.switch1.isClosed = this.isSwitch1Closed;
            
            this.lamp2.isOn = this.isSwitch2Closed;
            this.switch2.isClosed = this.isSwitch2Closed;

            let flowSpeed = 0.12 * this.timeScale; 
            this.wire1.update(dt, flowSpeed, this.isSwitch1Closed);
            this.wire2.update(dt, flowSpeed, this.isSwitch2Closed);
        }
    }

    draw(ctx) {
        // 1. Καλώδια
        this.wire1.draw(ctx);
        this.wire2.draw(ctx);

        // 2. Διαγραφή χαλκού στους διακόπτες
        ctx.clearRect(206, 310, 48, 20); // Διακόπτης 1
        ctx.clearRect(206, 130, 48, 20); // Διακόπτης 2

        // 3. Εξαρτήματα
        this.physicsBodies.forEach(body => body.draw(ctx));

        // 4. Βέλη Συμβατικής Φοράς
        if (this.isSwitch1Closed) this.drawConventionalCurrent(ctx, 380, 320, "I₁");
        if (this.isSwitch2Closed) this.drawConventionalCurrent(ctx, 380, 140, "I₂");
        if (this.isSwitch1Closed || this.isSwitch2Closed) {
            this.drawConventionalCurrent(ctx, 500, 520, "Iολ"); // Κεντρικό ρεύμα (Μπαταρία)
        }

        // 5. UI Elements
        this.uiElements.forEach(ui => ui.draw(ctx));
    }

    drawConventionalCurrent(ctx, arrowX, arrowY, label) {
        let headlen = 10;
        
        ctx.save();
        ctx.strokeStyle = "#e74c3c"; 
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        // Φορά ρεύματος (αντίθετα με τα ηλεκτρόνια: πάει προς τα αριστερά στους κλάδους, δεξιά κάτω)
        if (arrowY === 520) {
            ctx.moveTo(arrowX - 25, arrowY);
            ctx.lineTo(arrowX + 25, arrowY);
            ctx.lineTo(arrowX + 25 - headlen, arrowY - headlen);
            ctx.moveTo(arrowX + 25, arrowY);
            ctx.lineTo(arrowX + 25 - headlen, arrowY + headlen);
        } else {
            ctx.moveTo(arrowX + 25, arrowY);
            ctx.lineTo(arrowX - 25, arrowY);
            ctx.lineTo(arrowX - 25 + headlen, arrowY - headlen);
            ctx.moveTo(arrowX - 25, arrowY);
            ctx.lineTo(arrowX - 25 + headlen, arrowY + headlen);
        }
        ctx.stroke();

        ctx.fillStyle = "#e74c3c";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.fillText(label, arrowX, arrowY - 15);
        ctx.restore();
    }
}