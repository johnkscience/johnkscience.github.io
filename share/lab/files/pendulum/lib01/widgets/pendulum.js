/*
Ακολουθεί μια λίστα μεθόδων και ιδιοτήτων `Pendulum`, 
μαζί με τις υπογραφές και μια σύντομη περιγραφή τους:

**Ιδιότητες `options`:**

* `ropeLength`: `number` - Μήκος του σχοινιού του εκκρεμούς σε pixels.
* `maxAngle`: `number` - Αρχική γωνία του εκκρεμούς σε μοίρες.
* `mass`: `number` - Μάζα του εκκρεμούς σε kg.
* `gravity`: `number` - Επιτάχυνση της βαρύτητας σε m/s^2.
* `scaleFactor`: `number` - Συντελεστής κλίμακας για την προβολή των φυσικών μεγεθών στην οθόνη.
* `protractorRadius`: `number` - Ακτίνα του μοιρογνωμόνιου σε pixels.
* `damping`: `number` - Συντελεστής απόσβεσης του εκκρεμούς.
* `timeScale`: `number` - Συντελεστής κλίμακας για το χρόνο.
* `time`: `number` - Ο τρέχων χρόνος της προσομοίωσης σε milliseconds.
* `showForce`: `boolean` - Εμφάνιση/απόκρυψη βέλους δύναμης.
* `showTension`: `boolean` - Εμφάνιση/απόκρυψη βέλους τάσης.
* `showWeight`: `boolean` - Εμφάνιση/απόκρυψη βέλους βάρους.
* `showVelocity`: `boolean` - Εμφάνιση/απόκρυψη βέλους ταχύτητας.
* `showAcceleration`: `boolean` - Εμφάνιση/απόκρυψη βέλους επιτάχυνσης.
* `forceColor`: `string` - Χρώμα βέλους δύναμης.
* `forceStroke`: `string` - Χρώμα περιγράμματος βέλους δύναμης.
* `weightColor`: `string` - Χρώμα βέλους βάρους.
* `weightStroke`: `string` - Χρώμα περιγράμματος βέλους βάρους.
* `tensionColor`: `string` - Χρώμα βέλους τάσης.
* `tensionStroke`: `string` - Χρώμα περιγράμματος βέλους τάσης.
* `velocityColor`: `string` - Χρώμα βέλους ταχύτητας.
* `velocityStroke`: `string` - Χρώμα περιγράμματος βέλους ταχύτητας.
* `accelerationColor`: `string` - Χρώμα βέλους επιτάχυνσης.
* `accelerationStroke`: `string` - Χρώμα περιγράμματος βέλους επιτάχυνσης.
* `forceScale`: `number` - Συντελεστής κλίμακας βέλους δύναμης.
* `tensionScale`: `number` - Συντελεστής κλίμακας βέλους τάσης.
* `weightScale`: `number` - Συντελεστής κλίμακας βέλους βάρους.
* `velocityScale`: `number` - Συντελεστής κλίμακας βέλους ταχύτητας.
* `accelerationScale`: `number` - Συντελεστής κλίμακας βέλους επιτάχυνσης.

**Μέθοδοι:**

* `constructor(options: Object)` - Κατασκευαστής της κλάσης `Pendulum`. Αρχικοποιεί ένα εκκρεμές με τις παραμέτρους που δίνονται στο αντικείμενο `options`.
* `createSphere(): Konva.Circle` - Δημιουργεί τη σφαίρα του εκκρεμούς.
* `calculateSphereRadius(): number` - Υπολογίζει την ακτίνα της σφαίρας με βάση τη μάζα.
* `createRope(): Konva.Line` - Δημιουργεί το σχοινί του εκκρεμούς.
* `createProtractor(): Konva.Group` - Δημιουργεί το μοιρογνωμόνιο.
* `createAxis(): void` - Δημιουργεί τους άξονες του εκκρεμούς.
* `calculateAxis(): void` - Υπολογίζει και ενημερώνει τη θέση των αξόνων.
* `showAxis(): void` - Εμφανίζει τους άξονες.
* `hideAxis(): void` - Κρύβει τους άξονες.
* `createArrows(): void` - Δημιουργεί τα βέλη που αναπαριστούν τις δυνάμεις και τις κινήσεις.
* `calculateArrows(): void` - Υπολογίζει και ενημερώνει τα βέλη.
* `showAllArrows(): void` - Εμφανίζει όλα τα βέλη.
* `hideAllArrows(): void` - Κρύβει όλα τα βέλη.
* `showForceArrow(): void` - Εμφανίζει το βέλος της δύναμης.
* `hideForceArrow(): void` - Κρύβει το βέλος της δύναμης.
* `showTensionArrow(): void` - Εμφανίζει το βέλος της τάσης.
* `hideTensionArrow(): void` - Κρύβει το βέλος της τάσης.
* `showWeightArrow(): void` - Εμφανίζει το βέλος του βάρους.
* `hideWeightArrow(): void` - Κρύβει το βέλος του βάρους.
* `showVelocityArrow(): void` - Εμφανίζει το βέλος της ταχύτητας.
* `hideVelocityArrow(): void` - Κρύβει το βέλος της ταχύτητας.
* `showAccelerationArrow(): void` - Εμφανίζει το βέλος της επιτάχυνσης.
* `hideAccelerationArrow(): void` - Κρύβει το βέλος της επιτάχυνσης.
* getSphereFill(): string - Επιστρέφει το χρώμα ή την εικόνα της σφαίρας με βάση το υλικό.
* updateSpherePosition(): void - Ενημερώνει τη θέση της σφαίρας, του σχοινιού, των βελών και των αξόνων.
* calculateFrequency(): number - Υπολογίζει τη συχνότητα ταλάντωσης του εκκρεμούς σε Hz.
* calculatePeriod(): number - Υπολογίζει την περίοδο ταλάντωσης του εκκρεμούς σε δευτερόλεπτα.
* calculateAngle(time: number): number - Υπολογίζει τη γωνία του εκκρεμούς σε μια δεδομένη χρονική στιγμή σε μοίρες.
* startAnimation(): void - Ξεκινάει το animation του εκκρεμούς.
* stopAnimation(): void - Σταματάει το animation του εκκρεμούς.
* setRopeLength(length: number): void - Ορίζει το μήκος του σχοινιού του εκκρεμούς.
* setMaxAngle(angle: number): void - Ορίζει την αρχική γωνία του εκκρεμούς.
* setMass(mass: number): void - Ορίζει τη μάζα του εκκρεμούς.
* setGravity(gravity: number): void - Ορίζει την επιτάχυνση της βαρύτητας.
* setScaleFactor(scaleFactor: number): void - Ορίζει τον συντελεστή κλίμακας για την προβολή των φυσικών μεγεθών στην οθόνη.
* `setTimeScale(timeScale: number): void` - Ορίζει τον συντελεστή κλίμακας για την προσομοίωση του χρόνου.
* `setDamping(damping: number): void` - Ορίζει τον συντελεστή απόσβεσης του εκκρεμούς.
* `setProtractorRadius(radius: number): void` - Ορίζει την ακτίνα του μοιρογνωμόνιου.
* `handleSphereDrag(): void` - Ενεργοποιεί τη λειτουργία μεταφοράς της σφαίρας με το ποντίκι.
* `getPeriodData(steps: number): Array<Object>` - Δημιουργεί ένα σύνολο δεδομένων για μια πλήρη περίοδο ταλάντωσης του εκκρεμούς.
* `calculateAngularVelocity(time: number): number` - Υπολογίζει τη γωνιακή ταχύτητα του εκκρεμούς σε μια δεδομένη χρονική στιγμή.
* `calculateAngularAcceleration(time: number): number` - Υπολογίζει τη γωνιακή επιτάχυνση του εκκρεμούς σε μια δεδομένη χρονική στιγμή.
* `calculateLinearVelocity(time: number): object` - Υπολογίζει τη γραμμική ταχύτητα της μάζας του εκκρεμούς σε μια δεδομένη χρονική στιγμή, συμπεριλαμβανομένης της κατεύθυνσης.
* `calculateLinearAcceleration(time: number): object` - Υπολογίζει τη γραμμική επιτάχυνση της μάζας του εκκρεμούς σε μια δεδομένη χρονική στιγμή, συμπεριλαμβανομένης της κατεύθυνσης.
* `calculateForces(time: number): Object` - Υπολογίζει τις δυνάμεις που ασκούνται στο εκκρεμές σε μια δεδομένη χρονική στιγμή.
* `calculateTension(time: number): number` - Υπολογίζει την τάση του σχοινιού του εκκρεμούς σε μια δεδομένη χρονική στιγμή.
* `calculateKineticEnergy(time: number): number` - Υπολογίζει την κινητική ενέργεια της μάζας του εκκρεμούς σε μια δεδομένη χρονική στιγμή.
* `calculatePotentialEnergy(time: number): number` - Υπολογίζει τη δυναμική ενέργεια της μάζας του εκκρεμούς σε μια δεδομένη χρονική στιγμή.
*/

import { Widget } from './widget.js'; // Υποθέτουμε ότι το widget.js βρίσκεται στον ίδιο φάκελο
import { Arrow } from './arrow.js';
import { Vector } from '../math/vector.js';
/**
 * @event Pendulum
 * @memberof Pendulum
 * @description Το event "Pendulum" εκπέμπεται από το widget Pendulum σε κάθε frame του animation.
 * Παρέχει πληροφορίες σχετικά με την τρέχουσα κατάσταση του εκκρεμούς, όπως ο χρόνος, η γωνία, η ταχύτητα και η επιτάχυνση.
 *
 * @property {object} event - Το αντικείμενο του event.
 * @property {Pendulum} event.sender - Το widget Pendulum που εκπέμπει το event.
 * @property {number} event.sender.options.time - Ο τρέχων χρόνος της προσομοίωσης σε milliseconds.
 *
 * @example
 * // Ξεκινάμε την κίνηση του εκκρεμούς
 * pendulum.startAnimation();
 *
 * // Ακούμε το event "Pendulum" από ένα εξωτερικό widget (π.χ. myStopwatch)
 * myStopwatch.on('Pendulum', (event) => {
 * // Προσπελαύνουμε τις πληροφορίες του εκκρεμούς από το event
 * const currentTime = event.sender.options.time;
 * const currentAngle = pendulum.calculateAngle(currentTime);
 *
 * // Χρησιμοποιούμε τις πληροφορίες για να ενημερώσουμε το εξωτερικό widget
 * console.log(`Τρέχων χρόνος: ${currentTime} ms, Τρέχουσα γωνία: ${currentAngle} μοίρες`);
 * });
 *
 * @example
 * // Σταματάμε την κίνηση του εκκρεμούς
 * pendulum.stopAnimation();
 *
 * // Αφαιρούμε το listener από το event "Pendulum"
 * myStopwatch.off('Pendulum');
 */


/**
 * @class Pendulum
 * @classdesc Αναπαριστά ένα φυσικό εκκρεμές, προσομοιώνοντας την κίνησή του.
 * @extends Widget
 */
