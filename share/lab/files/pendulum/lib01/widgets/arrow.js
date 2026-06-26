/*
Φυσικά, εδώ είναι η λίστα μεθόδων με υπογραφές και σύντομη περιγραφή για την κλάση `Arrow`:

**Ιδιότητες `options`:**

* `startX: number` - Αρχική συντεταγμένη X.
* `startY: number` - Αρχική συντεταγμένη Y.
* `endX: number` - Τελική συντεταγμένη X.
* `endY: number` - Τελική συντεταγμένη Y.
* `arrowType: string` - Τύπος βέλους ('standard', 'curved', 'doubleHeaded', 'dashed', 'roundedHead', 'squareStart').
* `curveAmount: number` - Μέγεθος καμπύλης για καμπύλα βέλη.
* `stroke: string` - Χρώμα περιγράμματος.
* `strokeWidth: number` - Πάχος περιγράμματος.
* `fill: string` - Χρώμα πλήρωσης.
* `lineCap: string` - Στυλ άκρων γραμμής.
* `lineJoin: string` - Στυλ γωνιών γραμμής.
* `dash: number[]` - Μοτίβο διακεκομμένης γραμμής.
* `bodyWidth: number` - Πάχος σώματος βέλους.
* `headWidth: number` - Πλάτος κεφαλιού βέλους.
* `headLength: number` - Μήκος κεφαλιού βέλους.
* `shadowColor: string` - Χρώμα σκιάς.
* `shadowBlur: number` - Θάμπωμα σκιάς.
* `shadowOffsetX: number` - Οριζόντια μετατόπιση σκιάς.
* `shadowOffsetY: number` - Κάθετη μετατόπιση σκιάς.
* `shadowOpacity: number` - Διαφάνεια σκιάς.
* `direction: number` - Κατεύθυνση βέλους σε ακτίνια.
* `magnitude: number` - Μέγεθος βέλους.
* `roundRadius: number` - Ακτίνα στρογγυλοποίησης για στρογγυλεμένο κεφάλι.
* `vector: Vector` - Το διάνυσμα του βέλους.
* `name: string` - Όνομα widget.
* `id: number` - Id widget.

**Μέθοδοι:**

* `constructor(config: Object)` - Κατασκευαστής βέλους.
* `setVector(): void` - Υπολογίζει και ορίζει το διάνυσμα, το μέγεθος και την κατεύθυνση του βέλους.
* `setColor(stroke: string, fill: string): void` - Ορίζει χρώμα βέλους.
* `setDirection(direction: number): void` - Ορίζει κατεύθυνση βέλους.
* `setMagnitude(magnitude: number): void` - Ορίζει μέγεθος βέλους.
* `setStartPosition(startX: number, startY: number): void` - Ορίζει αρχική θέση βέλους.
* `setEndPosition(endX: number, endY: number): void` - Ορίζει τελική θέση βέλους.
* `setStrokeWidth(strokeWidth: number): void` - Ορίζει πάχος περιγράμματος.
* `setBodyWidth(bodyWidth: number): void` - Ορίζει πάχος σώματος.
* `setHeadWidth(headWidth: number): void` - Ορίζει πλάτος κεφαλιού.
* `setHeadLength(headLength: number): void` - Ορίζει μήκος κεφαλιού.
* `setCurveAmount(curveAmount: number): void` - Ορίζει μέγεθος καμπύλης.
* `setDashPattern(dashPattern: number[]): void` - Ορίζει μοτίβο διακεκομμένης γραμμής.
* `setRoundRadius(roundRadius: number): void` - Ορίζει ακτίνα στρογγυλοποίησης.
* `setShadow(shadowConfig: Object): void` - Ορίζει ρυθμίσεις σκιάς.
* `setLineCap(lineCap: string): void` - Ορίζει στυλ άκρων γραμμής.
* `setLineJoin(lineJoin: string): void` - Ορίζει στυλ γωνιών γραμμής.
* `setArrowType(arrowType: string): void` - Ορίζει τύπο βέλους (standard, curved, doubleHeaded, dashed, roundedHead, squareStart ).
* `update(): void` - Ανανεώνει οπτική αναπαράσταση βέλους.

*/

import { Vector } from '../math/vector.js';
import { Widget } from './widget.js';

/**
 * @class Arrow
 * @extends Widget
 *
 * Κλάση για τη δημιουργία και διαχείριση βελών σε ένα γραφικό περιβάλλον.
 *
 * Η κλάση Arrow επεκτείνει την κλάση Widget και παρέχει λειτουργικότητα για τη δημιουργία και
 * διαχείριση βελών με διάφορα στυλ και ιδιότητες. Υποστηρίζει την αλλαγή του σχήματος,
 * του μεγέθους, της κατεύθυνσης, της θέσης και άλλων οπτικών χαρακτηριστικών του βέλους.
 *
 * @example
 * // Δημιουργία ενός νέου βέλους
 * const arrow = new Arrow({
 * startX: 100,
 * startY: 100,
 * endX: 200,
 * endY: 200,
 * stroke: 'red',
 * fill: 'pink',
 * arrowType: 'curved',
 * curveAmount: 50,
 * });
 */
