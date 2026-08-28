import { Scene } from '../core/Scene.js';
import { ConductorCircuit } from '../core/ConductorCircuit.js';
import { Button } from '../core/Button.js';
import { Selector } from '../core/Selector.js';

export class ElectricCircuitScene extends Scene {
    setup() {
        this.isRunning = true;
        this.timeScale = 1.0;

        // Νέες, σωστές συντεταγμένες κυκλώματος
        this.circuit = new ConductorCircuit(180, 220, 550, 160);
        this.physicsBodies.push(this.circuit);

        let btnX = 20;
        let startY = 30;
        let btnW = 210;
        let btnH = 35;
        let gap = 42;

        this.btnPause = new Button(btnX, startY, btnW, btnH, "Παύση", "#f44336", () => {
            this.isRunning = !this.isRunning;
            this.btnPause.text = this.isRunning ? "Παύση" : "Εκκίνηση";
            this.btnPause.color = this.isRunning ? "#f44336" : "#4CAF50";
        });

        this.btnThermal = new Button(btnX, startY + gap, btnW, btnH, "Μόνο Άτακτη Κίνηση", "#607d8b", () => {
            this.circuit.motionMode = 'thermal';
        });

        this.btnDrift = new Button(btnX, startY + gap * 2, btnW, btnH, "Μόνο Προσανατολισμένη", "#3f51b5", () => {
            this.circuit.motionMode = 'drift';
        });

        this.btnBoth = new Button(btnX, startY + gap * 3, btnW, btnH, "Και οι Δύο (Ρεύμα)", "#009688", () => {
            this.circuit.motionMode = 'both';
        });

        this.speedSelector = new Selector(btnX, startY + gap * 4, ["Αργά", "Κανονικά", "Γρήγορα"], 1, (selected, index) => {
            if (index === 0) this.timeScale = 0.3;
            else if (index === 1) this.timeScale = 1.0;
            else if (index === 2) this.timeScale = 2.5;
        });

        this.uiElements.push(
            this.btnPause, this.btnThermal, this.btnDrift, this.btnBoth, this.speedSelector
        );
    }

    update(dt, sim) {
        this.uiElements.forEach(ui => ui.update(dt, sim));

        if (this.isRunning) {
            this.circuit.update(dt, this.timeScale);
        }
    }

    draw(ctx) {
        this.physicsBodies.forEach(body => body.draw(ctx));
        this.uiElements.forEach(ui => ui.draw(ctx));
        this.drawExplanationPanel(ctx);
    }

    drawExplanationPanel(ctx) {
        let px = 510;
        let py = 25;
        let panelW = 260;

        ctx.save();
        
        // Σχεδίαση πλαισίου
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.strokeStyle = "#b0bec5";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(px, py, panelW, 85, 6);
        ctx.fill();
        ctx.stroke();

        // ΔΙΟΡΘΩΣΗ: Επιβολή αριστερής στοίχισης για να μην επηρεάζεται από τα κουμπιά
        ctx.textAlign = "left";
        ctx.textBaseline = "middle"; 

        // Σχεδίαση Κειμένων
        ctx.fillStyle = "#333";
        ctx.font = "bold 13px Arial";
        ctx.fillText("💡 Τρέχουσα Κατάσταση:", px + 12, py + 20);

        ctx.font = "12px Arial";
        let modeText = "Άτακτη + Προσανατολισμένη";
        if (this.circuit.motionMode === 'thermal') modeText = "Μόνο Άτακτη (Θερμική)";
        if (this.circuit.motionMode === 'drift') modeText = "Μόνο Προσανατολισμένη (Drift)";

        ctx.fillText(`Λειτουργία: ${modeText}`, px + 12, py + 45);
        ctx.fillText(`Μπαταρία: 9 Volt`, px + 12, py + 68);

        ctx.restore();
    }
}