class Pendulum extends Widget {
    /**
     * Κατασκευαστής της κλάσης Pendulum.
     *
     * @constructor
     * @param {Object} options - Ένα αντικείμενο με τις παραμέτρους του εκκρεμούς.
     * @param {number} [options.ropeLength=100] - Μήκος του σχοινιού του εκκρεμούς σε pixels.
     * @param {number} [options.maxAngle=0] - Αρχική γωνία του εκκρεμούς σε μοίρες.
     * @param {number} [options.mass=1] - Μάζα του εκκρεμούς σε kg.
     * @param {number} [options.gravity=9.81] - Επιτάχυνση της βαρύτητας σε m/s^2.
     * @param {number} [options.scaleFactor=200] - Συντελεστής κλίμακας για την προβολή των φυσικών μεγεθών στην οθόνη.
     * @param {number} [options.protractorRadius=50] - Ακτίνα του μοιρογνωμόνιου σε pixels.
     * @param {number} [options.damping=0] - Συντελεστής απόσβεσης του εκκρεμούς.
     * @param {number} [options.timeScale=1] - Συντελεστής κλίμακας για το χρόνο.
     * @param {number} [options.time=0] - ο τρεχον χρόνος της προσομοίωσης σε milliseconds.
     *
     * @description
     * Ο κατασκευαστής αρχικοποιεί ένα εκκρεμές με τις παραμέτρους που δίνονται στο αντικείμενο `options`.
     * Κληρονομεί τις ιδιότητες και τις μεθόδους από την κλάση `Widget`.
     * @example
     * const pendulum = new Pendulum({
     * ropeLength: 150,
     * maxAngle: 30,
     * mass: 2,
     * gravity: 9.81,
     * scaleFactor: 200,
     * protractorRadius: 60,
     * damping: 0.01,
     * timeScale: 1,
     * time: 0,
     * });
     */
    constructor(options) {
        super(options); // Καλείται ο constructor της κλάσης Widget

        this.options.name = "Pendulum" + this.options.id;
        this.options = {
            ...this.options, // Κληρονομούμε τις ιδιότητες από το Widget
            ropeLength: options.ropeLength || 100, // Μήκος σχοινιού
            maxAngle: options.maxAngle || 0, // Αρχική γωνία
            mass: options.mass || 0.1, // Μάζα
            gravity: options.gravity || 9.81, // Επιτάχυνση βαρύτητας
            material: options.material || 'wood',
            // ... (άλλες ιδιότητες που μπορεί να χρειαστούν)
            scaleFactor: options.scaleFactor || 200,
            protractorRadius: options.protractorRadius || 50,
            damping: options.damping || 0,
            timeScale: options.timeScale || 1,
            //time:0, //σε ms
            //διανυσματα
            showForce: options.showForce || false,
            showTension: options.showTension || false,
            showWeight: options.showWeight || false,
            showVelocity: options.showVelocity || false,
            showAcceleration: options.showAcceleration || false,
            forceColor: options.forceColor || 'lightgreen',
            forceStroke: options.forceStroke || 'green',
            weightColor: options.weightColor || "violet",
            weightStroke: options.weightStroke || "purple",
            tensionColor: options.tensionColor || "red",
            tensionStroke: options.tensionStroke || "darkred",
            velocityColor: options.velocityColor || 'lightblue',
            velocityStroke: options.velocityStroke || 'blue',
            accelerationColor: options.accelerationColor || "orange",
            accelerationStroke: options.accelerationStroke || "yellow",
            forceScale: options.forceScale || 10,
            tensionScale: options.tensionScale || 10,
            weightScale: options.weightScale || 10,
            velocityScale: options.velocityScale || 100,
            accelerationScale: options.accelerationScale || 50,

        };

        this.animation = null; // Αρχικοποιούμε το animation ως null

        this.options.currentAngle = 0;// this.options.maxAngle; // Τρέχουσα γωνία
        
        this.options.angularFrequency = this.calculateFrequency();
        
        this.options.period = this.options.angularFrequency / 2 / Math.PI;

        this.options.time = 0;

        this.sphere = this.createSphere();
        this.rope = this.createRope();
        this.protractor = this.createProtractor();
        this.createArrows();
        this.createAxis();
        this.sector = this.createSector();
  
        this.add(this.sector);
        this.add(this.rope);
        this.add(this.sphere);
        this.add(this.sphere);
        this.add(this.protractor); // Το μοιρογνωμόνιο τελευταίο
        // Προσθήκη βελών στο layer
        this.add(this.forceArrow);
        this.add(this.tensionArrow);
        this.add(this.weightArrow);
        this.add(this.velocityArrow);
        this.add(this.accelerationArrow);
        // Προσθέτουμε τους αξονες
        this.add(this.radialAxis);
        this.add(this.tangentialAxis);

        this.updateSpherePosition(); // Ενημερώνουμε την αρχική θέση της σφαίρας

    }


    createSector() {
        const ropeLength = this.options.ropeLength;
        
        const sector = new Konva.Wedge({
            x: this.options.x, // Αρχική θέση (θα ενημερωθεί αργότερα)
            y: this.options.y, // Αρχική θέση (θα ενημερωθεί αργότερα)
            radius: ropeLength * this.options.scaleFactor,
            angle: 2 * this.options.maxAngle * 180 / Math.PI,
            fill: 'rgba(255, 255, 0, 0.2)', // Κίτρινο με μεγάλη διαφάνεια
            stroke: 'orange',
            strokeWidth: 1,
            rotation: 90-this.options.maxAngle * 180 / Math.PI,
        });
        return sector;
    }

    createSphere() {
        const radius = this.calculateSphereRadius();
        const sphere = new Konva.Circle({
            x: this.options.x, // Αρχική θέση (θα ενημερωθεί αργότερα)
            y: this.options.y, // Αρχική θέση (θα ενημερωθεί αργότερα)
            radius: radius,
            fill: this.getSphereFill(), // Χρώμα ή εικόνα
        });

        return sphere;
    }

    calculateSphereRadius() {
        // Συνάρτηση για τη μετατροπή της μάζας σε ακτίνα
        // (π.χ. γραμμική σχέση, λογαριθμική, κ.λπ.)
        return Math.sqrt(this.options.mass) * 20; // Παράδειγμα
    }

    createRope() {
        const rope = new Konva.Line({
            points: [this.options.x, this.options.y, this.sphere.x(), this.sphere.y()], // Αρχικές θέσεις
            stroke: 'black',
            strokeWidth: 2,
        });

        return rope;
    }

    createProtractor() {
        const protractorGroup = new Konva.Group(); // Δημιουργούμε το group
    
        const protractor = new Konva.Arc({ // Το ημικύκλιο
            x: 0, // Τοπικές συντεταγμένες μέσα στο group
            y: 0,
            radius: this.options.protractorRadius,// this.options.ropeLength * this.options.scaleFactor / 3,
            angle: 180,
            stroke: 'black',
            strokeWidth: 1,
        });
        protractorGroup.add(protractor); // Το ημικύκλιο στο group
    
        // Οι διαγραμμίσεις
        for (let i = 0; i <= 180; i += 10) {
            const angleRad = i * Math.PI / 180;
            const x = protractor.x() + protractor.getAttr('radius') * Math.cos(angleRad); // Θέση σε σχέση με το ημικύκλιο
            const y = protractor.y() + protractor.getAttr('radius') * Math.sin(angleRad);
            const line = new Konva.Line({
                points: [x, y, x + 10 * Math.cos(angleRad), y + 10 * Math.sin(angleRad)],
                stroke: 'black',
                strokeWidth: 1,
            });
            protractorGroup.add(line); // Οι γραμμές στο group
        }
    
        // Τοποθετούμε το group στο σωστό σημείο του stage
        protractorGroup.x(this.options.x);
        protractorGroup.y(this.options.y);
    
        return protractorGroup;
    }

    createAxis() {
        // Ακτινικός άξονας (R)
        this.radialAxis = new Konva.Arrow({
            points: [0, 0, 0, 0], // Θα ενημερωθούν στην calculateAxis
            stroke: 'gray',
            strokeWidth: 1,
            dash: [4, 4], // Διακεκομμένη γραμμή
            pointerLength: 5,
            pointerWidth: 5,
        });
    
        // Εφαπτομενικός άξονας (T)
        this.tangentialAxis = new Konva.Arrow({
            points: [0, 0, 0, 0], // Θα ενημερωθούν στην calculateAxis
            stroke: 'gray',
            strokeWidth: 1,
            dash: [4, 4], // Διακεκομμένη γραμμή
            pointerLength: 5,
            pointerWidth: 5,
        });
    
    }
    
    calculateAxis() {
        let time = this.options.time;
        const angleRad = this.calculateAngle(time); // Γωνία σε ακτίνια
        const L = this.options.ropeLength * this.options.scaleFactor / 2 ; // Μήκος σχοινιού
    
        // Υπολογισμός θέσης σφαίρας
        const sphereX = this.sphere.x();
        const sphereY = this.sphere.y();
    
        // Υπολογισμός σημείων για τους άξονες (διόρθωση κατεύθυνσης)
        const radialEndX = sphereX - L * Math.sin(angleRad);
        const radialEndY = sphereY - L * Math.cos(angleRad);
        const radialStartX = sphereX + L * Math.sin(angleRad);
        const radialStartY = sphereY + L * Math.cos(angleRad);
    
        const tangentialEndX = sphereX + L * Math.cos(angleRad); // Αλλαγή πρόσημου για σωστή κατεύθυνση
        const tangentialEndY = sphereY - L * Math.sin(angleRad);
        const tangentialStartX = sphereX - L * Math.cos(angleRad); // Αλλαγή πρόσημου για σωστή κατεύθυνση
        const tangentialStartY = sphereY + L * Math.sin(angleRad);
    
        // Ενημέρωση θέσης αξόνων
        this.radialAxis.points([radialStartX, radialStartY, radialEndX, radialEndY]);
        this.tangentialAxis.points([tangentialStartX, tangentialStartY, tangentialEndX, tangentialEndY]);
    }

    // Εμφάνιση αξόνων
    showAxis() {
        if (this.radialAxis && this.tangentialAxis) {
            this.radialAxis.show();
            this.tangentialAxis.show();
        }
    }

    // Απόκρυψη αξόνων
    hideAxis() {
        if (this.radialAxis && this.tangentialAxis) {
            this.radialAxis.hide();
            this.tangentialAxis.hide();
        }
    }

    createArrows() {
        // Δημιουργία βελών
    
        // Συνολική δύναμη (συνισταμένη)
        this.forceArrow = new Arrow({
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            stroke: this.options.forceStroke,
            fill: this.options.forceColor,
            arrowType: 'standard',
            bodyWidth: 5,
            headWidth: 8,
            headLength: 10,
            strokeWidth: 1,
        });
    
        // Συνολικό βάρος
        this.weightArrow = new Arrow({
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            stroke: this.options.weightStroke,
            fill: this.options.weightColor,
            arrowType: 'standard',
            bodyWidth: 5,
            headWidth: 8,
            headLength: 10,
            strokeWidth: 1,
        });
    
        // Συνολική τάση
        this.tensionArrow = new Arrow({
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            stroke: this.options.tensionStroke,
            fill: this.options.tensionColor,
            arrowType: 'standard',
            bodyWidth: 5,
            headWidth: 8,
            headLength: 10,
            strokeWidth: 1,
        });
    
        // Βέλος ταχύτητας
        this.velocityArrow = new Arrow({
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            stroke: this.options.velocityStroke,
            fill: this.options.velocityColor,
            arrowType: 'standard',
            bodyWidth: 5,
            headWidth: 8,
            headLength: 10,
            strokeWidth: 1,
        });

        // Βέλος επιτάχυνσης
        this.accelerationArrow = new Arrow({
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            stroke: this.options.accelerationStroke, // Χρώμα περιγράμματος
            fill: this.options.accelerationColor, // Χρώμα γεμίσματος
            arrowType: 'standard',
            bodyWidth: 5,
            headWidth: 8,
            headLength: 10,
            strokeWidth: 1,
        });
    }

