/**
 * @class Vector
 * @classdesc Μια κλάση που παρέχει στατικές μεθόδους για μαθηματικές πράξεις με δισδιάστατα διανύσματα.
 * Τα διανύσματα αναπαρίστανται ως αντικείμενα {x: number, y: number} με αρχή το (0, 0).
 *
 * @example
 * const vec1 = Vector.create(1, 2);
 * const vec2 = Vector.create(3, 4);
 * const sum = Vector.add(vec1, vec2);
 * console.log(sum); // { x: 4, y: 6 }
 *
 * @mathematical_background
 * Ένα διάνυσμα είναι ένα μαθηματικό αντικείμενο που έχει μέγεθος και κατεύθυνση.
 * Στο δισδιάστατο χώρο, ένα διάνυσμα μπορεί να αναπαρασταθεί με δύο συντεταγμένες (x, y),
 * που υποδεικνύουν το σημείο στο οποίο καταλήγει το διάνυσμα, με αρχή το (0, 0).
 *
 * @physical_background
 * Στη φυσική, τα διανύσματα χρησιμοποιούνται για την αναπαράσταση φυσικών μεγεθών που έχουν μέγεθος και κατεύθυνση,
 * όπως η ταχύτητα, η δύναμη και η επιτάχυνση.
 */
class Vector {
    /**
     * Δημιουργεί ένα νέο διάνυσμα.
     * @param {number} [x=0] - Η x συντεταγμένη του διανύσματος.
     * @param {number} [y=0] - Η y συντεταγμένη του διανύσματος.
     * @returns {{x: number, y: number}} - Το νέο διάνυσμα.
     */
    static create(x = 0, y = 0) {
        return { x: x, y: y };
    }

    /**
     * Δημιουργεί ένα αντίγραφο ενός διανύσματος.
     * @param {{x: number, y: number}} vector - Το διάνυσμα που θα αντιγραφεί.
     * @returns {{x: number, y: number}} - Το αντίγραφο του διανύσματος.
     */
    static clone(vector) {
        return { x: vector.x, y: vector.y };
    }

    /**
     * Υπολογίζει το μέγεθος (μήκος) ενός διανύσματος.
     * @param {{x: number, y: number}} vector - Το διάνυσμα.
     * @returns {number} - Το μέγεθος του διανύσματος.
     */
    static magnitude(vector) {
        return Math.sqrt(Vector.magnitudeSquared(vector));
    }

    /**
     * Υπολογίζει το τετράγωνο του μεγέθους ενός διανύσματος.
     * @param {{x: number, y: number}} vector - Το διάνυσμα.
     * @returns {number} - Το τετράγωνο του μεγέθους του διανύσματος.
     */
    static magnitudeSquared(vector) {
        return vector.x * vector.x + vector.y * vector.y;
    }