class Arrow extends Widget {
  /**
 * @constructor
 * Δημιουργεί ένα νέο αντικείμενο Arrow.
 *
 * @param {object} config - Ένα αντικείμενο διαμόρφωσης που περιέχει τις ιδιότητες του βέλους.
 * @param {number} [config.startX=0] - Η αρχική συντεταγμένη X του βέλους.
 * @param {number} [config.startY=0] - Η αρχική συντεταγμένη Y του βέλους.
 * @param {number} [config.endX] - Η τελική συντεταγμένη X του βέλους.
 * @param {number} [config.endY] - Η τελική συντεταγμένη Y του βέλους.
 * @param {string} [config.arrowType='standard'] - Ο τύπος του βέλους (π.χ., 'standard', 'curved', 'doubleHeaded').
 * @param {number} [config.curveAmount=100] - Το μέγεθος της καμπύλης για τα καμπύλα βέλη.
 * @param {string} [config.stroke='black'] - Το χρώμα του περιγράμματος του βέλους.
 * @param {number} [config.strokeWidth=2] - Το πάχος του περιγράμματος του βέλους.
 * @param {string} [config.fill='black'] - Το χρώμα πλήρωσης του βέλους.
 * @param {string} [config.lineCap='round'] - Το στυλ των άκρων της γραμμής του βέλους.
 * @param {string} [config.lineJoin='round'] - Το στυλ των γωνιών της γραμμής του βέλους.
 * @param {number[]} [config.dash] - Το μοτίβο διακεκομμένης γραμμής για τα διακεκομμένα βέλη.
 * @param {number} [config.bodyWidth=10] - Το πάχος του σώματος του βέλους.
 * @param {number} [config.headWidth=15] - Το πλάτος του κεφαλιού του βέλους.
 * @param {number} [config.headLength=20] - Το μήκος του κεφαλιού του βέλους.
 * @param {string} [config.shadowColor] - Το χρώμα της σκιάς του βέλους.
 * @param {number} [config.shadowBlur] - Το θάμπωμα της σκιάς του βέλους.
 * @param {number} [config.shadowOffsetX] - Η οριζόντια μετατόπιση της σκιάς του βέλους.
 * @param {number} [config.shadowOffsetY] - Η κάθετη μετατόπιση της σκιάς του βέλους.
 * @param {number} [config.shadowOpacity] - Η διαφάνεια της σκιάς του βέλους.
 * @param {number} [config.direction] - Η κατεύθυνση του βέλους σε ακτίνια (radians).
 * @param {number} [config.magnitude] - Το μέγεθος του βέλους.
 * @param {number} [config.roundRadius] - Η ακτίνα στρογγυλοποίησης για τα βέλη με στρογγυλεμένο κεφάλι.
 */
  constructor(config) {
    super(config);
    this.options.name = "Arrow"+this.options.id; 
    this.options={
        ...this.config,
        startX: config.startX || 0,
        startY: config.startY || 0,
        endX: config.endX,
        endY: config.endY,
        arrowType: config.arrowType || 'standard',
        curveAmount: config.curveAmount || 100,
        stroke: config.stroke || 'black',
        strokeWidth: config.strokeWidth || 2,
        fill: config.fill || 'black',
        lineCap: config.lineCap || 'round',
        lineJoin: config.lineJoin || 'round',
        dash: config.dash,
        bodyWidth: config.bodyWidth || 10,
        headWidth: config.headWidth || 15,
        headLength: config.headLength || 20,
        shadowColor: config.shadowColor,
        shadowBlur: config.shadowBlur,
        shadowOffsetX: config.shadowOffsetX,
        shadowOffsetY: config.shadowOffsetY,
        shadowOpacity: config.shadowOpacity,
        direction: -config.direction,
        magnitude: config.magnitude,
        roundRadius: config.roundRadius,

    };

    this.path = new Konva.Path({
      data: '',
      stroke: this.options.stroke,
      strokeWidth: this.options.strokeWidth,
      fill: this.options.fill,
      lineCap: this.options.lineCap,
      lineJoin: this.options.lineJoin,
      dash: this.options.dash,
      shadowColor: this.options.shadowColor,
      shadowBlur: this.options.shadowBlur,
      shadowOffsetX: this.options.shadowOffsetX,
      shadowOffsetY: this.options.shadowOffsetY,
      shadowOpacity: this.options.shadowOpacity,
      
    });
    this.add(this.path);
    this.setVector();
  }

  /**
 * Υπολογίζει και ορίζει το διάνυσμα, το μέγεθος και την κατεύθυνση του βέλους.
 * 
 * Η θετικη κατευθυνση ειναι αντιθετα απο τους δεικτες του ρολογιού.
 *
 * Αυτή η μέθοδος υπολογίζει το διάνυσμα, το μέγεθος και την κατεύθυνση του βέλους με βάση τις
 * ιδιότητες `endX`, `endY`, `magnitude` και `direction` του αντικειμένου `options`.
 * Ενημερώνει τις ιδιότητες `vector`, `magnitude` και `direction` και στη συνέχεια
 * καλεί την μέθοδο `update` για να ανανεώσει την οπτική αναπαράσταση του βέλους.
 *
 * Αν παρέχονται οι ιδιότητες `endX` και `endY`, το διάνυσμα υπολογίζεται με βάση τις
 * συντεταγμένες της αρχικής και της τελικής θέσης του βέλους. Το μέγεθος και η κατεύθυνση
 * υπολογίζονται από το υπολογισμένο διάνυσμα.
 *
 * Αν παρέχονται οι ιδιότητες `magnitude` και `direction`, το διάνυσμα υπολογίζεται με βάση
 * αυτές τις ιδιότητες.
 *
 * Αν δεν παρέχονται οι ιδιότητες `endX`, `endY`, `magnitude` και `direction`, το μέγεθος
 * και η κατεύθυνση ορίζονται σε 0 και το διάνυσμα ορίζεται σε (0, 0).
 *
 * @example
 * // Παράδειγμα 1: Ορισμός διανύσματος με βάση τις συντεταγμένες αρχής και τέλους
 * const arrow1 = new Arrow({ startX: 10, startY: 20, endX: 50, endY: 60 });
 * arrow1.setVector(); // Υπολογισμός διανύσματος, μεγέθους και κατεύθυνσης
 * console.log(arrow1.options.vector); // {x: 40, y: 40}
 * console.log(arrow1.options.magnitude); // 56.57
 * console.log(arrow1.options.direction); // 0.785
 *
 * @example
 * // Παράδειγμα 2: Ορισμός διανύσματος με βάση το μέγεθος και την κατεύθυνση
 * const arrow2 = new Arrow({ magnitude: 100, direction: Math.PI / 2 });
 * arrow2.setVector(); // Υπολογισμός διανύσματος
 * console.log(arrow2.options.vector); // {x: 0, y: 100}
 *
 * @example
 * // Παράδειγμα 3: Ορισμός διανύσματος με μηδενικό μέγεθος και κατεύθυνση
 * const arrow3 = new Arrow({});
 * arrow3.setVector(); // Ορισμός διανύσματος, μεγέθους και κατεύθυνσης σε μηδέν
 * console.log(arrow3.options.vector); // {x: 0, y: 0}
 * console.log(arrow3.options.magnitude); // 0
 * console.log(arrow3.options.direction); // 0
 */
  setVector() {
    if (this.options.endX && this.options.endY) {
      this.options.vector = { x: this.options.endX - this.options.startX, y: this.options.endY - this.options.startY };
      this.options.magnitude = Vector.magnitude(this.options.vector);
      this.options.direction = Math.atan2(this.options.vector.y, this.options.vector.x);
    } else if (this.options.magnitude !== undefined && this.options.direction !== undefined) {
      this.options.vector = {
        x: this.options.magnitude * Math.cos(this.options.direction),
        y: this.options.magnitude * Math.sin(this.options.direction),
      };
    } else {
      this.options.magnitude = 0;
      this.options.direction = 0;
      this.options.vector = { x: 0, y: 0 };
    }
    this.update();
  }