    calculateArrows(){
        // Υπολογισμός δύναμης
        const forces = this.calculateForces(this.options.time);
       
        // Υπολογισμός ταχύτητας
        const velocity = this.calculateLinearVelocity(this.options.time);

        // Ενημέρωση βέλους βάρους
        if (this.options.showWeight) {
            this.weightArrow.setStartPosition(this.sphere.x(), this.sphere.y());
            this.weightArrow.setMagnitude(forces.weightMagnitude * this.options.weightScale);
            this.weightArrow.setDirection(forces.weightDirection);
            this.weightArrow.show();
        } else {
            this.weightArrow.hide();
        }

        // Ενημέρωση βέλους τάσης
        if (this.options.showTension) {
            this.tensionArrow.setStartPosition(this.sphere.x(), this.sphere.y());
            this.tensionArrow.setMagnitude(forces.tensionMagnitude * this.options.tensionScale);
            this.tensionArrow.setDirection(forces.tensionDirection);
            this.tensionArrow.show();
        } else {
            this.tensionArrow.hide();
        }

        // Ενημέρωση βέλους συνολικής δύναμης
        if (this.options.showForce) {
            this.forceArrow.setStartPosition(this.sphere.x(), this.sphere.y());
            this.forceArrow.setMagnitude(forces.totalForceMagnitude * this.options.forceScale);
            this.forceArrow.setDirection(forces.totalForceDirection);
            this.forceArrow.show();
        } else {
            this.forceArrow.hide();
        }

        // Ενημέρωση βέλους ταχύτητας
        if (this.options.showVelocity) {
            this.velocityArrow.setStartPosition(this.sphere.x(), this.sphere.y());
            this.velocityArrow.setMagnitude(velocity.magnitude * this.options.velocityScale);
            this.velocityArrow.setDirection(velocity.direction);
            this.velocityArrow.show();
        } else {
            this.velocityArrow.hide();
        }

        // Ενημέρωση βέλους επιτάχυνσης
        if (this.options.showAcceleration) {
            const acceleration = this.calculateLinearAcceleration(this.options.time); // Υπολογισμός γραμμικής επιτάχυνσης
            this.accelerationArrow.setStartPosition(this.sphere.x(), this.sphere.y());
            this.accelerationArrow.setMagnitude(acceleration.magnitude * this.options.accelerationScale);
            this.accelerationArrow.setDirection(acceleration.direction);
            this.accelerationArrow.show();
        } else {
            this.accelerationArrow.hide();
        }
    }

        // Εμφάνιση όλων των βελών
    showAllArrows() {
        this.showForceArrow();
        this.showTensionArrow();
        this.showWeightArrow();
        this.showVelocityArrow();
        this.showAccelerationArrow();
    }

    // Απόκρυψη όλων των βελών
    hideAllArrows() {
        this.hideForceArrow();
        this.hideTensionArrow();
        this.hideWeightArrow();
        this.hideVelocityArrow();
        this.hideAccelerationArrow();
    }

    // Εμφάνιση βέλους δύναμης
    showForceArrow() {
        if (this.forceArrow) {
            this.options.showForce = true;
            this.forceArrow.show();
        }
    }

    // Απόκρυψη βέλους δύναμης
    hideForceArrow() {
        if (this.forceArrow) {
            this.options.showForce = false;
            this.forceArrow.hide();
        }
    }

    // Εμφάνιση βέλους τάσης
    showTensionArrow() {
        if (this.tensionArrow) {
            this.options.showTension = true;
            this.tensionArrow.show();
        }
    }

    // Απόκρυψη βέλους τάσης
    hideTensionArrow() {
        if (this.tensionArrow) {
            this.options.showTension = false;
            this.tensionArrow.hide();
        }
    }

    // Εμφάνιση βέλους βάρους
    showWeightArrow() {
        if (this.weightArrow) {
            this.options.showWeight = true;
            this.weightArrow.show();
        }
    }

    // Απόκρυψη βέλους βάρους
    hideWeightArrow() {
        if (this.weightArrow) {
            this.options.showWeight = false;
            this.weightArrow.hide();
        }
    }

    // Εμφάνιση βέλους ταχύτητας
    showVelocityArrow() {
        if (this.velocityArrow) {
            this.options.showVelocity = true;
            this.velocityArrow.show();
        }
    }

    // Απόκρυψη βέλους ταχύτητας
    hideVelocityArrow() {
        if (this.velocityArrow) {
            this.options.showVelocity = false;
            this.velocityArrow.hide();
        }
    }

    // Εμφάνιση βέλους επιτάχυνσης
    showAccelerationArrow() {
        if (this.accelerationArrow) {
            this.options.showAcceleration = true;
            this.accelerationArrow.show();
        }
    }

    // Απόκρυψη βέλους επιτάχυνσης
    hideAccelerationArrow() {
        if (this.accelerationArrow) {
            this.options.showAcceleration = false;
            this.accelerationArrow.hide();
        }
    }

    getSphereFill() {
        // Συνάρτηση για την επιλογή χρώματος ή εικόνας με βάση το υλικό
        switch (this.options.material) {
            case 'wood':
                return 'brown';
            case 'metal':
                return 'gray';
            // ... (άλλα υλικά)
            default:
                return 'red';
        }
    }

    updateSpherePosition() {
        const length = this.options.ropeLength * this.options.scaleFactor;
        const angleRad = this.options.currentAngle; // Μετατροπή σε ακτίνια
        const x = this.options.x + length * Math.sin(angleRad);
        const y = this.options.y + length * Math.cos(angleRad);

        this.sphere.x(x);
        this.sphere.y(y);
        this.rope.points([this.options.x, this.options.y, x, y]); // Ενημερώνουμε και το νήμα
    
        //Ενημερωση βελων
        this.calculateArrows();

        //Ενημερωση αξονων
        this.calculateAxis();

        this.sector.angle(2*this.options.maxAngle*180/Math.PI);
        this.sector.rotation(90-this.options.maxAngle * 180 / Math.PI);
            
    }

    /**
     * Υπολογίζει τη συχνότητα ταλάντωσης του εκκρεμούς.
     *
     * @method calculateFrequency
     * @returns {number} Η συχνότητα ταλάντωσης σε Hz.
     *
     * @description
     * Η μέθοδος υπολογίζει την συχνότητα ταλάντωσης του εκκρεμούς με βάση την αρχική γωνία, το μήκος του σχοινιού και την επιτάχυνση της βαρύτητας.
     * Χρησιμοποιεί μια προσέγγιση για την περίοδο του μη γραμμικού εκκρεμούς, η οποία είναι ακριβής για γωνίες μικρότερες από 90 μοίρες.
     *
     * **Φυσικό υπόβαθρο:**
     * Η συχνότητα ταλάντωσης του εκκρεμούς εξαρτάται από το μήκος του σχοινιού και την επιτάχυνση της βαρύτητας.
     * Για μικρές γωνίες, η ταλάντωση είναι απλή αρμονική και η συχνότητα είναι ανεξάρτητη από την αρχική γωνία.
     * Για μεγάλες γωνίες, η ταλάντωση δεν είναι αρμονική και η συχνότητα εξαρτάται από την αρχική γωνία.
     *
     * **Μαθηματικό υπόβαθρο:**
     * Για μικρές γωνίες (θ << 1), η συχνότητα δίνεται από τον τύπο:
     * f = 1 / T = (1 / 2π) * sqrt(g / L)
     * Όπου:
     * f: συχνότητα
     * T: περίοδος
     * g: επιτάχυνση βαρύτητας
     * L: μήκος σχοινιού
     *
     * Για μεγάλες γωνίες, χρησιμοποιούμε την προσέγγιση:
     * T = -T₀ * (ln(a) / (1 - a))
     * Όπου:
     * a = cos(θ₀ / 2)
     * T₀ = 2π * sqrt(L / g)
     * θ₀: αρχική γωνία σε ακτίνια
     *
     * Η συχνότητα είναι:
     * f = 1 / T
     *
     * Η λύση με υπο-απόσβεση είναι θ(t) = θ₀ * e^(-βt) * cos(ωt + φ)
     *
     * @example
     * const frequency = pendulum.calculateFrequency();
     * console.log(frequency);
     */
    calculateFrequency(){
        //Βλέπε https://en.wikipedia.org/wiki/Pendulum_(mechanics)
        //Approximate formulae for the nonlinear pendulum period
        //Για γωνίες μικρότερες από 90 μοίρες: T=-T_ο * ( ln(a) / (1-a) ), 
        // a = cos( θ_ο /2 ), Τ_ο = 2π * sqrt( l / g ).
        //Η λύση με υπο-απόσβεση είναι θ(t) = θ₀ * e^(-βt) * cos(ωt + φ)
        //με κρίσιμη αποσβεση θ(t) = (A + Bt) * e^(-βt)
        //με υπερ-απόσβεση θ(t) = A * e^(-λ₁t) + B * e^(-λ₂t)
        if(this.options.maxAngle==0) return 0.0;
        const maxAngleRad = this.options.maxAngle;
        const L = this.options.ropeLength;
        const g = this.options.gravity;
        const omega0 = Math.sqrt( g / L);
        const a = Math.cos( Math.abs(maxAngleRad) / 2);
        const frequency = - omega0 * ( 1 - a ) / ( Math.log(a) ); 
        return frequency;
    }

    /**
     * Υπολογίζει την περίοδο ταλάντωσης του εκκρεμούς.
     *
     * @method calculatePeriod
     * @returns {number} Η περίοδος ταλάντωσης σε δευτερόλεπτα.
     *
     * @description
     * Η μέθοδος υπολογίζει την περίοδο ταλάντωσης του εκκρεμούς με βάση τη γωνιακή συχνότητα.
     * Η περίοδος είναι ο χρόνος που απαιτείται για μια πλήρη ταλάντωση.
     *
     * **Φυσικό υπόβαθρο:**
     * Η περίοδος ταλάντωσης είναι ο χρόνος που χρειάζεται ένα εκκρεμές για να ολοκληρώσει μια πλήρη ταλάντωση.
     * Για ένα απλό αρμονικό εκκρεμές, η περίοδος εξαρτάται από το μήκος του σχοινιού και την επιτάχυνση της βαρύτητας, αλλά μπορεί επίσης να εκφραστεί με βάση τη γωνιακή συχνότητα.
     *
     * **Μαθηματικό υπόβαθρο:**
     * Η σχέση μεταξύ της περιόδου (T) και της γωνιακής συχνότητας (ω) είναι:
     * T = 2π / ω
     * Όπου:
     * T: περίοδος σε δευτερόλεπτα
     * ω: γωνιακή συχνότητα σε radians ανά δευτερόλεπτο
     *
     * @example
     * const period = pendulum.calculatePeriod();
     * console.log(period);
     */
    calculatePeriod() {
        if(this.options.angularFrequency == 0) return 0.0;
        return 2 * Math.PI / this.options.angularFrequency;
    }

