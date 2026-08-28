import { Simulation } from './core/Simulation.js';
// Εισάγουμε όλες τις σκηνές μας
import { PendulumScene } from './scenes/PendulumScene.js';
import { KineticGasScene } from './scenes/KineticGasScene.js'; 
import { CrystalScene } from './scenes/CrystalScene.js'; 
import { WaterPhaseScene } from './scenes/WaterPhaseScene.js';
import { MacroPhaseChangeScene } from './scenes/MacroPhaseChangeScene.js';
import { AtomicModelScene } from './scenes/AtomicModelScene.js';

window.onload = () => {
    const sim = new Simulation('labCanvas');
    
    // Φορτώνουμε τη σκηνή του Κρυστάλλου
    const activeExperiment = new AtomicModelScene();
    
    sim.sceneManager.switchScene(activeExperiment);
    
    // Ξεκινάμε τον κινητήρα!
    sim.start();
};