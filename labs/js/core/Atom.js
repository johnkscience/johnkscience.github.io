import { Entity } from './Entity.js';

const NEUTRONS_MAP = [0, 0, 2, 4, 5, 6, 6, 7, 8, 10, 10, 12, 12, 14, 14, 16, 16, 18, 22, 20, 20];

export class Atom extends Entity {
    constructor(x, y, Z = 1) {
        super(x, y);
        this.Z = Z; 
        this.ionCharge = 0; 
        
        this.time = 0; 
        this.shellRadii = [40, 75, 110, 145];
        this.flyingElectrons = [];
        
        this.nucleons = [];
        this.generateNucleus();
    }

    setZ(newZ) {
        this.Z = Math.max(1, Math.min(20, newZ));
        this.ionCharge = 0; 
        this.generateNucleus();
    }

    generateNucleus() {
        this.nucleons = [];
        let N = NEUTRONS_MAP[this.Z] || this.Z; 
        let totalNucleons = this.Z + N;
        
        for (let i = 0; i < totalNucleons; i++) {
            let radius = Math.sqrt(i) * 3.5; 
            let theta = i * 2.4; 
            
            this.nucleons.push({
                x: radius * Math.cos(theta),
                y: radius * Math.sin(theta),
                isProton: i < this.Z 
            });
        }
        this.nucleons.sort(() => Math.random() - 0.5);
    }

    getShellDistribution(electronsToDistribute = this.Z - this.ionCharge) {
        let electrons = electronsToDistribute;
        let shells = [];
        
        if (electrons > 0) { shells.push(Math.min(electrons, 2)); electrons -= shells[0]; }
        if (electrons > 0) { shells.push(Math.min(electrons, 8)); electrons -= shells[1]; }
        if (electrons > 0) { shells.push(Math.min(electrons, 8)); electrons -= shells[2]; }
        if (electrons > 0) { shells.push(Math.min(electrons, 2)); electrons -= shells[3]; }
        
        return shells;
    }

    ionize(chargeChange) {
        let currentElectrons = this.Z - this.ionCharge;
        
        if (chargeChange > 0) { 
            // ΑΠΟΒΟΛΗ (Φεύγει ηλεκτρόνιο)
            if (currentElectrons > 0) {
                this.ionCharge++;
                let shells = this.getShellDistribution(currentElectrons);
                // ΔΙΟΡΘΩΣΗ: Παίρνουμε την *τελευταία γεμάτη* στοιβάδα (-1)
                let outerShellIndex = Math.max(0, shells.length - 1); 
                let startRadius = this.shellRadii[outerShellIndex];
                let angle = Math.random() * 2 * Math.PI;

                this.flyingElectrons.push({
                    x: startRadius * Math.cos(angle), 
                    y: startRadius * Math.sin(angle), 
                    vx: 200 * Math.cos(angle), // Φεύγει ακτινωτά προς τα έξω
                    vy: 200 * Math.sin(angle),
                    life: 1.0, type: 'remove'
                });
            }
        } else { 
            // ΠΡΟΣΛΗΨΗ (Έρχεται ηλεκτρόνιο)
            if (this.ionCharge > -4) {
                this.ionCharge--;
                let currentElectronsNew = this.Z - this.ionCharge;
                let newShells = this.getShellDistribution(currentElectronsNew);
                
                // Υπολογισμός της τροχιάς-στόχου (στοιβάδα σθένους όπου θα προσγειωθεί)
                let targetShellIndex = Math.max(0, newShells.length - 1);
                let targetRadius = this.shellRadii[targetShellIndex];

                this.flyingElectrons.push({
                    progress: 0,
                    targetR: targetRadius,
                    startX: 250,      // Ξεκινάει από έξω δεξιά
                    startY: -150,     // και λίγο ψηλά
                    life: 1.0, type: 'add'
                });
            }
        }
    }

