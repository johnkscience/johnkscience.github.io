import { Scene } from '../core/Scene.js';
import { Atom } from '../core/Atom.js';
import { NumberStepper } from '../core/NumberStepper.js';
import { Button } from '../core/Button.js';
import { Selector } from '../core/Selector.js';

// Λεξικό με τα 20 πρώτα στοιχεία του Περιοδικού Πίνακα
const ELEMENTS = [
    { name: "", sym: "" }, 
    { name: "Υδρογόνο", sym: "H" }, { name: "Ήλιο", sym: "He" }, 
    { name: "Λίθιο", sym: "Li" }, { name: "Βηρύλλιο", sym: "Be" }, 
    { name: "Βόριο", sym: "B" }, { name: "Άνθρακας", sym: "C" },
    { name: "Άζωτο", sym: "N" }, { name: "Οξυγόνο", sym: "O" }, 
    { name: "Φθόριο", sym: "F" }, { name: "Νέον", sym: "Ne" }, 
    { name: "Νάτριο", sym: "Na" }, { name: "Μαγνήσιο", sym: "Mg" },
    { name: "Αργίλιο", sym: "Al" }, { name: "Πυρίτιο", sym: "Si" }, 
    { name: "Φώσφορος", sym: "P" }, { name: "Θείο", sym: "S" }, 
    { name: "Χλώριο", sym: "Cl" }, { name: "Αργό", sym: "Ar" },
    { name: "Κάλιο", sym: "K" }, { name: "Ασβέστιο", sym: "Ca" }
];

export class AtomicModelScene extends Scene {
    setup() {
        this.isRunning = true;
        this.timeScale = 1.0;

        this.atom = new Atom(400, 300, 1); 
        this.physicsBodies.push(this.atom);

        this.btnPause = new Button(20, 40, 150, 35, "Παύση", "#f44336", () => {
            this.isRunning = !this.isRunning;
            this.btnPause.text = this.isRunning ? "Παύση" : "Εκκίνηση";
            this.btnPause.color = this.isRunning ? "#f44336" : "#4CAF50";
        });

        this.stepperZ = new NumberStepper(20, 90, 1, 20, 1, "Z =", (newZ) => {
            this.atom.setZ(newZ);
        });

        this.speedSelector = new Selector(20, 150, ["Αργά", "Κανονικά", "Γρήγορα"], 1, (selected, index) => {
            if (index === 0) this.timeScale = 0.2;
            else if (index === 1) this.timeScale = 1.0;
            else if (index === 2) this.timeScale = 3.0;
        });

        this.btnAddElectron = new Button(620, 40, 170, 35, "+ Ηλεκτρόνιο", "#2196F3", () => {
            this.atom.ionize(-1); 
        });

        this.btnRemoveElectron = new Button(620, 85, 170, 35, "- Ηλεκτρόνιο", "#ff9800", () => {
            this.atom.ionize(1);  
        });

        this.btnResetIon = new Button(620, 130, 170, 35, "Ουδέτερο Άτομο", "#757575", () => {
            this.atom.setZ(this.atom.Z); 
        });

        this.uiElements.push(
            this.btnPause, this.stepperZ, this.speedSelector,
            this.btnAddElectron, this.btnRemoveElectron, this.btnResetIon
        );
    }

    update(dt, sim) {
        this.uiElements.forEach(ui => ui.update(dt, sim));

        if (this.isRunning) {
            let simDt = dt * this.timeScale;
            this.physicsBodies.forEach(body => body.update(simDt));
        }
    }

    draw(ctx) {
        this.physicsBodies.forEach(body => body.draw(ctx));
        this.uiElements.forEach(ui => ui.draw(ctx));
        this.drawInfoPanel(ctx);
    }

    drawInfoPanel(ctx) {
        let px = 620;
        let py = 190;
        
        ctx.save();
        
        // Φόντο πίνακα
        ctx.fillStyle = "#f8f9fa";
        ctx.strokeStyle = "#ced4da";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(px, py, 170, 210, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#343a40";
        ctx.beginPath();
        ctx.roundRect(px, py, 170, 30, [8, 8, 0, 0]);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "bold 13px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("📊 Στοιχεία Ατόμου", px + 85, py + 15);

        let N = this.atom.nucleons.length - this.atom.Z;
        let A = this.atom.Z + N;
        let e = this.atom.Z - this.atom.ionCharge;
        let charge = this.atom.ionCharge === 0 ? "0" : (this.atom.ionCharge > 0 ? `+${this.atom.ionCharge}` : `${this.atom.ionCharge}`);
        
        let el = ELEMENTS[this.atom.Z];

        // --- Εμφάνιση Ονόματος και Συμβόλου με μικρό αριθμό μπροστά ---
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        
        // 1. Όνομα Στοιχείου (π.χ. Υδρογόνο)
        ctx.font = "bold 14px Arial";
        ctx.fillText(el.name, px + 85, py + 42);

        // 2. Σύμβολο με μικρό Z μπροστά (π.χ. 1H)
        // Χρησιμοποιούμε measureText για να τοποθετήσουμε σωστά τα κομμάτια
        ctx.font = "11px Arial";
        let zText = `${this.atom.Z}`;
        let zWidth = ctx.measureText(zText).width;

        ctx.font = "bold 16px Arial";
        let symText = el.sym;
        let symWidth = ctx.measureText(symText).width;

        let totalWidth = zWidth + symWidth;
        let startX = px + 85 - totalWidth / 2;

        // Σχεδίαση μικρού Z (και τοποθετημένο λίγο πιο χαμηλά για οπτική ισορροπία δείκτη)
        ctx.font = "11px Arial";
        ctx.textAlign = "left";
        ctx.fillText(zText, startX, py + 62);

        // Σχεδίαση κανονικού συμβόλου (π.χ. H)
        ctx.font = "bold 16px Arial";
        ctx.fillText(symText, startX + zWidth, py + 60);
        // -------------------------------------------------------------

        // Διαχωριστική γραμμή
        ctx.beginPath();
        ctx.moveTo(px + 10, py + 75);
        ctx.lineTo(px + 160, py + 75);
        ctx.strokeStyle = "#dee2e6";
        ctx.stroke();

        ctx.font = "14px monospace";
        ctx.textAlign = "left";

        ctx.fillText(`Ατομικός (Z) : ${this.atom.Z}`, px + 10, py + 95);
        ctx.fillText(`Νετρόνια (N) : ${N}`, px + 10, py + 120);
        ctx.fillText(`Маζικός  (A) : ${A}`, px + 10, py + 145);
        
        ctx.beginPath();
        ctx.moveTo(px + 10, py + 155);
        ctx.lineTo(px + 160, py + 155);
        ctx.stroke();

        ctx.fillText(`Ηλεκτρόνια   : ${e}`, px + 10, py + 175);
        
        ctx.fillStyle = this.atom.ionCharge > 0 ? "#d32f2f" : (this.atom.ionCharge < 0 ? "#1976d2" : "#333");
        ctx.fillText(`Φορτίο       : ${charge}`, px + 10, py + 195);

        ctx.restore();
    }
}