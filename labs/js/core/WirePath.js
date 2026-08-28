export class WirePath {
    constructor(points, numElectrons = 60) {
        this.points = points; // Πίνακας με {x, y} συντεταγμένες της διαδρομής
        this.electrons = [];
        this.totalLength = 0;
        this.segments = [];

        this.calculatePath();
        this.initElectrons(numElectrons);
    }

    // Υπολογίζει τα μήκη των τμημάτων του καλωδίου
    calculatePath() {
        this.totalLength = 0;
        this.segments = [];
        
        for (let i = 0; i < this.points.length - 1; i++) {
            let p1 = this.points[i];
            let p2 = this.points[i + 1];
            let dx = p2.x - p1.x;
            let dy = p2.y - p1.y;
            let length = Math.sqrt(dx * dx + dy * dy);
            
            this.segments.push({ p1, p2, length, accumulatedLength: this.totalLength });
            this.totalLength += length;
        }
    }

    // Τοποθετεί τα ηλεκτρόνια σε ίσες αποστάσεις κατά μήκος του κυκλώματος
    initElectrons(count) {
        for (let i = 0; i < count; i++) {
            this.electrons.push({
                progress: i / count // Ποσοστό της διαδρομής (0.0 έως 1.0)
            });
        }
    }

    update(dt, speed, isFlowing) {
        if (!isFlowing) return; // Αν ο διακόπτης είναι ανοιχτός, μένουν ακίνητα!

        // Μετατόπιση ηλεκτρονίων (Το speed είναι π.χ. ποσοστό της διαδρομής ανά δευτερόλεπτο)
        for (let e of this.electrons) {
            e.progress += speed * dt;
            if (e.progress > 1.0) e.progress -= 1.0; // Αν φτάσει στο τέλος, ξεκινάει πάλι από την αρχή (κλειστό κύκλωμα)
            if (e.progress < 0.0) e.progress += 1.0;
        }
    }

    // Μετατρέπει το 'progress' σε πραγματικές συντεταγμένες x, y στον καμβά
    getCoordinatesAt(progress) {
        let targetDistance = progress * this.totalLength;
        
        for (let seg of this.segments) {
            if (targetDistance <= seg.accumulatedLength + seg.length || seg === this.segments[this.segments.length - 1]) {
                // Πόσο προχωρήσαμε μέσα σε ΑΥΤΟ το συγκεκριμένο τμήμα
                let segmentProgress = (targetDistance - seg.accumulatedLength) / seg.length;
                let x = seg.p1.x + (seg.p2.x - seg.p1.x) * segmentProgress;
                let y = seg.p1.y + (seg.p2.y - seg.p1.y) * segmentProgress;
                return { x, y };
            }
        }
        return this.points[0];
    }

    draw(ctx) {
        // 1. Σχεδίαση Καλωδίου (Χαλκός)
        ctx.strokeStyle = "#e67e22";
        ctx.lineWidth = 4;
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.stroke();

        // 2. Σχεδίαση Ηλεκτρονίων πάνω στη διαδρομή
        for (let e of this.electrons) {
            let pos = this.getCoordinatesAt(e.progress);
            
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = "#3498db"; // Μπλε ηλεκτρόνια
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#fff";
            ctx.stroke();
        }
    }
}