    /**
     * Υπολογίζει τη γωνία του εκκρεμούς σε μια δεδομένη χρονική στιγμή.
     *
     * @method calculateAngle
     * @param {number} time - Ο χρόνος σε milliseconds.
     * @returns {number} Η γωνία του εκκρεμούς σε μοίρες.
     *
     * @description
     * Η μέθοδος υπολογίζει τη γωνία του εκκρεμούς σε μια δεδομένη χρονική στιγμή, λαμβάνοντας υπόψη την αρχική γωνία, τον συντελεστή απόσβεσης και τη γωνιακή συχνότητα.
     * Χρησιμοποιεί την εξίσωση για υπό-απόσβεση, η οποία περιγράφει την κίνηση ενός εκκρεμούς με τριβή.
     *
     * **Φυσικό υπόβαθρο:**
     * Η γωνία του εκκρεμούς αλλάζει με την πάροδο του χρόνου λόγω της βαρύτητας και της τριβής.
     * Σε ένα ιδανικό εκκρεμές χωρίς τριβή, η γωνία θα ταλαντώνεται συνεχώς με σταθερό πλάτος.
     * Σε ένα πραγματικό εκκρεμές με τριβή, η γωνία θα ταλαντώνεται με μειούμενο πλάτος μέχρι να σταματήσει.
     *
     * **Μαθηματικό υπόβαθρο:**
     * Η λύση με υπό-απόσβεση για τη γωνία του εκκρεμούς είναι:
     * θ(t) = θ₀ * e^(-βt) * sin(ωt + φ)
     * Όπου:
     * θ(t): γωνία του εκκρεμούς στο χρόνο t
     * θ₀: αρχική γωνία σε ακτίνια
     * β: συντελεστής απόσβεσης
     * ω: γωνιακή συχνότητα
     * t: χρόνος σε δευτερόλεπτα
     * φ: αρχική φάση (συνήθως 0)
     *
     * Για μεγάλες γωνίες, χρησιμοποιούμε την προσέγγιση:
     * T = -T₀ * (ln(a) / (1 - a))
     * Όπου:
     * a = cos(θ₀ / 2)
     * T₀ = 2π * sqrt(L / g)
     * θ₀: αρχική γωνία σε ακτίνια
     * 
     * @example
     * const angle = pendulum.calculateAngle(1000); // Υπολογισμός γωνίας σε 1 δευτερόλεπτο
     * console.log(angle);
     */
    calculateAngle(time) {
        //Βλέπε https://en.wikipedia.org/wiki/Pendulum_(mechanics)
        //Arbitrary-amplitude angular displacement
        //Approximate formulae for the nonlinear pendulum period
        //Για γωνίες μικρότερες από 90 μοίρες: T=-T_ο * ( ln(a) / (1-a) ), 
        // a = cos( θ_ο /2 ), Τ_ο = 2π * sqrt( l / g ).
        //Η λύση με υπο-απόσβεση είναι θ(t) = θ₀ * e^(-βt) * sin(ωt + φ)
        //με κρίσιμη αποσβεση θ(t) = (A + Bt) * e^(-βt)
        //με υπερ-απόσβεση θ(t) = A * e^(-λ₁t) + B * e^(-λ₂t)

        //αρχική γωνία 
        const maxAngleRad = this.options.maxAngle;
        // Συντελεστής απόσβεσης
        const b = this.options.damping; 
        //γωνιακή συχνότητα
        let omega = this.options.angularFrequency;  
        
        //Η λύση με υπο-απόσβεση είναι θ(t) = θ₀ * e^(-βt) * sin(ωt + φ)
        const angleRad = maxAngleRad * Math.exp(-b * time / 1000) * Math.sin(omega * time / 1000); // Υπό-απόσβεση

        //επιστρέφει την τιμή σε μοίρες;
        return angleRad;
    }

    /**
     * Ξεκινάει το animation του εκκρεμούς.
     *
     * @method startAnimation
     *
     * @description
     * Η μέθοδος ξεκινάει το animation του εκκρεμούς χρησιμοποιώντας την βιβλιοθήκη Konva.js.
     * Κάθε frame του animation, ενημερώνει την θέση της σφαίρας, υπολογίζει την γωνία, τον τρέχοντα χρόνο και τον χρόνο στην πρώτη περίοδο.
     * Επίσης, εκπέμπει ένα event ('Pendulum') σε όλα τα άλλα widgets για να τα ενημερώσει για την αλλαγή.
     *
     * **Φυσικό υπόβαθρο:**
     * Το animation προσομοιώνει την κίνηση του εκκρεμούς στον χρόνο.
     * Η θέση της σφαίρας ενημερώνεται με βάση την γωνία που υπολογίζεται από την μέθοδο calculateAngle.
     * Ο χρόνος στην πρώτη περίοδο χρησιμοποιείται για την οπτικοποίηση της κίνησης του εκκρεμούς σε μια μόνο περίοδο.
     *
     * **Μαθηματικό υπόβαθρο:**
     * Η γωνία υπολογίζεται με βάση την εξίσωση για υπό-απόσβεση:
     * θ(t) = θ₀ * e^(-βt) * cos(ωt + φ)
     * Όπου:
     * θ(t): γωνία του εκκρεμούς στο χρόνο t
     * θ₀: αρχική γωνία σε ακτίνια
     * β: συντελεστής απόσβεσης
     * ω: γωνιακή συχνότητα
     * t: χρόνος σε δευτερόλεπτα
     * φ: αρχική φάση (συνήθως 0)
     *
     * Ο χρόνος στην πρώτη περίοδο υπολογίζεται με τον τελεστή modulo:
     * timeInFirstPeriod = time % period
     *
     * @example
     * pendulum.startAnimation();
     */
    startAnimation() {
        //frame.time ειναι ο χρονος σε ms απο την αρχη της προσομοιωσης
        if (this.animation) {
            this.animation.stop(); // Σταματάμε το προηγούμενο animation αν υπάρχει
        }
        this.animation = new Konva.Animation((frame) => {
            this.options.time = frame.time * this.options.timeScale;
            this.options.timeInfirstPeriod = (frame.time * this.options.timeScale) % this.options.period;
            this.options.currentAngle = this.calculateAngle(frame.time * this.options.timeScale);
            this.updateSpherePosition();
            this.fireEventToAllOthers('Pendulum');
        }, this.getLayer());
    
        this.animation.start();
    }

    /**
     * Σταματάει το animation του εκκρεμούς.
     *
     * @method stopAnimation
     *
     * @description
     * Η μέθοδος σταματάει το animation του εκκρεμούς αν υπάρχει.
     * Θέτει το animation σε null για να δείξει ότι δεν τρέχει πλέον.
     *
     * **Φυσικό υπόβαθρο:**
     * Η διακοπή του animation σταματά την προσομοίωση της κίνησης του εκκρεμούς.
     * Αυτό είναι χρήσιμο όταν θέλουμε να σταματήσουμε την προσομοίωση για να αναλύσουμε τα αποτελέσματα ή να αλλάξουμε τις παραμέτρους του εκκρεμούς.
     *
     * **Τεχνικό υπόβαθρο:**
     * Χρησιμοποιείται η μέθοδος `stop()` της βιβλιοθήκης Konva.js για να σταματήσει το animation.
     * Το animation θέτεται σε null για να απελευθερωθούν οι πόροι που χρησιμοποιούνται από το animation.
     *
     * @example
     * pendulum.stopAnimation();
     */
    stopAnimation() {
        if (this.animation) {
            this.animation.stop();
            this.options.currentAngle = this.calculateAngle(0.0);
            this.options.time = 0;
            this.updateSpherePosition();
            this.animation = null; // Θέτουμε το animation σε null για να δείξουμε ότι δεν τρέχει
        }
    }

    //GETERS AND SETTERS

    /**
     * Ορίζει το μήκος του σχοινιού του εκκρεμούς.
     *
     * @method setRopeLength
     * @param {number} length - Το νέο μήκος του σχοινιού σε pixels.
     *
     * @description
     * Η μέθοδος ορίζει το μήκος του σχοινιού του εκκρεμούς και ενημερώνει την γωνιακή συχνότητα, την περίοδο και τη θέση της σφαίρας.
     *
     * **Φυσικό υπόβαθρο:**
     * Το μήκος του σχοινιού επηρεάζει την περίοδο και τη συχνότητα ταλάντωσης του εκκρεμούς.
     * Μεγαλύτερο μήκος σχοινιού οδηγεί σε μεγαλύτερη περίοδο και μικρότερη συχνότητα.
     *
     * **Μαθηματικό υπόβαθρο:**
     * Η σχέση μεταξύ της περιόδου (T), της γωνιακής συχνότητας (ω) και του μήκους του σχοινιού (L) είναι:
     * T = 2π * sqrt(L/g)
     * ω = sqrt(g/L)
     * Όπου:
     * g: επιτάχυνση βαρύτητας
     *
     * Η γωνιακή συχνότητα ενημερώνεται με την μέθοδο `calculateFrequency()`.
     * Η περίοδος ενημερώνεται με την μέθοδο `calculatePeriod()`.
     * Η θέση της σφαίρας ενημερώνεται με την μέθοδο `updateSpherePosition()`.
     *
     * @example
     * pendulum.setRopeLength(150);
     */
    setRopeLength(length) {
        this.options.ropeLength = length;
        this.options.angularFrequency = this.calculateFrequency(); // Update frequency
        this.options.period = this.calculatePeriod(); // Update period
        this.updateSpherePosition();
    }

    /**
     * Ορίζει την αρχική γωνία του εκκρεμούς.
     *
     * @method setMaxAngle
     * @param {number} angle - Η νέα αρχική γωνία σε μοίρες.
     *
     * @description
     * Η μέθοδος ορίζει την αρχική γωνία του εκκρεμούς και ενημερώνει την τρέχουσα γωνία, τη γωνιακή συχνότητα, την περίοδο και τη θέση της σφαίρας.
     *
     * **Φυσικό υπόβαθρο:**
     * Η αρχική γωνία καθορίζει το πλάτος της ταλάντωσης του εκκρεμούς.
     * Μεγαλύτερη αρχική γωνία οδηγεί σε μεγαλύτερο πλάτος ταλάντωσης.
     * Επίσης επηρεάζει την συχνότητα ταλάντωσης σε μη γραμμικά εκκρεμή.
     *
     * **Μαθηματικό υπόβαθρο:**
     * Η αρχική γωνία (θ₀) χρησιμοποιείται στην εξίσωση της κίνησης του εκκρεμούς:
     * θ(t) = θ₀ * e^(-βt) * cos(ωt + φ)
     * Όπου:
     * θ(t): γωνία του εκκρεμούς στο χρόνο t
     * β: συντελεστής απόσβεσης
     * ω: γωνιακή συχνότητα
     * t: χρόνος
     * φ: αρχική φάση (συνήθως 0)
     *
     * Η τρέχουσα γωνία ενημερώνεται με την τιμή της αρχικής γωνίας.
     * Η γωνιακή συχνότητα ενημερώνεται με την μέθοδο `calculateFrequency()`.
     * Η περίοδος ενημερώνεται με την μέθοδο `calculatePeriod()`.
     * Η θέση της σφαίρας ενημερώνεται με την μέθοδο `updateSpherePosition()`.
     *
     * @example
     * pendulum.setMaxAngle(30);
     */
    setMaxAngle(angle) {
        this.options.maxAngle = angle;
        //this.options.currentAngle = angle; // Update current angle
        this.options.angularFrequency = this.calculateFrequency(); // Update frequency
        this.options.period = this.calculatePeriod(); // Update period
        this.updateSpherePosition();
    }

    /**
     * Ορίζει τη μάζα του εκκρεμούς.
     *
     * @method setMass
     * @param {number} mass - Η νέα μάζα του εκκρεμούς σε kg.
     *
     * @description
     * Η μέθοδος ορίζει τη μάζα του εκκρεμούς και ενημερώνει το μέγεθος της σφαίρας.
     *
     * **Φυσικό υπόβαθρο:**
     * Η μάζα του εκκρεμούς επηρεάζει την κινητική ενέργεια και την ορμή του.
     * Μεγαλύτερη μάζα οδηγεί σε μεγαλύτερη κινητική ενέργεια και ορμή.
     * Στο απλό εκκρεμές, η μάζα δεν επηρεάζει την περίοδο ταλάντωσης.
     *
     * **Τεχνικό υπόβαθρο:**
     * Η θέση της σφαίρας ενημερώνεται με την μέθοδο `updateSpherePosition()`, η οποία προσαρμόζει το μέγεθος της σφαίρας ανάλογα με τη μάζα.
     *
     * @example
     * pendulum.setMass(2);
     */
    setMass(mass) {
        this.options.mass = mass;
        this.sphere.radius(this.calculateSphereRadius());
        this.updateSpherePosition(); // Update sphere size
    }

