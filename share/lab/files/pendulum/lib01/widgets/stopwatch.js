import { Widget } from './widget.js'; // Υποθέτουμε ότι υπάρχει το widget.js
import { Button } from './button.js'; // Υποθέτουμε ότι υπάρχει το button.js
/*
Κλάση Stopwatch (stopwatch.js)

Η κλάση Stopwatch δημιουργεί ένα χρονόμετρο Konva.js που μετράει λεπτά, δευτερόλεπτα και εκατοστά του δευτερολέπτου.
Κληρονομεί από την κλάση Widget (widget.js) και χρησιμοποιεί την κλάση Button (button.js).

Χρήση:

const myStopwatch = new Stopwatch({
    x: 100, // Θέση x του χρονομέτρου
    y: 100, // Θέση y του χρονομέτρου
    width: 200, // Πλάτος του χρονομέτρου (προαιρετικό)
    height: 80, // Ύψος του χρονομέτρου (προαιρετικό)
    fontSize: 16, // Μέγεθος γραμματοσειράς
    fontFamily: "Arial", // Οικογένεια γραμματοσειράς
    fontColor: "black", // Χρώμα κειμένου
    rectFill: "white", // Χρώμα γεμίσματος του πλαισίου του χρονομέτρου
    rectStroke: "gray", // Χρώμα περιγράμματος του πλαισίου του χρονομέτρου
    rectStrokeWidth: 1, // Πάχος περιγράμματος του πλαισίου του χρονομέτρου
    rectCornerRadius: 5, // Ακτίνα στρογγυλοποίησης γωνιών του πλαισίου
    buttonFill: "lightgray", // Χρώμα γεμίσματος του κουμπιού
    buttonStroke: "gray", // Χρώμα περιγράμματος του κουμπιού
    buttonStrokeWidth: 1, // Πάχος περιγράμματος του κουμπιού
    buttonWidth: 40, // Πλάτος κουμπιού (προαιρετικό)
    buttonCornerRadius: 0, // Ακτίνα στρογγυλοποίησης γωνιών του κουμπιού
    buttonMouseoverFill: "gray", // Χρώμα γεμίσματος κουμπιού κατά το mouseover
    padding: 5, // Padding γύρω από το κείμενο και το κουμπί
});

Ιδιότητες:

* x: Θέση x του χρονομέτρου.
* y: Θέση y του χρονομέτρου.
* width: Πλάτος του χρονομέτρου.
* height: Ύψος του χρονομέτρου.
* fontSize: Μέγεθος γραμματοσειράς.
* fontFamily: Οικογένεια γραμματοσειράς.
* fontColor: Χρώμα κειμένου.
* rectFill: Χρώμα γεμίσματος του πλαισίου.
* rectStroke: Χρώμα περιγράμματος του πλαισίου.
* rectStrokeWidth: Πάχος περιγράμματος του πλαισίου.
* rectCornerRadius: Ακτίνα στρογγυλοποίησης γωνιών του πλαισίου.
* buttonFill: Χρώμα γεμίσματος του κουμπιού.
* buttonStroke: Χρώμα περιγράμματος του κουμπιού.
* buttonStrokeWidth: Πάχος περιγράμματος του κουμπιού.
* buttonWidth: Πλάτος κουμπιού.
* buttonCornerRadius: Ακτίνα στρογγυλοποίησης γωνιών του κουμπιού.
* buttonMouseoverFill: Χρώμα γεμίσματος κουμπιού κατά το mouseover.
* padding: Padding γύρω από το κείμενο και το κουμπί.

Λειτουργία:

* Το χρονόμετρο ξεκινά και σταματά με το πάτημα του κουμπιού (έναρξη/παύση).
* Εμφανίζει την elapsed time σε μορφή "ΛΛ:ΔΔ.ΕΕ" (λεπτά:δευτερόλεπτα.εκατοστά).
* Το μέγεθος του πλαισίου του χρονομέτρου προσαρμόζεται αυτόματα στο μέγεθος του κειμένου και του κουμπιού.
* Το χρονομετρο στελνει σε ολα τα Widgets αυτου του καμβά τα σηματα "stopwatch:start", "stopwactch:stop".

Σημειώσεις:

* Βεβαιωθείτε ότι έχετε συμπεριλάβει τις βιβλιοθήκες Konva.js και τις κλάσεις Widget και Button στο έργο σας.
* Η μέτρηση του χρόνου γίνεται με ακρίβεια εκατοστού του δευτερολέπτου.

Παράδειγμα χρήσης με όλες τις ιδιότητες:

```javascript
import { Stopwatch } from './stopwatch.js'; // Αντικαταστήστε με τη σωστή διαδρομή

const myStopwatch = new Stopwatch({
    x: 50,
    y: 50,
    width: 200, // Προαιρετικό
    height: 80, // Προαιρετικό
    fontSize: 16,
    fontFamily: "Arial",
    fontColor: "darkblue",
    rectFill: "lightyellow",
    rectStroke: "blue",
    rectStrokeWidth: 2,
    rectCornerRadius: 10,
    buttonFill: "lightblue",
    buttonStroke: "darkblue",
    buttonStrokeWidth: 1,
    buttonWidth: 50, // Προαιρετικό
    buttonCornerRadius: 5,
    buttonMouseoverFill: "lightgreen",
    padding: 10,
});

layer.add(myStopwatch); // Προσθέστε το χρονόμετρο στο layer σας
*/
class Stopwatch extends Widget {
    constructor(options) {
        super(options);

        this.options.name = "Stopwatch"+this.options.id;
        this.options = {
            x: options.x || 0,
            y: options.y || 0,
            width: options.width || 150, // Αύξηση του πλάτους για να χωρέσει η ένδειξη
            height: options.height || 50,
            fontSize: options.fontSize || 12,
            fontFamily: options.fontFamily || "Arial",
            fontColor: options.fontColor || "black",
            rectFill: options.rectFill || "white",
            rectStroke: options.rectStroke || "black",
            rectStrokeWidth: options.rectStrokeWidth || 1,
            rectCornerRadius: options.rectCornerRadius || 0,
            buttonFill: options.buttonFill || "gray",
            buttonStroke: options.buttonStroke || "black",
            buttonStrokeWidth: options.buttonStrokeWidth || 1,
            buttonWidth: options.buttonWidth || 50,
            buttonCornerRadius: options.buttonCornerRadius || 0,
            buttonMouseoverFill: options.buttonMouseoverFill || 'lightgray',
            padding: options.padding || 5,
            imageSrc: options.imageSrc,
        };

        this.minutes = 0;
        this.seconds = 0;
        this.hundredths = 0;
        this.running = false;
        this.intervalId = null;

        this.button = new Button({ // Ένα κουμπί
            x: 0, // Θα ρυθμιστεί πιο κάτω.
            y: this.options.padding-2,
            width: this.options.fontSize+4,//this.options.buttonWidth,
            height: this.options.fontSize+4,//this.options.buttonWidth,
            //text: "\u25B6",
            imageSrc:this.options.imageSrc,
            fontSize: this.options.fontSize-2,
            //padding:5,
            fill:this.options.buttonFill,
            stroke:this.options.buttonStroke,
            strokeWidth: this.options.buttonStrokeWidth,
            mouseoverFill: this.options.buttonMouseoverFill,
            cornerRadius: this.options.buttonCornerRadius,
            onClick: () => { this.toggle(); }, // Κλήση της toggle()
        });

        this.timeText = new Konva.Text({ // Αλλαγή της αρχικής τιμής σε "00:00.00"
            x: this.options.padding,
            y: this.options.padding,
            text: "00:00.00",
            fontSize: this.options.fontSize,
            fontFamily: this.options.fontFamily,
            fill: this.options.fontColor,
            align: "center",
            verticalAlign: "middle",
        });

        this.frame = new Konva.Rect({
            width: this.button.width()+this.timeText.width()+3*this.options.padding,
            height: this.options.fontSize + 2 * this.options.padding,
            fill: this.options.rectFill,
            stroke: this.options.rectStroke,
            strokeWidth: this.options.rectStrokeWidth,
            cornerRadius: this.options.rectCornerRadius,
        });
        this.button.x(this.timeText.width()+2*this.options.padding);
        
        this.add(this.frame);
        this.add(this.timeText);
        this.add(this.button);

        this.on('blur', this.handleBlur.bind(this));
    }

