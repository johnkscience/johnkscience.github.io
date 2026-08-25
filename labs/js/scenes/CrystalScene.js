import { Scene } from '../core/Scene.js';
import { CrystalLattice } from '../core/CrystalLattice.js';
import { ThermalSource } from '../core/ThermalSource.js';
import { Thermometer } from '../core/Thermometer.js';
import { HoldButton } from '../core/HoldButton.js';
import { Button } from '../core/Button.js';
import { Selector } from '../core/Selector.js';
import { ChartWindow } from '../core/ChartWindow.js';
import { DataLogger } from '../core/DataLogger.js';
import { DataTableWindow } from '../core/DataTableWindow.js';

export class CrystalScene extends Scene {
    setup() {
        this.isRunning = true;

        // 1. Δημιουργία Φυσικού Περιβάλλοντος
        this.lattice = new CrystalLattice(300, 80, 6, 8, 40);
        this.physicsBodies.push(this.lattice);

        // 2. Δημιουργία Οργάνων
        this.thermalSource = new ThermalSource(440, 360);
        
        // ΝΕΟ: Προσθήκη Θερμομέτρου δεξιά από τον κρύσταλλο
        this.thermometer = new Thermometer(720, 200, 273, 1000);
        
        this.instruments.push(this.thermalSource, this.thermometer);

        // 3. Δημιουργία UI Χειριστηρίων
        this.btnHeat = new HoldButton(20, 40, 180, 45, "🔥 Θέρμανση (Hold)", "#ff9800", "#d84315", 
            (dt) => { 
                if (this.isRunning) {
                    this.thermalSource.state = 'heating';
                    this.lattice.heatBottom(1500, dt); 
                }
            }, 
            () => { this.thermalSource.state = 'idle'; }
        );

        this.btnCool = new HoldButton(20, 100, 180, 45, "❄️ Ψύξη (Hold)", "#03a9f4", "#0277bd", 
            (dt) => { 
                if (this.isRunning) {
                    this.thermalSource.state = 'cooling';
                    this.lattice.nodes.forEach(row => {
                        row.forEach(node => {
                            node.vx *= 0.997; // Πιο ισχυρό "πάγωμα" (damping)
                            node.vy *= 0.997;
                        });
                    });
                }
            }, 
            () => { this.thermalSource.state = 'idle'; }
        );

        this.btnPause = new Button(20, 160, 180, 35, "Παύση", "#f44336", () => {
            this.isRunning = !this.isRunning;
            this.btnPause.text = this.isRunning ? "Παύση" : "Εκκίνηση";
            this.btnPause.color = this.isRunning ? "#f44336" : "#4CAF50";
        });

        this.btnReset = new Button(20, 210, 180, 35, "Επαναφορά", "#757575", () => {
            this.lattice = new CrystalLattice(300, 80, 6, 8, 40);
            this.physicsBodies[0] = this.lattice; 
            
            this.isRunning = true;
            this.btnPause.text = "Παύση";
            this.btnPause.color = "#f44336";
            this.thermalSource.state = 'idle';
        });

		// ΑΡΓΗ ΚΙΝΗΣΗ

        // Ορίζουμε την αρχική κλίμακα χρόνου
        this.timeScale = 1.0; 

        // Επιλογέας Ταχύτητας (Χρησιμοποιεί τον υπάρχοντα Selector)
        // Επιλεγμένο από προεπιλογή είναι το index 1 ("Κανονικά")
        this.speedSelector = new Selector(20, 270, ["Αργά", "Κανονικά", "Γρήγορα"], 1, (selected, index) => {
            if (index === 0) {
                this.timeScale = 0.2; // 5 φορές πιο αργά
            } else if (index === 1) {
                this.timeScale = 1.0; // Κανονικός χρόνος
            } else if (index === 2) {
                this.timeScale = 2.0; // 2 φορές πιο γρήγορα
            }
        });

        // 1. Δημιουργία Γραφήματος 
        this.chart = new ChartWindow(420, 20, 350, 200, "Γράφημα Μετρήσεων", "Θερμοκρασία (K)", "Μέση Κιν. Ενέργεια (J) ");
        // ΔΙΟΡΘΩΣΗ: Ξεκινάει εντελώς κρυμμένο!
        this.chart.isVisible = false; 

        // 2. Δημιουργία Πίνακα Τιμών
        this.dataTable = new DataTableWindow(420, 230, 350, 200, "Πίνακας Τιμών", (deletedIndex) => {
            this.chart.data.splice(deletedIndex, 1);
        });
        // ΔΙΟΡΘΩΣΗ: Ξεκινάει εντελώς κρυμμένο!
        this.dataTable.isVisible = false; 

        // 3. Ορισμός Σταθερών Καναλιών για τον Καταγραφέα
        const labelX = "Θερμοκρασία (K)";
        const labelY = "Μέση Κιν. Ενέργεια (J)";

        // 4. Δημιουργία του DataLogger
        this.dataLogger = new DataLogger(20, 380, 280, labelX, labelY, 
            // Callback: Καταγραφή
            () => {
                let valX = this.lattice.getTemperature();
                let valY = this.smoothedKE || 0;

                this.chart.addDataPoint(valX, valY);
                this.dataTable.data.push({ x: valX, y: valY });
            },
            // Callback: Εναλλαγή Γραφικής Παράστασης [Γ.Π.]
            () => {
                // ΔΙΟΡΘΩΣΗ: Απλά αλλάζει από true σε false και το αντίστροφο!
                this.chart.isVisible = !this.chart.isVisible; 
            },
            // Callback: Εναλλαγή Πίνακα Τιμών [Π.Τ.]
            () => {
                // ΔΙΟΡΘΩΣΗ: Απλά αλλάζει από true σε false και το αντίστροφο!
                this.dataTable.isVisible = !this.dataTable.isVisible;
            }
        );

        // Προσθήκη στα UI elements
        this.uiElements.push(
            this.btnHeat, this.btnCool, this.btnPause, this.btnReset, 
            this.speedSelector, 
            this.chart, this.dataTable, this.dataLogger
        );
    }

