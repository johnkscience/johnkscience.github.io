import { Scene } from '../core/Scene.js';
import { ThermalSource } from '../core/ThermalSource.js';
import { Thermometer } from '../core/Thermometer.js';
import { Stopwatch } from '../core/Stopwatch.js'; 
import { Button } from '../core/Button.js';
import { Selector } from '../core/Selector.js';
import { ChartWindow } from '../core/ChartWindow.js';
import { DataLogger } from '../core/DataLogger.js';
import { DataTableWindow } from '../core/DataTableWindow.js';

export class MacroPhaseChangeScene extends Scene {
    setup() {
        this.isRunning = true;
        this.timeScale = 1.0; 
        
        // --- 1. Φυσικές Μεταβλητές & Καταστάσεις ---
        this.simTime = 0;
        this.energy = 0;        
        this.power = 0;         
        this.temperature = -50; 
        
        this.iceFrac = 1.0;
        this.liqFrac = 0.0;
        this.stmFrac = 0.0;
        
        this.steamParticles = []; 

        // --- 2. Δημιουργία Οργάνων ---
        this.thermalSource = new ThermalSource(375, 340);
        this.thermometer = new Thermometer(680, 200, 200, 450); 
        this.stopwatch = new Stopwatch(580, 480);

        this.instruments.push(this.thermalSource, this.thermometer, this.stopwatch);

        // --- 3. Δημιουργία UI Χειριστηρίων (Αριστερή Στήλη) ---
        this.btnHeat = new Button(20, 40, 180, 35, "🔥 Θέρμανση", "#d84315", () => {
            this.thermalSource.state = 'heating';
            this.power = 3; 
        });

        this.btnCool = new Button(20, 85, 180, 35, "❄️ Ψύξη", "#0277bd", () => {
            this.thermalSource.state = 'cooling';
            this.power = -3; 
        });

        this.btnIdle = new Button(20, 130, 180, 35, "⏹️ Κλείσιμο Πηγής", "#757575", () => {
            this.thermalSource.state = 'idle';
            this.power = 0;
        });

        this.btnPause = new Button(20, 180, 180, 35, "Παύση", "#f44336", () => {
            this.isRunning = !this.isRunning;
            this.btnPause.text = this.isRunning ? "Παύση" : "Εκκίνηση";
            this.btnPause.color = this.isRunning ? "#f44336" : "#4CAF50";
        });

        this.btnReset = new Button(20, 225, 180, 35, "Επαναφορά", "#757575", () => {
            this.simTime = 0;
            this.energy = 0;
            this.power = 0;
            this.steamParticles = [];
            this.isRunning = true;
            this.btnPause.text = "Παύση";
            this.btnPause.color = "#f44336";
            this.thermalSource.state = 'idle';
            this.chart.data = [];
            this.dataTable.data = [];
            
            this.stopwatch.elapsedTime = 0;
            this.stopwatch.isRunning = false;
            this.stopwatch.btnToggle.text = "Εκκίνηση";
            this.stopwatch.btnToggle.color = "#4CAF50";
        });

        this.speedSelector = new Selector(20, 275, ["Αργά", "Κανονικά", "Γρήγορα"], 1, (selected, index) => {
            if (index === 0) this.timeScale = 0.2; 
            else if (index === 1) this.timeScale = 1.0; 
            else if (index === 2) this.timeScale = 5.0; 
        });

        // --- 4. Καταγραφικά & Γραφήματα ---
        this.chart = new ChartWindow(420, 20, 350, 200, "Καμπύλη Θέρμανσης", "Χρόνος (s)", "Θερμοκ. (°C)");
        this.chart.isVisible = false; 

        this.dataTable = new DataTableWindow(420, 230, 350, 200, "Πίνακας Τιμών", (deletedIndex) => {
            this.chart.data.splice(deletedIndex, 1);
        });
        this.dataTable.isVisible = false; 

        this.dataLogger = new DataLogger(20, 380, 280, "Χρόνος (s)", "Θερμοκρασία (°C)", 
            () => {
                let t = this.stopwatch.elapsedTime;
                let T = this.temperature;
                this.chart.addDataPoint(t, T);
                this.dataTable.data.push({ x: t, y: T });
            },
            () => { this.chart.isVisible = !this.chart.isVisible; },
            () => { this.dataTable.isVisible = !this.dataTable.isVisible; }
        );

        this.uiElements.push(
            this.btnHeat, this.btnCool, this.btnIdle, 
            this.btnPause, this.btnReset, 
            this.speedSelector, 
            this.chart, this.dataTable, this.dataLogger
        );
    }

