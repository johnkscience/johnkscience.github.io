import { Scene } from '../core/Scene.js';
import { ThermalSource } from '../core/ThermalSource.js';
import { Thermometer } from '../core/Thermometer.js';
import { HoldButton } from '../core/HoldButton.js';
import { Button } from '../core/Button.js';
import { Selector } from '../core/Selector.js';
import { ChartWindow } from '../core/ChartWindow.js';
import { DataTableWindow } from '../core/DataTableWindow.js';
import { DataLogger } from '../core/DataLogger.js';

// ΣΗΜΕΙΩΣΗ: Την κλάση WaterContainer θα την φτιάξουμε στο επόμενο βήμα!
import { WaterContainer } from '../core/WaterContainer.js'; 

export class WaterPhaseScene extends Scene {
    setup() {
        this.isRunning = true;
        this.totalTime = 0;
        this.timeScale = 1.0;

        // 1. Φυσικό Περιβάλλον
        this.container = new WaterContainer(300, 50, 300, 400);
        this.physicsBodies.push(this.container);

        // 2. Όργανα (Θερμαντήρας & Θερμόμετρο)
        this.thermalSource = new ThermalSource(450, 510); 
        this.thermometer = new Thermometer(660, 180, 0, 500); // 0 K έως 500 K
        this.instruments.push(this.thermalSource, this.thermometer);

        // 3. Χειριστήρια (UI)
        this.btnHeat = new HoldButton(20, 20, 180, 45, "🔥 Θέρμανση (Hold)", "#ff9800", "#d84315", 
            (dt) => { 
                if (this.isRunning) {
                    this.thermalSource.state = 'heating';
                    this.container.heatUp(0.2, dt); 
                }
            }, 
            () => { this.thermalSource.state = 'idle'; }
        );

        this.btnCool = new HoldButton(20, 80, 180, 45, "❄️ Ψύξη (Hold)", "#03a9f4", "#0277bd", 
            (dt) => { 
                if (this.isRunning) {
                    this.thermalSource.state = 'cooling';
                    this.container.heatUp(-0.2, dt); 
                }
            }, 
            () => { this.thermalSource.state = 'idle'; }
        );

        this.btnPause = new Button(20, 140, 180, 35, "Παύση", "#f44336", () => {
            this.isRunning = !this.isRunning;
            this.btnPause.text = this.isRunning ? "Παύση" : "Εκκίνηση";
            this.btnPause.color = this.isRunning ? "#f44336" : "#4CAF50";
        });

        // ΣΗΜΑΝΤΙΚΟ: Τα παράθυρα μπαίνουν τελευταία!
        this.uiElements.push(
            this.btnHeat, this.btnCool, this.btnPause
        );
    }

    update(dt, sim) {
        this.uiElements.forEach(ui => ui.update(dt, sim));
        
        if (this.isRunning) {
            let simDt = dt * this.timeScale; 
            this.totalTime += simDt;
            
            this.physicsBodies.forEach(body => body.update(simDt));
            this.instruments.forEach(inst => inst.update(simDt, sim));
            
            let currentTemp = this.container.currentTemperature;
            this.thermometer.setTemperature(currentTemp);
        }
    }

    draw(ctx) {
        this.instruments.forEach(inst => inst.draw(ctx));
        this.physicsBodies.forEach(body => body.draw(ctx));
        this.uiElements.forEach(ui => ui.draw(ctx));
    }
}