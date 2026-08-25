import { Entity } from './Entity.js';
import { CrystalNode } from './CrystalNode.js';
import { Spring } from './Spring.js';

export class CrystalLattice extends Entity {
    constructor(x, y, rows = 5, cols = 6, spacing = 40) {
        super(x, y);
        this.rows = rows;
        this.cols = cols;
        this.spacing = spacing;
        
        this.nodes = [];
        this.springs = [];
        
        const mass = 1.0;
        const radius = 8;
        const color = "#9c27b0"; 
        const k = 150;           
        
        this.buildLattice(mass, radius, color, k);
    }

    buildLattice(mass, radius, color, k) {
        // 1. Δημιουργία των Κόμβων (Ιόντων)
        for (let r = 0; r < this.rows; r++) {
            let rowNodes = [];
            for (let c = 0; c < this.cols; c++) {
                let px = this.x + c * this.spacing;
                let py = this.y + r * this.spacing;
                let isFixed = (r === 0);
				let damping = 1
                
                let node = new CrystalNode(px, py, mass, radius, color, isFixed, damping);
                
                // Δίνουμε αρχική κινητική ενέργεια (ταλάντωση) αν δεν είναι ακίνητα
                if (!isFixed) {
                    node.vx = (Math.random() - 0.5) * 80;
                    node.vy = (Math.random() - 0.5) * 80;
                }
                
                rowNodes.push(node);
            }
            this.nodes.push(rowNodes);
        }

        // 2. Δημιουργία των Ελατηρίων (Δεσμών) - [Παραμένει ίδιο]
        let diagDist = Math.sqrt(2) * this.spacing; 
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                let currentNode = this.nodes[r][c];

                if (c < this.cols - 1) {
                    let rightNode = this.nodes[r][c + 1];
                    this.springs.push(new Spring(currentNode, rightNode, k, this.spacing));
                }
                if (r < this.rows - 1) {
                    let bottomNode = this.nodes[r + 1][c];
                    this.springs.push(new Spring(currentNode, bottomNode, k, this.spacing));
                }
                if (r < this.rows - 1 && c < this.cols - 1) { 
                    let bottomRightNode = this.nodes[r + 1][c + 1];
                    this.springs.push(new Spring(currentNode, bottomRightNode, k, diagDist));
                }
                if (r < this.rows - 1 && c > 0) { 
                    let bottomLeftNode = this.nodes[r + 1][c - 1];
                    this.springs.push(new Spring(currentNode, bottomLeftNode, k, diagDist));
                }
            }
        }
		
		//Αρχικοποίηση της ομαλοποιημένης θερμοκρασίας
        this.smoothedTemp = 273;
    }

    heatBottom(factor, dt) {
        let bottomRow = this.nodes[this.rows - 1];
        bottomRow.forEach(node => {
            node.vx += (Math.random() - 0.5) * factor * dt;
            node.vy += (Math.random() - 0.5) * factor * dt;
        });
    }

    // Υπολογισμός θερμοκρασίας βάσει μέσης κινητικής ενέργειας
    getTemperature() {
        let totalKE = 0;
        let count = 0;
        
        for (let r = 1; r < this.rows; r++) { 
            for (let c = 0; c < this.cols; c++) {
                let node = this.nodes[r][c];
                let speedSq = node.vx * node.vx + node.vy * node.vy;
                totalKE += 0.5 * node.mass * speedSq;
                count++;
            }
        }
        
        if (count === 0) return 273;
        let avgKE = totalKE / count;
        
        // 1. Στιγμιαία θερμοκρασία
        let instantTemp = 273 + (avgKE * 0.1); 
        
        // 2. Ομαλοποίηση (Smoothing)
        // Το 0.95 σημαίνει ότι κρατάμε το 95% της παλιάς τιμής και παίρνουμε 
        // μόνο το 5% της νέας, εξαλείφοντας έτσι τον "θόρυβο" (fluctuations).
        this.smoothedTemp = (this.smoothedTemp * 0.98) + (instantTemp * 0.02);
        
        return this.smoothedTemp;
    }
	
    update(dt) {
        this.springs.forEach(spring => spring.update(dt));
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                this.nodes[r][c].update(dt);
            }
        }
    }

    draw(ctx) {
        this.springs.forEach(spring => spring.draw(ctx));
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                this.nodes[r][c].draw(ctx);
            }
        }
    }
}