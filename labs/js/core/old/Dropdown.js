// Όταν θα ενσωματώσεις αυτό το Dropdown στη σκηνή σου (ή μέσα στο υπερ-όργανο), φρόντισε να το κάνεις push στη λίστα uiElements τελευταίο. Επειδή ο κώδικάς σου ζωγραφίζει τα στοιχεία με τη σειρά που μπαίνουν στον πίνακα, αν το Dropdown ζωγραφιστεί τελευταίο, η ανοιχτή λίστα του θα "σκεπάζει" όμορφα τα υπόλοιπα στοιχεία που βρίσκονται από κάτω του, ακριβώς όπως συμπεριφέρονται τα μενού στα Windows.

import { UIElement } from './UIElement.js';

export class Dropdown extends UIElement {
    constructor(x, y, width, height, options, selectedIndex = 0, onChange = null) {
        super(x, y, width, height); // Οι διαστάσεις αφορούν το "κλειστό" κουτί
        this.options = options;
        this.selectedIndex = selectedIndex;
        this.onChange = onChange;
        
        this.isOpen = false;
        this.hoveredIndex = -1; // Ποια επιλογή δείχνει το ποντίκι στη λίστα
        this.wasMouseDown = false;
        this.optionHeight = height; // Κάθε επιλογή θα έχει το ίδιο ύψος με το κεντρικό κουτί
    }

    update(dt, sim) {
        // Έλεγχος αν το ποντίκι είναι πάνω στο βασικό κουτί
        this.isHovered = this.containsPoint(sim.mouseX, sim.mouseY);

        // Έλεγχος αν το ποντίκι είναι πάνω στη λίστα των επιλογών (όταν είναι ανοιχτή)
        let totalHeight = this.height + (this.isOpen ? this.options.length * this.optionHeight : 0);
        let isOverList = this.isOpen && 
                         sim.mouseX >= this.x && sim.mouseX <= this.x + this.width &&
                         sim.mouseY > this.y + this.height && sim.mouseY <= this.y + totalHeight;

        // Υπολογισμός του index που γίνεται hover
        if (isOverList) {
            this.hoveredIndex = Math.floor((sim.mouseY - (this.y + this.height)) / this.optionHeight);
        } else {
            this.hoveredIndex = -1;
        }

        // Διαχείριση κλικ
        if (sim.isMouseDown && !this.wasMouseDown) {
            if (this.isHovered) {
                this.isOpen = !this.isOpen; // Ανοιγοκλείσιμο αν πατήσουμε το κεντρικό κουτί
            } else if (isOverList) {
                this.selectedIndex = this.hoveredIndex; // Επιλογή νέας τιμής
                if (this.onChange) {
                    this.onChange(this.options[this.selectedIndex], this.selectedIndex);
                }
                this.isOpen = false; // Κλείσιμο της λίστας
            } else {
                this.isOpen = false; // Αν πατήσουμε οπουδήποτε αλλού, το dropdown κλείνει
            }
        }
        
        this.wasMouseDown = sim.isMouseDown;
    }

    draw(ctx) {
        // 1. Σχεδίαση βασικού κουτιού (Κλειστό)
        ctx.fillStyle = this.isHovered ? "#e0e0e0" : "#ffffff";
        ctx.strokeStyle = "#ced4da";
        ctx.lineWidth = 1.5;
        
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.stroke();

        // 2. Κείμενο επιλεγμένης επιλογής
        ctx.fillStyle = "#333";
        ctx.font = "14px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        let displayText = this.options[this.selectedIndex] || "Επιλέξτε...";
        ctx.fillText(displayText, this.x + 10, this.y + this.height / 2);

        // 3. Σύμβολο "Βελάκι" (▼ / ▲)
        ctx.textAlign = "right";
        ctx.fillText(this.isOpen ? "▲" : "▼", this.x + this.width - 10, this.y + this.height / 2);

        // 4. Σχεδίαση της λίστας (Ανοιχτό)
        if (this.isOpen) {
            for (let i = 0; i < this.options.length; i++) {
                let optY = this.y + this.height + i * this.optionHeight;
                
                // Φόντο επιλογής (highlight αν το ποντίκι είναι από πάνω)
                ctx.fillStyle = (i === this.hoveredIndex) ? "#2196F3" : "#ffffff";
                ctx.beginPath();
                ctx.rect(this.x, optY, this.width, this.optionHeight);
                ctx.fill();
                ctx.stroke();

                // Κείμενο επιλογής (λευκό αν είναι hovered, αλλιώς σκούρο γκρι)
                ctx.fillStyle = (i === this.hoveredIndex) ? "#ffffff" : "#333";
                ctx.textAlign = "left";
                ctx.fillText(this.options[i], this.x + 10, optY + this.optionHeight / 2);
            }
        }
    }
}