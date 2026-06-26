/*
Πολύ ωραία! Η χρήση της κλάσης `Arrow` για την αναπαράσταση διανυσματικών μεγεθών σε εικονικά εργαστήρια είναι μια εξαιρετική ιδέα. Ας δούμε μερικές επιπλέον λειτουργίες και βελτιώσεις που μπορούμε να προσθέσουμε για να την κάνουμε ακόμα πιο λειτουργική:

1.  **Αλληλεπίδραση με το Βέλος:**

    * **Drag and Drop:**
        * Προσθέστε τη δυνατότητα να μετακινείτε το βέλος με drag-and-drop.
        * Χρήσιμο για την τοποθέτηση διανυσμάτων σε διάφορα σημεία του εικονικού εργαστηρίου.
    * **Αλλαγή Μεγέθους και Κατεύθυνσης με Handles:**
        * Προσθέστε "handles" στα άκρα του βέλους που να επιτρέπουν την αλλαγή του μεγέθους και της κατεύθυνσης με drag.
        * Πολύ διαισθητικό για την προσαρμογή των διανυσμάτων.

2.  **Εμφάνιση Πληροφοριών:**

    * **Εμφάνιση Μεγέθους και Κατεύθυνσης:**
        * Προσθέστε τη δυνατότητα να εμφανίζονται το μέγεθος και η κατεύθυνση του βέλους δίπλα του.
        * Χρήσιμο για την άμεση ανάγνωση των τιμών των διανυσμάτων.
    * **Εμφάνιση Συντεταγμένων:**
        * Προσθέστε τη δυνατότητα να εμφανίζονται οι συντεταγμένες της αρχικής και της τελικής θέσης του βέλους.
        * Χρήσιμο για την ακριβή τοποθέτηση των διανυσμάτων.

3.  **Μαθηματικές Λειτουργίες:**

    * **Πρόσθεση και Αφαίρεση Διανυσμάτων:**
        * Προσθέστε μεθόδους για την πρόσθεση και την αφαίρεση δύο ή περισσότερων βελών.
        * Βασική λειτουργία για την αναπαράσταση διανυσματικών προσθέσεων και αφαιρέσεων.
    * **Πολλαπλασιασμός με Βαθμωτό Μέγεθος:**
        * Προσθέστε μέθοδο για τον πολλαπλασιασμό του βέλους με ένα βαθμωτό μέγεθος.
        * Χρήσιμο για την αλλαγή του μεγέθους του διανύσματος με έναν συντελεστή.
    * **Υπολογισμός Προβολής:**
        * Προσθέστε μέθοδο για τον υπολογισμό της προβολής ενός βέλους πάνω σε ένα άλλο.
        * Χρήσιμο για διανυσματική ανάλυση.

4.  **Οπτικές Βελτιώσεις:**

    * **Διαφορετικά Στυλ Κεφαλιού:**
        * Προσθέστε περισσότερα στυλ κεφαλιού βέλους (π.χ., τριγωνικό, ρόμβος, κύκλος).
    * **Animation:**
        * Προσθέστε animation για την αλλαγή του μεγέθους ή της κατεύθυνσης του βέλους.
        * Κάνει την αλληλεπίδραση πιο ομαλή και ενδιαφέρουσα.
    * **Χρωματική Κωδικοποίηση:**
        * Προσθέστε τη δυνατότητα να αλλάζει το χρώμα του βέλους ανάλογα με το μέγεθος ή την κατεύθυνση.
        * Χρήσιμο για την οπτικοποίηση των διανυσματικών μεγεθών.

5.  **Ειδικές Λειτουργίες για Εικονικά Εργαστήρια:**

    * **Σύνδεση με Άλλα Αντικείμενα:**
        * Προσθέστε τη δυνατότητα να συνδέετε το βέλος με άλλα αντικείμενα του εικονικού εργαστηρίου.
        * Χρήσιμο για την αναπαράσταση δυνάμεων που ασκούνται σε αντικείμενα.
    * **Εμφάνιση Δυνάμεων:**
        * Προσθέστε την δυνατότητα να εμφανίζονται οι δυνάμεις που ασκούνται σε ένα σώμα.
        * Χρήσιμο για εργαστήρια μηχανικής.
    * **Εμφάνιση Ταχυτήτων και Επιταχύνσεων:**
        * Προσθέστε την δυνατότητα να εμφανίζονται ταχύτητες και επιταχύνσεις σε εργαστήρια κινηματικής.

Με αυτές τις προσθήκες, η κλάση `Arrow` θα γίνει ένα ισχυρό εργαλείο για την αναπαράσταση διανυσματικών μεγεθών στα εικονικά εργαστήριά σας.

*/

import { Vector } from '../math/vector.js';
import { Widget } from './widget.js';

class VisualVector extends Widget {
  constructor(config) {
    super(config);
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
        direction: config.direction,
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

  setColor(color) {
    this.path.stroke(color);
    this.path.fill(color);
    //this.path.draw();
  }

  setDirection(direction) {
    this.options.direction = direction;
    this.options.vector = {
      x: this.options.magnitude * Math.cos(this.options.direction),
      y: this.options.magnitude * Math.sin(this.options.direction),
    };
    this.update();
  }

  setMagnitude(magnitude) {
    this.options.magnitude = magnitude;
    this.options.vector = {
      x: this.options.magnitude * Math.cos(this.options.direction),
      y: this.options.magnitude * Math.sin(this.options.direction),
    };
    this.update();
  }

  setStartPosition(startX, startY) {
    this.options.startX = startX;
    this.options.startY = startY;
    this.update();
  }

  setEndPosition(endX, endY) {
    this.options.endX = endX;
    this.options.endY = endY;
    this.setVector(); // Κλήση της setVector για να υπολογιστούν τα νέα magnitude και direction
  }

  setStrokeWidth(strokeWidth) {
    this.path.strokeWidth(strokeWidth);
    //this.path.draw();
  }

  setBodyWidth(bodyWidth) {
    this.options.bodyWidth = bodyWidth;
    this.update();
  }

  setHeadWidth(headWidth) {
    this.options.headWidth = headWidth;
    this.update();
  }

  setHeadLength(headLength) {
    this.options.headLength = headLength;
    this.update();
  }

  setCurveAmount(curveAmount) {
    this.options.curveAmount = curveAmount;
    this.update();
  }

  setDashPattern(dashPattern) {
    this.options.dash = dashPattern;
    this.update();
  }

  setRoundRadius(roundRadius) {
    this.options.roundRadius = roundRadius;
    this.update();
  }

  setShadow(shadowConfig) {
    this.options.shadowColor = shadowConfig.color;
    this.options.shadowBlur = shadowConfig.blur;
    this.options.shadowOffsetX = shadowConfig.offsetX;
    this.options.shadowOffsetY = shadowConfig.offsetY;
    this.options.shadowOpacity = shadowConfig.opacity;
    this.update();
  }

  setLineCap(lineCap) {
    this.options.lineCap = lineCap;
    this.update();
  }

  setLineJoin(lineJoin) {
    this.options.lineJoin = lineJoin;
    this.update();
  }


  setArrowType(arrowType) {
    this.options.arrowType = arrowType;
    this.update();
  }

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
      default:
        pathData = this.createArrowPath(this.options.magnitude, this.options.bodyWidth, this.options.headWidth, this.options.headLength);
        break;
    }

    this.path.data(pathData);
    this.path.position({ x: this.options.startX, y: this.options.startY });
    this.path.rotation(this.options.direction * 180 / Math.PI);
    //this.path.draw();
  }

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

}

export { VisualVector };