import { UIElement } from './UIElement.js';

export class DataTableWindow extends UIElement {
    constructor(x, y, width, height, title, onDelete = null) {
        super(x, y, width, height);
        this.title = title;
        this.data = []; 
        this.onDelete = onDelete; 

        // ΝΕΟ: Ξεκινάει κρυμμένο!
        this.isVisible = false; 
        this.wasMouseDown = false;
    }

    update(dt, sim) {
        if (!this.isVisible) return; // Δεν κάνει τίποτα αν είναι κρυμμένο

        this.isHovered = this.containsPoint(sim.mouseX, sim.mouseY);

        // ΔΙΟΡΘΩΣΗ: Προσθέσαμε το this.isHovered ώστε να αντιδρά 
        // μόνο αν το ποντίκι είναι ΠΑΝΩ στο δικό του παράθυρο!
        if (this.isHovered && sim.isMouseDown && !this.wasMouseDown) {
            let btnSize = 30;
            
            // Έλεγχος αν πατήθηκε το [-] κλεισίματος
            if (sim.mouseX > this.x + this.width - btnSize && sim.mouseY < this.y + btnSize) {
                this.isVisible = false; // Το κρύβουμε!
            } else {
                // Έλεγχος αν πατήθηκε κάποιο [x] διαγραφής γραμμής
                let rowHeight = 25;
                let startY = this.y + 60;
                let maxRows = Math.floor((this.height - 70) / rowHeight);
                let startIndex = Math.max(0, this.data.length - maxRows);

                for (let i = 0; i < maxRows && (startIndex + i) < this.data.length; i++) {
                    let rowY = startY + i * rowHeight;
                    let btnX = this.x + this.width - 30;

                    if (sim.mouseX > btnX && sim.mouseX < btnX + 25 &&
                        sim.mouseY > rowY - 10 && sim.mouseY < rowY + 10) {
                        
                        let actualIndex = startIndex + i;
                        this.data.splice(actualIndex, 1);
                        if (this.onDelete) this.onDelete(actualIndex);
                        break; 
                    }
                }
            }
        }
        this.wasMouseDown = sim.isMouseDown;
    }

    draw(ctx) {
        if (!this.isVisible) return; // Δεν ζωγραφίζεται τίποτα αν είναι κρυμμένο

        ctx.save();
        
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.strokeStyle = "#455a64";
        ctx.lineWidth = 2;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

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

        // Επικεφαλίδες
        ctx.fillStyle = "#e9ecef";
        ctx.fillRect(this.x + 2, this.y + titleHeight, this.width - 4, 25);
        ctx.fillStyle = "#495057";
        ctx.font = "bold 12px Arial";
        ctx.fillText("Άξονας X", this.x + this.width * 0.3, this.y + titleHeight + 12);
        ctx.fillText("Άξονας Y", this.x + this.width * 0.6, this.y + titleHeight + 12);

        // Δεδομένα
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

            ctx.fillStyle = "#f44336";
            ctx.font = "bold 12px Arial";
            ctx.fillText("[x]", this.x + this.width - 15, rowY);
            ctx.fillStyle = "#212529"; 
        }
        
        ctx.restore();
    }
}