    update(dt, sim) {
        this.uiElements.forEach(ui => ui.update(dt, sim));

        if (this.isRunning) {
            let simDt = dt * this.timeScale;
            this.simTime += simDt;
            this.energy += this.power * simDt;

            if (this.energy < 0) this.energy = 0; 
            if (this.energy > 900) this.energy = 900; 

            this.calculateThermodynamics();
            
            this.instruments.forEach(inst => inst.update(simDt, sim));
            this.thermometer.setTemperature(this.temperature + 273);

            let bx = 300, by = 80, bw = 150, bh = 220; 

            // ΝΕΟ: Προσαρμογή γέννησης σωματιδίων ανάλογα με το αν θερμαίνουμε ή ψύχουμε
            if (this.stmFrac > 0) {
                if (Math.random() < (0.3 * this.stmFrac * this.timeScale)) {
                    let isCooling = (this.power < 0);
                    this.steamParticles.push({
                        x: bx + 10 + Math.random() * (bw - 20),
                        // Αν ψύχεται (υγροποίηση), τα σωματίδια εμφανίζονται στο καπάκι (πάνω)
                        // Αλλιώς εμφανίζονται χαμηλά (υγρό)
                        y: isCooling ? by + 15 : by + bh - 20, 
                        vx: (Math.random() - 0.5) * 30,
                        // Αν ψύχεται έχουν ταχύτητα προς τα κάτω, αλλιώς προς τα πάνω
                        vy: isCooling ? (Math.random() * 20) : (-20 - Math.random() * 40),
                        life: 1.5 + Math.random() 
                    });
                }
            }

            for (let i = this.steamParticles.length - 1; i >= 0; i--) {
                let p = this.steamParticles[i];

                // ΝΕΟ: Αν πατηθεί η ψύξη, τα υπάρχοντα σωματίδια αποκτούν "βαρύτητα" και πέφτουν
                if (this.power < 0) {
                    p.vy += 60 * simDt; // Επιτάχυνση προς τα κάτω
                    p.vx *= 0.95;       // Μείωση οριζόντιας ταχύτητας 
                }

                p.x += p.vx * simDt;
                p.y += p.vy * simDt;
                
                if (p.y < by + 10) { 
                    p.y = by + 10; 
                    p.vy *= -0.5; 
                    p.vx += (Math.random() - 0.5) * 20; 
                }
                if (p.x < bx + 5) { p.x = bx + 5; p.vx *= -1; }
                if (p.x > bx + bw - 5) { p.x = bx + bw - 5; p.vx *= -1; }

                // Αν φτάσουν τον πάτο (υγρό/πάγο), εξαφανίζονται αμέσως
                if (p.y > by + bh - 10) {
                    p.life = 0;
                }

                let decay = (this.power < 0) ? 0.6 : 0.3;
                p.life -= simDt * decay;
                
                if (p.life <= 0) this.steamParticles.splice(i, 1);
            }
        }
    }

