import { Chart } from './chart.js';
/*
Αναλυτική εξήγηση των μεταβλητών

...this.options: 
Χρησιμοποιείται ο τελεστής spread (...) για να αντιγράψει τις ιδιότητες του αντικειμένου options 
(που περιέχει τις επιλογές που δίνει ο χρήστης) στο αντικείμενο this.options. 
Αυτό εξασφαλίζει ότι οι προεπιλεγμένες τιμές που έχουν οριστεί στην κλάση Widget 
(από την οποία κληρονομεί η FunctionPlot) διατηρούνται.

lineColor: 
Καθορίζει το χρώμα της γραμμής. 
Αν ο χρήστης δεν δώσει χρώμα, θα χρησιμοποιηθεί το μπλε ('blue').

lineWidth: 
Καθορίζει το πάχος της γραμμής σε pixels. 
Αν ο χρήστης δεν δώσει πάχος, θα χρησιμοποιηθεί το 2.

points: 
Ένας πίνακας που περιέχει τα σημεία δεδομένων που θα χρησιμοποιηθούν για τη σχεδίαση της γραμμής. 
Κάθε σημείο μπορεί να είναι ένα αντικείμενο με ιδιότητες x και y (π.χ. { x: 1, y: 2 }) 
ή ένας πίνακας με δύο στοιχεία, την τιμή x και την τιμή y (π.χ. [1, 2]). 
Αν ο χρήστης δεν δώσει δεδομένα, θα χρησιμοποιηθεί ένας άδειος πίνακας ([]).

func: 
Μια συνάρτηση JavaScript που ορίζει τη μαθηματική συνάρτηση που θα σχεδιαστεί. 
Αυτή η συνάρτηση παίρνει μια τιμή x ως όρισμα και επιστρέφει την αντίστοιχη τιμή y. 
Αν ο χρήστης δεν δώσει συνάρτηση, η γραμμή θα σχεδιαστεί με βάση τα σημεία δεδομένων 
που παρέχονται στο points, χρησιμοποιώντας γραμμική παρεμβολή μεταξύ των σημείων.

discontinuityThreshold: 
Ένα κατώφλι που καθορίζει πότε μια αλλαγή στην τιμή y μεταξύ δύο διαδοχικών σημείων 
θεωρείται ασυνέχεια. Αν η διαφορά των τιμών y είναι μεγαλύτερη από αυτό το κατώφλι, 
η γραμμή θα "σπάσει" στο σημείο αυτό, δημιουργώντας την αίσθηση ασυνέχειας. 
Η τιμή είναι σε pixels.

interpolationThreshold: 
Ένα κατώφλι που καθορίζει πότε θα χρησιμοποιηθεί η παρεμβολή για τη δημιουργία ενδιάμεσων σημείων. 
Αν η απόσταση μεταξύ δύο διαδοχικών σημείων είναι μεγαλύτερη από αυτό το κατώφλι, 
θα υπολογιστούν ενδιάμεσα σημεία για να δημιουργηθεί μια πιο ομαλή γραμμή. 
Η τιμή είναι σε pixels.

interpolationPoints: 
Ο αριθμός των ενδιάμεσων σημείων που θα υπολογιστούν μεταξύ δύο διαδοχικών σημείων, 
όταν χρησιμοποιείται η παρεμβολή.
*/
class FunctionPlot extends Chart {
    constructor(options) {
        super(options);

        this.options = {
            ...this.options, // Κρατάμε τις προεπιλεγμένες τιμές από την κλάση Widget
            lineColor: options.lineColor || 'blue', // Χρώμα γραμμής, προεπιλογή μπλε
            lineWidth: options.lineWidth || 2, // Πάχος γραμμής, προεπιλογή 2 pixels
            points: options.data || [], // Σύνολο σημείων δεδομένων, προεπιλογή άδειος πίνακας
            func: options.func || null, // Συνάρτηση για τον υπολογισμό των y, προεπιλογή null (δεν υπάρχει συνάρτηση)
            discontinuityThreshold: options.discontinuityThreshold || 10, // Κατώφλι για ασυνέχειες (απόσταση μεταξύ σημείων), προεπιλογή 10 pixels
            interpolationThreshold: options.interpolationThreshold || 1, // Κατώφλι για παρεμβολή (απόσταση μεταξύ σημείων), προεπιλογή 1 pixel
            interpolationPoints: options.interpolationPoints || 5, // Αριθμός ενδιάμεσων σημείων για παρεμβολή, προεπιλογή 5
        };

        if (Array.isArray(this.options.points) && this.options.points.length > 0 && typeof this.options.points[0] === 'number') {
            this.options.points = this.convertData(this.options.points);
        }

        this.graph = this.createGraph(this.options);
        this.add(this.graph);
    }

