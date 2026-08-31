import { Scene } from '../core/Scene.js';
import { Thermometer } from '../core/Thermometer.js';
import { Stopwatch } from '../core/Stopwatch.js';
import { Button } from '../core/Button.js';
import { Selector } from '../core/Selector.js';
import { Slider } from '../core/Slider.js';
import { Dropdown } from '../core/Dropdown.js';
import { ChartWindow } from '../core/ChartWindow.js';
import { DataLogger } from '../core/DataLogger.js';
import { DataTableWindow } from '../core/DataTableWindow.js';

const MATERIALS = [
    { name: "Νερό", c: 4186, color: "rgba(33, 150, 243, 0.7)" },
    { name: "Λάδι", c: 2000, color: "rgba(255, 193, 7, 0.8)" },
    { name: "Αλουμίνιο", c: 900, color: "rgba(158, 158, 158, 1)" },
    { name: "Σίδηρος", c: 450, color: "rgba(69, 90, 100, 1)" },
    { name: "Άμμος", c: 830, color: "rgba(215, 204, 200, 0.9)" }
];

export class ThermalEquilibriumScene extends Scene {
    setup() {
        this.isRunning = false;
        this.timeScale = 1.0;
        
        // Αρχικές θερμοκρασίες
        this.initialTemp1 = 90; // Ζεστό (Εσωτερικό)
        this.initialTemp2 = 20; // Κρύο (Εξωτερικό)
        
        this.temp1 = this.initialTemp1;
        this.temp2 = this.initialTemp2;
        
        // Συντελεστής μεταφοράς θερμότητας (W/°C). Καθορίζει πόσο γρήγορα γίνεται η ανταλλαγή.
        this.k = 80; 
        
        this.mat1Index = 0; // Νερό
        this.mat2Index = 0; // Νερό

        // 1. Δημιουργία Οργάνων (Κέντρο)
        // Θερμόμετρο για το εσωτερικό δοχείο (Αριστερά)
        this.thermometer1 = new Thermometer(220, 240, 273, 373); // 0°C έως 100°C
        // Θερμόμετρο για το εξωτερικό δοχείο (Δεξιά)
        this.thermometer2 = new Thermometer(540, 240, 273, 373);
		// Ενημέρωση των θερμομέτρων με τη σωστή αντιστοίχιση δοχείων!
		this.thermometer1.setTemperature(this.temp2 + 273);
		this.thermometer2.setTemperature(this.temp1 + 273);

        this.stopwatch = new Stopwatch(340, 20);

        this.instruments.push(this.thermometer1, this.thermometer2, this.stopwatch);

        // 2. Δημιουργία UI (Αριστερή Στήλη)
        this.btnPause = new Button(20, 20, 180, 35, "Εκκίνηση", "#4CAF50", () => {
            this.isRunning = !this.isRunning;
            this.btnPause.text = this.isRunning ? "Παύση" : "Εκκίνηση";
            this.btnPause.color = this.isRunning ? "#f44336" : "#4CAF50";
        });

        this.btnReset = new Button(20, 65, 180, 35, "Επαναφορά", "#757575", () => {
            this.temp1 = this.initialTemp1;
            this.temp2 = this.initialTemp2;
			// Ενημέρωση των θερμομέτρων με τη σωστή αντιστοίχιση δοχείων!
            this.thermometer1.setTemperature(this.temp2 + 273);
            this.thermometer2.setTemperature(this.temp1 + 273);
            this.chart.data = [];
            this.dataTable.data = [];
            this.stopwatch.elapsedTime = 0;
            this.stopwatch.isRunning = false;
            this.stopwatch.btnToggle.text = "Εκκίνηση";
            this.stopwatch.btnToggle.color = "#4CAF50";
        });

        this.speedSelector = new Selector(20, 110, ["Αργά", "Κανονικά", "Γρήγορα"], 1, (selected, index) => {
            if (index === 0) this.timeScale = 0.5;
            else if (index === 1) this.timeScale = 1.0;
            else if (index === 2) this.timeScale = 5.0;
        });

        // 3. UI (Δεξιά Στήλη - Μάζες & Υλικά)
        this.sliderMass1 = new Slider(600, 110, 170, 0.1, 5.0, 1.0, "Μάζα Εσωτ. (Α)", "kg");
        this.sliderMass2 = new Slider(600, 230, 170, 0.1, 5.0, 2.0, "Μάζα Εξωτ. (Β)", "kg");

        let materialNames = MATERIALS.map(m => m.name);
        
        this.dropdown1 = new Dropdown(600, 160, 170, 30, materialNames, this.mat1Index, (sel, idx) => {
            this.mat1Index = idx;
        });
        
        this.dropdown2 = new Dropdown(600, 280, 170, 30, materialNames, this.mat2Index, (sel, idx) => {
            this.mat2Index = idx;
        });

        // 4. Καταγραφικά
        this.chart = new ChartWindow(420, 100, 350, 200, "Σύγκλιση Θερμοκρασιών", "Χρόνος (s)", "Θερμοκ. (°C)");
        this.chart.isVisible = false; 

        this.dataTable = new DataTableWindow(420, 310, 350, 200, "Πίνακας Τιμών", (deletedIndex) => {
            this.chart.data.splice(deletedIndex, 1);
        });
        this.dataTable.isVisible = false; 

        this.dataLogger = new DataLogger(20, 430, 280, "Χρόνος (s)", "Θερμοκ. Α & Β", 
            () => {
                let t = this.stopwatch.elapsedTime;
                this.chart.addDataPoint(t, [this.temp2, this.temp1]);
                this.dataTable.data.push({ x: t, y: [this.temp2, this.temp1] });
            },
            () => { this.chart.isVisible = !this.chart.isVisible; },
            () => { this.dataTable.isVisible = !this.dataTable.isVisible; }
        );

        this.uiElements.push(
            this.btnPause, this.btnReset, this.speedSelector,
            this.sliderMass1, this.sliderMass2, 
            this.chart, this.dataTable, this.dataLogger,
            this.dropdown1, this.dropdown2
        );
    }