    /**
     * Ορίζει την επιτάχυνση της βαρύτητας.
     *
     * @method setGravity
     * @param {number} gravity - Η νέα επιτάχυνση της βαρύτητας σε m/s².
     *
     * @description
     * Η μέθοδος ορίζει την επιτάχυνση της βαρύτητας και ενημερώνει τη γωνιακή συχνότητα και την περίοδο ταλάντωσης του εκκρεμούς.
     *
     * **Φυσικό υπόβαθρο:**
     * Η επιτάχυνση της βαρύτητας επηρεάζει την περίοδο και τη συχνότητα ταλάντωσης του εκκρεμούς.
     * Μεγαλύτερη επιτάχυνση βαρύτητας οδηγεί σε μικρότερη περίοδο και μεγαλύτερη συχνότητα.
     *
     * **Μαθηματικό υπόβαθρο:**
     * Η σχέση μεταξύ της περιόδου (T), της γωνιακής συχνότητας (ω) και της επιτάχυνσης της βαρύτητας (g) είναι:
     * T = 2π * sqrt(L/g)
     * ω = sqrt(g/L)
     * Όπου:
     * L: μήκος του σχοινιού
     *
     * Η γωνιακή συχνότητα ενημερώνεται με την μέθοδο `calculateFrequency()`.
     * Η περίοδος ενημερώνεται με την μέθοδο `calculatePeriod()`.
     *
     * @example
     * pendulum.setGravity(9.81);
     */
    setGravity(gravity) {
        this.options.gravity = gravity;
        this.options.angularFrequency = this.calculateFrequency(); // Update frequency
        this.options.period = this.calculatePeriod(); // Update period
    }

    /**
     * Ορίζει τον συντελεστή κλίμακας για την προβολή των φυσικών μεγεθών στην οθόνη.
     *
     * @method setScaleFactor
     * @param {number} scaleFactor - Ο νέος συντελεστής κλίμακας.
     *
     * @description
     * Η μέθοδος ορίζει τον συντελεστή κλίμακας και ενημερώνει τη θέση της σφαίρας.
     *
     * **Τεχνικό υπόβαθρο:**
     * Ο συντελεστής κλίμακας χρησιμοποιείται για να μετατρέψει τις φυσικές μονάδες (π.χ. μέτρα) σε pixels, ώστε να εμφανιστούν σωστά στην οθόνη.
     * Αλλάζοντας τον συντελεστή κλίμακας, μπορούμε να αλλάξουμε το μέγεθος του εκκρεμούς στην οθόνη, χωρίς να αλλάξουμε τις φυσικές του ιδιότητες.
     *
     * Η θέση της σφαίρας ενημερώνεται με την μέθοδο `updateSpherePosition()`, η οποία χρησιμοποιεί τον συντελεστή κλίμακας για να υπολογίσει τις συντεταγμένες της σφαίρας.
     *
     * @example
     * pendulum.setScaleFactor(250);
     * //Σε αυτή την περιπτωση το 1 μετρο θα αντιστοιχεί σε 250px
     */
    setScaleFactor(scaleFactor) {
        this.options.scaleFactor = scaleFactor;
        this.updateSpherePosition();
    }

    /**
     * Ορίζει τον συντελεστή κλίμακας για την προσομοίωση του χρόνου.
     *
     * @method setTimeScale
     * @param {number} timeScale - Ο νέος συντελεστής κλίμακας χρόνου.
     *
     * @description
     * Η μέθοδος ορίζει τον συντελεστή κλίμακας για την προσομοίωση του χρόνου, επιτρέποντας την επιτάχυνση ή επιβράδυνση της προσομοίωσης.
     *
     * **Τεχνικό υπόβαθρο:**
     * Ο συντελεστής κλίμακας χρόνου πολλαπλασιάζεται με τον πραγματικό χρόνο που περνάει κατά την προσομοίωση.
     * Μια τιμή μεγαλύτερη από 1 επιταχύνει την προσομοίωση, ενώ μια τιμή μικρότερη από 1 την επιβραδύνει.
     *
     * @example
     * pendulum.setTimeScale(2); // Διπλασιάζει την ταχύτητα της προσομοίωσης
     */
    setTimeScale(timeScale) {
        this.options.timeScale = timeScale;
        //this.animate(); // Restart animation with new time scale?
    }

    /**
     * Ορίζει τον συντελεστή απόσβεσης του εκκρεμούς.
     *
     * @method setDamping
     * @param {number} damping - Ο νέος συντελεστής απόσβεσης.
     *
     * @description
     * Η μέθοδος ορίζει τον συντελεστή απόσβεσης, ο οποίος επηρεάζει την ταχύτητα με την οποία μειώνεται το πλάτος της ταλάντωσης του εκκρεμούς λόγω τριβής.
     *
     * **Φυσικό υπόβαθρο:**
     * Η απόσβεση αντιπροσωπεύει τις δυνάμεις τριβής που δρουν στο εκκρεμές, όπως η αντίσταση του αέρα και η τριβή στον άξονα περιστροφής.
     * Ένας μεγαλύτερος συντελεστής απόσβεσης οδηγεί σε ταχύτερη μείωση του πλάτους ταλάντωσης.
     *
     * **Μαθηματικό υπόβαθρο:**
     * Ο συντελεστής απόσβεσης (β) χρησιμοποιείται στην εξίσωση της κίνησης του εκκρεμούς με απόσβεση:
     * θ(t) = θ₀ * e^(-βt) * cos(ωt + φ)
     * Όπου:
     * θ(t): γωνία του εκκρεμούς στο χρόνο t
     * θ₀: αρχική γωνία
     * ω: γωνιακή συχνότητα
     * t: χρόνος
     * φ: αρχική φάση
     *
     * @example
     * pendulum.setDamping(0.01);
     */
    setDamping(damping) {
        this.options.damping = damping;
    }

    /**
     * Ορίζει την ακτίνα του μοιρογνωμόνιου.
     *
     * @method setProtractorRadius
     * @param {number} radius - Η νέα ακτίνα του μοιρογνωμόνιου σε pixels.
     *
     * @description
     * Η μέθοδος ορίζει την ακτίνα του μοιρογνωμόνιου, καταστρέφει το υπάρχον μοιρογνωμόνιο, δημιουργεί ένα νέο με τη νέα ακτίνα και το προσθέτει στο widget.
     *
     * **Τεχνικό υπόβαθρο:**
     * Το μοιρογνωμόνιο είναι ένα οπτικό βοήθημα που χρησιμοποιείται για να μετρήσει τη γωνία του εκκρεμούς.
     * Η ακτίνα του μοιρογνωμόνιου καθορίζει το μέγεθός του στην οθόνη.
     *
     * Η μέθοδος `destroyChildren()` της Konva.js χρησιμοποιείται για να καταστρέψει όλα τα παιδιά του μοιρογνωμόνιου.
     * Η μέθοδος `createProtractor()` δημιουργεί ένα νέο μοιρογνωμόνιο με την νέα ακτίνα.
     * Η μέθοδος `add()` χρησιμοποιείται για να προσθέσει το νέο μοιρογνωμόνιο στο widget.
     *
     * @example
     * pendulum.setProtractorRadius(75);
     */
    setProtractorRadius(radius) {
        this.options.protractorRadius = radius;
        this.protractor.destroyChildren(); // Clear existing protractor
        this.protractor = this.createProtractor(); // Recreate protractor
        this.add(this.protractor);
    }

    //LISTENERS
    /**
     * Ενεργοποιεί τη λειτουργία μεταφοράς της σφαίρας με το ποντίκι.
     *
     * @method handleSphereDrag
     *
     * @description
     * Η μέθοδος ενεργοποιεί τη δυνατότητα μεταφοράς της σφαίρας με το ποντίκι, σταματάει το τρέχον animation, υπολογίζει τη νέα γωνία με βάση τη θέση της σφαίρας και ενημερώνει την αρχική και τρέχουσα γωνία του εκκρεμούς.
     *
     * **Τεχνικό υπόβαθρο:**
     * Η μέθοδος χρησιμοποιεί τις λειτουργίες `draggable()` και `on('dragmove', ...)` της βιβλιοθήκης Konva.js για να ενεργοποιήσει τη μεταφορά της σφαίρας.
     * Όταν η σφαίρα μετακινείται, η μέθοδος υπολογίζει τη νέα γωνία χρησιμοποιώντας την `Math.atan2()`, η οποία επιστρέφει τη γωνία (σε ακτίνια) μεταξύ του θετικού άξονα x και της ακτίνας από την αρχή στο σημείο (y, x).
     * Η γωνία μετατρέπεται σε μοίρες και προσαρμόζεται ώστε να είναι συμβατή με το σύστημα συντεταγμένων του εκκρεμούς.
     *
     * @example
     * pendulum.handleSphereDrag();
     */
    handleSphereDrag() {
        this.sphere.draggable(true); // Κάνουμε τη σφαίρα draggable

        this.sphere.on('dragmove', () => {
            this.animation.stop();
            const sphereX = this.sphere.x();
            const sphereY = this.sphere.y();

            // Υπολογίζουμε τη γωνία σε σχέση με το κέντρο του εκκρεμούς
            const deltaX = sphereX - this.options.x;
            const deltaY = sphereY - this.options.y;
            let angleRad = Math.atan2(deltaY, deltaX); //Returns the angle (in radians) between the positive x-axis and the ray from the origin to the point (y, x).
            //let angleDeg = angleRad * 180 / Math.PI;

            //Προσαρμόζουμε τη γωνία. Το 0 είναι κάτω και με + φορά προς τα αριστερά.
            //angleDeg = 90 - angleDeg;
            angleRad = Math.PI / 2 - angleRad; 
            //if(angleDeg < 0) angleDeg += 360;
            if(angleRad < 0) angleRad += 2 * Math.PI;
            //Αν η γωνία είναι μεγαλύτερη από 180 τότε την προσαρμόζουμε
            //if (Math.abs(angleDeg) > 180 ) {
              //  if(angleDeg > 0) angleDeg -= 360;
                //else angleDeg += 360;
            //}
            if (Math.abs(angleRad) > Math.PI ) {
                if(angleRad > 0) angleRad -= 2 * Math.PI;
                else angleRad += 2 * Math.PI;
            }

            this.options.maxAngle = angleRad; // ενημερώνουμε την αρχική γωνία
            this.options.currentAngle = angleRad; // ενημερώνουμε την τρέχουσα γωνία

            this.updateSpherePosition(); // Ενημερώνουμε τη θέση της σφαίρας
        });
    }