  /**
   * Ορίζει το χρώμα του βέλους (περίγραμμα και πλήρωση).
   *
   * @param {string} stroke - Το χρώμα του περιγράμματος.
   * @param {string} fill - Το χρώμα πλήρωσης.
   *
   * @example
   * const arrow = new Arrow({});
   * arrow.setColor('blue', 'lightblue');
   * console.log(arrow.options.stroke); // 'blue'
   * console.log(arrow.options.fill); // 'lightblue'
   */
  setColor(stroke, fill) {
    this.options.stroke = stroke;
    this.options.fill = fill;
    this.path.stroke(stroke);
    this.path.fill(fill);
    this.path.draw();
  }

  /**
 * Ορίζει την κατεύθυνση του βέλους.
 *
 * Αυτή η μέθοδος ορίζει την κατεύθυνση του βέλους σε ακτίνια (radians).
 * Ενημερώνει την ιδιότητα `direction` του αντικειμένου `options`, υπολογίζει το
 * νέο διάνυσμα με βάση το μέγεθος και την κατεύθυνση, και στη συνέχεια καλεί
 * την μέθοδο `update` για να ανανεώσει την οπτική αναπαράσταση του βέλους.
 *
 * Η κατεύθυνση που παρέχεται αντιστρέφεται πριν αποθηκευτεί, λόγω της διαφοράς
 * στη φορά των γωνιών μεταξύ του μαθηματικού συστήματος συντεταγμένων και
 * του συστήματος συντεταγμένων του καμβά.
 *
 * @param {number} direction - Η νέα κατεύθυνση του βέλους σε ακτίνια (radians).
 *
 * @example
 * const arrow = new Arrow({ magnitude: 50 });
 * arrow.setDirection(Math.PI / 4); // Ορισμός κατεύθυνσης σε 45 μοίρες
 * console.log(arrow.options.direction); // -0.7853981633974483 (αντίστροφη τιμή)
 *
 * @example
 * arrow.setDirection(0); // Ορισμός κατεύθυνσης σε 0 μοίρες
 * console.log(arrow.options.direction); // 0
 */
  setDirection(direction) {
    this.options.direction = -direction;
    this.options.vector = {
      x: this.options.magnitude * Math.cos(this.options.direction),
      y: this.options.magnitude * Math.sin(this.options.direction),
    };
    this.update();
  }

  /**
 * Ορίζει το μέγεθος του βέλους.
 *
 * Αυτή η μέθοδος ορίζει το μέγεθος του βέλους.
 * Ενημερώνει την ιδιότητα `magnitude` του αντικειμένου `options`, υπολογίζει το
 * νέο διάνυσμα με βάση το μέγεθος και την κατεύθυνση, και στη συνέχεια καλεί
 * την μέθοδο `update` για να ανανεώσει την οπτική αναπαράσταση του βέλους.
 *
 * @param {number} magnitude - Το νέο μέγεθος του βέλους.
 *
 * @example
 * const arrow = new Arrow({ direction: Math.PI / 4 });
 * arrow.setMagnitude(100); // Ορισμός μεγέθους σε 100
 * console.log(arrow.options.magnitude); // 100
 *
 * @example
 * arrow.setMagnitude(0); // Ορισμός μεγέθους σε 0
 * console.log(arrow.options.magnitude); // 0
 */
  setMagnitude(magnitude) {
    this.options.magnitude = magnitude;
    this.options.vector = {
      x: this.options.magnitude * Math.cos(this.options.direction),
      y: this.options.magnitude * Math.sin(this.options.direction),
    };
    this.update();
  }

  /**
 * Ορίζει την αρχική θέση του βέλους.
 *
 * Αυτή η μέθοδος ορίζει τις συντεταγμένες της αρχικής θέσης του βέλους.
 * Ενημερώνει τις ιδιότητες `startX` και `startY` του αντικειμένου `options` και
 * στη συνέχεια καλεί την μέθοδο `update` για να ανανεώσει την οπτική
 * αναπαράσταση του βέλους με βάση τη νέα αρχική θέση.
 *
 * @param {number} startX - Η νέα συντεταγμένη X της αρχικής θέσης.
 * @param {number} startY - Η νέα συντεταγμένη Y της αρχικής θέσης.
 *
 * @example
 * const arrow = new Arrow({ endX: 100, endY: 100 });
 * arrow.setStartPosition(20, 30); // Ορισμός αρχικής θέσης σε (20, 30)
 * console.log(arrow.options.startX); // 20
 * console.log(arrow.options.startY); // 30
 *
 * @example
 * arrow.setStartPosition(0, 0); // Ορισμός αρχικής θέσης σε (0, 0)
 * console.log(arrow.options.startX); // 0
 * console.log(arrow.options.startY); // 0
 */
  setStartPosition(startX, startY) {
    this.options.startX = startX;
    this.options.startY = startY;
    this.update();
  }