    /*
     * ΑΡΧΙΤΕΚΤΟΝΙΚΗ Z-INDEX & EVENT BLOCKER (Όπως στο SpecificHeatScene)
     */
    update(dt, sim) {
        // --- 1. ΔΥΝΑΜΙΚΟ Z-INDEX ---
        this.dropdown1.zIndex = this.dropdown1.isOpen ? 51 : 11; 
        this.dropdown2.zIndex = this.dropdown2.isOpen ? 50 : 10;
        this.chart.zIndex = this.chart.isVisible ? 100 : 0;
        this.dataTable.zIndex = this.dataTable.isVisible ? 100 : 0;
        
        this.uiElements.forEach(ui => { if (ui.zIndex === undefined) ui.zIndex = 1; });
        this.uiElements.sort((a, b) => a.zIndex - b.zIndex);

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

            if (pointerConsumed) {
                sim.mouseX = -9999;
                sim.mouseY = -9999;
            }

            ui.update(dt, sim); 

            sim.mouseX = origX;
            sim.mouseY = origY;

            if (isOver) {
                pointerConsumed = true;
            }
        }

        // --- 3. ΠΡΟΣΤΑΣΙΑ ΟΡΓΑΝΩΝ ---
        if (pointerConsumed) {
            sim.mouseX = -9999;
            sim.mouseY = -9999;
        }

