/*
Φυσικά, εδώ είναι η λίστα μεθόδων με υπογραφές και σύντομη περιγραφή για την κλάση `SpreadSheet`:

**Ιδιότητες `options`:**

* `cellWidth: number (default: 100)` - Πλάτος κελιών.
* `cellHeight: number (default: 30)` - Ύψος κελιών.
* `cellPadding: number (default: 5)` - Εσωτερικό κενό κελιών.
* `cellBackgroundColor: string (default: 'transparent')` - Φόντο κελιών.
* `cellStroke: string (default: 'black')` - Χρώμα περιγράμματος κελιών.
* `cellStrokeWidth: number (default: 1)` - Πάχος περιγράμματος κελιών.
* `cellStrokeEnabled: boolean (default: false)` - Ενεργοποίηση περιγράμματος κελιών.
* `tableBackgroundColor: string (default: 'transparent')` - Φόντο πίνακα.
* `tableStroke: string (default: 'black')` - Χρώμα περιγράμματος πίνακα.
* `tableStrokeWidth: number (default: 1)` - Πάχος περιγράμματος πίνακα.
* `tableStrokeEnabled: boolean (default: false)` - Ενεργοποίηση περιγράμματος πίνακα.
* `decimalPlaces: number (default: 2)` - Δεκαδικά ψηφία.
* `align: string (default: 'center')` - Στοίχιση κελιών.
* `stripedRowColor1: string (default: 'white')` - Χρώμα εναλλασσόμενων γραμμών 1.
* `stripedRowColor2: string (default: 'lightgray')` - Χρώμα εναλλασσόμενων γραμμών 2.
* `data: Array<Array> (default: [[]])` - Δεδομένα πίνακα.
* `isActive: boolean` - Ενεργοποίηση widget.
* `name: string` - Όνομα widget.
* `id: number` - Id widget.
* `currentStyle: string` - Το τρέχον στυλ του πίνακα.

**Μέθοδοι:**

* `constructor(options: Object)` - Κατασκευαστής πίνακα.
* `draw(): void` - Σχεδιάζει τον πίνακα.
* `applyTableStyle(styleName: string): void` - Εφαρμόζει στυλ πίνακα.
* `setCellValue(row: number, col: number, value: any): void` - Ορίζει τιμή κελιού.
* `getCellValue(row: number, col: number): any` - Επιστρέφει τιμή κελιού.
* `setCellStyles(row: number, col: number, styles: Object): void` - Ορίζει πολλαπλά στυλ κελιού.
* `setCellStyle(row: number, col: number, style: string, value: any): void` - Ορίζει στυλ κελιού.
* `insertRow(rowIndex: number, rowData?: Array): void` - Εισάγει γραμμή.
* `deleteRow(rowIndex: number): void` - Διαγράφει γραμμή.
* `insertColumn(colIndex: number, colData?: Array): void` - Εισάγει στήλη.
* `deleteColumn(colIndex: number): void` - Διαγράφει στήλη.
* `setTableBackgroundColor(color: string): void` - Ορίζει φόντο πίνακα.
* `setTableBorder(stroke: string, strokeWidth: number, strokeEnabled: boolean): void` - Ορίζει περίγραμμα πίνακα.
* `setCellBackgroundColor(color: string): void` - Ορίζει φόντο κελιών.
* `setCellBorder(stroke: string, strokeWidth: number, strokeEnabled: boolean): void` - Ορίζει περίγραμμα κελιών.
* `getData(): Array<Array>` - Επιστρέφει δεδομένα πίνακα.
* `setData(data: Array<Array>): void` - Ορίζει δεδομένα πίνακα.
* `clearData(): void` - Καθαρίζει δεδομένα πίνακα.
* `setRowStyle(row: number, style: Object): void` - Ορίζει στυλ γραμμής.
* `setColumnStyle(col: number, style: Object): void` - Ορίζει στυλ στήλης.
* `setCellStyleRange(startRow: number, startCol: number, endRow: number, endCol: number, style: Object): void` - Ορίζει στυλ εύρους κελιών.
* `clearCellStyle(row: number, col: number): void` - Καθαρίζει στυλ κελιού.
* `clearCellStyleRange(startRow: number, startCol: number, endRow: number, endCol: number): void` - Καθαρίζει στυλ εύρους κελιών.
* `setTableStyle(style: Object): void` - Ορίζει στυλ πίνακα.
* `clearTableStyle(): void` - Καθαρίζει στυλ πίνακα.
* `setCellWidth(width: number): void` - Ορίζει πλάτος κελιών.
* `setCellHeight(height: number): void` - Ορίζει ύψος κελιών.
* `setCellPadding(padding: number): void` - Ορίζει padding κελιών.
* `setDecimalPlaces(decimalPlaces: number): void` - Ορίζει δεκαδικά ψηφία.
* `setAlign(align: string): void` - Ορίζει στοίχιση κελιών.
* `redraw(): void` - Επανασχεδιάζει πίνακα.
* `getTotalWidth(): number` - Επιστρέφει συνολικό πλάτος.
* `getTotalHeight(): number` - Επιστρέφει συνολικό ύψος.
*/