    calculateThermodynamics() {
        let E = this.energy;

        // Κλίση νερού = 1, Κλίση πάγου/ατμού = 2
        // Ενέργεια τήξης = 80, Ενέργεια βρασμού = 540

        if (E <= 25) {
            // 1. Θέρμανση Πάγου (-50°C έως 0°C). Χρειάζεται 25 E.
            this.temperature = -50 + (E * 2); 
            this.iceFrac = 1.0;
            this.liqFrac = 0.0;
            this.stmFrac = 0.0;
        } 
        else if (E <= 105) {
            // 2. Λιώσιμο Πάγου (Σταθερά στους 0°C). Χρειάζεται 80 E (από 25 έως 105).
            this.temperature = 0;
            this.liqFrac = (E - 25) / 80; 
            this.iceFrac = 1.0 - this.liqFrac; 
            this.stmFrac = 0.0;
        } 
        else if (E <= 205) {
            // 3. Θέρμανση Νερού (0°C έως 100°C). Χρειάζεται 100 E (από 105 έως 205).
            this.temperature = E - 105;
            this.iceFrac = 0.0;
            this.liqFrac = 1.0;
            this.stmFrac = 0.0;
        } 
        else if (E <= 745) {
            // 4. Βρασμός (Σταθερά στους 100°C). Χρειάζεται 540 E (από 205 έως 745).
            this.temperature = 100;
            this.stmFrac = (E - 205) / 540; 
            this.liqFrac = 1.0 - this.stmFrac; 
            this.iceFrac = 0.0;
        } 
        else {
            // 5. Υπέρθερμος ατμός (> 100°C). Διπλάσια κλίση.
            this.temperature = 100 + (E - 745) * 2; 
            this.iceFrac = 0.0;
            this.liqFrac = 0.0;
            this.stmFrac = 1.0;
        }
    }

    draw(ctx) {
        this.instruments.forEach(inst => inst.draw(ctx));

        let bx = 300, by = 80, bw = 150, bh = 220; 
        let innerH = bh - 15; 
        
        ctx.save();
        
        if (this.liqFrac > 0) {
            let waterH = innerH * 0.5 * this.liqFrac; 
            ctx.fillStyle = "rgba(33, 150, 243, 0.6)";
            ctx.fillRect(bx + 5, by + bh - 5 - waterH, bw - 10, waterH);
            
            if (this.temperature >= 100 && this.power > 0) {
                ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
                for (let i=0; i<4; i++) {
                    ctx.beginPath();
                    ctx.arc(bx + 15 + Math.random() * (bw - 30), by + bh - 5 - Math.random() * waterH, 3, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
        }

        if (this.iceFrac > 0) {
            let maxIceH = innerH * 0.55;
            let currentIceH = maxIceH * this.iceFrac;
            let waterH = innerH * 0.5 * this.liqFrac;
            
            let iceY = by + bh - 5 - currentIceH; 
            if (this.liqFrac > 0.2) iceY -= (waterH * 0.8); 
            
            ctx.fillStyle = "rgba(179, 229, 252, 0.85)";
            ctx.strokeStyle = "#81d4fa";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(bx + 15, iceY, bw - 30, currentIceH, 5);
            ctx.fill();
            ctx.stroke();
        }

        if (this.stmFrac > 0) {
            ctx.fillStyle = `rgba(220, 220, 220, ${this.stmFrac * 0.5})`;
            let waterH = innerH * 0.5 * this.liqFrac;
            ctx.fillRect(bx + 5, by + 10, bw - 10, innerH - waterH - 5);
        }

        this.steamParticles.forEach(p => {
            ctx.fillStyle = `rgba(255, 255, 255, ${p.life * 0.6})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 6, 0, 2 * Math.PI);
            ctx.fill();
        });

        ctx.strokeStyle = "rgba(200, 200, 200, 0.9)";
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(bx, by + bh);
        ctx.lineTo(bx + bw, by + bh);
        ctx.lineTo(bx + bw, by);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = "#607d8b";
        ctx.strokeStyle = "#455a64";
        ctx.beginPath();
        ctx.roundRect(bx - 10, by - 12, bw + 20, 12, 3);
        ctx.fill();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(bx + bw/2, by - 18, 6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.restore();

        this.uiElements.forEach(ui => ui.draw(ctx));
    }
}