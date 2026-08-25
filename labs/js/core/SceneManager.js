export class SceneManager {
    constructor(simulation) {
        this.simulation = simulation; // Αναφορά στον κεντρικό κινητήρα
        this.currentScene = null;
    }

    // Αλλαγή πειράματος/σκηνής
    switchScene(scene) {
        this.currentScene = scene;
        this.currentScene.setup(); // Καλεί την αρχικοποίηση της νέας σκηνής
    }

    update(dt) {
        if (this.currentScene) {
            this.currentScene.update(dt, this.simulation);
        }
    }

    draw(ctx) {
        if (this.currentScene) {
            this.currentScene.draw(ctx);
        }
    }
}