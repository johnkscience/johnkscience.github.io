import { Scene } from '../core/Scene.js';
import { ThermalSource } from '../core/ThermalSource.js';
import { Thermometer } from '../core/Thermometer.js';
import { Stopwatch } from '../core/Stopwatch.js';
import { Button } from '../core/Button.js';
import { Selector } from '../core/Selector.js';
import { Slider } from '../core/Slider.js';
import { Dropdown } from '../core/Dropdown.js';
import { ChartWindow } from '../core/ChartWindow.js';
import { DataLogger } from '../core/DataLogger.js';
import { DataTableWindow } from '../core/DataTableWindow.js';

// Δεδομένα Υλικών (Ειδική Θερμοχωρητικότητα c σε J/kg°C)
const MATERIALS = [
    { name: "Νερό", c: 4186, color: "rgba(33, 150, 243, 0.7)" },
    { name: "Λάδι", c: 2000, color: "rgba(255, 193, 7, 0.8)" },
    { name: "Αλουμίνιο", c: 900, color: "rgba(158, 158, 158, 1)" },
    { name: "Σίδηρος", c: 450, color: "rgba(69, 90, 100, 1)" },
    { name: "Άμμος", c: 830, color: "rgba(215, 204, 200, 0.9)" }
];

export class SpecificHeatScene extends Scene {
    setup() {
        this.isRunning = true;
        this.timeScale = 1.0;
        
        // Φυσικές μεταβλητές
        this.temp1 = 20; // Αρχική θερμοκρασία Δοχείου 1 (°C)
        this.temp2 = 20; // Αρχική θερμοκρασία Δοχείου 2 (°C)
        this.power = 0;  // Ρυθμός προσφοράς θερμότητας (W)
        
        this.mat1Index = 0; // Προεπιλογή: Νερό
        this.mat2Index = 3; // Προεπιλογή: Σίδηρος

        // 1. Δημιουργία Οργάνων (Κέντρο & Δεξιά)
        this.heater1 = new ThermalSource(320, 360);
        this.heater2 = new ThermalSource(480, 360);
        
        this.thermometer1 = new Thermometer(240, 290, 250, 400); // 250K (-23°C) έως 400K (127°C)
        this.thermometer2 = new Thermometer(560, 290, 250, 400); 

        this.stopwatch = new Stopwatch(240, 20);

        this.instruments.push(this.heater1, this.heater2, this.thermometer1, this.thermometer2, this.stopwatch);

        // 2. Δημιουργία UI Χειριστηρίων (Αριστερή Στήλη)
        this.btnPause = new Button(20, 20, 180, 35, "Παύση", "#f44336", () => {
            this.isRunning = !this.isRunning;
            this.btnPause.text = this.isRunning ? "Παύση" : "Εκκίνηση";
            this.btnPause.color = this.isRunning ? "#f44336" : "#4CAF50";
        });

        // Κουμπί Συνεχούς Θέρμανσης
        this.btnHeat = new Button(20, 65, 180, 35, "🔥 Θέρμανση", "#ff9800", () => {
            if (this.isRunning) {
                this.heater1.state = 'heating';
                this.heater2.state = 'heating';
                this.power = 2000; // 2000 Watts
            }
        });

        // Κουμπί Συνεχούς Ψύξης
        this.btnCool = new Button(20, 105, 180, 35, "❄️ Ψύξη", "#03a9f4", () => {
            if (this.isRunning) {
                this.heater1.state = 'cooling';
                this.heater2.state = 'cooling';
                this.power = -2000;
            }
        });

        // Κουμπί Διακοπής Θέρμανσης/Ψύξης (Off)
        this.btnStopThermal = new Button(20, 145, 180, 35, "⏹️ Διακοπή", "#607d8b", () => {
            this.resetHeaters();
        });

        // Κουμπί Ολικής Επαναφοράς
        this.btnReset = new Button(20, 185, 180, 35, "Επαναφορά (20°C)", "#757575", () => {
            this.temp1 = 20;
            this.temp2 = 20;
            this.resetHeaters();
            this.chart.data = [];
            this.dataTable.data = [];
            this.stopwatch.elapsedTime = 0;
            this.stopwatch.isRunning = false;
            this.stopwatch.btnToggle.text = "Εκκίνηση";
            this.stopwatch.btnToggle.color = "#4CAF50";
        });

        // Επιλογέας Ταχύτητας (μετατοπισμένος ελαφρώς πιο κάτω για να χωράνε όλα)
        this.speedSelector = new Selector(20, 230, ["Αργά", "Κανονικά", "Γρήγορα"], 1, (selected, index) => {
            if (index === 0) this.timeScale = 0.5;
            else if (index === 1) this.timeScale = 1.0;
            else if (index === 2) this.timeScale = 5.0;
        });

        // 3. UI Χειριστηρίων (Δεξιά Στήλη - Μάζες & Υλικά)
        this.sliderMass1 = new Slider(600, 110, 170, 0.1, 5.0, 1.0, "Μάζα Α", "kg");
        this.sliderMass2 = new Slider(600, 230, 170, 0.1, 5.0, 1.0, "Μάζα Β", "kg");

        let materialNames = MATERIALS.map(m => m.name);
        
        this.dropdown1 = new Dropdown(600, 160, 170, 30, materialNames, this.mat1Index, (sel, idx) => {
            this.mat1Index = idx;
        });
        
        this.dropdown2 = new Dropdown(600, 280, 170, 30, materialNames, this.mat2Index, (sel, idx) => {
            this.mat2Index = idx;
        });

        // 4. Καταγραφικά (Αριστερά Κάτω)
        this.chart = new ChartWindow(420, 20, 350, 200, "Καμπύλη Θέρμανσης", "Χρόνος (s)", "Θερμοκ. (°C)");
        this.chart.isVisible = false; 

        this.dataTable = new DataTableWindow(420, 230, 350, 200, "Πίνακας Τιμών", (deletedIndex) => {
            this.chart.data.splice(deletedIndex, 1);
        });
        this.dataTable.isVisible = false; 

        this.dataLogger = new DataLogger(20, 430, 280, "Χρόνος (s)", "Θερμοκ. Α & Β", 
            () => {
                let t = this.stopwatch.elapsedTime;
                // Αποθήκευση πολλαπλών Υ!
                this.chart.addDataPoint(t, [this.temp1, this.temp2]);
                this.dataTable.data.push({ x: t, y: [this.temp1, this.temp2] });
            },
            () => { this.chart.isVisible = !this.chart.isVisible; },
            () => { this.dataTable.isVisible = !this.dataTable.isVisible; }
        );

        // Προσοχή: Τα Dropdowns μπαίνουν ΤΕΛΕΥΤΑΙΑ στον πίνακα για να σχεδιάζονται πάνω από όλα (z-index)
        this.uiElements.push(
            this.btnPause, this.btnHeat, this.btnCool, this.btnStopThermal, this.btnReset, this.speedSelector,
            this.sliderMass1, this.sliderMass2, 
            this.chart, this.dataTable, this.dataLogger,
            this.dropdown1, this.dropdown2
        );
    }