  /**
 * Ορίζει την τελική θέση του βέλους.
 *
 * Αυτή η μέθοδος ορίζει τις συντεταγμένες της τελικής θέσης του βέλους.
 * Ενημερώνει τις ιδιότητες `endX` και `endY` του αντικειμένου `options` και
 * στη συνέχεια καλεί την μέθοδο `setVector` για να υπολογίσει το νέο διάνυσμα,
 * το μέγεθος και την κατεύθυνση με βάση τη νέα τελική θέση.
 *
 * @param {number} endX - Η νέα συντεταγμένη X της τελικής θέσης.
 * @param {number} endY - Η νέα συντεταγμένη Y της τελικής θέσης.
 *
 * @example
 * const arrow = new Arrow({ startX: 20, startY: 30 });
 * arrow.setEndPosition(100, 100); // Ορισμός τελικής θέσης σε (100, 100)
 * console.log(arrow.options.endX); // 100
 * console.log(arrow.options.endY); // 100
 *
 * @example
 * arrow.setEndPosition(0, 0); // Ορισμός τελικής θέσης σε (0, 0)
 * console.log(arrow.options.endX); // 0
 * console.log(arrow.options.endY); // 0
 */
  setEndPosition(endX, endY) {
    this.options.endX = endX;
    this.options.endY = endY;
    this.setVector(); // Κλήση της setVector για να υπολογιστούν τα νέα magnitude και direction
  }

  /**
 * Ορίζει το πάχος του περιγράμματος του βέλους.
 *
 * Αυτή η μέθοδος ορίζει το πάχος του περιγράμματος του βέλους.
 * Ενημερώνει την ιδιότητα `strokeWidth` του αντικειμένου `path` και
 * στη συνέχεια ενημερώνει την οπτική αναπαράσταση του βέλους.
 *
 * @param {number} strokeWidth - Το νέο πάχος του περιγράμματος.
 *
 * @example
 * const arrow = new Arrow({});
 * arrow.setStrokeWidth(3); // Ορισμός πάχους περιγράμματος σε 3
 * console.log(arrow.path.strokeWidth()); // 3
 *
 * @example
 * arrow.setStrokeWidth(1); // Ορισμός πάχους περιγράμματος σε 1
 * console.log(arrow.path.strokeWidth()); // 1
 */
  setStrokeWidth(strokeWidth) {
    this.path.strokeWidth(strokeWidth);
    //this.path.draw();
  }

  /**
 * Ορίζει το πάχος του σώματος του βέλους.
 *
 * Αυτή η μέθοδος ορίζει το πάχος του σώματος του βέλους.
 * Ενημερώνει την ιδιότητα `bodyWidth` του αντικειμένου `options` και
 * στη συνέχεια καλεί την μέθοδο `update` για να ανανεώσει την οπτική
 * αναπαράσταση του βέλους με βάση το νέο πάχος.
 *
 * @param {number} bodyWidth - Το νέο πάχος του σώματος.
 *
 * @example
 * const arrow = new Arrow({});
 * arrow.setBodyWidth(5); // Ορισμός πάχους σώματος σε 5
 * console.log(arrow.options.bodyWidth); // 5
 *
 * @example
 * arrow.setBodyWidth(10); // Ορισμός πάχους σώματος σε 10
 * console.log(arrow.options.bodyWidth); // 10
 */
  setBodyWidth(bodyWidth) {
    this.options.bodyWidth = bodyWidth;
    this.update();
  }

  /**
 * Ορίζει το πλάτος του κεφαλιού του βέλους.
 *
 * Αυτή η μέθοδος ορίζει το πλάτος του κεφαλιού του βέλους.
 * Ενημερώνει την ιδιότητα `headWidth` του αντικειμένου `options` και
 * στη συνέχεια καλεί την μέθοδο `update` για να ανανεώσει την οπτική
 * αναπαράσταση του βέλους με βάση το νέο πλάτος.
 *
 * @param {number} headWidth - Το νέο πλάτος του κεφαλιού.
 *
 * @example
 * const arrow = new Arrow({});
 * arrow.setHeadWidth(20); // Ορισμός πλάτους κεφαλιού σε 20
 * console.log(arrow.options.headWidth); // 20
 *
 * @example
 * arrow.setHeadWidth(15); // Ορισμός πλάτους κεφαλιού σε 15
 * console.log(arrow.options.headWidth); // 15
 */
  setHeadWidth(headWidth) {
    this.options.headWidth = headWidth;
    this.update();
  }

  /**
 * Ορίζει το μήκος του κεφαλιού του βέλους.
 *
 * Αυτή η μέθοδος ορίζει το μήκος του κεφαλιού του βέλους.
 * Ενημερώνει την ιδιότητα `headLength` του αντικειμένου `options` και
 * στη συνέχεια καλεί την μέθοδο `update` για να ανανεώσει την οπτική
 * αναπαράσταση του βέλους με βάση το νέο μήκος.
 *
 * @param {number} headLength - Το νέο μήκος του κεφαλιού.
 *
 * @example
 * const arrow = new Arrow({});
 * arrow.setHeadLength(25); // Ορισμός μήκους κεφαλιού σε 25
 * console.log(arrow.options.headLength); // 25
 *
 * @example
 * arrow.setHeadLength(18); // Ορισμός μήκους κεφαλιού σε 18
 * console.log(arrow.options.headLength); // 18
 */
  setHeadLength(headLength) {
    this.options.headLength = headLength;
    this.update();
  }

