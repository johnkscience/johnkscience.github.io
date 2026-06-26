/*
Εδώ είναι μια λίστα ιδιοτητων και μεθόδων με υπογραφές και μια σύντομη περιγραφή για την κλάση Range:

Ιδιότητες:

    min: number (προεπιλογή: 0): Η ελάχιστη τιμή του εύρους.
    max: number (προεπιλογή: 100): Η μέγιστη τιμή του εύρους.
    value: number (προεπιλογή: 0): Η αρχική τιμή του εύρους.
    step: number (προεπιλογή: 1): Το βήμα αύξησης/μείωσης της τιμής.
    barHeight: number (προεπιλογή: 10): Το ύψος της μπάρας.
    scaleHeight: number (προεπιλογή: 20): Το ύψος της κλίμακας.
    handleRadius: number (προεπιλογή: 8): Η ακτίνα του "επιλογέα".
    handleFill: string (προεπιλογή: 'white'): Το χρώμα του "επιλογέα".
    handleStroke: string (προεπιλογή: 'black'): Το χρώμα περιγράμματος του "επιλογέα".
    handleStrokeWidth: number (προεπιλογή: 1): Το πάχος περιγράμματος του "επιλογέα".
    barFill: string (προεπιλογή: 'gray'): Το χρώμα της μπάρας.
    barStroke: string (προεπιλογή: 'black'): Το χρώμα περιγράμματος της μπάρας.
    barStrokeWidth: number (προεπιλογή: 1): Το πάχος περιγράμματος της μπάρας.
    scaleStroke: string (προεπιλογή: 'black'): Το χρώμα της κλίμακας.
    scaleStrokeWidth: number (προεπιλογή: 1): Το πάχος της κλίμακας.
    scaleTickLength: number (προεπιλογή: 5): Το μήκος των "γραμμών" στην κλίμακα.
    tooltipFill: string (προεπιλογή: 'black'): Το χρώμα του tooltip.
    tooltipTextFill: string (προεπιλογή: 'white'): Το χρώμα του κειμένου στο tooltip.
    decimals: number (προεπιλογή: 1): Ο αριθμός των δεκαδικών ψηφίων στο tooltip.
    padding: number (προεπιλογή: 3): Το padding του tooltip.
    fontSize: number (προεπιλογή: 12): Το μέγεθος της γραμματοσειράς.
    showTooltip: boolean (προεπιλογή: true): Αν θα εμφανίζεται το tooltip.
    minLabel: string (προεπιλογή: τιμή του min): Η ετικέτα για τη μικρότερη τιμή.
    maxLabel: string (προεπιλογή: τιμή του max): Η ετικέτα για τη μεγαλύτερη τιμή.

Μέθοδοι:

    constructor(options: Object) Κατασκευαστής της κλάσης Range. Δημιουργεί ένα νέο widget εύρους τιμών με βάση τις παρεχόμενες επιλογές.
    getValue(): number Επιστρέφει την τρέχουσα επιλεγμένη τιμή.
    setValue(value: number): void Ορίζει την τρέχουσα επιλεγμένη τιμή.
    setDecimals(decimals: number): void Ορίζει τον αριθμό των δεκαδικών ψηφίων που εμφανίζονται στο "συννεφάκι".
    getDecimals(): number Επιστρέφει τον αριθμό των δεκαδικών ψηφίων που εμφανίζονται στο "συννεφάκι".
    setShowTooltip(show: boolean): void Ορίζει αν θα εμφανίζεται το "συννεφάκι".
    getShowTooltip(): boolean Επιστρέφει αν εμφανίζεται το "συννεφάκι".
*/
import { Widget } from './widget.js';
/**
 * Ένα widget για την επιλογή μιας τιμής από ένα εύρος τιμών.
 * @class Range
 * @extends Widget
 */
