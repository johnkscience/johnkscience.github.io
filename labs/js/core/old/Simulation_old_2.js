import { SceneManager } from './SceneManager.js';

export class Simulation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Προσθήκη Event Listeners για το Ποντίκι (όπως γράψαμε πριν)
        this.mouseX = 0;
        this.mouseY = 0;
        this.isMouseDown = false;
		
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Shift') this.isShiftDown = true;
		});
		window.addEventListener('keyup', (e) => {
			if (e.key === 'Shift') this.isShiftDown = false;
		});
        
        this.canvas.addEventListener('mousedown', () => { this.isMouseDown = true; });
        this.canvas.addEventListener('mouseup', () => { this.isMouseDown = false; });
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });

        // Ο νέος Διαχειριστής Σκηνών
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
        // Προωθούμε την ενημέρωση στον διαχειριστή σκηνών
        this.sceneManager.update(dt);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Προωθούμε τη σχεδίαση στον διαχειριστή σκηνών
        this.sceneManager.draw(this.ctx);
    }
}