    //GET DATA OF MOTION
    /**
     * Δημιουργεί ένα σύνολο δεδομένων για μια πλήρη περίοδο ταλάντωσης του εκκρεμούς.
     *
     * @method getPeriodData
     * @param {number} steps - Ο αριθμός των βημάτων που θα χρησιμοποιηθούν για τη διακριτοποίηση της περιόδου.
     * @returns {Array<Object>} Ένας πίνακας με αντικείμενα που περιέχουν τα δεδομένα για κάθε χρονικό βήμα.
     *
     * @description
     * Η μέθοδος υπολογίζει την περίοδο ταλάντωσης του εκκρεμούς και δημιουργεί ένα σύνολο δεδομένων για μια πλήρη περίοδο, διακριτοποιώντας την σε `steps` βήματα.
     * Για κάθε βήμα, υπολογίζει τη γωνία, τη γωνιακή ταχύτητα, τη γωνιακή επιτάχυνση, τη γραμμική ταχύτητα, τη γραμμική επιτάχυνση, τις δυνάμεις, την κινητική ενέργεια, τη δυναμική ενέργεια και τη συνολική ενέργεια.
     * Τα δεδομένα αποθηκεύονται σε έναν πίνακα αντικειμένων, όπου κάθε αντικείμενο περιέχει τα δεδομένα για ένα χρονικό βήμα.
     *
     * **Φυσικό υπόβαθρο:**
     * Η περίοδος ταλάντωσης είναι ο χρόνος που χρειάζεται το εκκρεμές για να ολοκληρώσει μια πλήρη ταλάντωση.
     * Η μέθοδος χρησιμοποιεί τις φυσικές αρχές της κίνησης του εκκρεμούς για να υπολογίσει τα δεδομένα για κάθε χρονικό βήμα.
     *
     * **Μαθηματικό υπόβαθρο:**
     * Η μέθοδος χρησιμοποιεί τους τύπους για την κίνηση του εκκρεμούς, όπως:
     * - Περίοδος: T = 2π / ω
     * - Γωνία: θ(t) = θ₀ * e^(-βt) * cos(ωt + φ)
     * - Γωνιακή ταχύτητα: ω(t) = dθ/dt
     * - Γωνιακή επιτάχυνση: α(t) = dω/dt
     * - Γραμμική ταχύτητα: v(t) = L * ω(t)
     * - Γραμμική επιτάχυνση: a(t) = L * α(t)
     * - Δυνάμεις: F = m * a
     * - Κινητική ενέργεια: K = 1/2 * m * v^2
     * - Δυναμική ενέργεια: U = m * g * h
     * - Συνολική ενέργεια: E = K + U
     *
     * **Εγγραφές αντικειμένου [{time,...},...]:**
     * - `time`: Ο χρόνος σε δευτερόλεπτα.
     * - `angle`: Η γωνία σε ακτίνια.
     * - `angularVelocity`: Η γωνιακή ταχύτητα σε rad/s.
     * - `angularAcceleration`: Η γωνιακή επιτάχυνση σε rad/s².
     * - `linearVelocity`: Η γραμμική ταχύτητα σε m/s.
     * - `linearAcceleration`: Η γραμμική επιτάχυνση σε m/s².
     * - `totalForceX`: Η συνολική δύναμη στον άξονα x (ακτινική).
     * - `totalForceY`: Η συνολική δύναμη στον άξονα y (εφαπτομενική).
     * - `weightX`: Η συνιστώσα x του βάρους.
     * - `weightY`: Η συνιστώσα y του βάρους.
     * - `weight`: Το μέτρο του βάρους.
     * - `tension`: Η τάση του σχοινιού.
     * - `totalForceMagnitude`: Το μέτρο της συνολικής δύναμης.
     * - `totalForceDirection`: Η διεύθυνση της συνολικής δύναμης σε ακτίνια.
     * - `kineticEnergy`: Η κινητική ενέργεια σε Joules.
     * - `potentialEnergy`: Η δυναμική ενέργεια σε Joules.
     * - `totalEnergy`: Η συνολική ενέργεια σε Joules.
     *
     * @example
     * const periodData = pendulum.getPeriodData(100);
     * console.log(periodData);
     */
    getPeriodData(steps) {
        const data = [];
        /*const period = this.calculatePeriod(); // Υπολογίζουμε την περίοδο
        const dt = period / steps; // Χρονικό βήμα

        for (let i = 0; i <= steps; i++) {
            const time = i * dt;
            const angleRad = this.calculateAngle(time * 1000); // Υπολογίζουμε τη γωνία σε ακτίνια

            const angularVelocity = this.calculateAngularVelocity(time); // Υπολογισμός γωνιακής ταχύτητας
            const angularAcceleration = this.calculateAngularAcceleration(time); // Υπολογισμός γωνιακής επιτάχυνσης

            const linearVelocity = this.calculateLinearVelocity(time).magnitude; // Υπολογισμός γραμμικής ταχύτητας
            const linearAcceleration = this.calculateLinearAcceleration(time).magnitude; // Υπολογισμός γραμμικής επιτάχυνσης

            const forces = this.calculateForces(time); // Υπολογισμός δυνάμεων

            const kineticEnergy = this.calculateKineticEnergy(time); // Υπολογισμός κινητικής ενέργειας
            const potentialEnergy = this.calculatePotentialEnergy(time); // Υπολογισμός δυναμικής ενέργειας
            const totalEnergy = kineticEnergy + potentialEnergy; // Υπολογισμός συνολικής ενέργειας

            data.push({
                time: time,
                angle: angleRad,
                angularVelocity: angularVelocity,
                angularAcceleration: angularAcceleration,
                linearVelocity: linearVelocity,
                linearAcceleration: linearAcceleration,
                totalForceXMagnitude: forces.totalForceXMagnitude,
                totalForceXDirection: forces.totalForceXDirection,
                totalForceYMagnitude: forces.totalForceYMagnitude,
                totalForceYDirection: forces.totalForceYDirection,
                weightXMagnitude: forces.weightXMagnitude,
                weightXDirection: forces.weightXDirection,
                weightYMagnitude: forces.weightYMagnitude,
                weightYDirection: forces.weightYDirection,
                weightMagnitude: forces.weightMagnitude,
                weightDirection: forces.weightDirection,
                tensionMagnitude: forces.tensionMagnitude,
                tensionDirection: forces.tensionDirection,
                totalForceMagnitude: forces.totalForceMagnitude,
                totalForceDirection: forces.totalForceDirection,
                kineticEnergy: kineticEnergy,
                potentialEnergy: potentialEnergy,
                totalEnergy: totalEnergy,
            });
        }*/
        return data;
    }
    
    /**
     * Υπολογίζει τη γωνιακή ταχύτητα του εκκρεμούς σε μια δεδομένη χρονική στιγμή.
     *
     * @method calculateAngularVelocity
     * @param {number} time - Ο χρόνος σε milliseconds.
     * @returns {number} Η γωνιακή ταχύτητα σε rad/s.
     *
     * @description
     * Η μέθοδος υπολογίζει τη γωνιακή ταχύτητα του εκκρεμούς σε μια δεδομένη χρονική στιγμή, λαμβάνοντας υπόψη την αρχική γωνία, τον συντελεστή απόσβεσης και τη γωνιακή συχνότητα.
     * Χρησιμοποιεί την εξίσωση για υπό-απόσβεση, η οποία περιγράφει την κίνηση ενός εκκρεμούς με τριβή.
     *
     * **Φυσικό υπόβαθρο:**
     * Η γωνιακή ταχύτητα είναι ο ρυθμός μεταβολής της γωνίας του εκκρεμούς με την πάροδο του χρόνου.
     * Σε ένα ιδανικό εκκρεμές χωρίς τριβή, η γωνιακή ταχύτητα θα ταλαντώνεται συνεχώς με σταθερό πλάτος.
     * Σε ένα πραγματικό εκκρεμές με τριβή, η γωνιακή ταχύτητα θα ταλαντώνεται με μειούμενο πλάτος μέχρι να σταματήσει.
     *
     * **Μαθηματικό υπόβαθρο:**
     * Η λύση με υπό-απόσβεση για τη γωνιακή ταχύτητα του εκκρεμούς είναι:
     * ω(t) = θ₀ * e^(-βt) * (-β * sin(ωt + φ) + ω * cos(ωt + φ))
     * Όπου:
     * ω(t): γωνιακή ταχύτητα του εκκρεμούς στο χρόνο t
     * θ₀: αρχική γωνία σε ακτίνια
     * β: συντελεστής απόσβεσης
     * ω: γωνιακή συχνότητα
     * t: χρόνος σε δευτερόλεπτα
     * φ: αρχική φάση (συνήθως 0)
     *
     * @example
     * const angularVelocity = pendulum.calculateAngularVelocity(1000); // Υπολογισμός γωνιακής ταχύτητας σε 1 δευτερόλεπτο
     * console.log(angularVelocity);
     */
    calculateAngularVelocity(time) {
        //ω(t) = θ₀ * e^(-bt) * (-b * sin(ωt + φ) + ω * cos(ωt + φ))
        // rad/s  
        const omega = this.options.angularFrequency;
        const b = this.options.damping;
        const maxAngleRad = this.options.maxAngle;
        const phi = 0; // Αρχική φάση (συνήθως 0)
        return maxAngleRad * Math.exp(-b * time / 1000) * (-b * Math.sin(omega * time / 1000 + phi) + omega * Math.cos(omega * time / 1000 + phi));
    }

    /**
     * Υπολογίζει τη γωνιακή επιτάχυνση του εκκρεμούς σε μια δεδομένη χρονική στιγμή.
     *
     * @method calculateAngularAcceleration
     * @param {number} time - Ο χρόνος σε milliseconds.
     * @returns {number} Η γωνιακή επιτάχυνση σε rad/s².
     *
     * @description
     * Η μέθοδος υπολογίζει τη γωνιακή επιτάχυνση του εκκρεμούς σε μια δεδομένη χρονική στιγμή, λαμβάνοντας υπόψη την αρχική γωνία, τον συντελεστή απόσβεσης και τη γωνιακή συχνότητα.
     * Χρησιμοποιεί την εξίσωση για υπό-απόσβεση, η οποία περιγράφει την κίνηση ενός εκκρεμούς με τριβή.
     *
     * **Φυσικό υπόβαθρο:**
     * Η γωνιακή επιτάχυνση είναι ο ρυθμός μεταβολής της γωνιακής ταχύτητας του εκκρεμούς με την πάροδο του χρόνου.
     * Σε ένα ιδανικό εκκρεμές χωρίς τριβή, η γωνιακή επιτάχυνση θα ταλαντώνεται συνεχώς με σταθερό πλάτος.
     * Σε ένα πραγματικό εκκρεμές με τριβή, η γωνιακή επιτάχυνση θα ταλαντώνεται με μειούμενο πλάτος μέχρι να σταματήσει.
     *
     * **Μαθηματικό υπόβαθρο:**
     * Η λύση με υπό-απόσβεση για τη γωνιακή επιτάχυνση του εκκρεμούς είναι:
     * α(t) = θ₀ * e^(-βt) * ((β² - ω²) * sin(ωt + φ) - 2βω * cos(ωt + φ))
     * Όπου:
     * α(t): γωνιακή επιτάχυνση του εκκρεμούς στο χρόνο t
     * θ₀: αρχική γωνία σε ακτίνια
     * β: συντελεστής απόσβεσης
     * ω: γωνιακή συχνότητα
     * t: χρόνος σε δευτερόλεπτα
     * φ: αρχική φάση (συνήθως 0)
     *
     * @example
     * const angularAcceleration = pendulum.calculateAngularAcceleration(1000); // Υπολογισμός γωνιακής επιτάχυνσης σε 1 δευτερόλεπτο
     * console.log(angularAcceleration);
     */
    calculateAngularAcceleration(time) {
        //a(t) = θ_ο * e^{-bt} * ( (b^2 - ω^2) sin(ωt+φ) - 2bω cos(ωt+φ) )
        // rad/s^2
        const omega = this.options.angularFrequency;
        const b = this.options.damping;
        const maxAngleRad = this.options.maxAngle;
        const phi = 0; // Αρχική φάση (συνήθως 0)

        return maxAngleRad * Math.exp(-b * time / 1000) * ((b * b - omega * omega) * Math.sin(omega * time / 1000 + phi) - 2 * b * omega * Math.cos(omega * time / 1000 + phi));
    }