    convertData(array) {
        const result = [];
        for (let i = 0; i < array.length; i += 2) {
            result.push({ x: array[i], y: array[i + 1] });
        }
        return result;
    }

    createGraph(config) {
        if (this.graph) {
            this.graph.destroy();
        }

        let graph = new Konva.Group({
            x: config.x,
            y: config.y,
        });

        const data = config.points.sort((a, b) => a.x - b.x); // Ταξινόμηση δεδομένων
        let points = [];
        let len = data.length;
        let ratioX = config.majorScaleXWidth / config.majorScaleXUnit;
        let ratioY = config.majorScaleYWidth / config.majorScaleYUnit;

        for (let i = 0; i < len - 1; i++) {
            let x = config.originOffsetX + ratioX * data[i].x;
            let y = config.originOffsetY - ratioY * data[i].y;
            let nextX = config.originOffsetX + ratioX * data[i+1].x;
            let nextY = config.originOffsetY - ratioY * data[i+1].y;

            if (x >= 0 && x <= config.width && y >= 0 && y <= config.height && nextX >= 0 && nextX <= config.width && nextY >=0 && nextY <= config.height) {
                points.push(x);
                points.push(y);
                

                const distance = Math.sqrt((nextX - x) ** 2 + (nextY - y) ** 2); // Υπολογίζουμε την απόσταση μεταξύ των σημείων σε px

                if (distance > config.interpolationThreshold) {
                    const interpolatedPoints = [];

                    if (config.func) { // Χρήση της παρεχόμενης συνάρτησης
                        for (let j = 1; j <= config.interpolationPoints; j++) {
                            const originalX = data[i].x + (data[i + 1].x - data[i].x) * (j / (config.interpolationPoints + 1)); // Χρήση αρχικών τιμών x
                            const newY = config.originOffsetY - ratioY * config.func(originalX); // Υπολογισμός του y με βάση τη συνάρτηση και κλιμακωση
                            const newX = config.originOffsetX  + ratioX * originalX; // Κλιμάκωση του x

                            interpolatedPoints.push(newX);
                            interpolatedPoints.push(newY);
                        }
                    } else { // Γραμμική παρεμβολή
                        for (let j = 1; j <= config.interpolationPoints; j++) {
                            const originalX = data[i].x + (data[i + 1].x - data[i].x) * (j / (config.interpolationPoints + 1)); //Χρηση αρχικων τιμων x
                            const newY = config.originOffsetY  - ratioY * (data[i].y + (data[i + 1].y - data[i].y) * (j / (config.interpolationPoints + 1))); //Κλιμακωση του y
                            const newX = config.originOffsetX + ratioX * originalX; //Κλιμακωση του x
                            interpolatedPoints.push(newX);
                            interpolatedPoints.push(newY);
                        }
                    }
                    points.push(...interpolatedPoints);
                }
                points.push(nextX);
                points.push(nextY);

                if (Math.abs(data[i + 1].y - data[i].y) * ratioY > config.discontinuityThreshold) {
                    graph.add(new Konva.Line({
                        points: points,
                        stroke: config.lineColor,
                        strokeWidth: config.lineWidth,
                        lineCap: 'round',
                        lineJoin: 'round',
                        tension: 0.5,
                    }));
                    points = [];
                }
            
        }
    }

       /* if (points.length > 0) {
            let x = config.originOffsetX + ratioX * data[len-1].x;
            let y = config.originOffsetY - ratioY * data[len-1].y;
            if (x >= 0 && x <= config.width && y >= 0 && y <= config.height) {
                points.push(x);
                points.push(y);
                graph.add(new Konva.Line({
                    points: points,
                    stroke: config.lineColor,
                    strokeWidth: config.lineWidth,
                    lineCap: 'round',
                    lineJoin: 'round',
                }));
            }
        }*/

        graph.width(graph.getClientRect().width);
        graph.height(graph.getClientRect().height);

        return graph;
    }

    setData(data) {
        if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'number') {
            data = this.convertData(data);
        }
        this.options.points = data;
        this.graph = this.createGraph(this.options);
        this.add(this.graph);
    }

    removeData() {
        this.options.points = [];
        this.graph = this.createGraph(this.options);
        this.add(this.graph);
    }
}

export { FunctionPlot };