  /**
 * Ορίζει το μέγεθος της καμπύλης για τα καμπύλα βέλη.
 *
 * Αυτή η μέθοδος ορίζει το μέγεθος της καμπύλης για τα καμπύλα βέλη.
 * Ενημερώνει την ιδιότητα `curveAmount` του αντικειμένου `options` και
 * στη συνέχεια καλεί την μέθοδο `update` για να ανανεώσει την οπτική
 * αναπαράσταση του βέλους με βάση το νέο μέγεθος της καμπύλης.
 *
 * @param {number} curveAmount - Το νέο μέγεθος της καμπύλης.
 *
 * @example
 * const arrow = new Arrow({ arrowType: 'curved' });
 * arrow.setCurveAmount(50); // Ορισμός μεγέθους καμπύλης σε 50
 * console.log(arrow.options.curveAmount); // 50
 *
 * @example
 * arrow.setCurveAmount(100); // Ορισμός μεγέθους καμπύλης σε 100
 * console.log(arrow.options.curveAmount); // 100
 */
  setCurveAmount(curveAmount) {
    this.options.curveAmount = curveAmount;
    this.update();
  }

  /**
 * Ορίζει το μοτίβο διακεκομμένης γραμμής για τα διακεκομμένα βέλη.
 *
 * Αυτή η μέθοδος ορίζει το μοτίβο διακεκομμένης γραμμής για τα διακεκομμένα βέλη.
 * Ενημερώνει την ιδιότητα `dash` του αντικειμένου `options` και
 * στη συνέχεια καλεί την μέθοδο `update` για να ανανεώσει την οπτική
 * αναπαράσταση του βέλους με βάση το νέο μοτίβο.
 *
 * @param {number[]} dashPattern - Το νέο μοτίβο διακεκομμένης γραμμής, ένα πίνακα αριθμών
 * που ορίζουν τα μήκη των τμημάτων και των κενών.
 *
 * @example
 * const arrow = new Arrow({ arrowType: 'dashed' });
 * arrow.setDashPattern([5, 5]); // Ορισμός μοτίβου [5, 5] (5 pixel γραμμή, 5 pixel κενό)
 * console.log(arrow.options.dash); // [5, 5]
 *
 * @example
 * arrow.setDashPattern([10, 2]); // Ορισμός μοτίβου [10, 2] (10 pixel γραμμή, 2 pixel κενό)
 * console.log(arrow.options.dash); // [10, 2]
 */
  setDashPattern(dashPattern) {
    this.options.dash = dashPattern;
    this.update();
  }

  /**
 * Ορίζει την ακτίνα στρογγυλοποίησης για τα βέλη με στρογγυλεμένο κεφάλι.
 *
 * Αυτή η μέθοδος ορίζει την ακτίνα στρογγυλοποίησης για τα βέλη με στρογγυλεμένο κεφάλι.
 * Ενημερώνει την ιδιότητα `roundRadius` του αντικειμένου `options` και
 * στη συνέχεια καλεί την μέθοδο `update` για να ανανεώσει την οπτική
 * αναπαράσταση του βέλους με βάση τη νέα ακτίνα.
 *
 * @param {number} roundRadius - Η νέα ακτίνα στρογγυλοποίησης.
 *
 * @example
 * const arrow = new Arrow({ arrowType: 'roundedHead' });
 * arrow.setRoundRadius(5); // Ορισμός ακτίνας στρογγυλοποίησης σε 5
 * console.log(arrow.options.roundRadius); // 5
 *
 * @example
 * arrow.setRoundRadius(10); // Ορισμός ακτίνας στρογγυλοποίησης σε 10
 * console.log(arrow.options.roundRadius); // 10
 */
  setRoundRadius(roundRadius) {
    this.options.roundRadius = roundRadius;
    this.update();
  }

  /**
 * Ορίζει τις ρυθμίσεις της σκιάς του βέλους.
 *
 * Αυτή η μέθοδος ορίζει τις ρυθμίσεις της σκιάς του βέλους.
 * Ενημερώνει τις ιδιότητες `shadowColor`, `shadowBlur`, `shadowOffsetX`,
 * `shadowOffsetY` και `shadowOpacity` του αντικειμένου `options` με βάση
 * το παρεχόμενο αντικείμενο διαμόρφωσης `shadowConfig` και
 * στη συνέχεια καλεί την μέθοδο `update` για να ανανεώσει την οπτική
 * αναπαράσταση του βέλους με τις νέες ρυθμίσεις σκιάς.
 *
 * @param {object} shadowConfig - Ένα αντικείμενο που περιέχει τις ρυθμίσεις της σκιάς.
 * @param {string} shadowConfig.color - Το χρώμα της σκιάς.
 * @param {number} shadowConfig.blur - Το θάμπωμα της σκιάς.
 * @param {number} shadowConfig.offsetX - Η οριζόντια μετατόπιση της σκιάς.
 * @param {number} shadowConfig.offsetY - Η κάθετη μετατόπιση της σκιάς.
 * @param {number} shadowConfig.opacity - Η διαφάνεια της σκιάς.
 *
 * @example
 * const arrow = new Arrow({});
 * arrow.setShadow({
 * color: 'gray',
 * blur: 5,
 * offsetX: 3,
 * offsetY: 3,
 * opacity: 0.5,
 * });
 * console.log(arrow.options.shadowColor); // 'gray'
 * console.log(arrow.options.shadowBlur); // 5
 *
 * @example
 * arrow.setShadow({
 * color: 'black',
 * blur: 10,
 * offsetX: 5,
 * offsetY: 5,
 * opacity: 1,
 * });
 * console.log(arrow.options.shadowColor); // 'black'
 * console.log(arrow.options.shadowBlur); // 10
 */
  setShadow(shadowConfig) {
    this.options.shadowColor = shadowConfig.color;
    this.options.shadowBlur = shadowConfig.blur;
    this.options.shadowOffsetX = shadowConfig.offsetX;
    this.options.shadowOffsetY = shadowConfig.offsetY;
    this.options.shadowOpacity = shadowConfig.opacity;
    this.update();
  }