    update(dt, sim) {
        // 1. Το UI ενημερώνεται με τον πραγματικό χρόνο (ώστε τα κλικ να πιάνονται αμέσως)
        this.uiElements.forEach(ui => ui.update(dt, sim));
        
        if (this.isRunning) {
            let simDt = dt * this.timeScale; 
            
            // Μετρητής συνολικού χρόνου για τον αντίστοιχο αισθητήρα
            this.totalTime = (this.totalTime || 0) + simDt;
            
            this.physicsBodies.forEach(body => body.update(simDt));
            this.instruments.forEach(inst => inst.update(simDt, sim));
            
            let currentTemp = this.lattice.getTemperature();
            this.thermometer.setTemperature(currentTemp);

            // -- Υπολογισμός Μέσης Κινητικής Ενέργειας --
            let totalKE = 0;
            let count = 0;
            for (let r = 1; r < this.lattice.rows; r++) { 
                for (let c = 0; c < this.lattice.cols; c++) {
                    let node = this.lattice.nodes[r][c];
                    let speedSq = node.vx * node.vx + node.vy * node.vy;
                    totalKE += 0.5 * node.mass * speedSq;
                    count++;
                }
            }
            let avgKE = count > 0 ? totalKE / count : 0;

            // Ομαλοποίηση της Κινητικής Ενέργειας!
            if (this.smoothedKE === undefined) this.smoothedKE = avgKE;
            this.smoothedKE = (this.smoothedKE * 0.95) + (avgKE * 0.05);
        }
    }

    draw(ctx) {
        this.instruments.forEach(inst => inst.draw(ctx));
        this.physicsBodies.forEach(body => body.draw(ctx));
        this.uiElements.forEach(ui => ui.draw(ctx));
    }
}