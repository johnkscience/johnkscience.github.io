export class WaterContainer {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.particles = [];
        this.currentTemperature = 250; // Ξεκινάμε από τους 250 K (περίπου -23 °C)
        
        this.initCrystal(64); // Βάζουμε 64 μόρια για να φτιάξουν ένα ωραίο 8x8 πλέγμα
    }

    initCrystal(count) {
        let cols = 8;
        let spacingX = 22;
        let spacingY = 19; // Ελαφρώς πιο κοντά στον άξονα Υ για να μοιάζει με εξάγωνο πλέγμα
        
        // Υπολογισμός κέντρου για να τοποθετηθεί ο πάγος στον πάτο
        let startX = this.x + (this.width - (cols * spacingX)) / 2 + 10;
        let startY = this.y + this.height - ((count / cols) * spacingY) - 10;

        for (let i = 0; i < count; i++) {
            let r = Math.floor(i / cols);
            let c = i % cols;
            
            // Κάνουμε μια μικρή μετατόπιση (stagger) στις ζυγές σειρές για να μοιάζει με κρύσταλλο
            let offsetX = (r % 2 === 0) ? 0 : spacingX / 2;

            let px = startX + c * spacingX + offsetX;
            let py = startY + r * spacingY;

            this.particles.push({
                x: px,
                y: py,
                vx: 0,
                vy: 0,
                radius: 8,
                angle: (r % 2 === 0) ? 0.5 : -0.5, // Εναλλάξ κλίση για να φαίνονται οι "δεσμοί"
                // Αποθηκεύουμε την αρχική τους θέση για να ξέρουν πού να γυρίσουν όταν παγώνουν!
                anchorX: px,
                anchorY: py,
                anchorAngle: (r % 2 === 0) ? 0.5 : -0.5
            });
        }
    }

    // Το ΤΡΙΚ: Αντί να αλλάζουμε ταχύτητες, αλλάζουμε ΑΠΕΥΘΕΙΑΣ τη θερμοκρασία!
    heatUp(rate, dt) {
        // Ο ρυθμός μεταβολής είναι π.χ. 20 βαθμοί ανά δευτερόλεπτο
        this.currentTemperature += rate * 20 * dt;
        
        // Βάζουμε όρια για να μην πηγαίνει στο άπειρο
        if (this.currentTemperature < 200) this.currentTemperature = 200;
        if (this.currentTemperature > 450) this.currentTemperature = 450;
    }

    update(dt) {
        // Βρίσκουμε σε ποια φάση είμαστε
        let phase = "solid";
        if (this.currentTemperature >= 273 && this.currentTemperature < 373) phase = "liquid";
        if (this.currentTemperature >= 373) phase = "gas";

        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];

            if (phase === "solid") {
                // ΣΤΕΡΕΟ: Τα μόρια έλκονται σαν ελατήρια πίσω στις θέσεις τους (anchors)
                p.x += (p.anchorX - p.x) * 5 * dt;
                p.y += (p.anchorY - p.y) * 5 * dt;
                p.angle += (p.anchorAngle - p.angle) * 5 * dt;

                // Όσο πλησιάζουμε τους 273K, πάλλονται (vibrate) πιο έντονα
				//let jitter = (this.currentTemperature / 273) * 1.5;
				let jitter = 0.1250 * this.currentTemperature - 30.125;
                p.x += (Math.random() - 0.5) * jitter;
                p.y += (Math.random() - 0.5) * jitter;

                p.vx = 0; p.vy = 0; // Μηδενίζουμε τις ταχύτητες για όταν λιώσουν

            } else if (phase === "liquid") {
                // 1. Εφαρμογή Jitter (χρησιμοποιώντας τη δική σου γραμμική συνάρτηση)
                let jitter = 0.1250 * this.currentTemperature - 30.125;
                p.x += (Math.random() - 0.5) * jitter * 0.5; // Ελαφρώς μειωμένο για το υγρό
                p.y += (Math.random() - 0.5) * jitter * 0.5;

                // 2. ΕΞΑΤΜΙΣΗ (Evaporation Trick)
                // Ξεκινάει να εξατμίζεται αισθητά πάνω από τους 290 K (~17 °C)
                let evapChance = 0;
                if (this.currentTemperature > 290) {
                    evapChance = (this.currentTemperature - 290) * 0.00005; // Πολύ μικρή πιθανότητα
                }
                
                if (Math.random() < evapChance) {
                    // Το μόριο "δραπετεύει"! Παίρνει τεράστια ώθηση προς τα πάνω
                    p.vy -= (Math.random() * 300 + 100);
                    p.vx += (Math.random() - 0.5) * 150;
                } else {
                    // Κανονική βαρύτητα για τα μόρια που μένουν στο υγρό
                    p.vy += 250 * dt; 
                }
                
                // 3. Brownian motion (τυχαία κίνηση λόγω θερμοκρασίας)
                p.vx += (Math.random() - 0.5) * 60;
                p.vy += (Math.random() - 0.5) * 25;
                p.angle += (Math.random() - 0.5) * 0.8;

                // Τριβή για να ρέουν ομαλά
                p.vx *= 0.98;
                p.vy *= 0.98;

            } else if (phase === "gas") {
                // 1. Jitter και στο αέριο (εδώ το αφήνουμε πλήρες)
                let jitter = 0.1250 * this.currentTemperature - 30.125;
                p.x += (Math.random() - 0.5) * jitter;
                p.y += (Math.random() - 0.5) * jitter;

                // 2. ΑΕΡΙΟ: Μηδέν βαρύτητα, μεγάλες ταχύτητες, πετάνε παντού!
                p.vx += (Math.random() - 0.5) * 80;
                p.vy += (Math.random() - 0.5) * 80;
                p.angle += (Math.random() - 0.5) * 2.0;

                // Λιγότερη τριβή
                p.vx *= 0.98;
                p.vy *= 0.98;
            }

            // Κίνηση (μόνο για υγρό και αέριο)
            if (phase !== "solid") {
                p.x += p.vx * dt;
                p.y += p.vy * dt;
            }

            // Όρια Δοχείου
            if (p.x < this.x + p.radius) { p.x = this.x + p.radius; p.vx *= -0.8; }
            if (p.x > this.x + this.width - p.radius) { p.x = this.x + this.width - p.radius; p.vx *= -0.8; }
            if (p.y < this.y + p.radius) { p.y = this.y + p.radius; p.vy *= -0.8; }
            if (p.y > this.y + this.height - p.radius) { p.y = this.y + this.height - p.radius; p.vy *= -0.8; }
        }

        // Οπτική "Απώθηση" για να μην πέφτει το ένα μόριο μέσα στο άλλο (μόνο στα υγρά/αέρια)
        if (phase !== "solid") {
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    let p1 = this.particles[i];
                    let p2 = this.particles[j];
                    let dx = p2.x - p1.x;
                    let dy = p2.y - p1.y;
                    let distSq = dx * dx + dy * dy;
                    let minDist = 16; // Διάμετρος μορίου
                    
                    if (distSq < minDist * minDist && distSq > 0) {
                        let dist = Math.sqrt(distSq);
                        let overlap = (minDist - dist) * 0.5;
                        let nx = (dx / dist) * overlap;
                        let ny = (dy / dist) * overlap;
                        
                        p1.x -= nx; p1.y -= ny;
                        p2.x += nx; p2.y += ny;
                    }
                }
            }
        }
    }

    draw(ctx) {
        // Σχεδίαση Δοχείου
        ctx.fillStyle = "rgba(173, 216, 230, 0.1)"; 
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        ctx.strokeStyle = "#455a64";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.stroke();

        // Σχεδίαση Μορίων
        for (let p of this.particles) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);

            // Οξυγόνο (Κόκκινο)
            ctx.fillStyle = "#e53935";
            ctx.beginPath();
            ctx.arc(0, 0, p.radius, 0, 2 * Math.PI);
            ctx.fill();

            let hAngle = 1.82 / 2;
            let hDist = p.radius * 0.9; 
            let hRadius = p.radius * 0.5; 

            // Υδρογόνο 1
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(Math.cos(hAngle) * hDist, Math.sin(hAngle) * hDist, hRadius, 0, 2 * Math.PI);
            ctx.fill();

            // Υδρογόνο 2
            ctx.beginPath();
            ctx.arc(Math.cos(-hAngle) * hDist, Math.sin(-hAngle) * hDist, hRadius, 0, 2 * Math.PI);
            ctx.fill();

            ctx.restore();
        }
    }
}