  /**
 * Ορίζει το στυλ των άκρων της γραμμής του βέλους.
 *
 * Αυτή η μέθοδος ορίζει το στυλ των άκρων της γραμμής του βέλους.
 * Ενημερώνει την ιδιότητα `lineCap` του αντικειμένου `options` και
 * στη συνέχεια καλεί την μέθοδο `update` για να ανανεώσει την οπτική
 * αναπαράσταση του βέλους με το νέο στυλ.
 *
 * @param {string} lineCap - Το νέο στυλ των άκρων της γραμμής (π.χ., 'butt', 'round', 'square').
 *
 * @example
 * const arrow = new Arrow({});
 * arrow.setLineCap('round'); // Ορισμός στυλ άκρων σε 'round'
 * console.log(arrow.options.lineCap); // 'round'
 *
 * @example
 * arrow.setLineCap('butt'); // Ορισμός στυλ άκρων σε 'butt'
 * console.log(arrow.options.lineCap); // 'butt'
 */
  setLineCap(lineCap) {
    this.options.lineCap = lineCap;
    this.update();
  }

  /**
 * Ορίζει το στυλ των γωνιών της γραμμής του βέλους.
 *
 * Αυτή η μέθοδος ορίζει το στυλ των γωνιών της γραμμής του βέλους.
 * Ενημερώνει την ιδιότητα `lineJoin` του αντικειμένου `options` και
 * στη συνέχεια καλεί την μέθοδο `update` για να ανανεώσει την οπτική
 * αναπαράσταση του βέλους με το νέο στυλ.
 *
 * @param {string} lineJoin - Το νέο στυλ των γωνιών της γραμμής (π.χ., 'bevel', 'round', 'miter').
 *
 * @example
 * const arrow = new Arrow({});
 * arrow.setLineJoin('round'); // Ορισμός στυλ γωνιών σε 'round'
 * console.log(arrow.options.lineJoin); // 'round'
 *
 * @example
 * arrow.setLineJoin('miter'); // Ορισμός στυλ γωνιών σε 'miter'
 * console.log(arrow.options.lineJoin); // 'miter'
 */
  setLineJoin(lineJoin) {
    this.options.lineJoin = lineJoin;
    this.update();
  }

  /**
 * Ορίζει τον τύπο του βέλους.
 *
 * Αυτή η μέθοδος ορίζει τον τύπο του βέλους.
 * Ενημερώνει την ιδιότητα `arrowType` του αντικειμένου `options` και
 * στη συνέχεια καλεί την μέθοδο `update` για να ανανεώσει την οπτική
 * αναπαράσταση του βέλους με τον νέο τύπο.
 *
 * @param {string} arrowType - Ο νέος τύπος του βέλους (π.χ., 'standard', 'curved', 'doubleHeaded', 'dashed', 'roundedHead', 'squareStart').
 *
 * @example
 * const arrow = new Arrow({});
 * arrow.setArrowType('curved'); // Ορισμός τύπου βέλους σε 'curved'
 * console.log(arrow.options.arrowType); // 'curved'
 *
 * @example
 * arrow.setArrowType('dashed'); // Ορισμός τύπου βέλους σε 'dashed'
 * console.log(arrow.options.arrowType); // 'dashed'
 */
  setArrowType(arrowType) {
    this.options.arrowType = arrowType;
    this.update();
  }

  /**
 * Ανανεώνει την οπτική αναπαράσταση του βέλους.
 *
 * Αυτή η μέθοδος ανανεώνει την οπτική αναπαράσταση του βέλους,
 * επιλέγοντας την κατάλληλη συνάρτηση δημιουργίας διαδρομής
 * (`createArrowPath`, `createCurvedArrowPath`, κ.λπ.) βάσει του
 * τρέχοντος τύπου βέλους (`arrowType`). Στη συνέχεια, ορίζει τα
 * δεδομένα διαδρομής, τη θέση και την περιστροφή του αντικειμένου
 * `path` και ανανεώνει την εμφάνιση του βέλους.
 *
 * @example
 * const arrow = new Arrow({ arrowType: 'curved', magnitude: 100, curveAmount: 50 });
 * arrow.update(); // Ανανέωση βέλους με καμπύλη
 *
 * @example
 * arrow.setArrowType('standard');
 * arrow.update(); // Ανανέωση βέλους σε τυπικό
 */
  update() {
    let pathData;
    switch (this.options.arrowType) {
      case 'standard':
        pathData = this.createArrowPath(this.options.magnitude, this.options.bodyWidth, this.options.headWidth, this.options.headLength);
        break;
      case 'curved':
        pathData = this.createCurvedArrowPath(this.options.magnitude, this.options.bodyWidth, this.options.headWidth, this.options.headLength, this.options.curveAmount);
        break;
      case 'doubleHeaded':
        pathData = this.createDoubleHeadedArrowPath(this.options.magnitude, this.options.bodyWidth, this.options.headWidth, this.options.headLength);
        break;
      case 'dashed':
        pathData = this.createDashedArrowPath(this.options.magnitude, this.options.bodyWidth, this.options.headWidth, this.options.headLength, this.options.dash);
        break;
      case 'roundedHead':
        pathData = this.createRoundedHeadArrowPath(this.options.magnitude, this.options.bodyWidth, this.options.headWidth, this.options.headLength, this.options.roundRadius);
        break;
      case 'squareStart':
        pathData = this.createSquareStartArrowPath(this.options.magnitude, this.options.bodyWidth, this.options.headWidth, this.options.headLength);
        break;
      default:
        pathData = this.createArrowPath(this.options.magnitude, this.options.bodyWidth, this.options.headWidth, this.options.headLength);
        break;
    }

    this.path.data(pathData);
    this.path.position({ x: this.options.startX, y: this.options.startY });
    this.path.rotation(this.options.direction * 180 / Math.PI);
    //this.path.draw();
  }