    resetHeaters() {
        this.heater1.state = 'idle';
        this.heater2.state = 'idle';
        this.power = 0;
    }

	/*
	 * ==================================================================================
	 * ΑΡΧΙΤΕΚΤΟΝΙΚΗ ΔΙΑΧΕΙΡΙΣΗΣ ΕΠΙΠΕΔΩΝ (Z-INDEX) ΚΑΙ ΠΡΟΣΤΑΣΙΑΣ ΚΛΙΚ (EVENT BLOCKER)
	 * ==================================================================================
	 * 
	 * ΠΡΟΒΛΗΜΑ ("Phantom Clicks" & "Tuning-Through"):
	 * Στο HTML5 Canvas δεν υπάρχει εγγενές DOM για τη διαχείριση επιπέδων (z-index) και 
	 * γεγονότων (events). Αυτό προκαλούσε δύο σημαντικά σφάλματα:
	 * 1. Τα κλικ «τρυπούσαν» τα αναδυόμενα παράθυρα (π.χ. ChartWindow, DataTableWindow) 
	 *    ή τα ανοιχτά μενού (Dropdown) και ενεργοποιούσαν τα στοιχεία UI ή τα όργανα 
	 *    (Thermometer, Buttons) που βρίσκονταν από κάτω τους.
	 * 2. Όταν ένα μενού έκλεινε ακαριαία μετά από κλικ, τα υποκείμενα στοιχεία λάμβαναν 
	 *    λανθασμένα την αλλαγή κατάστασης του ποντικιού ως νέο κλικ ("Phantom Click").
	 *
	 * ΛΥΣΗ (Διβάθμιος Μηχανισμός Z-Manager):
	 * 
	 * 1. Δυναμικό Z-Index: 
	 *    Αναθέτουμε προτεραιότητα (zIndex) στα στοιχεία UI. Τα παράθυρα (Chart, DataTable) 
	 *    παίρνουν zIndex = 100, τα ανοιχτά Dropdown παίρνουν zIndex = 50-51 (ώστε το ανώτερο 
	 *    Dropdown να σκεπάζει το κατώτερο), ενώ τα απλά στοιχεία έχουν zIndex = 1.
	 *    Ταξινομούμε τον πίνακα uiElements ώστε η σχεδίαση (draw) να γίνεται με τη σωστή σειρά.
	 * 
	 * 2. Απορρόφηση Ποντικιού (Pointer Interceptor):
	 *    Σαρώνουμε τα στοιχεία UI ανάποδα (από το ανώτερο Z προς το κατώτερο):
	 *    - Υπολογίζουμε ΠΡΙΝ το update αν το ποντίκι βρίσκεται μέσα στα όρια του στοιχείου 
	 *      (συμπεριλαμβανομένου του ανοιγμένου πλέγματος των Dropdowns).
	 *    - Αν το ποντίκι έχει ήδη «απορροφηθεί» (pointerConsumed = true) από κάποιο 
	 *      ανώτερο στοιχείο, μετατοπίζουμε τις συντεταγμένες sim.mouseX / sim.mouseY στο -9999.
	 *    - ΠΡΟΣΟΧΗ: ΔΕΝ μεταβάλλουμε το sim.isMouseDown. Αυτό επιτρέπει στα ανοιχτά Dropdowns 
	 *      να καταλαβαίνουν ότι έγινε κλικ "εκτός" αυτών και να κλείνουν ομαλά, ενώ εμποδίζει 
	 *      τα κάτω στοιχεία να ενεργοποιηθούν αφού το ποντίκι φαίνεται να βρίσκεται εκτός ορίων.
	 * 
	 * 3. Προστασία Οργάνων (Instruments Protection):
	 *    Διατηρούμε το ποντίκι στο -9999 κατά την ενημέρωση των οργάνων της σκηνής 
	 *    (instruments.update), εμποδίζοντας π.χ. τα θερμόμετρα να δέχονται κλικ όταν 
	 *    επικαλύπτονται από παράθυρα. Επαναφέρουμε τις πραγματικές συντεταγμένες μόνο 
	 *    στο τέλος της update().
	 * ==================================================================================
	 */
    update(dt, sim) {
        // --- 1. ΔΥΝΑΜΙΚΟ Z-INDEX ---
        this.dropdown1.zIndex = this.dropdown1.isOpen ? 51 : 11; 
        this.dropdown2.zIndex = this.dropdown2.isOpen ? 50 : 10;
        this.chart.zIndex = this.chart.isVisible ? 100 : 0;
        this.dataTable.zIndex = this.dataTable.isVisible ? 100 : 0;
        
        this.uiElements.forEach(ui => { if (ui.zIndex === undefined) ui.zIndex = 1; });
        this.uiElements.sort((a, b) => a.zIndex - b.zIndex);

        // Κρατάμε τις πραγματικές συντεταγμένες μια φορά στην αρχή
        let origX = sim.mouseX;
        let origY = sim.mouseY;
        let pointerConsumed = false;
        
        // --- 2. ΕΛΕΓΚΤΗΣ ΣΥΜΒΑΝΤΩΝ UI ---
        for (let i = this.uiElements.length - 1; i >= 0; i--) {
            let ui = this.uiElements[i];
            
            let isOver = false;
            if (ui.isVisible !== false) {
                if (origX >= ui.x && origX <= ui.x + ui.width &&
                    origY >= ui.y && origY <= ui.y + ui.height) {
                    isOver = true;
                }
                if (ui.isOpen && ui.options) {
                    let totalH = ui.height + (ui.options.length * ui.optionHeight);
                    if (origX >= ui.x && origX <= ui.x + ui.width &&
                        origY >= ui.y && origY <= ui.y + totalH) {
                        isOver = true;
                    }
                }
            }

            // Κρύβουμε το ποντίκι αν έχει καταναλωθεί
            if (pointerConsumed) {
                sim.mouseX = -9999;
                sim.mouseY = -9999;
            }

            ui.update(dt, sim); 

            // Επαναφορά για τον έλεγχο του επόμενου (από κάτω) UI στοιχείου
            sim.mouseX = origX;
            sim.mouseY = origY;

            if (isOver) {
                pointerConsumed = true;
            }
        }

        // --- 3. ΠΡΟΣΤΑΣΙΑ ΟΡΓΑΝΩΝ (Instruments) ---
        // Αν το ποντίκι χτυπάει σε UI, το κρύβουμε ΠΡΙΝ ενημερώσουμε τα όργανα
        if (pointerConsumed) {
            sim.mouseX = -9999;
            sim.mouseY = -9999;
        }

        // --- 4. ΕΝΗΜΕΡΩΣΗ ΦΥΣΙΚΗΣ & ΟΡΓΑΝΩΝ ---
        if (this.isRunning) {
            let simDt = dt * this.timeScale;

            if (this.power !== 0) {
                let Q = this.power * simDt;
                
                let m1 = this.sliderMass1.value;
                let c1 = MATERIALS[this.mat1Index].c;
                this.temp1 += Q / (m1 * c1);

                let m2 = this.sliderMass2.value;
                let c2 = MATERIALS[this.mat2Index].c;
                this.temp2 += Q / (m2 * c2);

                this.temp1 = Math.max(-20, Math.min(150, this.temp1));
                this.temp2 = Math.max(-20, Math.min(150, this.temp2));
            }

            this.instruments.forEach(inst => inst.update(simDt, sim));
            
            this.thermometer1.setTemperature(this.temp1 + 273);
            this.thermometer2.setTemperature(this.temp2 + 273);
        }

        // Στο τέλος, επαναφέρουμε το ποντίκι στην πραγματική του θέση 
        // για να μην επηρεαστεί το κεντρικό framework
        sim.mouseX = origX;
        sim.mouseY = origY;
    }

