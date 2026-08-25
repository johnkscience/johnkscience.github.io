import { Scene } from '../core/Scene.js';
import { Pendulum } from '../core/Pendulum.js';
import { Slider } from '../core/Slider.js';
import { Button } from '../core/Button.js';
import { Label } from '../core/Label.js';
import { Stopwatch } from '../core/Stopwatch.js';
import { Protractor } from '../core/Protractor.js';
import { Ruler } from '../core/Ruler.js';
import { Checkbox } from '../core/Checkbox.js';
import { Selector } from '../core/Selector.js';

export class PendulumScene extends Scene {
    setup() {
        this.isRunning = false;
        this.time = 0; 
        
        // Σημείο ανάρτησης (origin) ακριβώς όπως στον κώδικα αναφοράς σου[cite: 1]
        const originX = 450;
        const originY = 50;

        // 1. Φυσικό Σώμα (Εκκρεμές)
        this.pendulum = new Pendulum(originX, originY, 1.5, 1.0, Math.PI / 4);
        this.physicsBodies.push(this.pendulum);

        // 2. Όργανα Εργαστηρίου (Lab Instruments)
        // Τοποθετούμε το μοιρογνωμόνιο ακριβώς στο σημείο ανάρτησης
        this.protractor = new Protractor(originX, originY, 70);
        // Τοποθετούμε έναν χάρακα στα αριστερά του εκκρεμούς για μέτρηση μήκους
        this.ruler = new Ruler(240, 50, 450, this.pendulum.scalePx);
        // Τοποθετούμε το ψηφιακό χρονόμετρο δεξιά
        this.stopwatch = new Stopwatch(580, 280);

        this.instruments.push(this.protractor, this.ruler, this.stopwatch);

        // 3. Διαδραστικά Στοιχεία UI (Sliders & Buttons στην αριστερή στήλη)
        this.sliderAngle = new Slider(20, 20, 200, -90, 90, 45, "Αρχική Γωνία", "°");
        this.sliderLength = new Slider(20, 80, 200, 0.5, 3.0, 1.0, "Μήκος Νήματος", "m");
        this.sliderMass = new Slider(20, 140, 200, 0.1, 10.0, 1.0, "Μάζα", "kg");
        this.sliderGravity = new Slider(20, 200, 200, 1.0, 25.0, 9.81, "Βαρύτητα", "m/s²");
        this.sliderDamping = new Slider(20, 260, 200, 0.0, 2.0, 0.0, "Αντίσταση (b)", "");

        // Κουμπιά ελέγχου προσομοίωσης[cite: 1]
        this.btnPlay = new Button(20, 320, 90, 35, "Εκκίνηση", "#4CAF50", () => {
            this.isRunning = true;
        });

        this.btnPause = new Button(120, 320, 90, 35, "Παύση", "#f44336", () => {
            this.isRunning = false;
        });

        this.btnReset = new Button(220, 320, 90, 35, "Επαναφορά", "#2196F3", () => {
            this.isRunning = false;
            let initialAngleRad = this.sliderAngle.value * (Math.PI / 180);
            this.pendulum.theta = initialAngleRad; 
            this.pendulum.omega = 0;           
            this.time = 0; 
        });
        
        // Ετικέτες πληροφοριών[cite: 1]
        this.timeLabel = new Label(580, 40, () => `Χρόνος: ${this.time.toFixed(2)} s`);
        this.angleLabel = new Label(580, 70, () => {
            let deg = this.pendulum.theta * (180 / Math.PI);
            return `Γωνία: ${deg.toFixed(2)}°`;
        });
		
		// Δημιουργία Checkbox για τα Ίχνη
		this.chkTrail = new Checkbox(20, 370, "Εμφάνιση Ίχνους", false, (isChecked) => {
			this.pendulum.showTrail = isChecked;
		});

		// Δημιουργία Checkbox για τις Ακραίες Θέσεις
		this.chkExtremes = new Checkbox(20, 410, "Ακραίες Θέσεις", false, (isChecked) => {
			this.pendulum.showExtremes = isChecked;
		});
		
		// 1. Ορίζουμε την αρχική κλίμακα χρόνου
        this.timeScale = 1.0; 

        // 2. ΝΕΟ: Επιλογέας Ταχύτητας (Χρησιμοποιεί τον υπάρχοντα Selector)
        // Επιλεγμένο από προεπιλογή είναι το index 1 ("Κανονικά")
        this.speedSelector = new Selector(20, 460, ["Αργά", "Κανονικά", "Γρήγορα"], 1, (selected, index) => {
            if (index === 0) {
                this.timeScale = 0.2; // 5 φορές πιο αργά
            } else if (index === 1) {
                this.timeScale = 1.0; // Κανονικός χρόνος
            } else if (index === 2) {
                this.timeScale = 2.0; // 2 φορές πιο γρήγορα
            }
        });

        this.uiElements.push(
            this.sliderAngle, this.sliderLength, this.sliderMass, this.sliderGravity, this.sliderDamping, 
            this.btnPlay, this.btnPause, this.btnReset, 
            this.timeLabel, this.angleLabel, this.chkTrail, this.chkExtremes, this.speedSelector
        );
    }

    update(dt, sim) {
        // 1. Το UI ενημερώνεται πάντα με τον πραγματικό χρόνο
        this.uiElements.forEach(ui => ui.update(dt, sim));
        
        // Live Tweaking φυσικών παραμέτρων
        this.pendulum.L = this.sliderLength.value;
        this.pendulum.mass = this.sliderMass.value;
        this.pendulum.g = this.sliderGravity.value;
        this.pendulum.b = this.sliderDamping.value;

        // Συγχρονισμός αρχικής γωνίας όταν η προσομοίωση είναι σε παύση
        if (!this.isRunning && this.sliderAngle.isActive) {
            this.pendulum.theta = this.sliderAngle.value * (Math.PI / 180);
            this.pendulum.maxAngle = Math.abs(this.pendulum.theta); // Ενημέρωση μέγιστης γωνίας ακραίων θέσεων
            this.pendulum.omega = 0;
        }

        if (this.isRunning) {
            // ΝΕΟ: Υπολογισμός κλιμακωμένου χρόνου (simDt)
            let simDt = dt * this.timeScale; 

            // Ενημέρωση Φυσικής και Οργάνων με τον simDt (ώστε να τρέχουν αργά/γρήγορα)
            this.physicsBodies.forEach(body => body.update(simDt));
            this.instruments.forEach(inst => inst.update(simDt, sim));
            
            // Ο συνολικός χρόνος αυξάνεται επίσης με βάση τον simDt
            this.time += simDt;
        } else {
            // Ενημέρωση οργάνων ακόμη και στην παύση με το κανονικό dt
            // (απαραίτητο για να συνεχίσουν να ανταποκρίνονται τα κουμπιά του χρονομέτρου)
            this.instruments.forEach(inst => inst.update(dt, sim));
        }
    }
}