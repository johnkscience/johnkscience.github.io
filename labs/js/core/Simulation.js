import { SceneManager } from './SceneManager.js';

export class Simulation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Μεταβλητές για την κατάσταση της αλληλεπίδρασης
        this.mouseX = 0;
        this.mouseY = 0;
        this.isMouseDown = false;
        this.isShiftDown = false;
		
        // Events Πληκτρολογίου
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Shift') this.isShiftDown = true;
        });
        window.addEventListener('keyup', (e) => {
            if (e.key === 'Shift') this.isShiftDown = false;
        });
        
        // Βοηθητική συνάρτηση για υπολογισμό συντεταγμένων
        const updatePointerPos = (clientX, clientY) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            this.mouseX = (clientX - rect.left) * scaleX;
            this.mouseY = (clientY - rect.top) * scaleY;
        };

        // --- EVENTS ΠΟΝΤΙΚΙΟΥ (Για Desktop) ---
        this.canvas.addEventListener('mousedown', (e) => { 
            this.isMouseDown = true; 
            updatePointerPos(e.clientX, e.clientY);
        });
        this.canvas.addEventListener('mouseup', () => { 
            this.isMouseDown = false; 
        });
        this.canvas.addEventListener('mousemove', (e) => {
            updatePointerPos(e.clientX, e.clientY);
        });

        // --- EVENTS ΑΦΗΣ (Για Κινητά / Tablets) ---
        // Χρησιμοποιούμε { passive: false } για να επιτρέπεται το preventDefault()
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Σταματάει το scroll της σελίδας όταν ακουμπάς το canvas
            this.isMouseDown = true;
            updatePointerPos(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: false });

        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.isMouseDown = false;
        }, { passive: false });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            updatePointerPos(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: false });


        // Ο Διαχειριστής Σκηνών
        this.sceneManager = new SceneManager(this);
        
        this.lastTime = 0;
        this.animationId = null;
        this.isRunning = false;
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastTime = performance.now();
            this.loop(this.lastTime);
        }
    }

    loop(timestamp) {
        if (!this.isRunning) return;

        let dt = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
        if (dt > 0.1) dt = 0.016;

        this.update(dt);
        this.draw();

        this.animationId = requestAnimationFrame((ts) => this.loop(ts));
    }

    update(dt) {
        this.sceneManager.update(dt);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.sceneManager.draw(this.ctx);
    }
}