/**
* Βασική προηπόθεση είναι να έχει φορτωθεί η βιβλιοθήκη Konva.js
* Μέσα στην αρχική ιστοσελίδα του έργου που χρησιμοποιεί τις
* παρακάτω κλάσεις.
*
* <script src="./konva/konva.js"></script>
*/

// widgets/widget.js
class Widget extends Konva.Group {
    static _nextId = 0;
    static MAX_ID = Number.MAX_SAFE_INTEGER;

    /**
    * Επιστρέφει ένα μοναδικό μη αρνητικό αναγνωριστικό ID.
    * @method nextId
    * @return {Number} Μοναδικό μη αρνητικό αναγνωριστικό ID
    */
    static nextId() {
    if (this._nextId >= this.MAX_ID) {
        console.error("nextId(): Έφτασε το μέγιστο όριο ID!");
        return null;
    }
    return this._nextId++;
    };

    /**
     * @constructor
     * @param {Object} options - Οι επιλογές για τη δημιουργία του widget.
     * @param {number} [options.x=0] - Η θέση x του widget.
     * @param {number} [options.y=0] - Η θέση y του widget.
     * @param {number} [options.width=100] - Το πλάτος του widget.
     * @param {number} [options.height=10] - Το ύψος του widget.
     * @param {boolean} [options.isActive=false] - Αν το widget είναι ενεργό.
     * @param {boolean} [options.draggable=false] - Αν το widget είναι draggable.
     * @param {function} [options.handleClick] - Η συνάρτηση που καλείται στο click event.
     * @param {function} [options.handleMouseOver] - Η συνάρτηση που καλείται στο mouseover event.
     * @param {function} [options.handleMouseOut] - Η συνάρτηση που καλείται στο mouseout event.
     */
    constructor(options) {
      super();

      //Ο μοναδικός κωδικός του widgets
      const id = Widget.nextId();

      this.options = { 
        x: options.x || 0, 
        y: options.y || 0,
        width: options.width || 100,
        height: options.height || 10,
        padding: options.padding || 5,
        id: id,
        name: options.name || "Widget"+ id,
        isActive: options.isActive || false,
        draggable: options.draggable || false,
       // handleClick: options.handleClick || this.handleClick,
        //handleMouseOver: options.handleMouseOver || this.handleMouseOver,
        //handleMouseOut: options.handleMouseOut || this.handleMouseOut,
        //handleFocus: options.handleFocus || this.handleFocus,
        handleBlur: options.handleBlur || this.handleBlur,
    };
  
      // Θέτουμε τη θέση του widget
      this.setPosition({ x: this.options.x , y: this.options.y });
  
      // Κάνουμε το widget να είναι draggable αν το επιθυμούμε
      this.draggable(this.options.draggable);

      //Προσδιορίζουμε το πλάτος και το ύψος
      this.width(this.options.width);
      this.height(this.options.height);

    }

    getAllWidgetsFromThisStage(stage) {
        const widgets = [];
    
        // Έλεγχος αν το stage είναι null ή undefined
        if (!stage) {
        console.error("Το stage δεν έχει οριστεί.");
        return widgets; // Επιστρέφουμε έναν άδειο πίνακα
        }
    
        // Επανάληψη σε όλα τα παιδιά του stage
        stage.getChildren().forEach(child => {
        // Έλεγχος αν το παιδί είναι instance της κλάσης Widget
        if (child instanceof Widget) {
            widgets.push(child);
        } else if (child instanceof Konva.Layer) { // Ελέγχουμε αν είναι layer
            child.getChildren().forEach(grandchild => { // Αν είναι layer παίρνουμε τα παιδιά του
            if (grandchild instanceof Widget) {
                widgets.push(grandchild);
            }
            });
        }
        });
    
        return widgets;
    }

    fireEventToAllOthers(event) {
        const allWidgets = this.getAllWidgetsFromThisStage(this.getStage());
        const thisWidget = this; // Αποθηκεύουμε το τρέχον widget σε μια μεταβλητή για ευκολία
    
        allWidgets.forEach(widget => {
            if (widget !== thisWidget && !widget.hasChild(thisWidget)) { // Σιγουρευόμαστε ότι δεν στέλνουμε το γεγονός στον εαυτό μας
                widget.fire(event,{sender:this});
            }
        });
    }

    hasChild(child) {
        // Έλεγχος αν το child είναι null ή undefined
        if (!child) {
            return false;
        }

        let node = child.getParent();

        while (node) {
            if (node === this) {
                return true;
            }
            node = node.getParent();
        }

        return false;
    }

    isActive(){
        return !!this.options.isActive; 
    }

  }

  export { Widget };