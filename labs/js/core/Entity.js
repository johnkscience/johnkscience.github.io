// js/core/Entity.js
export class Entity {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    update(dt) {
        // Θα υπερκαλύπτεται (override) από τις υποκλάσεις
    }

    draw(ctx) {
        // Θα υπερκαλύπτεται (override) από τις υποκλάσεις
    }
}