import { Widget } from './widget.js';
/**
 * @class SpreadSheet
 * @classdesc Ένα widget που αναπαριστά έναν πίνακα (spreadsheet) με δυνατότητες επεξεργασίας δεδομένων και στυλ.
 * @extends Widget
 */
class SpreadSheet extends Widget {
     /**
     * @constructor
     * @param {Object} options - Οι επιλογές για τη δημιουργία του SpreadSheet.
     * @param {number} [options.cellWidth=100] - Το πλάτος κάθε κελιού.
     * @param {number} [options.cellHeight=30] - Το ύψος κάθε κελιού.
     * @param {number} [options.cellPadding=5] - Το padding κάθε κελιού.
     * @param {string} [options.cellBackgroundColor='transparent'] - Το χρώμα φόντου κάθε κελιού.
     * @param {string} [options.cellStroke='black'] - Το χρώμα περιγράμματος κάθε κελιού.
     * @param {number} [options.cellStrokeWidth=1] - Το πάχος περιγράμματος κάθε κελιού.
     * @param {boolean} [options.cellStrokeEnabled=false] - Ενεργοποίηση/απενεργοποίηση περιγράμματος κελιού.
     * @param {string} [options.tableBackgroundColor='transparent'] - Το χρώμα φόντου του πίνακα.
     * @param {string} [options.tableStroke='black'] - Το χρώμα περιγράμματος του πίνακα.
     * @param {number} [options.tableStrokeWidth=1] - Το πάχος περιγράμματος του πίνακα.
     * @param {boolean} [options.tableStrokeEnabled=false] - Ενεργοποίηση/απενεργοποίηση περιγράμματος πίνακα.
     * @param {number} [options.decimalPlaces=2] - Ο αριθμός των δεκαδικών ψηφίων για τους αριθμούς.
     * @param {string} [options.align='center'] - Η στοίχιση των κελιών.
     * @param {string} [options.stripedRowColor1='white'] - Το χρώμα της πρώτης εναλλασσόμενης γραμμής (striped rows).
     * @param {string} [options.stripedRowColor2='lightgray'] - Το χρώμα της δεύτερης εναλλασσόμενης γραμμής (striped rows).
     * @param {Array<Array>} [options.data=[[]]] - Τα αρχικά δεδομένα του πίνακα.
     */
    constructor(options) {
        super(options);

        this.options.isActive = false;
        this.options.name = "SpreadSheet"+this.options.id; 
        this.options = {
            ...this.options,
            cellWidth: options.cellWidth || 100,
            cellHeight: options.cellHeight || 30,
            cellPadding: options.cellPadding || 5,
            cellBackgroundColor: options.cellBackgroundColor || 'transparent',
            cellStroke: options.cellStroke || 'black',
            cellStrokeWidth: options.cellStrokeWidth || 1,
            cellStrokeEnabled: options.cellStrokeEnabled || false,
            tableBackgroundColor: options.tableBackgroundColor || 'transparent',
            tableStroke: options.tableStroke || 'black',
            tableStrokeWidth: options.tableStrokeWidth || 1,
            tableStrokeEnabled: options.tableStrokeEnabled || false,
            decimalPlaces: options.decimalPlaces || 2,
            align: options.align || 'center',
            stripedRowColor1: options.stripedRowColor1 || 'white',
            stripedRowColor2: options.stripedRowColor2 || 'lightgray',
            cornerRadius: options.cornerRadius || 0,
        };

        this.data = options.data || [[]];
        this.cellStyles = {};

        this.draw();
    }