class Range extends Widget {
    /**
     * @param {Object} options - Οι επιλογές για το widget.
     * @param {number} [options.min=0] - Η ελάχιστη τιμή του range.
     * @param {number} [options.max=100] - Η μέγιστη τιμή του range.
     * @param {number} [options.value=0] - Η αρχική τιμή του range.
     * @param {number} [options.step=1] - Το βήμα αύξησης/μείωσης της τιμής.
     * @param {number} [options.barHeight=10] - Το ύψος της μπάρας.
     * @param {number} [options.scaleHeight=20] - Το ύψος της κλίμακας.
     * @param {number} [options.handleRadius=8] - Η ακτίνα του "επιλογέα".
     * @param {string} [options.handleFill='white'] - Το χρώμα του "επιλογέα".
     * @param {string} [options.handleStroke='black'] - Το χρώμα περιγράμματος του "επιλογέα".
     * @param {number} [options.handleStrokeWidth=1] - Το πάχος περιγράμματος του "επιλογέα".
     * @param {string} [options.barFill='gray'] - Το χρώμα της μπάρας.
     * @param {string} [options.barStroke='black'] - Το χρώμα περιγράμματος της μπάρας.
     * @param {number} [options.barStrokeWidth=1] - Το πάχος περιγράμματος της μπάρας.
     * @param {string} [options.scaleStroke='black'] - Το χρώμα της κλίμακας.
     * @param {number} [options.scaleStrokeWidth=1] - Το πάχος της κλίμακας.
     * @param {number} [options.scaleTickLength=5] - Το μήκος των "γραμμών" στην κλίμακα.
     * @param {string} [options.tooltipFill='black'] - Το χρώμα του tooltip.
     * @param {string} [options.tooltipTextFill='white'] - Το χρώμα του κειμένου στο tooltip.
     * @param {number} [options.decimals=1] - Ο αριθμός των δεκαδικών ψηφίων στο tooltip.
     * @param {number} [options.padding=3] - Το padding του tooltip.
     * @param {number} [options.fontSize=12] - Το μέγεθος της γραμματοσειράς.
     * @param {boolean} [options.showTooltip=true] - Αν θα εμφανίζεται το tooltip.
     * @param {string} [options.minLabel] - Η ετικέτα για τη μικρότερη τιμή.
     * @param {string} [options.maxLabel] - Η ετικέτα για τη μεγαλύτερη τιμή.
     */
    constructor(options) {
        super(options);
        this.options.name = "Range"+this.options.id;
        this.options = {
            ...this.options, // Κληρονομούμε τις ιδιότητες από το Widget
            min: options.min || 0, // Η ελάχιστη τιμή του range
            max: options.max || 100, // Η μέγιστη τιμή του range
            value: options.value || 0, // Η αρχική τιμή του range
            step: options.step || 1,   // Το βήμα αύξησης/μείωσης της τιμής (για διακριτές τιμές)
            barHeight: options.barHeight || 10, // Το ύψος της μπάρας
            scaleHeight: options.scaleHeight || 20, // Το ύψος της κλίμακας (διαγράμμισης)
            handleRadius: options.handleRadius || 8, // Η ακτίνα του "επιλογέα" (handle)
            handleFill: options.handleFill || 'white', // Το χρώμα του "επιλογέα" (handle)
            handleStroke: options.handleStroke || 'black', // Το χρώμα περιγράμματος του "επιλογέα" (handle)
            handleStrokeWidth: options.handleStrokeWidth || 1, // Το πάχος περιγράμματος του "επιλογέα" (handle)
            barFill: options.barFill || 'gray', // Το χρώμα της μπάρας
            barStroke: options.barStroke || 'black', // Το χρώμα περιγράμματος της μπάρας
            barStrokeWidth: options.barStrokeWidth || 1, // Το πάχος περιγράμματος της μπάρας
            scaleStroke: options.scaleStroke || 'black', // Το χρώμα της κλίμακας
            scaleStrokeWidth: options.scaleStrokeWidth || 1, // Το πάχος της κλίμακας
            scaleTickLength: options.scaleTickLength || 5, // Το μήκος των "γραμμών" στην κλίμακα
            tooltipFill: options.tooltipFill || 'black', // Το χρώμα του "συννεφάκι"
            tooltipTextFill: options.tooltipTextFill || 'white', // Το χρώμα του κειμένου στο "συννεφάκι"
            decimals: options.decimals || 1,
            padding: options.padding || 3,
            fontSize: options.fontSize || 12,
            showTooltip: options.showTooltip === undefined ? true : options.showTooltip, // Προεπιλογή: true
            onChange: options.onChange || ((event)=>{}),
        };
        this.options.minLabel = options.minLabel || this.options.min.toString(), // Προεπιλογή: η τιμή min
        this.options.maxLabel = options.maxLabel || this.options.max.toString(), // Προεπιλογή: η τιμή max
        

        // Δημιουργία των γραφικών στοιχείων
        this.createBar();
        this.createHandle();
        this.createScale();
        this.createTooltip();
        this.createLabels(); // Δημιουργία των labels
        
        this.updateHandlePosition(); // Αρχική ενημέρωση της θέσης του "επιλογέα" και του "συννεφάκι"
        this.updateTooltipText(); // Αρχική ενημέρωση του κειμένου στο "συννεφάκι"

        this.add(this.bar);
        this.add(this.handle);
        this.add(this.scale);
        this.add(this.minLabelText);
        this.add(this.maxLabelText);

        this.handle.dragBoundFunc(pos => {
            let x = pos.x;

            /*
            // Βρίσκουμε την πλησιέστερη διαγράμμιση
            const tickCount = Math.floor((this.options.max - this.options.min) / this.options.step) + 1;
            let closestTickX = this.x(); // Αρχικά, θεωρούμε την τρέχουσα θέση ως την πλησιέστερη
            let minDistance = Math.abs(x - closestTickX);

            for (let i = 0; i < tickCount; i++) {
                const tickX = this.x() + i * (this.options.width / (tickCount - 1));
                const distance = Math.abs(x - tickX);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestTickX = tickX;
                }
            }

            x = closestTickX; // "Κολλάμε" τον επιλογέα στην πλησιέστερη διαγράμμιση

            // Περιορισμός της κίνησης στα όρια της μπάρας (επιπλέον έλεγχος)
            x = Math.max(this.x(), Math.min(x, this.x() + this.options.width));

            */
            return { x: x, y: this.absolutePosition().y };
        });


       this.handle.on('dragmove', (event) => {
            this.updateValue(event);
            this.updateTooltipText();
        });

        // Ανίχνευση κίνησης ποντικιού πάνω από την μπάρα
        //this.bar.on('mousemove', (event) => {
            //this.handleMouseMove(event);
        //});
    }