    /**
     * Υπολογίζει τη γραμμική ταχύτητα της μάζας του εκκρεμούς σε μια δεδομένη χρονική στιγμή, συμπεριλαμβανομένης της κατεύθυνσης.
     *
     * @method calculateLinearVelocity
     * @param {number} time - Ο χρόνος σε milliseconds.
     * @returns {object} Ένα αντικείμενο με το μέγεθος και την κατεύθυνση της γραμμικής ταχύτητας.
     *
     * @description
     * Η μέθοδος υπολογίζει τη γραμμική ταχύτητα της μάζας του εκκρεμούς σε μια δεδομένη χρονική στιγμή, λαμβάνοντας υπόψη το μήκος του σχοινιού, τη γωνιακή ταχύτητα και την κατεύθυνση της ταχύτητας.
     * Η γραμμική ταχύτητα είναι η ταχύτητα της μάζας κατά μήκος της τροχιάς της και η κατεύθυνσή της είναι εφαπτομένη στην τροχιά.
     *
     * **Φυσικό υπόβαθρο:**
     * Η γραμμική ταχύτητα της μάζας του εκκρεμούς εξαρτάται από τη γωνιακή ταχύτητα και το μήκος του σχοινιού.
     * Η κατεύθυνση της γραμμικής ταχύτητας είναι πάντα εφαπτομένη στην τροχιά της μάζας.
     *
     * **Μαθηματικό υπόβαθρο:**
     * Η σχέση μεταξύ της γραμμικής ταχύτητας (v), της γωνιακής ταχύτητας (ω) και του μήκους του σχοινιού (L) είναι:
     * v = L * ω
     * Η κατεύθυνση της ταχύτητας είναι κάθετη στο σχοινί και εφαπτομένη στην τροχιά.
     *
     * @example
     * const linearVelocity = pendulum.calculateLinearVelocity(1000); // Υπολογισμός γραμμικής ταχύτητας σε 1 δευτερόλεπτο
     * console.log(linearVelocity.magnitude); // Μέγεθος ταχύτητας
     * console.log(linearVelocity.direction); // Κατεύθυνση ταχύτητας σε ακτίνια
     */
    calculateLinearVelocity(time) {
        const L = this.options.ropeLength;
        const angularVelocity = this.calculateAngularVelocity(time);
        const magnitude = L * angularVelocity;
    
        // Υπολογισμός κατεύθυνσης χρησιμοποιώντας μετασχηματισμό συντεταγμένων
        const angleRad = this.calculateAngle(time); // Γωνία σε ακτίνια
        const velocityR = 0; // Ακτινική συνιστώσα ταχύτητας (μηδέν)
        const velocityT = magnitude; // Εφαπτομενική συνιστώσα ταχύτητας
    
        // Μετασχηματισμός στο σύστημα XY
        const phi = angleRad; // Η γωνία μετασχηματισμού είναι angleRad
        const velocityY = velocityR * Math.cos(phi) + velocityT * Math.sin(phi);
        const velocityX = velocityR * Math.sin(phi) - velocityT * Math.cos(phi);
    
        // Υπολογισμός κατεύθυνσης σε ακτίνια
        const direction = Math.atan2(velocityY, -velocityX);
    
        return {
            magnitude: Math.abs(magnitude),
            direction: direction,
            velocityX: velocityX,
            velocityY: velocityY,
        };
    }

    /**
     * Υπολογίζει τη γραμμική επιτάχυνση της μάζας του εκκρεμούς σε μια δεδομένη χρονική στιγμή, συμπεριλαμβανομένης της κατεύθυνσης.
     *
     * @method calculateLinearAcceleration
     * @param {number} time - Ο χρόνος σε milliseconds.
     * @returns {object} Ένα αντικείμενο με το μέγεθος και την κατεύθυνση της γραμμικής επιτάχυνσης.
     *
     * @description
     * Η μέθοδος υπολογίζει τη γραμμική επιτάχυνση της μάζας του εκκρεμούς σε μια δεδομένη χρονική στιγμή, λαμβάνοντας υπόψη το μήκος του σχοινιού, τη γωνιακή επιτάχυνση και την κατεύθυνση της επιτάχυνσης.
     * Η γραμμική επιτάχυνση είναι η επιτάχυνση της μάζας κατά μήκος της τροχιάς της και η κατεύθυνσή της είναι ίδια με την κατεύθυνση της συνολικής δύναμης.
     *
     * **Φυσικό υπόβαθρο:**
     * Η γραμμική επιτάχυνση της μάζας του εκκρεμούς εξαρτάται από τη γωνιακή επιτάχυνση και το μήκος του σχοινιού.
     * Η κατεύθυνση της γραμμικής επιτάχυνσης είναι πάντα ίδια με την κατεύθυνση της συνολικής δύναμης που δρα στο εκκρεμές.
     *
     * **Μαθηματικό υπόβαθρο:**
     * Η σχέση μεταξύ της γραμμικής επιτάχυνσης (a), της γωνιακής επιτάχυνσης (α) και του μήκους του σχοινιού (L) είναι:
     * a = L * α
     * Η κατεύθυνση της επιτάχυνσης είναι ίδια με την κατεύθυνση της συνολικής δύναμης.
     *
     * @example
     * const linearAcceleration = pendulum.calculateLinearAcceleration(1000); // Υπολογισμός γραμμικής επιτάχυνσης σε 1 δευτερόλεπτο
     * console.log(linearAcceleration.magnitude); // Μέγεθος επιτάχυνσης
     * console.log(linearAcceleration.direction); // Κατεύθυνση επιτάχυνσης σε ακτίνια
     */
    calculateLinearAcceleration(time) {
        const L = this.options.ropeLength;
        const angularAcceleration = this.calculateAngularAcceleration(time);
        const magnitude = L * angularAcceleration;
    
        // Υπολογισμός κατεύθυνσης από τη συνολική δύναμη
        const forces = this.calculateForces(time); // Υπολογισμός δυνάμεων
        const direction = forces.totalForceDirection; // Κατεύθυνση συνολικής δύναμης
    
        // Υπολογισμός καρτεσιανών συνιστωσών (προαιρετικά)
        const accelerationX = magnitude * Math.cos(direction);
        const accelerationY = magnitude * Math.sin(direction);
    
        return {
            magnitude: Math.abs(magnitude),
            direction: direction,
            accelerationX: accelerationX,
            accelerationY: accelerationY,
        };
    }

    /**
     * Υπολογίζει τις δυνάμεις που ασκούνται στο εκκρεμές σε μια δεδομένη χρονική στιγμή.
     *
     * @method calculateForces
     * @param {number} time - Ο χρόνος σε milliseconds.
     * @returns {Object} Ένα αντικείμενο που περιέχει τις συνιστώσες και τα μέτρα των δυνάμεων.
     *
     * @description
     * Η μέθοδος υπολογίζει τις δυνάμεις που ασκούνται στο εκκρεμές σε μια δεδομένη χρονική στιγμή, λαμβάνοντας υπόψη τη μάζα, την επιτάχυνση της βαρύτητας, το μήκος του σχοινιού, τη γωνία και την τάση.
     * Οι δυνάμεις περιλαμβάνουν το βάρος, την τάση και τη συνολική δύναμη.
     *
     * **Φυσικό υπόβαθρο:**
     * Οι δυνάμεις που ασκούνται στο εκκρεμές είναι το βάρος, που τραβάει τη μάζα προς τα κάτω, και η τάση του σχοινιού, που τραβάει τη μάζα προς το σημείο ανάρτησης.
     * Η συνολική δύναμη είναι το διανυσματικό άθροισμα του βάρους και της τάσης.
     *
     * **Μαθηματικό υπόβαθρο:**
     * - Βάρος: W = m * g
     * - Συνιστώσες βάρους: Wx = -W * sin(θ), Wy = -W * cos(θ)
     * - Τάση: T (υπολογίζεται από την calculateTension)
     * - Συνιστώσες τάσης: Tx = 0, Ty = T
     * - Συνολική δύναμη: Fx = Wx + Tx, Fy = Wy + Ty
     * - Μέτρο συνολικής δύναμης: |F| = sqrt(Fx^2 + Fy^2)
     * - Διεύθυνση συνολικής δύναμης: φ = atan2(Fy, Fx)
     *
     * **Δυνάμεις:**
     * - `totalForceX`: Η συνολική δύναμη στον άξονα x (εφαπτομένη).
     * - `totalForceY`: Η συνολική δύναμη στον άξονα y (ακτίνα).
     * - `weightX`: Η συνιστώσα x του βάρους.
     * - `weightY`: Η συνιστώσα y του βάρους.
     * - `weight`: Το μέτρο του βάρους.
     * - `tension`: Η τάση του σχοινιού.
     * - `totalForceMagnitude`: Το μέτρο της συνολικής δύναμης.
     * - `totalForceDirection`: Η διεύθυνση της συνολικής δύναμης σε ακτινια.
     *
     * @example
     * const forces = pendulum.calculateForces(1000); // Υπολογισμός δυνάμεων σε 1 δευτερόλεπτο
     * console.log(forces);
     */
    calculateForces(time) {
        /*## Περίπτωση: Μάζα στη δεξιά θέση από τη θέση ισορροπίας

        *   **Θέση:** Η μάζα βρίσκεται στη δεξιά πλευρά της κατακόρυφης θέσης ισορροπίας. Αυτό σημαίνει ότι η γωνία (θ) είναι θετική.

        *   **Δυνάμεις:**
            *   **Βάρος (W):** Το βάρος W κατευθύνεται πάντα προς τα κάτω.
            *   **Τάση (T):** Η τάση T κατευθύνεται κατά μήκος του σχοινιού, προς το σημείο ανάρτησης.
            *   **Συνολική δύναμη (F):** Η συνολική δύναμη F είναι το διανυσματικό άθροισμα του βάρους W και της τάσης T.

        *   **Άξονες:**
            *   **Άξονας x (εφαπτομένη):** Ο άξονας x είναι εφαπτόμενος στην κυκλική τροχιά, με θετική φορά αντίθετη των δεικτών του ρολογιού.
            *   **Άξονας y (ακτίνα):** Ο άξονας y είναι κατά μήκος της ακτίνας, με θετική φορά προς το κέντρο του κύκλου.

        *   **Συνιστώσες δυνάμεων:**
            *   **Βάρος:**
                *   Συνιστώσα x: Wx = -W * sin(θ) (αρνητική, γιατί η φορά είναι αντίθετη από τη θετική φορά του άξονα x)
                *   Συνιστώσα y: Wy = -W * cos(θ) (αρνητική, γιατί η φορά είναι αντίθετη από τη θετική φορά του άξονα y)
            *   **Τάση:**
                *   Συνιστώσα x: Tx = 0 (η τάση δεν έχει συνιστώσα στον άξονα x)
                *   Συνιστώσα y: Ty = T (η τάση κατευθύνεται μόνο κατά μήκος του άξονα y)

        *   **Συνολική δύναμη:**
            *   Συνιστώσα x: Fx = Wx + Tx = -W * sin(θ)
            *   Συνιστώσα y: Fy = Wy + Ty = -W * cos(θ) + T

        *   **Κατεύθυνση συνολικής δύναμης:**
            *   Η συνολική δύναμη F θα έχει μια γωνία που θα είναι μεταξύ 0 και -90 μοιρών.
            *   Αυτό συμβαίνει γιατί η συνιστώσα x (Fx) είναι αρνητική (προς τα αριστερά) και η συνιστώσα y (Fy) μπορεί να είναι είτε θετική (προς τα πάνω) είτε αρνητική (προς τα κάτω), ανάλογα με τη σχέση μεταξύ της τάσης T και του βάρους W.

        ## Σύνοψη

        Όταν η μάζα βρίσκεται στη δεξιά θέση από τη θέση ισορροπίας, η συνολική δύναμη θα έχει κατεύθυνση προς τα πάνω και αριστερά, με μια γωνία μεταξύ 0 και -90 μοιρών. Αυτό συμβαίνει γιατί η τάση "τραβάει" τη μάζα προς το κέντρο του κύκλου, ενώ το βάρος την "τραβάει" προς τα κάτω. Η συνισταμένη αυτών των δύο δυνάμεων έχει την παραπάνω κατεύθυνση.*/
        const m = this.options.mass;
        const g = this.options.gravity;
        const L = this.options.ropeLength;
        const angleRad = this.calculateAngle(time); // Υπολογίζουμε τη γωνία σε ακτίνια
        const T = this.calculateTension(time); // Υπολογισμός τάσης

        const weight = m * g;

        // Υπολογίζουμε τις συνιστώσες του βάρους ως προς τους νέους άξονες
        const weightR = -weight * Math.cos(angleRad); // Ακτινική συνιστώσα
        const weightT = -weight * Math.sin(angleRad); // Εφαπτομενική συνιστώσα

        // Η τάση έχει πάντα κατεύθυνση προς το κέντρο του κύκλου, δηλαδή κατά μήκος της ακτίνας
        const tensionR = T; // Ακτινική συνιστώσα
        const tensionT = 0; // Εφαπτομενική συνιστώσα

        const totalForceR = tensionR + weightR; // Συνολική δύναμη στον άξονα R (ακτινική)
        const totalForceT = tensionT + weightT; // Συνολική δύναμη στον άξονα T (εφαπτομενική)

        const totalForceMagnitude = Math.sqrt(totalForceT * totalForceT + totalForceR * totalForceR); // Μέτρο της συνολικής δύναμης
        //Μετασχηματισμος στο ΧΥ συστημα του καμβα (θετικη Υ προς τα πανω, θετικη Χ προς τα δεξια )
        const phi = angleRad; 
        const totalForceY = totalForceR * Math.cos(phi) + totalForceT * Math.sin(phi);
        const totalForceX = totalForceR * Math.sin(phi) - totalForceT * Math.cos(phi);
        let totalForceDirection = Math.atan2(totalForceY, -totalForceX);
        // Καρτεσιανές συνιστώσες τάσης
        const tensionY = tensionR * Math.cos(phi);
        const tensionX = tensionR * Math.sin(phi);
        const tensionDirection = Math.atan2(tensionY, -tensionX);
        // Μετασχηματισμός στο ΧΥ συστημα του καμβα (θετικη Υ προς τα πανω, θετικη Χ προς τα δεξια )
        const weightY = weightR * Math.cos(phi) + weightT * Math.sin(phi);
        const weightX = weightR * Math.sin(phi) - weightT * Math.cos(phi);
        const weightDirection = Math.atan2(weightY, -weightX);
        

//totalForceDirection < 0 ? totalForceDirection -= Math.PI / 2 : totalForceDirection;
        return {
            //totalForceXMagnitude: totalForceX,
            //totalForceXDirection: totalForceDirection, // Η κατεύθυνση του totalForceX είναι πάντα 0 ή 180 μοίρες

            //totalForceYMagnitude: totalForceY,
            //totalForceYDirection: Math.atan2(0, totalForceY), // Η κατεύθυνση του totalForceY είναι πάντα 90 ή -90 μοίρες

            //weightXMagnitude: weightR,
            //weightXDirection: Math.atan2(weightX, 0), // Η κατεύθυνση του weightX είναι πάντα 0 ή 180 μοίρες

            //weightYMagnitude: weightR,
            //weightYDirection: Math.atan2(0, weightY), // Η κατεύθυνση του weightY είναι πάντα 90 ή -90 μοίρες

            weightMagnitude: weight,
            weightDirection: weightDirection, // Η κατεύθυνση του weight

            tensionMagnitude: T,
            tensionDirection:tensionDirection, // Η κατεύθυνση του tension είναι πάντα 0 ή 180 μοίρες

            totalForceMagnitude: totalForceMagnitude, // Προσθέτουμε το μέτρο της συνολικής δύναμης
            totalForceDirection: totalForceDirection, // Προσθέτουμε τη διεύθυνση της συνολικής δύναμης
        };
    }