        // --- 4. ΕΝΗΜΕΡΩΣΗ ΦΥΣΙΚΗΣ & ΟΡΓΑΝΩΝ ---
        if (this.isRunning) {
            let simDt = dt * this.timeScale;

            let m1 = this.sliderMass1.value;
            let c1 = MATERIALS[this.mat1Index].c;
            
            let m2 = this.sliderMass2.value;
            let c2 = MATERIALS[this.mat2Index].c;

            // Νόμος Ψύξης Νεύτωνα: Ρυθμός μεταφοράς θερμότητας P = k * ΔT
            let heatRate = this.k * (this.temp1 - this.temp2); 
            let Q = heatRate * simDt;

            // Θεωρητική Θερμοκρασία Ισορροπίας (Για αποφυγή ταλαντώσεων σε μεγάλα dt)
            let Teq = (m1 * c1 * this.temp1 + m2 * c2 * this.temp2) / (m1 * c1 + m2 * c2);

            let newTemp1 = this.temp1 - Q / (m1 * c1);
            let newTemp2 = this.temp2 + Q / (m2 * c2);

            // Αποτροπή "προσπεράσματος" της θερμοκρασίας ισορροπίας
            if ((this.temp1 > Teq && newTemp1 < Teq) || (this.temp1 < Teq && newTemp1 > Teq)) {
                this.temp1 = Teq;
                this.temp2 = Teq;
            } else {
                this.temp1 = newTemp1;
                this.temp2 = newTemp2;
            }

            this.instruments.forEach(inst => inst.update(simDt, sim));
            
            this.thermometer1.setTemperature(this.temp2 + 273);
            this.thermometer2.setTemperature(this.temp1 + 273);
        }

        sim.mouseX = origX;
        sim.mouseY = origY;
    }

    draw(ctx) {
        this.instruments.forEach(inst => inst.draw(ctx));

        // Σχεδίαση της Διάταξης (Δοχείο μέσα σε Δοχείο)
        this.drawCalorimeter(ctx, 290, 230);

        this.uiElements.forEach(ui => ui.draw(ctx));
    }

    drawCalorimeter(ctx, x, y) {
        let m1 = this.sliderMass1.value;
        let m2 = this.sliderMass2.value;
        let mat1 = MATERIALS[this.mat1Index];
        let mat2 = MATERIALS[this.mat2Index];

        let outW = 200, outH = 180;
        let inW = 90, inH = 130;
        let inX = x + (outW - inW) / 2;
        let inY = y + outH - inH - 10;

        ctx.save();

        // --- 1. Εξωτερικό Δοχείο (Β) & Υγρό ---
        let fillH2 = (m2 / 5.0) * (outH - 20);
        ctx.fillStyle = mat2.color;
        ctx.fillRect(x + 5, y + outH - 5 - fillH2, outW - 10, fillH2);

        ctx.strokeStyle = "rgba(150, 150, 150, 0.8)";
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + outH);
        ctx.lineTo(x + outW, y + outH);
        ctx.lineTo(x + outW, y);
        ctx.fill();
        ctx.stroke();

        // --- 2. Εσωτερικό Δοχείο (Α) & Υγρό ---
        let fillH1 = (m1 / 5.0) * (inH - 10);
        ctx.fillStyle = mat1.color;
        ctx.fillRect(inX + 5, inY + inH - 5 - fillH1, inW - 10, fillH1);

        ctx.strokeStyle = "rgba(100, 100, 100, 0.9)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(inX, inY);
        ctx.lineTo(inX, inY + inH);
        ctx.lineTo(inX + inW, inY + inH);
        ctx.lineTo(inX + inW, inY);
        ctx.stroke();

        // --- 3. Γραμμές Θερμομέτρων ---
        ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 2;
        
        // Γραμμή Θερμομέτρου 1 (Εσωτερικό)
        ctx.beginPath();
        ctx.moveTo(220, 245);
        ctx.lineTo(279, 269);
        ctx.lineTo(340, 330);
        ctx.stroke();

        // Γραμμή Θερμομέτρου 2 (Εξωτερικό)
        ctx.beginPath();
        ctx.moveTo(540, 245);
        ctx.lineTo(500, 260);
        ctx.lineTo(405, 320);
        ctx.stroke();
        ctx.setLineDash([]);

        // --- 4. Ετικέτες ---
        ctx.fillStyle = "#333";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        
        // Ετικέτα Εσωτερικού
        ctx.fillText("Εσωτερικό (Α)", inX + inW / 2, inY - 25);
        ctx.font = "12px Arial";
        ctx.fillText(mat1.name, inX + inW / 2, inY - 10);
        
        // Ετικέτα Εξωτερικού
        ctx.font = "bold 14px Arial";
        ctx.fillText("Εξωτερικό (Β)", x + outW / 2, y - 25);
        ctx.font = "12px Arial";
        ctx.fillText(mat2.name, x + outW / 2, y - 10);

        ctx.restore();
    }
}