    createBar() {
        this.bar = new Konva.Rect({
            width: this.options.width,
            height: this.options.barHeight,
            fill: this.options.barFill,
            stroke: this.options.barStroke,
            strokeWidth: this.options.barStrokeWidth,
            cornerRadius:3,
        });
    }

    createHandle() {
        this.handle = new Konva.Circle({
            radius: this.options.handleRadius,
            fill: this.options.handleFill,
            stroke: this.options.handleStroke,
            strokeWidth: this.options.handleStrokeWidth,
            draggable: true
        });
    }

    createScale() {
        this.scale = new Konva.Group();
        const range = this.options.max - this.options.min;
        const tickCount = Math.round(range / this.options.step) + 1; // Ακριβής υπολογισμός
    
        for (let i = 0; i < tickCount; i++) {
            const x = i * (this.options.width / (tickCount - 1));
            const tick = new Konva.Line({
                points: [x, 0, x, this.options.scaleTickLength],
                stroke: this.options.scaleStroke,
                strokeWidth: this.options.scaleStrokeWidth
            });
            this.scale.add(tick);
        }
        this.scale.y(this.options.barHeight + this.options.scaleHeight/2);
    }

    createTooltip() {
        this.tooltipBackground = new Konva.Rect({
            fill: this.options.tooltipFill,
            cornerRadius: 5,
            // Αρχικοποίηση πλάτους και ύψους. Θα προσαρμοστούν στην updateTooltipText()
            width: 0,
            height: 0,
        });
    
        this.tooltip = new Konva.Text({
            text: '',
            fontSize: this.options.fontSize,
            fill: this.options.tooltipTextFill,
            padding: this.options.padding,
            align: 'center',
        });
    

        this.tooltipGroup = new Konva.Group(); // Ομαδοποίηση background και text

        this.tooltipGroup.add(this.tooltipBackground); // Προσθήκη του background πρώτα
        this.tooltipGroup.add(this.tooltip); // Μετά το text (για να είναι "πάνω" από το background)
        
        this.tooltipGroup.visible(true); // Αρχικά κρυφό

        // Προσθέτουμε το group, όχι τα επιμέρους στοιχεία
        this.add(this.tooltipGroup);
    }

    createLabels() {
        this.minLabelText = new Konva.Text({
            text: this.options.minLabel,
            fontSize: this.options.fontSize,
            fill: this.options.scaleStroke, // Ίδιο χρώμα με την κλίμακα
            align: 'left',
            x: 0, // Αριστερά
            y: this.options.barHeight + this.options.scaleHeight + 5, // Κάτω από την κλίμακα
        });

        this.maxLabelText = new Konva.Text({
            text: this.options.maxLabel,
            fontSize: this.options.fontSize,
            fill: this.options.scaleStroke, // Ίδιο χρώμα με την κλίμακα
            align: 'right',
            x: this.options.width, // Δεξιά
            y: this.options.barHeight + this.options.scaleHeight + 5, // Κάτω από την κλίμακα
        });

        // Προσαρμογή θέσης μετά τη δημιουργία (κεντράρισμα)
    this.minLabelText.x(-this.minLabelText.width() / 2); // Αριστερά
    this.maxLabelText.x(this.options.width - this.maxLabelText.width() / 2); // Δεξιά
    }