    draw(ctx) {
        // Σχεδίαση των οργάνων
        this.instruments.forEach(inst => inst.draw(ctx));

        // Σχεδίαση των δύο Δοχείων / Υλικών
        this.drawMaterialContainer(ctx, 280, 220, this.mat1Index, this.sliderMass1.value, "Δοχείο Α");
        this.drawMaterialContainer(ctx, 440, 220, this.mat2Index, this.sliderMass2.value, "Δοχείο Β");

        // UI
        this.uiElements.forEach(ui => ui.draw(ctx));
    }

    drawMaterialContainer(ctx, x, y, matIndex, mass, label) {
        let width = 80;
        let height = 110;
        let mat = MATERIALS[matIndex];
        
        ctx.save();
        
        // 1. Το υλικό (ύψος ανάλογο της μάζας)
        let fillHeight = (mass / 5.0) * (height - 10); 
        ctx.fillStyle = mat.color;
        ctx.fillRect(x + 5, y + height - 5 - fillHeight, width - 10, fillHeight);
        
        // 2. Το δοχείο (Ποτήρι ζέσεως)
        ctx.strokeStyle = "rgba(200, 200, 200, 0.8)";
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 3;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + height);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x + width, y);
        ctx.fill();
        ctx.stroke();

        // 3. Ετικέτες - Νέα Διάταξη στην Κορυφή
        ctx.fillStyle = "#333";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.fillText(label, x + width / 2, y - 35);
        
        ctx.font = "12px Arial";
        ctx.fillText(mat.name, x + width / 2, y - 20);
        
        ctx.fillStyle = "#555";
        ctx.font = "10px monospace";
        ctx.fillText(`c=${mat.c} J/kg°C`, x + width / 2, y - 5);

        ctx.restore();
    }
}