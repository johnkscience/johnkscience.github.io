import { LabInstrument } from './LabInstrument.js';

export class Ruler extends LabInstrument {
    constructor(x, y, height = 450, scalePx = 150) {
        super(x, y);
        this.height = height; 
        this.scalePx = scalePx; 
        this.width = 40;
        this.angle = 0; // Γωνία περιστροφής σε ακτίνια

        // Καταστάσεις αλληλεπίδρασης ποντικιού
        this.isDragging = false;
        this.isRotating = false;
        this.dragOffsetX = 0;
        this.dragOffsetY = 0;
        this.lastMouseX = 0;

        // Τοπικές συντεταγμένες του κύκλου-χειριστηρίου (handle) στην κορυφή του χάρακα
        this.handleRadius = 12;
        this.handleLocalX = this.width / 2;
        this.handleLocalY = -15; // Λίγο πιο πάνω από την αρχή του χάρακα
    }

    // Μετατρέπει τις παγκόσμιες συντεταγμένες του ποντικιού σε τοπικές του χάρακα (υπολογίζοντας περιστροφή και θέση)
    getWorldHandlePosition() {
        let cos = Math.cos(this.angle);
        let sin = Math.sin(this.angle);
        // Περιστροφή και μετάθεση γύρω από το (this.x, this.y)
        let wx = this.x + (this.handleLocalX * cos - this.handleLocalY * sin);
        let wy = this.y + (this.handleLocalX * sin + this.handleLocalY * cos);
        return { x: wx, y: wy };
    }

    // Έλεγχος αν το ποντίκι βρίσκεται πάνω στη λαβή (handle)
    containsPoint(mouseX, mouseY) {
        let handle = this.getWorldHandlePosition();
        let dx = mouseX - handle.x;
        let dy = mouseY - handle.y;
        return (dx * dx + dy * dy) <= (this.handleRadius * this.handleRadius);
    }

    update(dt, sim) {
        let isShiftPressed = sim.isShiftDown || false;

        if (sim.isMouseDown) {
            if (!this.isDragging && !this.isRotating && this.containsPoint(sim.mouseX, sim.mouseY)) {
                if (isShiftPressed) {
                    this.isRotating = true;
                } else {
                    this.isDragging = true;
                    this.dragOffsetX = sim.mouseX - this.x;
                    this.dragOffsetY = sim.mouseY - this.y;
                }
                this.lastMouseX = sim.mouseX;
            }

            // Ενέργεια Μετακίνησης (Drag)
            if (this.isDragging) {
                this.x = sim.mouseX - this.dragOffsetX;
                this.y = sim.mouseY - this.dragOffsetY;
            }

            // Ενέργεια Περιστροφής (Shift + Mouse Move)
            if (this.isRotating) {
                let dx = sim.mouseX - this.lastMouseX;
                this.angle += dx * 0.01; 
                this.lastMouseX = sim.mouseX;
            }
        } else {
            this.isDragging = false;
            this.isRotating = false;
        }
    }

    draw(ctx) {
        ctx.save();
        // Μετατόπιση στο σημείο του χάρακα και περιστροφή γύρω από την αρχή του
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // 1. Σώμα χάρακα
        ctx.fillStyle = "rgba(255, 248, 220, 0.9)";
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.strokeStyle = "#b8860b";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(0, 0, this.width, this.height);

        // Υποδιαιρέσεις ανά εκατοστό
        ctx.font = "9px Arial";
        ctx.fillStyle = "#333";
        ctx.textAlign = "right";

        let cmPixels = this.scalePx / 100;

        for (let cm = 0; cm <= this.height / cmPixels; cm++) {
            let py = cm * cmPixels;
            if (py > this.height) break;

            let lineWidth = 5;
            if (cm % 10 === 0) {
                lineWidth = 15; 
                let meters = (cm / 100).toFixed(1);
                ctx.fillText(`${meters}m`, this.width - 18, py + 3);
            } else if (cm % 5 === 0) {
                lineWidth = 10; 
            }

            ctx.beginPath();
            ctx.moveTo(this.width, py);
            ctx.lineTo(this.width - lineWidth, py);
            ctx.strokeStyle = "#000";
            ctx.lineWidth = (lineWidth === 15) ? 1.5 : 1;
            ctx.stroke();
        }

        // 2. Σχεδίαση Οπτικού Χειριστηρίου (Handle) στην κορυφή του χάρακα
        ctx.beginPath();
        ctx.arc(this.handleLocalX, this.handleLocalY, this.handleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "#ff9800"; // Πορτοκαλί ευδιάκριτο χρώμα
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#d84315";
        ctx.stroke();

        // Εικονίδιο / Σύμβολο μέσα στη λαβή (π.χ. σταυρός μετακίνησης)
        ctx.fillStyle = "#fff";
        ctx.font = "bold 10px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("⤛⤜", this.handleLocalX, this.handleLocalY);

        ctx.restore();
    }
}