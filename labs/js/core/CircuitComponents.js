import { Entity } from './Entity.js';

// --- ΜΠΑΤΑΡΙΑ ---
export class Battery extends Entity {
    constructor(x, y, isHorizontal = true) {
        super(x, y);
        this.width = isHorizontal ? 120 : 60;
        this.height = isHorizontal ? 60 : 120;
        this.isHorizontal = isHorizontal;
    }
	
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // Σώμα μπαταρίας
        ctx.fillStyle = "#34495e";
        ctx.strokeStyle = "#2c3e50";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-this.width/2, -this.height/2, this.width, this.height, 5);
        ctx.fill();
        ctx.stroke();

        // Εξόγκωμα Θετικού Πόλου (Bump)
        let bumpW = 10;
        let bumpH = 24;
        if (this.isHorizontal) {
            ctx.beginPath();
            ctx.roundRect(this.width/2 - 2, -bumpH/2, bumpW, bumpH, [0, 4, 4, 0]);
            ctx.fill();
            ctx.stroke();
            
            // Καλύπτουμε τη γραμμή ένωσης μεταξύ σώματος και πόλου
            ctx.beginPath();
            ctx.moveTo(this.width/2, -bumpH/2 + 2);
            ctx.lineTo(this.width/2, bumpH/2 - 2);
            ctx.strokeStyle = "#34495e";
            ctx.lineWidth = 4;
            ctx.stroke();
        }

        // Ετικέτα (Κίτρινη ταινία)
        ctx.fillStyle = "#f1c40f";
        if (this.isHorizontal) {
            ctx.fillRect(-this.width/2 + 20, -this.height/2, this.width - 40, this.height);
        } else {
            ctx.fillRect(-this.width/2, -this.height/2 + 20, this.width, this.height - 40);
        }

        // Πόλοι
        if (this.isHorizontal) {
            ctx.fillStyle = "#e74c3c";
            ctx.font = "bold 16px Arial";
            ctx.fillText("+", this.width/2 - 15, 6);
            ctx.fillStyle = "#3498db";
            ctx.fillText("-", -this.width/2 + 8, 4);
        }

        ctx.restore();
    }
}

// --- ΔΙΑΚΟΠΤΗΣ ---
export class Switch extends Entity {
    constructor(x, y) {
        super(x, y);
        this.isClosed = false;
        this.length = 60;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // Ακροδέκτες (Κυκλάκια)
        ctx.fillStyle = "#7f8c8d";
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, 2 * Math.PI);
        ctx.arc(this.length, 0, 6, 0, 2 * Math.PI);
        ctx.fill();

        // Κινητό τμήμα διακόπτη (Λάμα)
        ctx.strokeStyle = "#e74c3c";
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        
        if (this.isClosed) {
            ctx.lineTo(this.length, 0); // Κλειστός (Οριζόντιος)
        } else {
            ctx.lineTo(this.length - 10, -25); // Ανοιχτός (Σηκωμένος)
        }
        ctx.stroke();

        ctx.restore();
    }
}

// --- ΛΑΜΠΤΗΡΑΣ ---
export class Lamp extends Entity {
    constructor(x, y) {
        super(x, y);
        this.isOn = false;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // 1. Γυάλινος Βολβός
        ctx.beginPath();
        ctx.arc(0, -20, 25, 0, 2 * Math.PI);
        ctx.fillStyle = this.isOn ? "rgba(255, 235, 59, 0.8)" : "rgba(236, 240, 241, 0.4)";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.isOn ? "#f39c12" : "#bdc3c7";
        ctx.stroke();

        // Λάμψη αν είναι αναμμένος
        if (this.isOn) {
            ctx.beginPath();
            ctx.arc(0, -20, 40, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(255, 235, 59, 0.2)";
            ctx.fill();
        }

        // 2. Νήμα πυράκτωσης (Το σχεδιάζουμε γκρι αν είναι σβηστό, φωτεινό κίτρινο/πορτοκαλί αν ανάβει)
        ctx.beginPath();
        ctx.moveTo(-10, 5);
        ctx.lineTo(-5, -15);
        ctx.lineTo(0, -25);
        ctx.lineTo(5, -15);
        ctx.lineTo(10, 5);
        ctx.strokeStyle = this.isOn ? "#fff9c4" : "#7f8c8d";
        ctx.lineWidth = 2;
        ctx.stroke();

        // 3. Βάση λαμπτήρα (Ντουί)
        ctx.fillStyle = "#95a5a6";
        ctx.fillRect(-12, 5, 24, 15);
        ctx.fillStyle = "#34495e";
        ctx.fillRect(-8, 20, 16, 8); // Επαφή βάσης

        ctx.restore();
    }
}