    update(dt) {
        this.time += dt;

        for (let i = this.flyingElectrons.length - 1; i >= 0; i--) {
            let fe = this.flyingElectrons[i];
            
            if (fe.type === 'add') {
                // Εφέ Προσέλκυσης με Καμπύλη
                fe.progress += dt * 1.5; // Ταχύτητα άφιξης
                let t = Math.min(1, fe.progress);
                
                // Σημείο ελέγχου (Control Point) για να διαγράψει καμπύλη (Bezier)
                let cpX = 50, cpY = -250; 
                
                // Ο στόχος (περιστρέφεται μαζί με τα υπόλοιπα ηλεκτρόνια)
                let endX = fe.targetR * Math.cos(this.time);
                let endY = fe.targetR * Math.sin(this.time);

                // Quadratic Bezier Curve formula
                fe.x = Math.pow(1-t, 2) * fe.startX + 2*(1-t)*t * cpX + Math.pow(t, 2) * endX;
                fe.y = Math.pow(1-t, 2) * fe.startY + 2*(1-t)*t * cpY + Math.pow(t, 2) * endY;
                
                fe.life = 1 - t;
            } else {
                // Εφέ Αποβολής (Γραμμική κίνηση προς τα έξω)
                fe.x += fe.vx * dt;
                fe.y += fe.vy * dt;
                fe.life -= dt * 1.5;
            }

            if (fe.life <= 0) this.flyingElectrons.splice(i, 1);
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        if (this.ionCharge !== 0) {
            let glowColor = this.ionCharge > 0 ? "rgba(33, 150, 243, 0.15)" : "rgba(244, 67, 54, 0.15)";
            ctx.beginPath();
            ctx.arc(0, 0, this.shellRadii[3] + 20, 0, 2 * Math.PI);
            ctx.fillStyle = glowColor;
            ctx.fill();
            
            ctx.fillStyle = this.ionCharge > 0 ? "#1976d2" : "#d32f2f";
            ctx.font = "bold 24px Arial";
            ctx.textAlign = "center";
            let chargeText = Math.abs(this.ionCharge) === 1 ? "" : Math.abs(this.ionCharge);
            let sign = this.ionCharge > 0 ? "+" : "-";
            ctx.fillText(`${chargeText}${sign}`, this.shellRadii[2] + 20, -this.shellRadii[2] - 20);
        }

        let shells = this.getShellDistribution();
        
        for (let s = 0; s < 4; s++) {
            let radius = this.shellRadii[s];
            
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = "rgba(100, 100, 100, 0.3)";
            ctx.setLineDash([4, 4]);
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.setLineDash([]); 

            if (s < shells.length) {
                let eCount = shells[s];
                let speed = 1.0 / (s + 1); 
                
                for (let e = 0; e < eCount; e++) {
                    let angle = (e * (2 * Math.PI / eCount)) + (this.time * speed);
                    let ex = radius * Math.cos(angle);
                    let ey = radius * Math.sin(angle);
                    
                    ctx.beginPath();
                    ctx.arc(ex, ey, 4, 0, 2 * Math.PI);
                    ctx.fillStyle = "#ffeb3b"; 
                    ctx.fill();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = "#333";
                    ctx.stroke();
                }
            }
        }

        for (let n of this.nucleons) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = n.isProton ? "#f44336" : "#9e9e9e"; 
            ctx.fill();
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = "rgba(0,0,0,0.5)";
            ctx.stroke();
        }

        // Σχεδίαση των ιπτάμενων ηλεκτρονίων
        for (let fe of this.flyingElectrons) {
            ctx.beginPath();
            ctx.arc(fe.x, fe.y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = "#ffeb3b";
            ctx.fill();
            ctx.stroke();
            
            if (fe.type === 'remove') {
                ctx.beginPath();
                ctx.moveTo(fe.x, fe.y);
                ctx.lineTo(fe.x - (fe.vx * 0.05), fe.y - (fe.vy * 0.05));
                ctx.strokeStyle = "#ffeb3b";
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        ctx.restore();
    }
}