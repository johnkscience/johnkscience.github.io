import { UIElement } from './UIElement.js';

export class DataTableWindow extends UIElement {
    constructor(x, y, width, height, title, arg1 = 1, arg2 = null) {
        super(x, y, width, height);
        this.title = title;
        this.data = []; 
        
        // Ευέλικτη ανάθεση παραμέτρων για να υποστηρίζει και τις παλιές σκηνές
        // (Στην παλιά έκδοση το arg1 ήταν dockIndex, στη νέα είναι το onDelete)
        if (typeof arg1 === 'function') {
            this.onDelete = arg1;
        } else {
            this.onDelete = arg2;
        }

        this.isVisible = false; 
        this.wasMouseDown = false;
    }

    update(dt, sim) {
        if (!this.isVisible) return; 

        this.isHovered = this.containsPoint(sim.mouseX, sim.mouseY);

        if (this.isHovered && sim.isMouseDown && !this.wasMouseDown) {
            let btnSize = 30;
            
            // Έλεγχος Κλεισίματος [-]
            if (sim.mouseX > this.x + this.width - btnSize && sim.mouseY < this.y + btnSize) {
                this.isVisible = false; 
            } else {
                // Έλεγχος Διαγραφής Γραμμής [x]
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
        if (!this.isVisible) return; 

        ctx.save();
        
        // 1. Φόντο και Περίγραμμα
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.strokeStyle = "#455a64";
        ctx.lineWidth = 2;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // 2. Μπάρα Τίτλου
        let titleHeight = 30;
        ctx.fillStyle = "#455a64";
        ctx.fillRect(this.x, this.y, this.width, titleHeight);
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(`📋 ${this.title}`, this.x + 10, this.y + titleHeight / 2);

        // 3. Κουμπί [-]
        ctx.fillStyle = "#f44336";
        ctx.fillRect(this.x + this.width - 30, this.y, 30, titleHeight);
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("—", this.x + this.width - 15, this.y + titleHeight / 2);

        // 4. Ασφαλής υπολογισμός στηλών (χωρίς να κρασάρει αν είναι άδειο)
        let numSeries = 1;
        if (this.data.length > 0) {
            let sampleY = this.data[0].y;
            if (Array.isArray(sampleY)) {
                numSeries = sampleY.length;
            }
        }
        let colWidth = (this.width - 40) / (numSeries + 1);

        // 5. Επικεφαλίδες Στηλών
        ctx.fillStyle = "#e9ecef";
        ctx.fillRect(this.x + 2, this.y + titleHeight, this.width - 4, 25);
        ctx.fillStyle = "#495057";
        ctx.font = "bold 12px Arial";
        ctx.textBaseline = "middle";
        
        ctx.fillText("Άξονας X", this.x + colWidth * 0.5, this.y + titleHeight + 12);
        if (numSeries === 1) {
            ctx.fillText("Άξονας Y", this.x + colWidth * 1.5, this.y + titleHeight + 12);
        } else {
            for (let j = 0; j < numSeries; j++) {
                ctx.fillText(`Y${j + 1}`, this.x + colWidth * (j + 1.5), this.y + titleHeight + 12);
            }
        }

        // Μήνυμα όταν δεν υπάρχουν δεδομένα (σταματάει εδώ)
        if (this.data.length === 0) {
            ctx.fillStyle = "#888";
            ctx.font = "italic 13px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Κενός Πίνακας", this.x + this.width / 2, this.y + 100);
            ctx.restore();
            return;
        }

        // 6. Εγγραφή Δεδομένων
        ctx.font = "12px monospace";
        let rowHeight = 25;
        let startY = this.y + 60;
        let maxRows = Math.floor((this.height - 70) / rowHeight);
        let startIndex = Math.max(0, this.data.length - maxRows);

        for (let i = 0; i < maxRows && (startIndex + i) < this.data.length; i++) {
            let d = this.data[startIndex + i];
            let rowY = startY + i * rowHeight;

            // -- Ασφαλής Σχεδίαση Τιμής X --
            ctx.fillStyle = "#212529";
            ctx.textAlign = "center";
            let valXStr = Number(d.x).toFixed(2);
            if (isNaN(valXStr)) valXStr = "0.00";
            ctx.fillText(valXStr, this.x + colWidth * 0.5, rowY);
            
            // -- Ασφαλής Σχεδίαση Τιμών Y --
            // Μετατρέπουμε το d.y σε πίνακα ανεξάρτητα από το τι ήταν αρχικά (scalar ή array)
            let yVals = Array.isArray(d.y) ? d.y : [d.y];
            
            for (let j = 0; j < numSeries; j++) {
                let rawY = yVals[j] !== undefined ? yVals[j] : 0;
                let valYStr = Number(rawY).toFixed(2);
                if (isNaN(valYStr)) valYStr = "0.00";
                
                ctx.fillText(valYStr, this.x + colWidth * (j + 1.5), rowY);
            }

            // -- Κουμπί διαγραφής γραμμής [x] --
            ctx.fillStyle = "#f44336";
            ctx.font = "bold 12px Arial";
            ctx.fillText("[x]", this.x + this.width - 15, rowY);
            ctx.font = "12px monospace"; // Επαναφορά font για την επόμενη γραμμή
        }
        
        ctx.restore();
    }
}