    /**
     * Υπολογίζει την τάση του σχοινιού του εκκρεμούς σε μια δεδομένη χρονική στιγμή.
     *
     * @method calculateTension
     * @param {number} time - Ο χρόνος σε milliseconds.
     * @returns {number} Η τάση του σχοινιού σε Newtons.
     *
     * @description
     * Η μέθοδος υπολογίζει την τάση του σχοινιού του εκκρεμούς σε μια δεδομένη χρονική στιγμή, λαμβάνοντας υπόψη τη μάζα, την επιτάχυνση της βαρύτητας, το μήκος του σχοινιού, τη γωνία και τη γωνιακή ταχύτητα.
     * Η τάση είναι η δύναμη που ασκείται από το σχοινί στη μάζα.
     *
     * **Φυσικό υπόβαθρο:**
     * Η τάση του σχοινιού εξαρτάται από το βάρος της μάζας, τη γωνία του εκκρεμούς και τη γωνιακή ταχύτητα.
     * Όταν η μάζα βρίσκεται στο χαμηλότερο σημείο της τροχιάς της, η τάση είναι μεγαλύτερη από το βάρος της.
     * Όταν η μάζα βρίσκεται στο υψηλότερο σημείο της τροχιάς της, η τάση είναι μικρότερη από το βάρος της.
     *
     * **Μαθηματικό υπόβαθρο:**
     * Η τάση (T) υπολογίζεται από τον τύπο:
     * T = m * g * cos(θ) + m * L * ω^2
     * Όπου:
     * m: μάζα της μάζας σε kg
     * g: επιτάχυνση βαρύτητας σε m/s²
     * θ: γωνία του εκκρεμούς σε ακτίνια
     * L: μήκος του σχοινιού σε μέτρα (ή μονάδες μήκους που χρησιμοποιούνται στην προσομοίωση)
     * ω: γωνιακή ταχύτητα σε rad/s
     *
     * @example
     * const tension = pendulum.calculateTension(1000); // Υπολογισμός τάσης σε 1 δευτερόλεπτο
     * console.log(tension);
     */
    calculateTension(time) {
        const m = this.options.mass;
        const g = this.options.gravity;
        const L = this.options.ropeLength;
        const angleRad = this.calculateAngle(time); // Υπολογίζουμε τη γωνία σε ακτίνια
        const omega = this.calculateAngularVelocity(time); // Υπολογίζουμε τη γωνιακή ταχύτητα
    
        return m * g * Math.cos(angleRad) + m * L * omega * omega;
    }

    /**
     * Υπολογίζει την κινητική ενέργεια της μάζας του εκκρεμούς σε μια δεδομένη χρονική στιγμή.
     *
     * @method calculateKineticEnergy
     * @param {number} time - Ο χρόνος σε milliseconds.
     * @returns {number} Η κινητική ενέργεια σε Joules.
     *
     * @description
     * Η μέθοδος υπολογίζει την κινητική ενέργεια της μάζας του εκκρεμούς σε μια δεδομένη χρονική στιγμή, λαμβάνοντας υπόψη τη γραμμική ταχύτητα και τη μάζα.
     * Η κινητική ενέργεια είναι η ενέργεια που έχει η μάζα λόγω της κίνησής της.
     *
     * **Φυσικό υπόβαθρο:**
     * Η κινητική ενέργεια της μάζας του εκκρεμούς εξαρτάται από τη γραμμική ταχύτητα και τη μάζα.
     * Όσο μεγαλύτερη είναι η γραμμική ταχύτητα ή η μάζα, τόσο μεγαλύτερη είναι η κινητική ενέργεια.
     *
     * **Μαθηματικό υπόβαθρο:**
     * Η κινητική ενέργεια (K) υπολογίζεται από τον τύπο:
     * K = 1/2 * m * v^2
     * Όπου:
     * m: μάζα της μάζας σε kg
     * v: γραμμική ταχύτητα σε m/s
     *
     * @example
     * const kineticEnergy = pendulum.calculateKineticEnergy(1000); // Υπολογισμός κινητικής ενέργειας σε 1 δευτερόλεπτο
     * console.log(kineticEnergy);
     */
    calculateKineticEnergy(time) {
        // Υπολογίζουμε την κινητική ενέργεια
        const linearVelocity = this.calculateLinearVelocity(time).magnitude;
        const m = this.options.mass;
        return 0.5 * m * linearVelocity * linearVelocity;
    }

    /**
     * Υπολογίζει τη δυναμική ενέργεια της μάζας του εκκρεμούς σε μια δεδομένη χρονική στιγμή.
     *
     * @method calculatePotentialEnergy
     * @param {number} time - Ο χρόνος σε milliseconds.
     * @returns {number} Η δυναμική ενέργεια σε Joules.
     *
     * @description
     * Η μέθοδος υπολογίζει τη δυναμική ενέργεια της μάζας του εκκρεμούς σε μια δεδομένη χρονική στιγμή, λαμβάνοντας υπόψη τη γωνία, τη μάζα, την επιτάχυνση της βαρύτητας και το μήκος του σχοινιού.
     * Η δυναμική ενέργεια είναι η ενέργεια που έχει η μάζα λόγω της θέσης της στο πεδίο βαρύτητας.
     *
     * **Φυσικό υπόβαθρο:**
     * Η δυναμική ενέργεια της μάζας του εκκρεμούς εξαρτάται από το ύψος της μάζας σε σχέση με ένα σημείο αναφοράς (συνήθως το χαμηλότερο σημείο της τροχιάς).
     * Όσο μεγαλύτερο είναι το ύψος, τόσο μεγαλύτερη είναι η δυναμική ενέργεια.
     *
     * **Μαθηματικό υπόβαθρο:**
     * Η δυναμική ενέργεια (U) υπολογίζεται από τον τύπο:
     * U = m * g * h
     * Όπου:
     * m: μάζα της μάζας σε kg
     * g: επιτάχυνση βαρύτητας σε m/s²
     * h: ύψος της μάζας σε μέτρα (ή μονάδες μήκους που χρησιμοποιούνται στην προσομοίωση)
     *
     * Το ύψος (h) υπολογίζεται από τον τύπο:
     * h = L - L * cos(θ)
     * Όπου:
     * L: μήκος του σχοινιού σε μέτρα (ή μονάδες μήκους που χρησιμοποιούνται στην προσομοίωση)
     * θ: γωνία του εκκρεμούς σε ακτίνια
     *
     * @example
     * const potentialEnergy = pendulum.calculatePotentialEnergy(1000); // Υπολογισμός δυναμικής ενέργειας σε 1 δευτερόλεπτο
     * console.log(potentialEnergy);
     */
    calculatePotentialEnergy(time) {
        // Υπολογίζουμε τη δυναμική ενέργεια
        const angleRad = this.calculateAngle(time * 1000); // Υπολογίζουμε τη γωνία σε ακτίνια
        const m = this.options.mass;
        const g = this.options.gravity;
        const L = this.options.ropeLength;
        const h = L - L * Math.cos(angleRad); // Υψόμετρο
        return m * g * h;
    }

}

export {Pendulum};