    /**
     * Περιστρέφει ένα διάνυσμα γύρω από το (0, 0) κατά μια συγκεκριμένη γωνία.
     * @param {{x: number, y: number}} vector - Το διάνυσμα που θα περιστραφεί.
     * @param {number} angle - Η γωνία περιστροφής σε ακτίνια.
     * @param {{x: number, y: number}} [output={}] - Το διάνυσμα εξόδου (προαιρετικό).
     * @returns {{x: number, y: number}} - Το περιστρεφόμενο διάνυσμα.
     */
    static rotate(vector, angle, output = {}) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x = vector.x * cos - vector.y * sin;
        output.y = vector.x * sin + vector.y * cos;
        output.x = x;
        return output;
    }

    /**
     * Περιστρέφει ένα διάνυσμα γύρω από ένα συγκεκριμένο σημείο κατά μια συγκεκριμένη γωνία.
     * @param {{x: number, y: number}} vector - Το διάνυσμα που θα περιστραφεί.
     * @param {number} angle - Η γωνία περιστροφής σε ακτίνια.
     * @param {{x: number, y: number}} point - Το σημείο περιστροφής.
     * @param {{x: number, y: number}} [output={}] - Το διάνυσμα εξόδου (προαιρετικό).
     * @returns {{x: number, y: number}} - Το περιστρεφόμενο διάνυσμα.
     */
    static rotateAbout(vector, angle, point, output = {}) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x = point.x + ((vector.x - point.x) * cos - (vector.y - point.y) * sin);
        output.y = point.y + ((vector.x - point.x) * sin + (vector.y - point.y) * cos);
        output.x = x;
        return output;
    }

    /**
     * Κανονικοποιεί ένα διάνυσμα (το μέγεθός του γίνεται 1).
     * @param {{x: number, y: number}} vector - Το διάνυσμα που θα κανονικοποιηθεί.
     * @returns {{x: number, y: number}} - Το κανονικοποιημένο διάνυσμα.
     */
    static normalise(vector) {
        const magnitude = Vector.magnitude(vector);
        if (magnitude === 0) {
            return { x: 0, y: 0 };
        }
        return { x: vector.x / magnitude, y: vector.y / magnitude };
    }

    /**
     * Υπολογίζει το εσωτερικό γινόμενο δύο διανυσμάτων.
     * @param {{x: number, y: number}} vectorA - Το πρώτο διάνυσμα.
     * @param {{x: number, y: number}} vectorB - Το δεύτερο διάνυσμα.
     * @returns {number} - Το εσωτερικό γινόμενο των δύο διανυσμάτων.
     */
    static dot(vectorA, vectorB) {
        return vectorA.x * vectorB.x + vectorA.y * vectorB.y;
    }

    /**
     * Υπολογίζει το εξωτερικό γινόμενο δύο διανυσμάτων.
     * @param {{x: number, y: number}} vectorA - Το πρώτο διάνυσμα.
     * @param {{x: number, y: number}} vectorB - Το δεύτερο διάνυσμα.
     * @returns {number} - Το εξωτερικό γινόμενο των δύο διανυσμάτων.
     */
    static cross(vectorA, vectorB) {
        return vectorA.x * vectorB.y - vectorA.y * vectorB.x;
    }

    /**
     * Υπολογίζει το εξωτερικό γινόμενο τριών διανυσμάτων.
     * @param {{x: number, y: number}} vectorA - Το πρώτο διάνυσμα.
     * @param {{x: number, y: number}} vectorB - Το δεύτερο διάνυσμα.
     * @param {{x: number, y: number}} vectorC - Το τρίτο διάνυσμα.
     * @returns {number} - Το εξωτερικό γινόμενο των τριών διανυσμάτων.
     */
    static cross3(vectorA, vectorB, vectorC) {
        return (vectorB.x - vectorA.x) * (vectorC.y - vectorA.y) - (vectorB.y - vectorA.y) * (vectorC.x - vectorA.x);
    }

     /**
     * Προσθέτει δύο διανύσματα.
     * @param {{x: number, y: number}} vectorA - Το πρώτο διάνυσμα.
     * @param {{x: number, y: number}} vectorB - Το δεύτερο διάνυσμα.
     * @param {{x: number, y: number}} [output={}] - Το διάνυσμα εξόδου (προαιρετικό).
     * @returns {{x: number, y: number}} - Το άθροισμα των δύο διανυσμάτων.
     *
     * @example
     * const vec1 = Vector.create(1, 2);
     * const vec2 = Vector.create(3, 4);
     * const sum = Vector.add(vec1, vec2);
     * console.log(sum); // { x: 4, y: 6 }
     */
     static add(vectorA, vectorB, output = {}) {
        output.x = vectorA.x + vectorB.x;
        output.y = vectorA.y + vectorB.y;
        return output;
    }

    /**
     * Αφαιρεί δύο διανύσματα.
     * @param {{x: number, y: number}} vectorA - Το πρώτο διάνυσμα.
     * @param {{x: number, y: number}} vectorB - Το δεύτερο διάνυσμα.
     * @param {{x: number, y: number}} [output={}] - Το διάνυσμα εξόδου (προαιρετικό).
     * @returns {{x: number, y: number}} - Η διαφορά των δύο διανυσμάτων.
     *
     * @example
     * const vec1 = Vector.create(5, 5);
     * const vec2 = Vector.create(2, 3);
     * const diff = Vector.sub(vec1, vec2);
     * console.log(diff); // { x: 3, y: 2 }
     */
    static sub(vectorA, vectorB, output = {}) {
        output.x = vectorA.x - vectorB.x;
        output.y = vectorA.y - vectorB.y;
        return output;
    }

    /**
     * Πολλαπλασιάζει ένα διάνυσμα με έναν βαθμωτό αριθμό.
     * @param {{x: number, y: number}} vector - Το διάνυσμα.
     * @param {number} scalar - Ο βαθμωτός αριθμός.
     * @returns {{x: number, y: number}} - Το γινόμενο του διανύσματος με τον βαθμωτό αριθμό.
     *
     * @example
     * const vec = Vector.create(2, 3);
     * const scaled = Vector.mult(vec, 2);
     * console.log(scaled); // { x: 4, y: 6 }
     */
    static mult(vector, scalar) {
        return { x: vector.x * scalar, y: vector.y * scalar };
    }

    /**
     * Διαιρεί ένα διάνυσμα με έναν βαθμωτό αριθμό.
     * @param {{x: number, y: number}} vector - Το διάνυσμα.
     * @param {number} scalar - Ο βαθμωτός αριθμός.
     * @returns {{x: number, y: number}} - Το πηλίκο του διανύσματος με τον βαθμωτό αριθμό.
     *
     * @example
     * const vec = Vector.create(4, 6);
     * const divided = Vector.div(vec, 2);
     * console.log(divided); // { x: 2, y: 3 }
     */
    static div(vector, scalar) {
        return { x: vector.x / scalar, y: vector.y / scalar };
    }

    /**
     * Επιστρέφει το κάθετο διάνυσμα.
     * @param {{x: number, y: number}} vector - Το διάνυσμα.
     * @param {boolean} [negate=false] - Εάν είναι true, επιστρέφει το κάθετο διάνυσμα στην αντίθετη κατεύθυνση.
     * @returns {{x: number, y: number}} - Το κάθετο διάνυσμα.
     *
     * @example
     * const vec = Vector.create(1, 2);
     * const perp = Vector.perp(vec);
     * console.log(perp); // { x: -2, y: 1 }
     */
    static perp(vector, negate = false) {
        const negateFactor = negate ? -1 : 1;
        return { x: negateFactor * -vector.y, y: negateFactor * vector.x };
    }

    /**
     * Αντιστρέφει την κατεύθυνση ενός διανύσματος.
     * @param {{x: number, y: number}} vector - Το διάνυσμα.
     * @returns {{x: number, y: number}} - Το αντίστροφο διάνυσμα.
     *
     * @example
     * const vec = Vector.create(1, 2);
     * const negated = Vector.neg(vec);
     * console.log(negated); // { x: -1, y: -2 }
     */
    static neg(vector) {
        return { x: -vector.x, y: -vector.y };
    }

    /**
     * Υπολογίζει τη γωνία μεταξύ δύο διανυσμάτων.
     * @param {{x: number, y: number}} vectorA - Το πρώτο διάνυσμα.
     * @param {{x: number, y: number}} vectorB - Το δεύτερο διάνυσμα.
     * @returns {number} - Η γωνία σε ακτίνια.
     *
     * @example
     * const vec1 = Vector.create(1, 0);
     * const vec2 = Vector.create(0, 1);
     * const angle = Vector.angle(vec1, vec2);
     * console.log(angle); // 1.5707963267948966 (περίπου π/2)
     */
    static angle(vectorA, vectorB) {
        return Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
    }

    /**
     * Υπολογίζει την προβολή ενός διανύσματος πάνω σε ένα άλλο.
     * @param {{x: number, y: number}} vector - Το διάνυσμα που θα προβληθεί.
     * @param {{x: number, y: number}} ontoVector - Το διάνυσμα πάνω στο οποίο θα γίνει η προβολή.
     * @returns {{x: number, y: number}} - Το διάνυσμα της προβολής.
     */
    static project(vector, ontoVector) {
        const dot = Vector.dot(vector, ontoVector);
        const magnitudeSquared = Vector.magnitudeSquared(ontoVector);
        if (magnitudeSquared === 0) {
            return { x: 0, y: 0 };
        }
        const scalar = dot / magnitudeSquared;
        return Vector.mult(ontoVector, scalar);
    }

    /**
     * Αυτή η συνάρτηση θα υπολογίζει την απόσταση μεταξύ των 
     * τελικών σημείων δύο διανυσμάτων.
     * @param {{x: number, y: number}} vectorA - Το πρώτο διάνυσμα.
     * @param {{x: number, y: number}} vectorB - Το δεύτερο διάνυσμα.
     * @returns {number} - Η απόσταση μεταξύ των δύο διανυσμάτων.
     */
    static distance(vectorA, vectorB) {
        const dx = vectorB.x - vectorA.x;
        const dy = vectorB.y - vectorA.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Υπολογίζει τη γωνία μεταξύ δύο διανυσμάτων.
     * @param {{x: number, y: number}} vectorA - Το πρώτο διάνυσμα.
     * @param {{x: number, y: number}} vectorB - Το δεύτερο διάνυσμα.
     * @returns {number} - Η γωνία σε ακτίνια.
     *
     * @example
     * const vec1 = Vector.create(1, 0);
     * const vec2 = Vector.create(1, 1);
     * const angle = Vector.angleBetween(vec1, vec2);
     * console.log(angle); // 0.7853981633974483 (περίπου π/4)
     */
    static angleBetween(vectorA, vectorB) {
        const dot = Vector.dot(vectorA, vectorB);
        const magnitudeA = Vector.magnitude(vectorA);
        const magnitudeB = Vector.magnitude(vectorB);
        if (magnitudeA === 0 || magnitudeB === 0) {
            return 0;
        }
        return Math.acos(dot / (magnitudeA * magnitudeB));
    }

    /**
     * Υπολογίζει τη γραμμική παρεμβολή μεταξύ δύο διανυσμάτων.
     * @param {{x: number, y: number}} vectorA - Το πρώτο διάνυσμα.
     * @param {{x: number, y: number}} vectorB - Το δεύτερο διάνυσμα.
     * @param {number} alpha - Ο παράγοντας παρεμβολής (0 <= alpha <= 1).
     * @returns {{x: number, y: number}} - Το παρεμβαλλόμενο διάνυσμα.
     *
     * @example
     * const vec1 = Vector.create(1, 2);
     * const vec2 = Vector.create(4, 5);
     * const lerped = Vector.lerp(vec1, vec2, 0.5);
     * console.log(lerped); // { x: 2.5, y: 3.5 }
     */
    static lerp(vectorA, vectorB, alpha) {
        const x = vectorA.x + (vectorB.x - vectorA.x) * alpha;
        const y = vectorA.y + (vectorB.y - vectorA.y) * alpha;
        return { x: x, y: y };
    }

    /**
     * Επιστρέφει ένα κανονικοποιημένο διάνυσμα που δείχνει την κατεύθυνση του αρχικού διανύσματος.
     * @param {{x: number, y: number}} vector - Το διάνυσμα για το οποίο θα υπολογιστεί η κατεύθυνση.
     * @returns {{x: number, y: number}} - Το κανονικοποιημένο διάνυσμα κατεύθυνσης.
     *
     * @example
     * const vec = Vector.create(3, 4);
     * const direction = Vector.direction(vec);
     * console.log(direction); // { x: 0.6, y: 0.8 }
     */
    static direction(vector) {
        return Vector.normalise(vector);
    }

    /**
     * Ελέγχει αν δύο διανύσματα είναι ίσα, με μια συγκεκριμένη ανοχή.
     * @param {{x: number, y: number}} vectorA - Το πρώτο διάνυσμα.
     * @param {{x: number, y: number}} vectorB - Το δεύτερο διάνυσμα.
     * @param {number} [tolerance=1e-6] - Η ανοχή για σφάλματα στρογγυλοποίησης.
     * @returns {boolean} - True αν τα διανύσματα είναι ίσα, false διαφορετικά.
     */
    static equals(vectorA, vectorB, tolerance = 1e-6) {
        if (Vector.magnitudeSquared(vectorA) === 0 && Vector.magnitudeSquared(vectorB) === 0) {
            return true; // Τα μηδενικά διανύσματα είναι ίσα
        }

        const magnitudeEquals = Math.abs(Vector.magnitude(vectorA) - Vector.magnitude(vectorB)) < tolerance;
        const directionEquals = Math.abs(Vector.angleBetween(vectorA, vectorB)) < tolerance;

        return magnitudeEquals && directionEquals;
    }

    /**
     * Υπολογίζει το αντικατοπτρισμένο διάνυσμα ενός διανύσματος ως προς ένα κανονικοποιημένο διάνυσμα κατεύθυνσης.
     * @param {{x: number, y: number}} vector - Το διάνυσμα που θα αντικατοπτριστεί.
     * @param {{x: number, y: number}} normal - Το κανονικοποιημένο διάνυσμα κατεύθυνσης.
     * @returns {{x: number, y: number}} - Το αντικατοπτρισμένο διάνυσμα.
     */
    static reflect(vector, normal) {
        /*Σκοπός της συνάρτησης `reflect`:

        Η συνάρτηση `reflect` υπολογίζει το αντικατοπτρισμένο διάνυσμα ενός αρχικού διανύσματος (`vector`) ως προς ένα κανονικοποιημένο διάνυσμα κατεύθυνσης (`normal`). Αυτό είναι ιδιαίτερα χρήσιμο σε προσομοιώσεις φυσικής, όπως η αντανάκλαση φωτός ή η πρόσκρουση αντικειμένων σε μια επιφάνεια.

        Μαθηματική εξήγηση:

        1. Εσωτερικό γινόμενο:
        - Η συνάρτηση ξεκινά υπολογίζοντας το εσωτερικό γινόμενο μεταξύ του `vector` και του `normal`. Το εσωτερικό γινόμενο μας δίνει μια μέτρηση του πόσο "παράλληλα" είναι τα δύο διανύσματα.
        - `dot = Vector.dot(vector, normal);`

        2. Προβολή:
        - Στη συνέχεια, υπολογίζουμε την προβολή του `vector` πάνω στο `normal`. Αυτή η προβολή μας δίνει ένα διάνυσμα που βρίσκεται στην κατεύθυνση του `normal` και έχει μέγεθος ίσο με το μήκος της προβολής του `vector` πάνω στο `normal`.
        - `projection = Vector.mult(normal, dot);`

        3. Αντικατοπτρισμός:
        - Για να υπολογίσουμε το αντικατοπτρισμένο διάνυσμα, αφαιρούμε δύο φορές την προβολή από το αρχικό διάνυσμα.
        - `reflectedVector = Vector.sub(vector, Vector.mult(normal, 2 * dot));`

        Η γωνία μεταξύ `vector` και `normal`:

        - Η γωνία μεταξύ του `vector` και του `normal` παίζει καθοριστικό ρόλο στον υπολογισμό του αντικατοπτρισμένου διανύσματος.
        - Αν η γωνία είναι 0, τότε το `vector` είναι παράλληλο με το `normal` και το αντικατοπτρισμένο διάνυσμα θα είναι το ίδιο με το αρχικό διάνυσμα (αλλά με αντίθετη κατεύθυνση).
        - Αν η γωνία είναι 90 μοίρες, τότε το `vector` είναι κάθετο στο `normal` και το αντικατοπτρισμένο διάνυσμα θα είναι το συμμετρικό του αρχικού διανύσματος ως προς το `normal`.
        - Η γωνία μεταξύ του `vector` και του `normal` καθορίζει την κατεύθυνση και το μέγεθος του αντικατοπτρισμένου διανύσματος.

        Παράδειγμα:

        Ας υποθέσουμε ότι έχουμε ένα διάνυσμα `vector` που αναπαριστά την κατεύθυνση μιας μπάλας που προσκρούει σε έναν τοίχο. Το διάνυσμα `normal` αναπαριστά την κανονική κατεύθυνση του τοίχου. Η συνάρτηση `reflect` θα μας δώσει το διάνυσμα που αναπαριστά την κατεύθυνση της μπάλας μετά την πρόσκρουση.

        ```javascript
        const vector = { x: 1, y: -1 }; // Η κατεύθυνση της μπάλας
        const normal = { x: 0, y: 1 }; // Η κανονική κατεύθυνση του τοίχου

        const reflectedVector = Vector.reflect(vector, normal);
        console.log(reflectedVector); // { x: 1, y: 1 }

        */
        const dot = Vector.dot(vector, normal);
        return Vector.sub(vector, Vector.mult(normal, 2 * dot));
    }


}
export { Vector };