  /**
 * Δημιουργεί τα δεδομένα διαδρομής για ένα τυπικό βέλος.
 *
 * Αυτή η μέθοδος δημιουργεί μια συμβολοσειρά που περιέχει τα δεδομένα διαδρομής
 * (path data) για ένα τυπικό βέλος, χρησιμοποιώντας τις παρεχόμενες διαστάσεις.
 *
 * @param {number} length - Το συνολικό μήκος του βέλους.
 * @param {number} bodyWidth - Το πλάτος του σώματος του βέλους.
 * @param {number} headWidth - Το πλάτος του κεφαλιού του βέλους.
 * @param {number} headLength - Το μήκος του κεφαλιού του βέλους.
 * @returns {string} - Μια συμβολοσειρά που περιέχει τα δεδομένα διαδρομής.
 *
 * @example
 * const pathData = this.createArrowPath(100, 10, 20, 25);
 * console.log(pathData);
 * // "M 0 0 L 75 -5 L 75 -10 L 100 0 L 75 10 L 75 5 Z"
 */
  createArrowPath(length, bodyWidth, headWidth, headLength) {
    const halfBodyWidth = bodyWidth / 2;
    const halfHeadWidth = headWidth / 2;
  
    return `
      M 0 0
      L ${length - headLength} ${-halfBodyWidth}
      L ${length - headLength} ${-halfHeadWidth}
      L ${length} 0
      L ${length - headLength} ${halfHeadWidth}
      L ${length - headLength} ${halfBodyWidth}
      Z
    `;
  }

  /**
 * Δημιουργεί τα δεδομένα διαδρομής για ένα τυπικό βέλος.
 *
 * Αυτή η μέθοδος δημιουργεί μια συμβολοσειρά που περιέχει τα δεδομένα διαδρομής
 * (path data) για ένα τυπικό βέλος, χρησιμοποιώντας τις παρεχόμενες διαστάσεις.
 *
 * @param {number} length - Το συνολικό μήκος του βέλους.
 * @param {number} bodyWidth - Το πλάτος του σώματος του βέλους.
 * @param {number} headWidth - Το πλάτος του κεφαλιού του βέλους.
 * @param {number} headLength - Το μήκος του κεφαλιού του βέλους.
 * @returns {string} - Μια συμβολοσειρά που περιέχει τα δεδομένα διαδρομής.
 *
 * @example
 * const pathData = this.createArrowPath(100, 10, 20, 25);
 * console.log(pathData);
 * // "M 0 0 L 75 -5 L 75 -10 L 100 0 L 75 10 L 75 5 Z"
 */
  createCurvedArrowPath(length, bodyWidth, headWidth, headLength, curveAmount) {
    const halfBodyWidth = bodyWidth / 2;
    const halfHeadWidth = headWidth / 2;
  
    return `
      M 0 0
      Q ${length / 2} ${curveAmount} ${length - headLength} ${-halfBodyWidth}
      L ${length - headLength} ${-halfHeadWidth}
      L ${length} 0
      L ${length - headLength} ${halfHeadWidth}
      L ${length - headLength} ${halfBodyWidth}
      Q ${length / 2} ${-curveAmount} 0 0
      Z
    `;
  }

  /**
 * Δημιουργεί τα δεδομένα διαδρομής για ένα βέλος με διπλό κεφάλι.
 *
 * Αυτή η μέθοδος δημιουργεί μια συμβολοσειρά που περιέχει τα δεδομένα διαδρομής
 * (path data) για ένα βέλος με διπλό κεφάλι, χρησιμοποιώντας τις παρεχόμενες διαστάσεις.
 *
 * @param {number} length - Το συνολικό μήκος του βέλους.
 * @param {number} bodyWidth - Το πλάτος του σώματος του βέλους.
 * @param {number} headWidth - Το πλάτος του κεφαλιού του βέλους.
 * @param {number} headLength - Το μήκος του κεφαλιού του βέλους.
 * @returns {string} - Μια συμβολοσειρά που περιέχει τα δεδομένα διαδρομής.
 *
 * @example
 * const pathData = this.createDoubleHeadedArrowPath(100, 10, 20, 25);
 * console.log(pathData);
 * // "M 25 0 L 0 -10 L 0 10 Z M 75 0 L 100 -10 L 100 10 Z M 25 0 L 75 -5 L 75 5 Z"
 */
  createDoubleHeadedArrowPath(length, bodyWidth, headWidth, headLength) {
    const halfBodyWidth = bodyWidth / 2;
    const halfHeadWidth = headWidth / 2;
  
    return `
      M ${headLength} 0
      L 0 ${-halfHeadWidth}
      L 0 ${halfHeadWidth}
      Z
      M ${length - headLength} 0
      L ${length} ${-halfHeadWidth}
      L ${length} ${halfHeadWidth}
      Z
      M ${headLength} 0
      L ${length - headLength} ${-halfBodyWidth}
      L ${length - headLength} ${halfBodyWidth}
      Z
    `;
  }