    toggle() {
        if(!this.options.isActive){
           //δεν χρειαζεται διοτι στελνει blur το κουμπι. 
          //  this.fireEventToAllOthers('blur');
            this.options.isActive = true;
        }
        if (this.running) {
            this.stop();
            this.fireEventToAllOthers('stopwatch:stop');
        } else {
            this.start();
            this.fireEventToAllOthers('stopwatch:start');
        }
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.minutes = 0;
            this.seconds = 0;
            this.hundredths = 0;
            this.startTime = performance.now(); // Αποθηκεύουμε την αρχική χρονική στιγμή
            this.updateTimeText();
    
            this.intervalId = setInterval(() => {
                const currentTime = performance.now();
                const elapsedTime = currentTime - this.startTime; // Υπολογίζουμε τον χρόνο που έχει περάσει
    
                this.minutes = Math.floor(elapsedTime / (60 * 1000));
                this.seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
                this.hundredths = Math.floor((elapsedTime % 1000) / 10); // Διαίρεση με 10 για εκατοστά του δευτερολέπτου
    
                this.updateTimeText();
            }, 10); // Μπορούμε να διατηρήσουμε το 10ms για την ανανέωση του UI, αλλά όχι για τον υπολογισμό του χρόνου
        }
    }

    stop() {
        if (this.running) {
            this.running = false;
            clearInterval(this.intervalId);
        }
    }

    updateTimeText() {
        const formattedMinutes = String(this.minutes).padStart(2, '0');
        const formattedSeconds = String(this.seconds).padStart(2, '0');
        const formattedHundredths = String(this.hundredths).padStart(2, '0');
        this.timeText.text(`${formattedMinutes}:${formattedSeconds}.${formattedHundredths}`);
        this.getLayer().draw();
    }

    handleBlur(event){
        this.options.isActive = false;
        this.stop();
    }

    getValue(){
        return (this.minutes*60+this.seconds)*1000+this.hundredths; //ms
    }

}

export { Stopwatch };