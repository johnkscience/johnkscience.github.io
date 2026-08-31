import { UIElement } from './UIElement.js';

export class ChartWindow extends UIElement {
    constructor(x, y, width, height, title, xLabel, yLabel) {
        super(x, y, width, height);
        this.title = title;
        this.xLabel = xLabel;
        this.yLabel = yLabel;
        this.data = []; 
        
        // ΝΕΟ: Το παράθυρο ξεκινάει κρυμμένο!
        this.isVisible = false; 
        this.wasMouseDown = false;
    }

    addDataPoint(xValue, yValue) {
        this.data.push({ x: xValue, y: yValue });
        if (this.data.length > 500) this.data.shift();
    }

    update(dt, sim) {
        if (!this.isVisible) return; // Αν είναι κρυμμένο, δεν κάνει τίποτα!

        this.isHovered = this.containsPoint(sim.mouseX, sim.mouseY);

        if (this.isHovered && sim.isMouseDown && !this.wasMouseDown) {
            // Έλεγχος αν πατήθηκε το κουμπί [-] πάνω δεξιά
            let btnSize = 30;
            let btnX = this.x + this.width - btnSize;
            
            if (sim.mouseX > btnX && sim.mouseY < this.y + btnSize) {
                this.isVisible = false; // Το κρύβουμε εντελώς!
            }
        }
        this.wasMouseDown = sim.isMouseDown;
    }

    draw(ctx) {
        if (!this.isVisible) return; // Αν είναι κρυμμένο, δεν ζωγραφίζεται τίποτα!

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
        ctx.fillText(`📊 ${this.title}`, this.x + 10, this.y + titleHeight / 2);

        // 3. Κουμπί Κλεισίματος [-]
        ctx.fillStyle = "#f44336"; 
        ctx.fillRect(this.x + this.width - 30, this.y, 30, titleHeight);
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("—", this.x + this.width - 15, this.y + titleHeight / 2);

        // 4. Σχεδίαση του Γραφήματος
        this.drawGraphData(ctx, titleHeight);
        
        ctx.restore();
    }

    drawGraphData(ctx, titleHeight) {
        if (this.data.length < 2) return;

        let paddingX = 70; 
        let paddingY = 40;
        let plotX = this.x + paddingX;
        let plotY = this.y + titleHeight + 10;
        let plotW = this.width - paddingX - 15;
        let plotH = this.height - titleHeight - paddingY - 15;

        let minXData = Math.min(...this.data.map(d => d.x));
        let maxXData = Math.max(...this.data.map(d => d.x));
        let minYData = Math.min(...this.data.map(d => d.y));
        let maxYData = Math.max(...this.data.map(d => d.y));

        if (maxXData === minXData) maxXData += 1;
        if (maxYData === minYData) maxYData += 1;

        // Σχεδίαση αξόνων
        ctx.strokeStyle = "#999";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(plotX, plotY);
        ctx.lineTo(plotX, plotY + plotH); 
        ctx.lineTo(plotX + plotW, plotY + plotH); 
        ctx.stroke();

        // Σχεδίαση Κλίμακας
        ctx.fillStyle = "#555";
        ctx.font = "10px Arial";
        let steps = 4;

        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        for (let i = 0; i <= steps; i++) {
            let px = plotX + (i / steps) * plotW;
            let val = minXData + (i / steps) * (maxXData - minXData);
            ctx.beginPath();
            ctx.moveTo(px, plotY + plotH);
            ctx.lineTo(px, plotY + plotH + 5);
            ctx.stroke();
            ctx.fillText(val.toFixed(1), px, plotY + plotH + 8);
        }

        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        for (let i = 0; i <= steps; i++) {
            let py = (plotY + plotH) - (i / steps) * plotH;
            let val = minYData + (i / steps) * (maxYData - minYData);
            ctx.beginPath();
            ctx.moveTo(plotX, py);
            ctx.lineTo(plotX - 5, py);
            ctx.stroke();
            ctx.fillText(val.toFixed(1), plotX - 8, py);
        }

        // Ετικέτες Αξόνων
        ctx.fillStyle = "#333";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.xLabel, plotX + plotW / 2, plotY + plotH + 25);
        
        ctx.save();
        ctx.translate(plotX - 55, plotY + plotH / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(this.yLabel, 0, 0); 
        ctx.restore();

        // Σχεδίαση Γραμμής Δεδομένων
        ctx.beginPath();
        ctx.strokeStyle = "#2196F3"; 
        ctx.lineWidth = 2;
        for (let i = 0; i < this.data.length; i++) {
            let d = this.data[i];
            let px = plotX + ((d.x - minXData) / (maxXData - minXData)) * plotW;
            let py = (plotY + plotH) - ((d.y - minYData) / (maxYData - minYData)) * plotH;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Σχεδίαση των σημείων (κουκκίδες)
        ctx.fillStyle = "#f44336"; 
        for (let i = 0; i < this.data.length; i++) {
            let d = this.data[i];
            let px = plotX + ((d.x - minXData) / (maxXData - minXData)) * plotW;
            let py = (plotY + plotH) - ((d.y - minYData) / (maxYData - minYData)) * plotH;
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, 2 * Math.PI); 
            ctx.fill();
        }
    }
}