  /**
 * Δημιουργεί τα δεδομένα διαδρομής για ένα βέλος με διακεκομμένο σώμα.
 *
 * Αυτή η μέθοδος δημιουργεί μια συμβολοσειρά που περιέχει τα δεδομένα διαδρομής
 * (path data) για ένα βέλος με διακεκομμένο σώμα, χρησιμοποιώντας τις παρεχόμενες διαστάσεις
 * και το μοτίβο διακεκομμένης γραμμής.
 *
 * @param {number} length - Το συνολικό μήκος του βέλους.
 * @param {number} bodyWidth - Το πλάτος του σώματος του βέλους (δεν χρησιμοποιείται άμεσα, αλλά για υπολογισμούς).
 * @param {number} headWidth - Το πλάτος του κεφαλιού του βέλους.
 * @param {number} headLength - Το μήκος του κεφαλιού του βέλους.
 * @param {number[]} dashPattern - Ένας πίνακας που περιέχει το μήκος των τμημάτων και των κενών της διακεκομμένης γραμμής.
 * @returns {string} - Μια συμβολοσειρά που περιέχει τα δεδομένα διαδρομής.
 *
 * @example
 * const pathData = this.createDashedArrowPath(100, 10, 20, 25, [10, 5]);
 * console.log(pathData);
 * // "M 0 0 L 10 0 M 15 0 L 25 0 M 30 0 L 40 0 M 45 0 L 55 0 M 60 0 L 70 0 M 75 0 L 85 0 M 90 0 L 100 0 M 100 0 L 75 -10 L 75 10 Z"
 */
  createDashedArrowPath(length, bodyWidth, headWidth, headLength, dashPattern) {
    const halfBodyWidth = bodyWidth / 2;
    const halfHeadWidth = headWidth / 2;
    const dashLength = dashPattern[0];
    const gapLength = dashPattern[1];
    const segmentLength = dashLength + gapLength;
    const numSegments = Math.floor(length / segmentLength);
    const remainder = length % segmentLength;
  
    let pathData = '';
  
    // Διακεκομμένο σώμα
    for (let i = 0; i < numSegments; i++) {
      const startX = i * segmentLength;
      const endX = startX + dashLength;
      pathData += `M ${startX} 0 L ${endX} 0 `;
    }
  
    // Υπόλοιπο
    if (remainder > dashLength) {
      const startX = numSegments * segmentLength;
      const endX = startX + dashLength;
      pathData += `M ${startX} 0 L ${endX} 0 `;
    }
  
    // Κεφάλι βέλους
    pathData += `
      M ${length} 0
      L ${length - headLength} ${-halfHeadWidth}
      L ${length - headLength} ${halfHeadWidth}
      Z
    `;
  
    return pathData;
  }

  /**
 * Δημιουργεί τα δεδομένα διαδρομής για ένα βέλος με στρογγυλεμένο κεφάλι.
 *
 * Αυτή η μέθοδος δημιουργεί μια συμβολοσειρά που περιέχει τα δεδομένα διαδρομής
 * (path data) για ένα βέλος με στρογγυλεμένο κεφάλι, χρησιμοποιώντας τις παρεχόμενες διαστάσεις
 * και την ακτίνα στρογγυλοποίησης.
 *
 * @param {number} length - Το συνολικό μήκος του βέλους.
 * @param {number} bodyWidth - Το πλάτος του σώματος του βέλους.
 * @param {number} headWidth - Το πλάτος του κεφαλιού του βέλους.
 * @param {number} headLength - Το μήκος του κεφαλιού του βέλους.
 * @param {number} roundRadius - Η ακτίνα στρογγυλοποίησης του κεφαλιού.
 * @returns {string} - Μια συμβολοσειρά που περιέχει τα δεδομένα διαδρομής.
 *
 * @example
 * const pathData = this.createRoundedHeadArrowPath(100, 10, 20, 25, 5);
 * console.log(pathData);
 * // "M 0 0 L 75 -5 L 75 -15 A 5 5 0 0 1 80 -10 L 100 0 L 80 10 A 5 5 0 0 1 75 15 L 75 5 Z"
 */
  createRoundedHeadArrowPath(length, bodyWidth, headWidth, headLength, roundRadius) {
    const halfBodyWidth = bodyWidth / 2;
    const halfHeadWidth = headWidth / 2;
  
    // Βεβαιωθείτε ότι η ακτίνα δεν είναι μεγαλύτερη από το μισό πλάτος του κεφαλιού
    roundRadius = Math.min(roundRadius, halfHeadWidth);
  
    return `
      M 0 0
      L ${length - headLength} ${-halfBodyWidth}
      L ${length - headLength} ${-halfHeadWidth + roundRadius}
      A ${roundRadius} ${roundRadius} 0 0 1 ${length - headLength + roundRadius} ${-halfHeadWidth}
      L ${length} 0
      L ${length - headLength + roundRadius} ${halfHeadWidth}
      A ${roundRadius} ${roundRadius} 0 0 1 ${length - headLength} ${halfHeadWidth - roundRadius}
      L ${length - headLength} ${halfBodyWidth}
      Z
    `;
  }

  /**
 * Δημιουργεί τα δεδομένα διαδρομής για ένα βέλος με τετράγωνη αρχή.
 *
 * Αυτή η μέθοδος δημιουργεί μια συμβολοσειρά που περιέχει τα δεδομένα διαδρομής
 * (path data) για ένα βέλος με τετράγωνη αρχή, χρησιμοποιώντας τις παρεχόμενες διαστάσεις.
 *
 * @param {number} length - Το συνολικό μήκος του βέλους.
 * @param {number} bodyWidth - Το πλάτος του σώματος του βέλους.
 * @param {number} headWidth - Το πλάτος του κεφαλιού του βέλους.
 * @param {number} headLength - Το μήκος του κεφαλιού του βέλους.
 * @returns {string} - Μια συμβολοσειρά που περιέχει τα δεδομένα διαδρομής.
 *
 * @example
 * const pathData = this.createSquareStartArrowPath(100, 10, 20, 25);
 * console.log(pathData);
 * // "M 0 -5 L 25 -5 L 75 -5 L 75 -10 L 100 0 L 75 10 L 75 5 L 25 5 L 0 5 Z"
 */
  createSquareStartArrowPath(length, bodyWidth, headWidth, headLength) {
    const halfBodyWidth = bodyWidth / 2;
    const halfHeadWidth = headWidth / 2;
  
    return `
      M 0 ${-halfBodyWidth}
      L ${headLength} ${-halfBodyWidth}
      L ${length - headLength} ${-halfBodyWidth}
      L ${length - headLength} ${-halfHeadWidth}
      L ${length} 0
      L ${length - headLength} ${halfHeadWidth}
      L ${length - headLength} ${halfBodyWidth}
      L ${headLength} ${halfBodyWidth}
      L 0 ${halfBodyWidth}
      Z
    `;
  }

}

export { Arrow };