    handleMouseMove(event) {
        const mouseX = event.evt.offsetX; // Συντεταγμένη X του ποντικιού σε σχέση με την μπάρα
        const barX = this.bar.x();
        const range = this.options.max - this.options.min;
        const tickCount = Math.round(range / this.options.step) + 1;
        const tickWidth = this.options.width / (tickCount - 1);

        // Υπολογισμός πλησιέστερης γραμμής
        const closestTick = Math.round(mouseX / tickWidth);

        // Τοποθέτηση "επιλογέα"
        this.handle.x(barX + closestTick * tickWidth);

        // Ενημέρωση τιμής
        const newValue = this.options.min + closestTick * this.options.step;

        // Έλεγχος για να μην ξεπεράσει τα όρια
        this.options.value = Math.max(this.options.min, Math.min(newValue, this.options.max));

        this.fireEventToAllOthers('range');
        this.options.onChange({ sender: this });
    }

    updateValue() {
        const barX = this.bar.x();
        const barWidth = this.options.width;
        const mouseX = this.handle.x();
    
        // Περιορισμός της κίνησης στα όρια της μπάρας
        let handleX = Math.max(barX, Math.min(mouseX, barX + barWidth));
        // Υπολογισμός της σχετικής θέσης του handleX σε σχέση με το barX
        handleX -= barX;
    
        const range = this.options.max - this.options.min;
        const tickCount = Math.round(range / this.options.step) + 1;
        const tickWidth = barWidth / (tickCount - 1);
    
        // Δημιουργία πίνακα αποστάσεων γραμμών κλίμακας από το barX
        const tickDistances = [];
        for (let i = 0; i < tickCount; i++) {
            tickDistances.push(i * tickWidth);
        }
    
        // Εύρεση πλησιέστερης γραμμής
        let closestTickIndex = 0;
        let minDistance = Math.abs(handleX - tickDistances[0]);
        for (let i = 1; i < tickCount; i++) {
            const distance = Math.abs(handleX - tickDistances[i]);
            if (distance < minDistance) {
                minDistance = distance;
                closestTickIndex = i;
            }
        }
    
        // Τοποθέτηση "επιλογέα" στην πλησιέστερη γραμμή
        this.handle.x(barX + tickDistances[closestTickIndex]);
    
        // Ενημέρωση τιμής
        const newValue = this.options.min + closestTickIndex * this.options.step;
    
        // Έλεγχος για να μην ξεπεράσει τα όρια
        this.options.value = Math.max(this.options.min, Math.min(newValue, this.options.max));
    
        this.fireEventToAllOthers('range');
        this.options.onChange({ sender: this });
    }

    updateHandlePosition() {
        const range = this.options.max - this.options.min;
        const position = (this.options.value - this.options.min) / range;
        const x = position * this.options.width;
        this.handle.x(x);
    }

    updateTooltipText() {
        const formattedValue = this.options.value.toFixed(this.options.decimals);
        this.tooltip.text(formattedValue);
    
        // Παίρνουμε τις διαστάσεις του text ΑΦΟΥ έχει οριστεί το κείμενο του tooltip
        const textWidth = this.tooltip.width();
        const textHeight = this.tooltip.height();
    
        // Προσαρμόζουμε το μέγεθος και τη θέση του background
        this.tooltipBackground.width(textWidth + 10); // +10 για padding
        this.tooltipBackground.height(textHeight + 10); // +10 για padding
    
        // Χρησιμοποιούμε το σύστημα συντεταγμένων του group για τη θέση του background
        this.tooltipBackground.x(-textWidth / 2 - 5); // -5 για να "αγκαλιάζει" το text
        this.tooltipBackground.y(-textHeight - 5); // -5 για να "αγκαλιάζει" το text
    
        // Κεντράρουμε το text ΜΕΣΑ στο background
        this.tooltip.x(-textWidth / 2); // 0 γιατί το background είναι ήδη τοποθετημένο σωστά
        this.tooltip.y(-textHeight); // -5 για να "κάθεται" πάνω στο background
    
        this.tooltipGroup.x(this.handle.x()); // Τοποθέτηση του group
        this.tooltipGroup.y(-this.tooltipGroup.height() - 5 - this.options.handleRadius * 2 ); // Τοποθέτηση πάνω από τον "επιλογέα"
         // Έλεγχος για την εμφάνιση του tooltip
         if (this.options.showTooltip) {
            this.tooltipGroup.visible(true);
        } else {
            this.tooltipGroup.visible(false);
        }
    }

    getValue() {
        return this.options.value;
    }

    setValue(value) {
        this.options.value = Math.max(this.options.min, Math.min(value, this.options.max)); // Έλεγχος για να μην ξεπεράσει τα όρια
        this.updateHandlePosition();
        this.updateTooltipText();
    }

    setDecimals(decimals) {
        this.options.decimals = decimals;
        this.updateTooltipText();
    }

    getDecimals(){
        return this.options.decimals;
    }

    setShowTooltip(show) {
        this.options.showTooltip = show;
        this.updateTooltipText(); // Ενημέρωση του tooltip
    }

    getShowTooltip() {
        return this.options.showTooltip;
    }

}

export { Range };