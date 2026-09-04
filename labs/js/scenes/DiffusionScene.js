import { Scene } from '../core/Scene.js';
import { BrownianContainer } from '../core/BrownianContainer.js';
import { Stopwatch } from '../core/Stopwatch.js';
import { Thermometer } from '../core/Thermometer.js';
import { Button } from '../core/Button.js';
import { Slider } from '../core/Slider.js';
import { Selector } from '../core/Selector.js'; // ΝΕΟ: Εισαγωγή του Selector
import { ChartWindow } from '../core/ChartWindow.js';
import { DataLogger } from '../core/DataLogger.js';
import { DataTableWindow } from '../core/DataTableWindow.js';

export class DiffusionScene extends Scene {
    setup() {
        this.isRunning = false;
        this.timeScale = 1.0; // ΝΕΟ: Αρχική ταχύτητα χρόνου
        
        // 1. Φυσικό Περιβάλλον
        this.container = new BrownianContainer(230, 80, 420, 320); 
        this.physicsBodies.push(this.container);
        
        this.stopwatch = new Stopwatch(560, 440);
        
        // Προσθήκη Θερμομέτρου (0°C έως 100°C)
        this.thermometer = new Thermometer(710, 240, 273, 373);
        this.instruments.push(this.stopwatch, this.thermometer);

        // 2. UI Χειριστήρια (Αριστερή Στήλη)
        this.btnPause = new Button(20, 20, 180, 35, "Εκκίνηση", "#4CAF50", () => {
            this.isRunning = !this.isRunning;
            this.btnPause.text = this.isRunning ? "Παύση" : "Εκκίνηση";
            this.btnPause.color = this.isRunning ? "#f44336" : "#4CAF50";
        });

        this.btnReset = new Button(20, 65, 180, 35, "Επαναφορά", "#757575", () => {
            this.container.initParticles();
            this.chart.data = [];
            this.dataTable.data = [];
            this.stopwatch.elapsedTime = 0;
            this.stopwatch.isRunning = false;
            this.btnPause.text = "Εκκίνηση";
            this.btnPause.color = "#4CAF50";
            this.isRunning = false;
            
            // Επαναφορά Θερμοκρασίας
            this.sliderTemp.value = 20;
            this.thermometer.setTemperature(293);
        });

        // Slider Θερμοκρασίας
        this.sliderTemp = new Slider(20, 130, 180, 0, 100, 20, "Θερμοκρασία", "°C");

        // ΝΕΟ: Επιλογέας Ταχύτητας (τοποθετημένος στο y=190)
        this.speedSelector = new Selector(20, 190, ["Αργά", "Κανονικά", "Γρήγορα"], 1, (selected, index) => {
            if (index === 0) this.timeScale = 0.5;
            else if (index === 1) this.timeScale = 1.0;
            else if (index === 2) this.timeScale = 3.0;
        });

        // 3. Καταγραφικά
        this.chart = new ChartWindow(420, 20, 350, 200, "Ακτίνα Διάχυσης", "Χρόνος (s)", "Ακτίνα εξάπλωσης (px)");
        this.chart.isVisible = false; 

        this.dataTable = new DataTableWindow(420, 230, 350, 200, "Πίνακας Τιμών", (deletedIndex) => {
            this.chart.data.splice(deletedIndex, 1);
        });
        this.dataTable.isVisible = false; 

        this.dataLogger = new DataLogger(20, 420, 280, "Χρόνος (s)", "Εξάπλωση (px)", 
            () => {
                let t = this.stopwatch.elapsedTime;
                let spread = this.container.getInkSpread();
                this.chart.addDataPoint(t, spread);
                this.dataTable.data.push({ x: t, y: spread });
            },
            () => { this.chart.isVisible = !this.chart.isVisible; },
            () => { this.dataTable.isVisible = !this.dataTable.isVisible; }
        );

        this.uiElements.push(
            this.btnPause, this.btnReset, this.sliderTemp, this.speedSelector,
            this.chart, this.dataTable, this.dataLogger
        );
        
        // Αρχικοποίηση ενδείξεων
        this.thermometer.setTemperature(this.sliderTemp.value + 273);
    }

    update(dt, sim) {
        // --- 1. ΔΥΝΑΜΙΚΟ Z-INDEX ---
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
            let simDt = dt * this.timeScale; // Εφαρμογή της κλίμακας χρόνου
            
            let visualMultiplier = 0.5 + (this.sliderTemp.value / 100) * 2.0;
            this.container.targetTemperature = visualMultiplier;
            
            this.physicsBodies.forEach(body => body.update(simDt));
            this.instruments.forEach(inst => inst.update(simDt, sim));
        }

        this.thermometer.setTemperature(this.sliderTemp.value + 273);

        sim.mouseX = origX;
        sim.mouseY = origY;
    }

    draw(ctx) {
        this.physicsBodies.forEach(body => body.draw(ctx));
        this.instruments.forEach(inst => inst.draw(ctx));
        
        this.drawLegend(ctx);

        this.uiElements.forEach(ui => ui.draw(ctx));
    }

    drawLegend(ctx) {
        ctx.save();
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.strokeStyle = "#bdc3c7";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(320, 20, 180, 50, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "rgba(33, 150, 243, 0.7)";
        ctx.beginPath(); ctx.arc(340, 35, 5, 0, 2 * Math.PI); ctx.fill();
        ctx.fillStyle = "#e74c3c";
        ctx.beginPath(); ctx.arc(340, 55, 5, 0, 2 * Math.PI); ctx.fill();

        ctx.fillStyle = "#333";
        ctx.font = "12px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText("Μόρια Νερού", 355, 35);
        ctx.fillText("Μόρια Μελανιού", 355, 55);
        ctx.restore();
    }
}