    /**
     * @method draw
     * @description Σχεδιάζει τον πίνακα στο canvas με βάση τα δεδομένα και τις επιλογές.
     * @returns {void}
     */
    draw() {
        this.removeChildren();

        const cellWidth = this.options.cellWidth;
        const cellHeight = this.options.cellHeight;
        const cellPadding = this.options.cellPadding;
        const decimalPlaces = this.options.decimalPlaces;

        // Δημιουργία φόντου
        const tableBackground = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.data[0].length * cellWidth,
            height: this.data.length * cellHeight,
            fill: this.options.tableBackgroundColor,
        });
        this.add(tableBackground);

        // Δημιουργία περιγράμματος
        const tableBorder = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.data[0].length * cellWidth,
            height: this.data.length * cellHeight,
            stroke: this.options.tableStroke,
            strokeWidth: this.options.tableStrokeWidth,
            strokeEnabled: !!this.options.tableStrokeEnabled,
            cornerRadius: this.options.cornerRadius ,
        });

        this.data.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellStyle = this.cellStyles[`${rowIndex}-${colIndex}`] || {};
                let cellBackgroundColor = cellStyle.backgroundColor || this.options.cellBackgroundColor;
                // Εναλλαγή χρωμάτων γραμμών αν το στυλ είναι stripedRows
                if (this.options.currentStyle === 'stripedRows' || this.options.currentStyle === 'stripedRowsNoBorders') {
                    cellBackgroundColor = rowIndex % 2 === 0 ? this.options.stripedRowColor1 : this.options.stripedRowColor2;
                }

                const cellRect = new Konva.Rect({
                    x: colIndex * cellWidth,
                    y: rowIndex * cellHeight,
                    width: cellWidth,
                    height: cellHeight,
                    fill: cellBackgroundColor,
                    stroke: cellStyle.stroke || this.options.cellStroke,
                    strokeWidth: cellStyle.strokeWidth || this.options.cellStrokeWidth,
                    strokeEnabled: !!this.options.cellStrokeEnabled,
                    cornerRadius: this.options.cornerRadius,
                });
                this.add(cellRect);

                let textValue = cell;
                if (typeof cell === 'number') {
                    textValue = cell.toFixed(decimalPlaces);
                }

                const text = new Konva.Text({
                    x: colIndex * cellWidth + cellPadding,
                    y: rowIndex * cellHeight + cellPadding,
                    width: cellWidth - 2 * cellPadding,
                    height: cellHeight - 2 * cellPadding,
                    text: textValue,
                    align: cellStyle.align || this.options.align,
                    verticalAlign: 'middle',
                    fontStyle: cellStyle.fontStyle || "normal",
                    fontSize: cellStyle.fontSize || 12,
                    
                });
                this.add(text);
            });
        });

        this.add(tableBorder);
    }

     /**
     * @method applyTableStyle
     * @description Εφαρμόζει ένα προκαθορισμένο στυλ στον πίνακα.
     * Τα διαθέσιμα στυλ είναι τα default, bordered, stripedRows, stripedRowsNoBorders
     * @param {string} styleName - Το όνομα του στυλ που θα εφαρμοστεί.
     * @returns {void}
     */
    applyTableStyle(styleName) {
        const tableStyles = {
            'default': {
                tableBackgroundColor: 'transparent',
                tableStrokeEnabled: false,
                cellBackgroundColor: 'transparent',
                cellStrokeEnabled: false,
            },
            'bordered': {
                tableBackgroundColor: 'white',
                tableStrokeEnabled: true,
                tableStroke: 'black',
                tableStrokeWidth: 1,
                cellBackgroundColor: 'white',
                cellStrokeEnabled: true,
                cellStroke: 'gray',
                cellStrokeWidth: 1,
            },
            'stripedRows': {
                tableBackgroundColor: 'white',
                tableStrokeEnabled: true,
                tableStroke: 'black',
                tableStrokeWidth: 1,
                cellBackgroundColor: 'white', // Χρώμα για τις άρτιες γραμμές
                cellStrokeEnabled: true,
                cellStroke: 'gray',
                cellStrokeWidth: 1,
            },
            'stripedRowsNoBorders': { // Προσθήκη στυλ stripedRowsNoBorders
                tableBackgroundColor: 'white',
                tableStrokeEnabled: false, // Απενεργοποίηση περιθωρίων πίνακα
                cellBackgroundColor: 'white',
                cellStrokeEnabled: false, // Απενεργοποίηση περιθωρίων κελιών
            },
            // Προσθέστε περισσότερα στυλ εδώ
        };

        const style = tableStyles[styleName] || tableStyles['default'];

        this.options = {
            ...this.options,
            ...style,
        };

        this.options.currentStyle = styleName; // Αποθήκευση του τρέχοντος στυλ
        this.draw();
    }

      /**
     * @method setCellValue
     * @description Ορίζει την τιμή ενός κελιού στον πίνακα.
     * @param {number} row - Ο δείκτης της γραμμής του κελιού.
     * @param {number} col - Ο δείκτης της στήλης του κελιού.
     * @param {*} value - Η τιμή που θα οριστεί στο κελί.
     * @returns {void}
     * @throws {Error} Εάν οι συντεταγμένες του κελιού είναι άκυρες.
     */
    setCellValue(row, col, value) {
        if (this.data[row] && this.data[row][col] !== undefined) {
            this.data[row][col] = value;
            this.draw();
        } else {
            console.error("Invalid cell coordinates");
        }
    }

     /**
     * @method getCellValue
     * @description Επιστρέφει την τιμή ενός κελιού στον πίνακα.
     * @param {number} row - Ο δείκτης της γραμμής του κελιού.
     * @param {number} col - Ο δείκτης της στήλης του κελιού.
     * @returns {*} Η τιμή του κελιού ή undefined αν οι συντεταγμένες είναι άκυρες.
     * @throws {Error} Εάν οι συντεταγμένες του κελιού είναι άκυρες.
     */
    getCellValue(row, col) {
        if (this.data[row] && this.data[row][col] !== undefined) {
            return this.data[row][col];
        } else {
            console.error("Invalid cell coordinates");
            return undefined;
        }
    }

     /**
     * @method setCellStyles
     * @description Ορίζει πολλαπλά στυλ για ένα κελί στον πίνακα.
     * @param {number} row - Ο δείκτης της γραμμής του κελιού.
     * @param {number} col - Ο δείκτης της στήλης του κελιού.
     * @param {Object} styles - Ένα αντικείμενο που περιέχει τα στυλ που θα εφαρμοστούν στο κελί.
     * @returns {void}
     * @throws {Error} Εάν οι συντεταγμένες του κελιού είναι άκυρες.
     */
     setCellStyles(row, col, styles) {
        if (this.data[row] && this.data[row][col] !== undefined) {
            if (!this.cellStyles[`${row}-${col}`]) {
                this.cellStyles[`${row}-${col}`] = {};
            }
            for (const prop in styles) {
                this.cellStyles[`${row}-${col}`][prop] = styles[prop];
            }
            this.draw();
        } else {
            console.error("Invalid cell coordinates");
        }
    }

    /**
     * @method setCellStyle
     * @description Ορίζει ένα συγκεκριμένο στυλ για ένα κελί στον πίνακα.
     * @param {number} row - Ο δείκτης της γραμμής του κελιού.
     * @param {number} col - Ο δείκτης της στήλης του κελιού.
     * @param {string} style - Το όνομα του στυλ που θα οριστεί (π.χ., 'backgroundColor', 'color').
     * @param {*} value - Η τιμή του στυλ που θα οριστεί.
     * @returns {void}
     * @throws {Error} Εάν οι συντεταγμένες του κελιού είναι άκυρες.
     */
    setCellStyle(row, col, style, value) {
        if (this.data[row] && this.data[row][col] !== undefined) {
            if (!this.cellStyles[`${row}-${col}`]) {
                this.cellStyles[`${row}-${col}`] = {};
            }
            this.cellStyles[`${row}-${col}`][style] = value;
            this.draw();
        } else {
            console.error("Invalid cell coordinates");
        }
    }

    /**
     * @method insertRow
     * @description Εισάγει μια νέα γραμμή στον πίνακα στη συγκεκριμένη θέση.
     * @param {number} rowIndex - Ο δείκτης της γραμμής όπου θα εισαχθεί η νέα γραμμή.
     * @param {Array} [rowData=[]] - Τα δεδομένα της νέας γραμμής (προαιρετικό).
     * @returns {void}
     * @throws {Error} Εάν ο δείκτης της γραμμής είναι άκυρος.
     */
    insertRow(rowIndex, rowData) {
        if (rowIndex < 0 || rowIndex > this.data.length) {
            console.error("Invalid rowIndex");
            return;
        }

        this.data.splice(rowIndex, 0, rowData || []);
        this.draw();
    }

    /**
     * @method deleteRow
     * @description Διαγράφει τη γραμμή στον πίνακα στη συγκεκριμένη θέση.
     * @param {number} rowIndex - Ο δείκτης της γραμμής που θα διαγραφεί.
     * @returns {void}
     * @throws {Error} Εάν ο δείκτης της γραμμής είναι άκυρος.
     */
    deleteRow(rowIndex) {
        if (rowIndex < 0 || rowIndex >= this.data.length) {
            console.error("Invalid rowIndex");
            return;
        }

        this.data.splice(rowIndex, 1);
        this.draw();
    }

    /**
     * @method insertColumn
     * @description Εισάγει μια νέα στήλη στον πίνακα στη συγκεκριμένη θέση.
     * @param {number} colIndex - Ο δείκτης της στήλης όπου θα εισαχθεί η νέα στήλη.
     * @param {Array} [colData=[]] - Τα δεδομένα της νέας στήλης (προαιρετικό).
     * @returns {void}
     * @throws {Error} Εάν ο δείκτης της στήλης είναι άκυρος ή ο πίνακας είναι κενός.
     */
    insertColumn(colIndex, colData) {
        if (this.data.length === 0) {
            console.error("Cannot insert column into an empty table");
            return;
        }

        if (colIndex < 0 || colIndex > this.data[0].length) {
            console.error("Invalid colIndex");
            return;
        }

        for (let i = 0; i < this.data.length; i++) {
            this.data[i].splice(colIndex, 0, colData && colData[i] !== undefined ? colData[i] : null);
        }
        this.draw();
    }

    /**
     * @method deleteColumn
     * @description Διαγράφει τη στήλη στον πίνακα στη συγκεκριμένη θέση.
     * @param {number} colIndex - Ο δείκτης της στήλης που θα διαγραφεί.
     * @returns {void}
     * @throws {Error} Εάν ο δείκτης της στήλης είναι άκυρος ή ο πίνακας είναι κενός.
     */
    deleteColumn(colIndex) {
        if (this.data.length === 0 || this.data[0].length === 0) {
            console.error("Cannot delete column from an empty table");
            return;
        }

        if (colIndex < 0 || colIndex >= this.data[0].length) {
            console.error("Invalid colIndex");
            return;
        }

        for (let i = 0; i < this.data.length; i++) {
            this.data[i].splice(colIndex, 1);
        }
        this.draw();
    }

    /**
     * @method setTableBackgroundColor
     * @description Ορίζει το χρώμα φόντου του πίνακα.
     * @param {string} color - Το χρώμα που θα οριστεί ως φόντο του πίνακα.
     * @returns {void}
     */
    setTableBackgroundColor(color) {
        this.options.tableBackgroundColor = color;
        this.draw();
    }

    /**
     * @method setTableBorder
     * @description Ορίζει το περίγραμμα του πίνακα.
     * @param {string} stroke - Το χρώμα του περιγράμματος.
     * @param {number} strokeWidth - Το πάχος του περιγράμματος.
     * @param {boolean} strokeEnabled - Ενεργοποίηση/απενεργοποίηση του περιγράμματος.
     * @returns {void}
     */
    setTableBorder(stroke, strokeWidth, strokeEnabled) {
        this.options.tableStroke = stroke;
        this.options.tableStrokeWidth = strokeWidth;
        this.options.tableStrokeEnabled = strokeEnabled;
        this.draw();
    }

    /**
     * @method setCellBackgroundColor
     * @description Ορίζει το χρώμα φόντου των κελιών.
     * @param {string} color - Το χρώμα που θα οριστεί ως φόντο των κελιών.
     * @returns {void}
     */
    setCellBackgroundColor(color) {
        this.options.cellBackgroundColor = color;
        this.draw();
    }

    /**
     * @method setCellBorder
     * @description Ορίζει το περίγραμμα των κελιών.
     * @param {string} stroke - Το χρώμα του περιγράμματος.
     * @param {number} strokeWidth - Το πάχος του περιγράμματος.
     * @param {boolean} strokeEnabled - Ενεργοποίηση/απενεργοποίηση του περιγράμματος.
     * @returns {void}
     */
    setCellBorder(stroke, strokeWidth, strokeEnabled) {
        this.options.cellStroke = stroke;
        this.options.cellStrokeWidth = strokeWidth;
        this.options.cellStrokeEnabled = strokeEnabled;
        this.draw();
    }

    /**
     * @method getData
     * @description Επιστρέφει τα δεδομένα του πίνακα.
     * @returns {Array<Array>} Τα δεδομένα του πίνακα.
     */
    getData() {
        return this.data;
    }

    /**
     * @method setData
     * @description Ορίζει τα δεδομένα του πίνακα.
     * @param {Array<Array>} data - Τα νέα δεδομένα του πίνακα.
     * @returns {void}
     */
    setData(data) {
        this.data = data || [[]];
        this.draw();
    }

    /**
     * @method clearData
     * @description Καθαρίζει τα δεδομένα του πίνακα.
     * @returns {void}
     */
    clearData() {
        this.data = [[]];
        this.draw();
    }

    /**
     * @method setRowStyle
     * @description Ορίζει στυλ για ολόκληρη τη γραμμή.
     * @param {number} row - Ο δείκτης της γραμμής.
     * @param {Object} style - Τα στυλ που θα εφαρμοστούν.
     * @returns {void}
     * @throws {Error} Εάν ο δείκτης της γραμμής είναι άκυρος.
     */
    setRowStyle(row, style) {
        if (this.data[row]) {
            for (let col = 0; col < this.data[row].length; col++) {
                // Δημιουργία νέου αντικειμένου στυλ
                const newStyle = { ...style };
    
                // Συνδυασμός με τα υπάρχοντα στυλ
                this.setCellStyles(row, col, newStyle);
            }
        } else {
            console.error("Invalid row index");
        }
    }

    /**
     * @method setColumnStyle
     * @description Ορίζει στυλ για ολόκληρη τη στήλη.
     * @param {number} col - Ο δείκτης της στήλης.
     * @param {Object} style - Τα στυλ που θα εφαρμοστούν.
     * @returns {void}
     * @throws {Error} Εάν ο δείκτης της στήλης είναι άκυρος.
     */
    setColumnStyle(col, style) {
        if (this.data.length > 0 && col < this.data[0].length) {
            for (let row = 0; row < this.data.length; row++) {
                this.setCellStyles(row, col, style);
            }
        } else {
            console.error("Invalid column index");
        }
    }

    /**
     * @method setCellStyleRange
     * @description Ορίζει στυλ για ένα εύρος κελιών.
     * @param {number} startRow - Ο δείκτης της αρχικής γραμμής.
     * @param {number} startCol - Ο δείκτης της αρχικής στήλης.
     * @param {number} endRow - Ο δείκτης της τελικής γραμμής.
     * @param {number} endCol - Ο δείκτης της τελικής στήλης.
     * @param {Object} style - Τα στυλ που θα εφαρμοστούν.
     * @returns {void}
     */
    setCellStyleRange(startRow, startCol, endRow, endCol, style) {
        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                if (this.data[row] && this.data[row][col] !== undefined) {
                    this.setCellStyles(row, col, style);
                }
            }
        }
    }

    /**
     * @method clearCellStyle
     * @description Καθαρίζει τα στυλ ενός κελιού.
     * @param {number} row - Ο δείκτης της γραμμής του κελιού.
     * @param {number} col - Ο δείκτης της στήλης του κελιού.
     * @returns {void}
     * @throws {Error} Εάν οι συντεταγμένες του κελιού είναι άκυρες.
     */
    clearCellStyle(row, col) {
        if (this.data[row] && this.data[row][col] !== undefined) {
            delete this.cellStyles[`${row}-${col}`];
            this.draw();
        } else {
            console.error("Invalid cell coordinates");
        }
    }

    /**
     * @method clearCellStyleRange
     * @description Καθαρίζει τα στυλ ενός εύρους κελιών.
     * @param {number} startRow - Ο δείκτης της αρχικής γραμμής.
     * @param {number} startCol - Ο δείκτης της αρχικής στήλης.
     * @param {number} endRow - Ο δείκτης της τελικής γραμμής.
     * @param {number} endCol - Ο δείκτης της τελικής στήλης.
     * @returns {void}
     */
    clearCellStyleRange(startRow, startCol, endRow, endCol) {
        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                if (this.data[row] && this.data[row][col] !== undefined) {
                    delete this.cellStyles[`${row}-${col}`];
                }
            }
        }
        this.draw();
    }

    /**
     * @method setTableStyle
     * @description Ορίζει πολλαπλά στυλ για τον πίνακα.
     * @param {Object} style - Τα στυλ που θα εφαρμοστούν στον πίνακα.
     * @returns {void}
     */
    setTableStyle(style) {
        this.options = {
            ...this.options,
            ...style,
        };
        this.draw();
    }

    /**
     * @method clearTableStyle
     * @description Καθαρίζει τα στυλ του πίνακα και τα επαναφέρει στις προεπιλεγμένες τιμές.
     * @returns {void}
     */
    clearTableStyle() {
        this.options = {
            ...this.options,
            tableBackgroundColor: 'transparent',
            tableStrokeEnabled: false,
            cellBackgroundColor: 'transparent',
            cellStrokeEnabled: false,
        };
        this.draw();
    }

    /**
     * @method setCellWidth
     * @description Ορίζει το πλάτος των κελιών.
     * @param {number} width - Το πλάτος που θα οριστεί για τα κελιά.
     * @returns {void}
     */
    setCellWidth(width) {
        this.options.cellWidth = width;
        this.draw();
    }

    /**
     * @method setCellHeight
     * @description Ορίζει το ύψος των κελιών.
     * @param {number} height - Το ύψος που θα οριστεί για τα κελιά.
     * @returns {void}
     */
    setCellHeight(height) {
        this.options.cellHeight = height;
        this.draw();
    }

    /**
     * @method setCellPadding
     * @description Ορίζει το padding των κελιών.
     * @param {number} padding - Το padding που θα οριστεί για τα κελιά.
     * @returns {void}
     */
    setCellPadding(padding) {
        this.options.cellPadding = padding;
        this.draw();
    }

    /**
     * @method setDecimalPlaces
     * @description Ορίζει τον αριθμό των δεκαδικών ψηφίων για τους αριθμούς.
     * @param {number} decimalPlaces - Ο αριθμός των δεκαδικών ψηφίων που θα χρησιμοποιηθεί.
     * @returns {void}
     */
    setDecimalPlaces(decimalPlaces) {
        this.options.decimalPlaces = decimalPlaces;
        this.draw();
    }

    /**
     * @method setAlign
     * @description Ορίζει την στοίχιση των κελιών.
     * @param {string} align - Η στοίχιση που θα οριστεί για τα κελιά ('left', 'center', 'right').
     * @returns {void}
     */
    setAlign(align) {
        this.options.align = align;
        this.draw();
    }

    /**
     * @method redraw
     * @description Επανασχεδιάζει τον πίνακα.
     * @returns {void}
     */
    redraw() {
        this.draw();
    }

    /**
     * @method getTotalWidth
     * @description Επιστρέφει το συνολικό πλάτος του πίνακα.
     * @returns {number} Το συνολικό πλάτος του πίνακα.
     */
    getTotalWidth() {
        if (!this.children || this.children.length === 0) {
            return 0;
        }
        const rect = this.getClientRect();
        return rect.width;
    }

    /**
     * @method getTotalHeight
     * @description Επιστρέφει το συνολικό ύψος του πίνακα.
     * @returns {number} Το συνολικό ύψος του πίνακα.
     */
    getTotalHeight() {
        if (!this.children || this.children.length === 0) {
            return 0;
        }
        const rect = this.getClientRect();
        return rect.height;
    }

}

export { SpreadSheet };