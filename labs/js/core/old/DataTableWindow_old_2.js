import { UIElement } from './UIElement.js';

export class DataTableWindow extends UIElement {
    constructor(x, y, width, height, title, dockIndex = 1, onDelete = null) {
        super(x, y, width, height);
        this.title = title;
        this.data = []; // Θα αποθηκεύει τα ζεύγη {x, y}
        this.onDelete = onDelete; // Callback συνάρτηση όταν διαγράφεται μια γραμμή

        this.isMinimized = true; // Ας ξεκινάει ελαχιστοποιημένο για να γλιτώνουμε χώρο!
        this.wasMouseDown = false;

        this.normalX = x;
        this.normalY = y;
        this.normalWidth = width;
        this.normalHeight = height;

        this.minWidth = 150;
        this.minHeight = 30;
        this.minX = 20 + (dockIndex * 160); // Στοιβάζονται δίπλα-δίπλα κάτω αριστερά
        this.minY = 550; // Ρύθμισε το ύψος ανάλογα με το Canvas σου
    }

    update(dt, sim) {
        this.isHovered = this.containsPoint(sim.mouseX, sim.mouseY);

        if (sim.isMouseDown && !this.wasMouseDown) {
            if (this.isMinimized && this.isHovered) {
                // Μεγιστοποίηση
                this.isMinimized = false;
                this.x = this.normalX;
                this.y = this.normalY;
                this.width = this.normalWidth;
                this.height = this.normalHeight;
            } else if (!this.isMinimized) {
                // Έλεγχος αν πατήθηκε το κουμπί ελαχιστοποίησης [-]
                let btnSize = 30;
                if (sim.mouseX > this.x + this.width - btnSize && sim.mouseY < this.y + btnSize) {
                    this.isMinimized = true;
                    this.x = this.minX;
                    this.y = this.minY;
                    this.width = this.minWidth;
                    this.height = this.minHeight;
                } else {
                    // Έλεγχος αν πατήθηκε κάποιο [x] διαγραφής γραμμής
                    let rowHeight = 25;
                    let startY = this.y + 60;
                    let maxRows = Math.floor((this.height - 70) / rowHeight);
                    let startIndex = Math.max(0, this.data.length - maxRows);

                    for (let i = 0; i < maxRows && (startIndex + i) < this.data.length; i++) {
                        let rowY = startY + i * rowHeight;
                        let btnX = this.x + this.width - 30;

                        // Αν το ποντίκι είναι πάνω στο [x]
                        if (sim.mouseX > btnX && sim.mouseX < btnX + 25 &&
                            sim.mouseY > rowY - 10 && sim.mouseY < rowY + 10) {
                            
                            let actualIndex = startIndex + i;
                            this.data.splice(actualIndex, 1); // Αφαίρεση από τον πίνακα
                            if (this.onDelete) this.onDelete(actualIndex); // Ειδοποίηση της σκηνής
                            break; 
                        }
                    }
                }
            }
        }
        this.wasMouseDown = sim.isMouseDown;
    }

    draw(ctx) {
        ctx.save();
        if (this.isMinimized) {
            this.drawMinimized(ctx);
        } else {
            this.drawMaximized(ctx);
        }
        ctx.restore();
    }

    drawMinimized(ctx) {
        ctx.fillStyle = this.isHovered ? "#37474f" : "#263238";
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 5);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`📋 ${this.title}`, this.x + this.width / 2, this.y + this.height / 2);
    }

    drawMaximized(ctx) {
        // Φόντο και Περίγραμμα
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.strokeStyle = "#455a64";
        ctx.lineWidth = 2;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Μπάρα Τίτλου
        let titleHeight = 30;
        ctx.fillStyle = "#455a64";
        ctx.fillRect(this.x, this.y, this.width, titleHeight);
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(`📋 ${this.title}`, this.x + 10, this.y + titleHeight / 2);

        // Κουμπί [-]
        ctx.fillStyle = "#f44336";
        ctx.fillRect(this.x + this.width - 30, this.y, 30, titleHeight);
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("—", this.x + this.width - 15, this.y + titleHeight / 2);

        // Επικεφαλίδες στηλών
        ctx.fillStyle = "#e9ecef";
        ctx.fillRect(this.x + 2, this.y + titleHeight, this.width - 4, 25);
        ctx.fillStyle = "#495057";
        ctx.font = "bold 12px Arial";
        ctx.fillText("Άξονας X", this.x + this.width * 0.3, this.y + titleHeight + 12);
        ctx.fillText("Άξονας Y", this.x + this.width * 0.6, this.y + titleHeight + 12);

        // Γραμμές Δεδομένων
        ctx.fillStyle = "#212529";
        ctx.font = "12px monospace";
        let rowHeight = 25;
        let startY = this.y + 60;
        let maxRows = Math.floor((this.height - 70) / rowHeight);
        let startIndex = Math.max(0, this.data.length - maxRows);

        for (let i = 0; i < maxRows && (startIndex + i) < this.data.length; i++) {
            let d = this.data[startIndex + i];
            let rowY = startY + i * rowHeight;

            ctx.textAlign = "center";
            ctx.fillText(d.x.toFixed(2), this.x + this.width * 0.3, rowY);
            ctx.fillText(d.y.toFixed(2), this.x + this.width * 0.6, rowY);

            // Κουμπάκι διαγραφής [x]
            ctx.fillStyle = "#f44336";
            ctx.font = "bold 12px Arial";
            ctx.fillText("[x]", this.x + this.width - 15, rowY);
            ctx.fillStyle = "#212529"; // Επαναφορά χρώματος
        }
    }
}