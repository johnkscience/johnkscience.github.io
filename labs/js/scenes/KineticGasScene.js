import { Scene } from '../core/Scene.js';
import { GasContainer } from '../core/GasContainer.js';
import { ThermalSource } from '../core/ThermalSource.js';
import { Thermometer } from '../core/Thermometer.js';
import { Selector } from '../core/Selector.js';
import { HoldButton } from '../core/HoldButton.js';
import { Button } from '../core/Button.js';
import { Label } from '../core/Label.js';

export class KineticGasScene extends Scene {
    setup() {
        this.isRunning = true; // Ξεκινάει άμεσα η προσομοίωση

        // 1. Δημιουργία Φυσικού Περιβάλλοντος (Δοχείο)
        // Τοποθετούμε το δοχείο στο κέντρο (x: 250, y: 50, πλάτος: 400, ύψος: 300)
        this.container = new GasContainer(250, 50, 400, 300);
        this.physicsBodies.push(this.container);

        // 2. Δημιουργία Οργάνων
        // Νέα Θερμική Πηγή κάτω από το δοχείο (x: 450, y: 370)
        this.thermalSource = new ThermalSource(450, 420); 
        this.thermometer = new Thermometer(700, 200, 273, 1000); 
        
        this.instruments.push(this.thermalSource, this.thermometer); // Βάλαμε το thermalSource

        // 3. Δημιουργία UI Χειριστηρίων (Αριστερή στήλη)
        this.gasSelector = new Selector(20, 20, ["Μονοατομικό (He)", "Διατομικό (O₂)"], 0, (selected, index) => {
            this.loadGas(index);
        });

        // Κουμπί Θέρμανσης
        this.btnHeat = new HoldButton(20, 100, 180, 45, "🔥 Θέρμανση (Hold)", "#ff9800", "#d84315", 
            (dt) => { 
                if (this.isRunning) { // Ζεσταίνει μόνο αν δεν είναι σε παύση
                    this.thermalSource.state = 'heating';
                    this.container.heatUp(0.1, dt); 
                }
            }, 
            () => { this.thermalSource.state = 'idle'; }
        );

        // Κουμπί Ψύξης
        this.btnCool = new HoldButton(20, 160, 180, 45, "❄️ Ψύξη (Hold)", "#03a9f4", "#0277bd", 
            (dt) => { 
                if (this.isRunning) { // Ψύχει μόνο αν δεν είναι σε παύση
                    this.thermalSource.state = 'cooling';
                    this.container.heatUp(-0.1, dt); 
                }
            }, 
            () => { this.thermalSource.state = 'idle'; }
        );

        // ΝΕΟ: Κουμπί Παύσης / Εκκίνησης
        this.btnPause = new Button(20, 220, 180, 35, "Παύση", "#f44336", () => {
            this.isRunning = !this.isRunning; // Εναλλαγή κατάστασης
            // Αλλαγή κειμένου και χρώματος ανάλογα με την κατάσταση
            this.btnPause.text = this.isRunning ? "Παύση" : "Εκκίνηση";
            this.btnPause.color = this.isRunning ? "#f44336" : "#4CAF50";
        });

        // Κουμπί Επαναφοράς (Μετακινήθηκε στο Y: 270)
        this.btnReset = new Button(20, 270, 180, 35, "Επαναφορά", "#757575", () => {
            this.loadGas(this.gasSelector.selectedIndex);
            // Σιγουρευόμαστε ότι το πείραμα "τρέχει" ξανά μετά το reset
            this.isRunning = true;
            this.btnPause.text = "Παύση";
            this.btnPause.color = "#f44336";
        });

        // Ετικέτα πληροφοριών (Μετακινήθηκε στο Y: 320)
        this.infoLabel = new Label(20, 320, () => `Σωματίδια: ${this.container.particles.length}`);


		// 1. Ορίζουμε την αρχική κλίμακα χρόνου
        this.timeScale = 1.0; 

        // 2. ΝΕΟ: Επιλογέας Ταχύτητας (Χρησιμοποιεί τον υπάρχοντα Selector)
        // Επιλεγμένο από προεπιλογή είναι το index 1 ("Κανονικά")
        this.speedSelector = new Selector(20, 350, ["Αργά", "Κανονικά", "Γρήγορα"], 1, (selected, index) => {
            if (index === 0) {
                this.timeScale = 0.2; // 5 φορές πιο αργά
            } else if (index === 1) {
                this.timeScale = 1.0; // Κανονικός χρόνος
            } else if (index === 2) {
                this.timeScale = 2.0; // 2 φορές πιο γρήγορα
            }
        });
		
        // Βεβαιώσου ότι έχεις προσθέσει το btnPause στη λίστα uiElements!
        this.uiElements.push(this.gasSelector, this.btnHeat, this.btnCool, this.btnPause, this.btnReset, this.infoLabel, this.speedSelector);
        
		// Αρχική φόρτωση του αερίου (Μονοατομικό από προεπιλογή)
        this.loadGas(0);
    }

    // Βοηθητική μέθοδος για τη φόρτωση των σωματιδίων
    loadGas(gasTypeIndex) {
        this.container.particles = []; 
        let numParticles = 60;

        if (gasTypeIndex === 0) {
            // Μονοατομικό (isDiatomic = false)
            for (let i = 0; i < numParticles; i++) {
                this.container.addParticle(1.0, 5, "#f44336", 100, false);
            }
        } else {
            // Διατομικό (isDiatomic = true) - χρησιμοποιούμε λίγο μεγαλύτερη ακτίνα κρούσης (10)
            for (let i = 0; i < numParticles; i++) {
                this.container.addParticle(2.0, 10, "#2196F3", 70, true); 
            }
        }
    }

    update(dt, sim) {
        // 1. Το UI ενημερώνεται με τον πραγματικό χρόνο (ώστε τα κλικ να πιάνονται αμέσως)
        this.uiElements.forEach(ui => ui.update(dt, sim));
        
        if (this.isRunning) {
            // 2. Δημιουργούμε έναν "κλιμακωμένο" χρόνο για τη φυσική
            let simDt = dt * this.timeScale; 
            
            // 3. Περνάμε το simDt (όχι το dt) στα σώματα και τα όργανα
            this.physicsBodies.forEach(body => body.update(simDt));
            this.instruments.forEach(inst => inst.update(simDt, sim));
            
            // ΔΙΟΡΘΩΣΗ: Διαβάζουμε τη θερμοκρασία από το container
            let currentTemp = this.container.currentTemperature;
            this.thermometer.setTemperature(currentTemp);
        }
    }

    draw(ctx) {
        // 1. Σχεδιάζουμε το φόντο/όργανα
        this.instruments.forEach(inst => inst.draw(ctx));
        
        // 2. Σχεδιάζουμε το δοχείο και τα σωματίδια
        this.physicsBodies.forEach(body => body.draw(ctx));
        
        // 3. Σχεδιάζουμε το UI από πάνω
        this.uiElements.forEach(ui => ui.draw(ctx));
    }
}