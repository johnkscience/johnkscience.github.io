<!DOCTYPE html>
<html>
  <head>
    <!-- <script src="https://unpkg.com/konva@9.3.15/konva.min.js"></script> -->
    <title>johnkscience.Lab -- Ηλέκτριση με επαγωγή</title>
		<meta http-equiv="content-type" content="text/html;charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
		<meta name="generator" content="notepad++" />
		<meta name="description" content="johnkscience.blog. Νέα από την εκπαίδευση, άρθρα επιστημονικού ενδιαφέροντος, σημειώσεις Μαθηματικών, Φυσικής και Χημείας">
		<meta name="keywords" content="johnkscience.blog, Blog, Νέα, Εκπαίδευση, Δευτεροβάθμια, Σημειώσεις, Βοηθήματα, Γυμνάσιο, Λύκειο, Σπάρτη">
		<meta name="author" content="Γιάννης Κουμουνδούρος">
		<link href="./lab.css" type="text/css" rel="stylesheet"/>

    <script src="johnkscienceMath.js"></script>
    <script src="konva.js"></script>
    <script src="johnkscienceWindows.js"></script>
    <script src="johnkscienceSim2.js"></script>
    
  </head>
  <body>

    <div id="container" style="background-image: url('./background.png'); background-size: cover; width:1200px; height:600px;"></div>

    <script>
      var width =  1200;
      var height = 600;

      let stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height,
      });

      let layer = new Konva.Layer();
      stage.add(layer);
/*
      //Ο σταθερός αγωγός
      let conductor2 = new johnkscienceConductor({
        x:100,
        y:300,
        electron:{
          radius:3,
          fillStyle:'blue',
          strokeStyle:'white',
          strokeWidth:0.6,
        },
        nucleus:{
          radius:10,
          fillStyle:'red',
          strokeStyle:'gray',
          strokeWidth:0.5,
        },
        numberOfElectrons:50,
        nucleiInRow: 8,
        nucleiInCol: 3,
        boxWidth:400,
        boxHeight:100,
        fillStyle:'lightgreen',
        strokeStyle: 'gray',
        strokeWidth: 1,
        accelerationX:0,
        accelerationY:0,
        timeScale:1,
      });
      stage.add(conductor2); //είναι ένα layer
      conductor2.on('radioChangeValue', (event)=>{
        if(event.value == 'Αργά'){
          conductor.setTimeScale(0.5);
        }else if(event.value == 'Γρήγορα'){
          conductor.setTimeScale(2);
        }else{
          conductor.setTimeScale(1);
        }
      })
*/


 
/*

//Κουμπί έναρξης
      let buttonStart = new johnkscienceButton({
        x:50,
        y:230,
        name: 'buttonStart',
        fill:'lime',
        mouseoverFill: '#b3ffb3',
        stroke:'gray',
        strokeWidth:0.5,
        cornerRadius:10,
        fontSize:60,
        fontFamily:'Arial',
        fontColor:'#59a659',
        text:'\u{23F5}',
        padding:0,
        onClickFunc: function () {
           anim.start();
          },
      });
      layer.add(buttonStart);
      
      //Κουμπί παύσης
      let buttonStop = new johnkscienceButton({
        x:120,
        y:230,
        name: 'buttonStop',
        fill:'lime',
        mouseoverFill: '#b3ffb3',
        stroke:'gray',
        strokeWidth:0.5,
        cornerRadius:10,
        fontSize:60,
        fontFamily:'Arial',
        fontColor:'#59a659',
        text:'\u{23F8}',
        padding:0,
        onClickFunc: function () {
          anim.stop();
          },
        
      });
      layer.add(buttonStop);



//Τίτλος επιλογής φορτίου
      let labelRadioTimeScale = new Konva.Text({
        x:340,
        y:80,
        text:'Ταχύτητα προσομοίωσης',
        fontSize: 14,
        fontFamily: 'Calibri',
        stroke:'gray',
        strokeWidth:1,
      });
      layer.add(labelRadioTimeScale);

      //Το στοιχείο radio επιλογής του φορτίου της σφαίρας
      let radioTimeScale = new johnkscienceRadio({
        x:340,
        y:100,
        name:'radioTimeScale',
        fill:'red',
        stroke:"blue",
        values:['Κανονικά', 'Αργά', 'Γρήγορα'],
        fontSize:14,
        fontFamily:'Calibri',
        fontColor:'black',
        padding:5,
        listener:layer,
      })
      layer.add(radioTimeScale);

      //Δημιουργία του αγωγού ως εικόνα
      imagesLayer = new Konva.Layer();
      stage.add(imagesLayer);
      var imageObj = new Image();
      imageObj.onload = function () {
        var conductor = new Konva.Image({
          x: 100,
          y: 300,
          image: imageObj,
          width: 442,
          height: 100,
        });

        // add the shape to the layer
        imagesLayer.add(conductor);
        imagesLayer.moveToBottom();
      };
      imageObj.src = 'conductor.png';

      //Δημιουργία του υπομνήματος ως εικόνα
      var imageObj2 = new Image();
      imageObj2.onload = function () {
        note1 = new Konva.Image({
          x: 500,
          y: 100,
          image: imageObj2,
          width: 264,
          height: 142,
        });

        // add the shape to the layer
        //layer.add(note1);
      };
      imageObj2.src = 'note1.png';



//ΜΗΧΑΝΗ ΠΡΟΣΟΜΟΙΩΣΗΣ

    layer.on('radioChangeValue', (event)=>{
        if(event.value =='Αργά'){
          timeScale = 0.5;
        }else if(event.value =='Γρήγορα'){
          timeScale = 2;
        }else{
          timeScale =1;
        }
      })


    //Το μέγεθος του κουτιου
    let w = 400-40
    let h = 100;
    let wirex = 100+40;
    let wirey = 300;


    //Πίνακας που περιέχει τα ηλεκτρόνια.
    let electrons = [];
    
    //Αρχικές παράμετροι ηλεκτρονίων
    let r = 4;
    let N = 100; 

    //Οι παρακάτω μεταβλητές προσεγγίζουν την επιτάχτνση
    //από ονογενές ηλεκτρικό΄πεδίο. Με αυτό τον τρόπο προσπαθώ
    //να προσεγγίσω τις εξωτερικές δυνάμεις 
    let ax = 0;
    let ay = 0;
    //Αυτή η μεταβλητή προσομοιώνει την ροή του χρόνου
    //Μπορεί να πάρει τιμές μεγαλύτερες ίσες με το μηδέν.
    //Για αρνητικές τιμές θα αλλάξει το βέλος του χρόνου
    //Για μηδέν θα σταματήσει η ροή του χρόνου
    timeScale = 1;
   
    //Τα ηλεκτρόνια μπορούν να τοποθετηθούν σε τυχαίες αρχικές
    //θέσεις (ακόμα και αν επικαλύπτονται) αφού αυτά αργότερα
    //δεν θα αλληλεπιδράσουν μεταξύ τους
    for(let i=0; i<N; i++){
        let posx = Common.random(wirex+r+1, wirex+w-r-1);
        let posy = Common.random(wirey+r+1, wirey+h-r-1);
        let vx = Common.random(-1, 1);
        let vy = Common.random(-1, 1);
        let circle = new Konva.Circle({
            x:posx,
            y:posy,
            radius: r,
            fill: '#37abc8ff',
            stroke: 'white',
            strokeWidth: 0.6,
        });
        layer.add(circle);
        electrons.push({ circle, posx, posy, vx, vy, prevX: posx, prevY: posy, radius: r });
    }


    //Τα ηλεκτρόνια τίθονται σε κίνηση. Προσομοιόνονται με μία απλή
    //ομαλή κίνηση μεταξύ των τοιχωμάτων του δοχείου. Δεν συγρούονται
    //μεταξύ τους, ούτε με τους πυρήνες, παρά μόνο από τα τοιχώματα.
    //Αυτή η προσομοίωση είναι ανεκτή για το επίπεδο του Γυμνασίου 
    //και Λυκείου

    anim = new Konva.Animation(function(frame) {
        var t = frame.time,
            dt = frame.timeDiff,
            frameRate = frame.frameRate;
            // Ενημέρωση θέσεων με τη μέθοδο Verlet
            let gamma = 0.001;
            for (var i = 0; i < N; i++) {
                var electron = electrons[i];
                
                electron.vy += ((ay+Common.random(-0.1,0.1))-gamma * electron.vy) * timeScale;
                electron.vx += ((ax+Common.random(-0.1,0.1))-gamma * electron.vx) * timeScale;
                electron.prevX = electron.posx;
                electron.prevY = electron.posy;
                electron.posx += electron.vx * timeScale;
                electron.posy += electron.vy * timeScale;
                
                // Ανίχνευση και αντιμετώπιση κρούσεων (απλοποιημένη)
                }
                if (electron.posx < wirex+r || electron.posx > wirex+w - r) {
                    electron.vx *= -1.0;
                electron.posx = electron.prevX;
                electron.posy = electron.prevY;
                if (electron.posy < wirey+r || electron.posy > wirey + h - r) {
                electron.vy *= -1.0;
                electron.posx = electron.prevX;
                electron.posy = electron.prevY;
                }

                // Ενημέρωση θέσης του σχήματος στην οθόνη
                electron.circle.position({ x:electron.posx, y:electron.posy });
              }
      }, layer);


      //Η φορτισμένη σφαίρα
      charge = new johnkscienceCharge({
        x:1000,
        y:350,
        radius:50,
        stroke:'gray',
        strokeWidth:1,
        positiveFill:'red',
        negativeFill:'blue',
        charge: '+',
        draggable: true,
      });
      layer.add(charge);
      var originalY = charge.y();
      charge.on('dragmove', () => {
        charge.y(originalY);
        charge.x(Math.max(charge.x(), 600));
        //Οταν η σφαίρα πλησιάζει τον αγωγό τον φορτίζει
        //με επαγωγή, δηλαδή τα ελεύθερα ηλεκτρόνια μετακινούνται
        let sign = charge.getChargeType()>0 ? 1 : -1;
        ax = charge.x()<800 ? sign*15/charge.x() : 0;
      });
      charge.on('radioChangeValue', (event) =>{
        if(event.value === 'Αρνητικό'){
          charge.setChargeType(-1);
          ax = ax>0 ? -ax : ax; 
        }else{
          charge.setChargeType(1);
          ax = ax<0 ? -ax : ax;
        }
      } );

*/


//Ο ΣΤΑΘΕΡΟΣ ΑΓΩΓΟΣ

    //Το μέγεθος του κουτιου
    let w = 400
    let h = 100;


    //Πίνακας που περιέχει τα ηλεκτρόνια.
    let electrons = [];
    
    //Αρχικές παράμετροι ηλεκτρονίων
    let r = 3;
    let N = 20; 

    //Οι παρακάτω μεταβλητές προσεγγίζουν την επιτάχτνση
    //από ονογενές ηλεκτρικό΄πεδίο. Με αυτό τον τρόπο προσπαθώ
    //να προσεγγίσω τις εξωτερικές δυνάμεις 
    let ax = 0;
    let ay = 0;
    //Αυτή η μεταβλητή προσομοιώνει την ροή του χρόνου
    //Μπορεί να πάρει τιμές μεγαλύτερες ίσες με το μηδέν.
    //Για αρνητικές τιμές θα αλλάξει το βέλος του χρόνου
    //Για μηδέν θα σταματήσει η ροή του χρόνου
    let timeScale = 1;
    //Υπολογίζει τον μέγιστο αριθμό σωματιδίων που χωράει το δοχείο.
    //Θα τοποθετηθούν στο δοχείο αριθμός μορίων μικρότερος από το 
    //μισό της ποσότητας που χωράει, ώστε να υπάρχει αρκετός χώρος για
    //την προσομοίωση.
    let m = (Math.floor(h/(2*r)) * Math.floor(w/(2*r)));
    N = N<m/2 ? N : Math.floor(m/2);
    //Τα ηλεκτρόνια μπορούν να τοποθετηθούν σε τυχαίες αρχικές
    //θέσεις (ακόμα και αν επικαλύπτονται) αφού αυτά αργότερα
    //δεν θα αλληλεπιδράσουν μεταξύ τους
    for(let i=0; i<N; i++){
        let posx = Common.random(r+1, w-r-1);
        let posy = Common.random(r+1, h-r-1);
        let vx = Common.random(-1, 1);
        let vy = Common.random(-1, 1);
        let circle = new Konva.Circle({
            x:posx,
            y:posy,
            radius: r,
            fill: config.electron.fillStyle,
            stroke: config.electron.strokeStyle,
            strokeWidth: config.electron.strokeWidth,
        });
        conductor.add(circle);
        electrons.push({ circle, posx, posy, vx, vy, prevX: posx, prevY: posy, radius: r });
    }

    //Τα ηλεκτρόνια τίθονται σε κίνηση. Προσομοιόνονται με μία απλή
    //ομαλή κίνηση μεταξύ των τοιχωμάτων του δοχείου. Δεν συγρούονται
    //μεταξύ τους, ούτε με τους πυρήνες, παρά μόνο από τα τοιχώματα.
    //Αυτή η προσομοίωση είναι ανεκτή για το επίπεδο του Γυμνασίου 
    //και Λυκείου

    let layer = new Konva.Layer();
    layer.add(conductor);

    let anim = new Konva.Animation(function(frame) {
        var t = frame.time,
            dt = frame.timeDiff,
            frameRate = frame.frameRate;
            // Ενημέρωση θέσεων με τη μέθοδο Verlet
            let gamma = 0.001;
            for (var i = 0; i < N; i++) {
                var electron = electrons[i];
                
                electron.vy += ((ay+Common.random(-0.1,0.1))-gamma * electron.vy) * timeScale;
                electron.vx += ((ax+Common.random(-0.1,0.1))-gamma * electron.vx) * timeScale;
                electron.prevX = electron.posx;
                electron.prevY = electron.posy;
                electron.posx += electron.vx * timeScale;
                electron.posy += electron.vy * timeScale;
                
                // Ανίχνευση και αντιμετώπιση κρούσεων (απλοποιημένη)
                if (electron.posx < r || electron.posx > w - r) {
                    electron.vx *= -1.0;
                electron.posx = electron.prevX;
                electron.posy = electron.prevY;
                }
                if (electron.posy < r || electron.posy > h - r) {
                electron.vy *= -1.0;
                electron.posx = electron.prevX;
                electron.posy = electron.prevY;
                }

                // Ενημέρωση θέσης του σχήματος στην οθόνη
                electron.circle.position({ x:electron.posx, y:electron.posy });
        }
      }, layer);




      //Η φορτισμένη σφαίρα
      let charge = new johnkscienceCharge({
        x:1000,
        y:350,
        radius:50,
        stroke:'gray',
        strokeWidth:1,
        positiveFill:'red',
        negativeFill:'blue',
        charge: '+',
        draggable: true,
      });
      layer.add(charge);
      var originalY = charge.y();
      charge.on('dragmove', () => {
        charge.y(originalY);
        charge.x(Math.max(charge.x(), 600));
        //Οταν η σφαίρα πλησιάζει τον αγωγό τον φορτίζει
        //με επαγωγή, δηλαδή τα ελεύθερα ηλεκτρόνια μετακινούνται
        let sign = charge.getChargeType()>0 ? 1 : -1;
        let acc = charge.x()<800 ? sign*15/charge.x() : 0;
        conductor.setAccelerationX(acc);
      });
      charge.on('radioChangeValue', (event) =>{
        if(event.value === 'Αρνητικό'){
          charge.setChargeType(-1);
          let acc = conductor.getAccelerationX(); 
          if(acc>0) conductor.setAccelerationX(-acc); 
        }else{
          charge.setChargeType(1);
          let acc = conductor.getAccelerationX(); 
          if(acc<0) conductor.setAccelerationX(-acc);
        }
      } )

      //Τίτλος επιλογής φορτίου
      let labelRadioCharge = new Konva.Text({
        x:50,
        y:80,
        text:'Φορτίο Σφαίρας',
        fontSize: 14,
        fontFamily: 'Calibri',
        stroke:'gray',
        strokeWidth:1,
      });
      layer.add(labelRadioCharge);

      //Το στοιχείο radio επιλογής του φορτίου της σφαίρας
      let radioCharge = new johnkscienceRadio({
        x:50,
        y:100,
        name:'radioCharge',
        fill:'red',
        stroke:"blue",
        values:[ 'Θετικό', 'Αρνητικό'],
        fontSize:14,
        fontFamily:'Calibri',
        fontColor:'black',
        padding:5,
        listener:charge,
      })
      layer.add(radioCharge);

      //Κουμπιά ελέγχου
      let buttonStart = new johnkscienceButton({
        x:200,
        y:80,
        name: 'buttonStart',
        fill:'lightblue',
        mouseoverFill: 'white',
        stroke:'gray',
        strokeWidth:1,
        cornerRadius:3,
        fontSize:18,
        fontFamily:'Calibri',
        fontColor:'Red',
        text:'Εκκίνηση',
        padding:5,
        onClickFunc: function () {
           conductor.animationStart();
          },
        
      });
      layer.add(buttonStart);

      let buttonStop = new johnkscienceButton({
        x:200,
        y:120,
        name: 'buttonStop',
        fill:'lightblue',
        mouseoverFill: 'white',
        stroke:'gray',
        strokeWidth:1,
        cornerRadius:3,
        fontSize:18,
        fontFamily:'Calibri',
        fontColor:'Red',
        text:'  Παύση  ',
        padding:5,
        onClickFunc: function () {
          conductor.animationStop();
          },
        
      });
      layer.add(buttonStop);

      //Κύριος Τίτλος
      let labelTitle = new Konva.Text({
        x:50,
        y:10,
        text:'Ηλέκτριση με Επαγωγή',
        fontSize: 48,
        fontFamily: 'Calibri',
        stroke:'gray',
        fill:'pink',
        strokeWidth:2,
      });
      layer.add(labelTitle); 

      //Τίτλος επιλογής φορτίου
      let labelRadioTimeScale = new Konva.Text({
        x:340,
        y:80,
        text:'Ταχύτητα προσομοίωσης',
        fontSize: 14,
        fontFamily: 'Calibri',
        stroke:'gray',
        strokeWidth:1,
      });
      layer.add(labelRadioTimeScale);

      //Το στοιχείο radio επιλογής του φορτίου της σφαίρας
      let radioTimeScale = new johnkscienceRadio({
        x:340,
        y:100,
        name:'radioTimeScale',
        fill:'red',
        stroke:"blue",
        values:['Κανονικά', 'Αργά', 'Γρήγορα'],
        fontSize:14,
        fontFamily:'Calibri',
        fontColor:'black',
        padding:5,
        listener:conductor,
      })
      layer.add(radioTimeScale);


stage.add(layer);

/*

      // Παράμετροι προσομοίωσης
      const numParticles = 100;
      const boxWidth = stage.width();
      const boxHeight = stage.height();
      const particleRadius = 10;
      const dt = 0.1; // Βήμα χρόνου

      // Δημιουργία σωματιδίων
      const particles = [];
      //for (let i = 0; i < numParticles; i++) {
        //Αρχικές θέσεις. Τα σωματίδια δεν πρέπει να βρίσκονται το ένα μέσα στο άλλο
        //Αρχίζω με μια υποθετική τυχαία θέση στα όρια του κουτιου
        let x = 20;//getRandom(particleRadius+1, boxWidth-particleRadius-1);
        let y = 20;// getRandom(particleRadius+1, boxHeight-particleRadius-1); 
        //Αρχικές συνθήκες ταχύτητας στο διάστημα (min-max)
        const vx = 20;//getRandom(10, 50);
        const vy = 0;// getRandom(10, 50);
        const circle = new Konva.Circle({
          x,
          y,
          radius: particleRadius,
          fill: 'blue'
        });
        layer.add(circle);
        particles.push({ circle, x, y, vx, vy, prevX: x, prevY: y, radius:particleRadius });
      //}
      console.log(particles[0]);

// Λειτουργία ενημέρωσης
function update() {
  // Ενημέρωση θέσεων με τη μέθοδο Verlet
  //for (var i = 0; i < particles.length; i++) {
    var particle = particles[0];
   
    const ax = 5; // Επιτάχυνση κατά τον άξονα x (π.χ., βαρύτητα)
    const ay = 5; // Επιτάχυνση κατά τον άξονα y
    let x = particle.x+particle.vx*dt+0.5*ax*dt*dt;
    let y = particle.y+particle.vy*dt+0.5*ay*dt*dt;
    let ux = particle.vx+ax*dt;
    let uy = particle.vy+ay*dt;
    particle.prevX = particle.x;
    particle.prevY = particle.y;
    particle.x = x;
    particle.y = y;
    particle.vy=uy;
    particle.vx=ux;

   // Ενημέρωση θέσης του σχήματος στην οθόνη
   particle.circle.position({ x, y });

    // Ανίχνευση και αντιμετώπιση κρούσεων (απλοποιημένη)
    if (particle.x < particleRadius+10 || particle.x > boxWidth - particleRadius-10) {
      particle.vx *= -1;
    }
    if (particle.y < particleRadius+10 || particle.y > boxHeight - particleRadius-10) {
      particle.vy *= -1;
    }

    let K = 0.5 * (particle.vx**2+particle.vy**2);
    console.log(K);

  //}
  layer.draw();
  requestAnimationFrame(update);
}

*/

/*
    // Ανίχνευση και αντιμετώπιση κρούσεων μεταξύ σωματιδίων
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const particle1 = particles[i];
          const particle2 = particles[j];

          const dx = particle2.x - particle1.x;
          const dy = particle2.y - particle1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < particle1.radius + particle2.radius)  
    {
            // Κρούση! Υπολογισμός νέων ταχυτήτων
            const angle = Math.atan2(dy, dx);
            const u1 = particle1.vx * Math.cos(angle) + particle1.vy * Math.sin(angle);
            const u2 = particle2.vx * Math.cos(angle) + particle2.vy * Math.sin(angle);
            const v1 = u2;
            const v2 = u1;
            particle1.vx = v1 * Math.cos(angle) - v2 * Math.sin(angle);
            particle1.vy = v1 * Math.sin(angle) + v2 * Math.cos(angle);
            particle2.vx = v2 * Math.cos(angle) + v1 * Math.sin(angle);
            particle2.vy = v2 * Math.sin(angle) - v1 * Math.sin(angle);
          }
        }
      }
*/

    

//update();

/*
// Δημιουργία ενός μορίου
function createParticle() {
  let particle = new Konva.Circle({
    x: Math.random() * stage.width(),
    y: Math.random() * stage.height(),
    radius: 10,
    fill: 'blue',
  });

  // Τυχαία ταχύτητα μεταξύ -5 και 5 pixels/frame
  particle.vx = Math.random() * 10 - 5;
  particle.vy = Math.random() * 10 - 5;
  
  layer.add(particle);
  return particle;
}

// Πίνακας για τα μόρια
var particles = [];
for (var i = 0; i < 10; i++) {
  particles.push(createParticle());
}

// Ενημέρωση και απεικόνιση
function animate() {
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
   
   // Ενημέρωση θέσης
   particle.x(particle.x()+particle.vx);
   particle.y(particle.y()+particle.vy)

    // Ανίχνευση συγκρούσεων με τα όρια
    if (particle.x() < particle.radius()+5 || particle.x() > stage.width() - particle.radius()-5) {
      particle.vx *= -1;
    }
    if (particle.y() < particle.radius()+5 || particle.y() > stage.height() - particle.radius()-5) {
      particle.vy *= -1;
    }

    // Ανίχνευση συγκρούσεων μεταξύ των σωματιδίων
    for (let j = i + 1; j < particles.length; j++) {
      const otherParticle = particles[j];
      const dx = particle.x() - otherParticle.x();
      const dy = particle.y() - otherParticle.y();
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < particle.radius() + otherParticle.radius()+5) {
        // Υπολογισμός νέων ταχυτήτων μετά τη σύγκρουση (ελαστική σύγκρουση)
          let v1x = particle.vx;
          let v1y = particle.vy;
          let v2x = otherParticle.vx;
          let v2y = otherParticle.vy;

          let dx = particle.x() - otherParticle.x();
          let dy = particle.y() - otherParticle.y();

          let theta = Math.atan2(dy, dx);
          let cosTheta = Math.cos(theta);
          let sinTheta = Math.sin(theta);

          // Μετατροπή των ταχυτήτων σε ένα σύστημα συντεταγμένων που ευθυγραμμίζεται με τη γραμμή που ενώνει τα κέντρα των σωματιδίων
          let v1x_prime = v1x * cosTheta + v1y * sinTheta;
          let v1y_prime = -v1x * sinTheta + v1y * cosTheta;
          let v2x_prime = v2x * cosTheta + v2y * sinTheta;
          let v2y_prime = -v2x * sinTheta + v2y * sinTheta;

          // Ανταλλαγή των συνιστωσών x των ταχυτήτων
          let temp = v1x_prime;
          v1x_prime = v2x_prime;
          v2x_prime = temp;

          // Μετατροπή των ταχυτήτων πίσω στο αρχικό σύστημα συντεταγμένων **ΠΡΙΝ** την ανταλλαγή
          particle.vx = v1x_prime * cosTheta - v1y_prime * sinTheta;
          particle.vy = v1x_prime * sinTheta + v1y_prime * cosTheta;
          otherParticle.vx = v2x_prime * cosTheta - v2y_prime * sinTheta;
          otherParticle.vy = v2x_prime * sinTheta + v2y_prime * cosTheta;
          
      }
    }
  }

  //let K=0;
  //for (let j = 0; j < particles.length; j++){
    //let vx=particles[j].vx;
    //let vy=particles[j].vy;
   // K+=0.5*(Math.sqrt(vx**2+vy**2));
  //}
  //console.log(K);


  layer.draw();
  requestAnimationFrame(animate);
}
animate();
*/

/*
//Select the canvas from HTML
var canvas = document.getElementById("myCanvas");

//Get the context
var ctx = canvas.getContext("2d");

//Create an array to hold the particles
var particles = [];

//Define the Particle object
function Particle (x, y, vx, vy, size, color) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.color = color;
}

//Add the draw method to the Particle prototype
Particle.prototype.draw = function() {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.size, this.size);
};

//Add the update method to move the particles
Particle.prototype.update = function() {
  this.x += this.vx;
  this.y += this.vy;
  
  //Check for collisions
  //Left or Right
  if(this.x > canvas.width || this.x < 0) {
    this.vx = -this.vx;
  }
  
  //Top or Bottom
  if(this.y > canvas.height || this.y < 0) {
    this.vy = -this.vy;
  }
};

//Create and populate the particles array
for(var i = 0; i < 100; i++) {
  particles.push(new Particle(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*2-1, Math.random()*2-1, Math.random()*5+1, 'white'));
}

//Update all particles and redraw the screen
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for(var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  
  //Call the next frame
  requestAnimationFrame(update);
}

//Start the animation
update();
*/
      
    </script>


    <h1>Ηλέκτριση με Επαγωγή</h1>
		
		<p>Με αυτό το εικονικό εργαστήριο μπορείτε να πειραματιστείτε με την ηλέκτριση μια επιμήκης ράβδου με επαγωγή.</p>
		
		<p><button onclick="expand('p1')"> + </button><span class="h2"> Εξοικείωση με τα χειριστήρια - Βοήθεια</span></p>
		<div class="experiment" id="p1">
		
		<h3>Υλικά και χειριστήρια</h3>
		
		<p>Το εργαστήριο αυτό περιλαμβάνει δύο υλικά. Μια αρχικά αφόρτιστη επιμήκης ορθογώνια <span class = 'emphasize'>ράβδο</span> και ένα <span class = 'emphasize'>σφαιρικό φορτίο</span>.</p>
		
		<p>Η ράβδος είναι από αγώγιμο υλικό και αποτελείται από <span class = 'emphasize'>σταθερά ιόντα</span> (κόκκινες σφαίρες) και από <span class = 'emphasize'>ελεύθερα ηλεκτρόνια</span> (μπλε μικρές κινούμενες σφαίρες)</p>
		
		<p>Το σφαιρικό φορτίο μπορεί να είναι θετικό ή αρνητικό. Για να αλλάξετε το είδος του σφαιρικού φορτίου επιλέξτε κατάλληλα στην πάνω αριστερή γωνία του εργαστηρίου. </p>
		
		<p>Η ράβδος είναι πακτωμένη, δηλαδή δεν μπορούμε να την μετακινήσουμε. Το φορτίο μπορούμε να το πλησιάζουμε ή να το απομακρύνουμε από την ράβδο με την βοήθεια του ποντικιού.</p>
		
		<p>Για να αρχίσει η προσομοίωση πατήστε το κουμπί 'Εκκίνηση' και για να σταματήσει το κουμπί 'Παύση'.</p>
		
		<p>Αν κάτι πάει στραβά πατήστε το κουμπί ανανέωσης του φυλλομετρητή.</p>
		
		
		</div>
		
		<p><button onclick="expand('p2')"> + </button><span class="h2"> Παρατηρείστε το εσωτερικό της ράβδου</span></p>
		<div class="experiment" id="p2">
		
		<h3>Παρατήρηση της αφόρτιστης ράβδου</h3>
		
		<p>Πατήστε το κουμπί της ανανέωσης του φυλλομετρητή (π.χ. Firfox). Το εργαστήριο θα "φορτωθεί" εκ νέου.</p>
		
		<p>Πατήστε το κουμπί "Εκκίνηση" ώστε να ξεκινήσει η προσομοίωση.</p>
		
		<p>Παρατηρείστε την κίνηση των ελεύθερων ηλεκτρονίων (μπλε μικρές σφαίρες) μέσα στον μεταλλικό αγωγό.
		<ul>
			<li>Τα ηλεκτρόνια έχουν την τάση να βγουν έξω από τον αγωγό, αλλά όταν φτάνουν στα όριά του επιστρέφουν προς τα μέσα.</li>
			<li>Τα ηλεκτρόνια κινούνται άτακτα λόγω της θερμικής κίνησης</li>
			<li>Τα ηλεκτρόνια σκεδάζονται από τα σταθερά θετικά ιόντα και αλλάζουν την ευθύγραμμη πορεία τους.</li>
		</ul>
		</p>
		
		<p>Παρατηρείστε τα σταθερά θετικά ιόντα (κόκκινες σφαίρες). Σε αυτή την προσομοίωση θεωρούνται ακίνητα αλλά στην πραγματικότητα ταλαντώνονται με μικρά πλάτη.</p>
		
		<p><b>Ερώτηση:</b> Τι συνολικό φορτίο έχει η ράβδος και γιατί;</p>
		</div>
		
		<p><button onclick="expand('p3')"> + </button><span class="h2"> Ηλέκτριση της ράβδου από θετικό φορτίο</span></p>
		<div class="experiment" id="p3">
		
		<h3>Ηλέκτριση της ράβδου από θετικό φορτίο</h3>
		
		<p>Πατήστε το κουμπί της ανανέωσης του φυλλομετρητή (π.χ. Firfox). Το εργαστήριο θα "φορτωθεί" εκ νέου.</p>
		
		<p>Επιλέξτε κατάλληλα στην πάνω αριστερή γωνία ώστε το σφαιρικό φορτίο να είναι θετικό.</p>
		
		<p>Μετακινήστε το σφαιρικό θετικό φορτίο στην δεξιά περιοχή, μακρυά από την ράβδο.</p>
		
		<p>Πατήστε το κουμπί "Εκκίνηση" ώστε να ξεκινήσει η προσομοίωση. Τι παρατηρείτε;</p>
		
		<p>Μετακινείται τώρα το σφαιρικό θετικό φορτίο κοντά στην ράβδο. Περιμένετε ώσπου το σύστημα να έρθει σε ισορροπία. Απαντήστε τις παρακάτω ερωτήσεις.
		<ol>
			<li>Όταν το σφαιρικό φορτίο ήταν μακρυά από την ράβδο, με ποιον τρόπο κινιόντουσαν τα ελεύθερα ηλεκτρόνια; </li>
			<li>Όταν το σφαιρικό φορτίο ήταν κοντά στην ράβδο, με ποιον τρόπο κινιόντουσαν τα ελεύθερα ηλεκτρόνια; </li>
			<li>Σε ποια περίπτωση τα ελεύθερα ηλεκτρόνια κινιόντουσαν άτακτα;</li>
			<li>Τα ελεύθερα ηλεκτρόνια προτιμούσαν να κινούνται άτακτα σε κάποια επιμέρους περιοχή της ράβδου ή να κινούνται άτακτα όλη την έκτασή της κατά σχετικά ομοιόμορφο τρόπο;</li>
			<li>Όταν το σφαιρικό φορτίο είναι κοντά ποια περιοχή της ράβδου προτιμούν τα ελεύθερα ηλεκτρόνια και γιατί; </li>
			<li>Όταν η σφαίρα ήταν μακρυά, λέμε ότι η ράβδος δεν είναι ηλεκτρισμένη. Τι σημαίνει αυτό; Πόσο είναι το συνολικό φορτιο της ράβδου;</li>
			<li>Όταν η σφαίρα ήταν κοντά, λέμε ότι η ράβδος είναι ηλεκτρισμένη. Τι σημαίνει αυτό; Πόσο είναι το συνολικό φορτίο της ράβδου;</li>
		</ol>
		</p>
		
		<p>Παρατηρείστε τα σταθερά θετικά ιόντα (κόκκινες σφαίρες). Σε αυτή την προσομοίωση θεωρούνται ακίνητα αλλά στην πραγματικότητα ταλαντώνονται με μικρά πλάτη.</p>
		

		</div>
		
		<p><button onclick="expand('p3')"> + </button><span class="h2"> Ηλέκτριση της ράβδου από αρνητικό φορτίο</span></p>
		<div class="experiment" id="p3">
			
		<h3>Ηλέκτριση της ράβδου από αρνητικό φορτίο</h3>
		
		<p>Πατήστε το κουμπί της ανανέωσης του φυλλομετρητή (π.χ. Firfox). Το εργαστήριο θα "φορτωθεί" εκ νέου.</p>
		
		<p>Επιλέξτε κατάλληλα στην πάνω αριστερή γωνία ώστε το σφαιρικό φορτίο να είναι αρνητικό.</p>
		
		<p>Μετακινήστε το σφαιρικό αρνητικό φορτίο στην δεξιά περιοχή, μακρυά από την ράβδο.</p>
		
		<p>Πατήστε το κουμπί "Εκκίνηση" ώστε να ξεκινήσει η προσομοίωση. Τι παρατηρείτε;</p>
		
		<p>Μετακινείται τώρα το σφαιρικό αρνητικό φορτίο κοντά στην ράβδο. Περιμένετε ώσπου το σύστημα να έρθει σε ισορροπία. Απαντήστε τις παρακάτω ερωτήσεις.
		<ol>
			<li>Όταν το σφαιρικό φορτίο ήταν μακρυά από την ράβδο, με ποιον τρόπο κινιόντουσαν τα ελεύθερα ηλεκτρόνια; </li>
			<li>Όταν το σφαιρικό φορτίο ήταν κοντά στην ράβδο, με ποιον τρόπο κινιόντουσαν τα ελεύθερα ηλεκτρόνια; </li>
			<li>Σε ποια περίπτωση τα ελεύθερα ηλεκτρόνια κινιόντουσαν άτακτα;</li>
			<li>Τα ελεύθερα ηλεκτρόνια προτιμούσαν να κινούνται άτακτα σε κάποια επιμέρους περιοχή της ράβδου ή να κινούνται άτακτα όλη την έκτασή της κατά σχετικά ομοιόμορφο τρόπο;</li>
			<li>Όταν το σφαιρικό φορτίο είναι κοντά ποια περιοχή της ράβδου προτιμούν τα ελεύθερα ηλεκτρόνια και γιατί; </li>
			<li>Όταν η σφαίρα ήταν μακρυά, λέμε ότι η ράβδος δεν είναι ηλεκτρισμένη. Τι σημαίνει αυτό; Πόσο είναι το συνολικό φορτιο της ράβδου;</li>
			<li>Όταν η σφαίρα ήταν κοντά, λέμε ότι η ράβδος είναι ηλεκτρισμένη. Τι σημαίνει αυτό; Πόσο είναι το συνολικό φορτίο της ράβδου;</li>
		</ol>
		</p>
		
		<p>Παρατηρείστε τα σταθερά θετικά ιόντα (κόκκινες σφαίρες). Σε αυτή την προσομοίωση θεωρούνται ακίνητα αλλά στην πραγματικότητα ταλαντώνονται με μικρά πλάτη.</p>
		

		</div>
		
		
		<script>
			function expand( id ){
				const par = document.getElementById(id);
				if(par.style.display=="block"){
					par.style.display="none";
				}else{
					par.style.display="block";
				}
			}
		</script>
  </body>
</html>




/*

      // Παράμετροι προσομοίωσης
      const numParticles = 100;
      const boxWidth = stage.width();
      const boxHeight = stage.height();
      const particleRadius = 10;
      const dt = 0.1; // Βήμα χρόνου

      // Δημιουργία σωματιδίων
      const particles = [];
      //for (let i = 0; i < numParticles; i++) {
        //Αρχικές θέσεις. Τα σωματίδια δεν πρέπει να βρίσκονται το ένα μέσα στο άλλο
        //Αρχίζω με μια υποθετική τυχαία θέση στα όρια του κουτιου
        let x = 20;//getRandom(particleRadius+1, boxWidth-particleRadius-1);
        let y = 20;// getRandom(particleRadius+1, boxHeight-particleRadius-1); 
        //Αρχικές συνθήκες ταχύτητας στο διάστημα (min-max)
        const vx = 20;//getRandom(10, 50);
        const vy = 0;// getRandom(10, 50);
        const circle = new Konva.Circle({
          x,
          y,
          radius: particleRadius,
          fill: 'blue'
        });
        layer.add(circle);
        particles.push({ circle, x, y, vx, vy, prevX: x, prevY: y, radius:particleRadius });
      //}
      console.log(particles[0]);

// Λειτουργία ενημέρωσης
function update() {
  // Ενημέρωση θέσεων με τη μέθοδο Verlet
  //for (var i = 0; i < particles.length; i++) {
    var particle = particles[0];
   
    const ax = 5; // Επιτάχυνση κατά τον άξονα x (π.χ., βαρύτητα)
    const ay = 5; // Επιτάχυνση κατά τον άξονα y
    let x = particle.x+particle.vx*dt+0.5*ax*dt*dt;
    let y = particle.y+particle.vy*dt+0.5*ay*dt*dt;
    let ux = particle.vx+ax*dt;
    let uy = particle.vy+ay*dt;
    particle.prevX = particle.x;
    particle.prevY = particle.y;
    particle.x = x;
    particle.y = y;
    particle.vy=uy;
    particle.vx=ux;

   // Ενημέρωση θέσης του σχήματος στην οθόνη
   particle.circle.position({ x, y });

    // Ανίχνευση και αντιμετώπιση κρούσεων (απλοποιημένη)
    if (particle.x < particleRadius+10 || particle.x > boxWidth - particleRadius-10) {
      particle.vx *= -1;
    }
    if (particle.y < particleRadius+10 || particle.y > boxHeight - particleRadius-10) {
      particle.vy *= -1;
    }

    let K = 0.5 * (particle.vx**2+particle.vy**2);
    console.log(K);

  //}
  layer.draw();
  requestAnimationFrame(update);
}

*/

/*
    // Ανίχνευση και αντιμετώπιση κρούσεων μεταξύ σωματιδίων
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const particle1 = particles[i];
          const particle2 = particles[j];

          const dx = particle2.x - particle1.x;
          const dy = particle2.y - particle1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < particle1.radius + particle2.radius)  
    {
            // Κρούση! Υπολογισμός νέων ταχυτήτων
            const angle = Math.atan2(dy, dx);
            const u1 = particle1.vx * Math.cos(angle) + particle1.vy * Math.sin(angle);
            const u2 = particle2.vx * Math.cos(angle) + particle2.vy * Math.sin(angle);
            const v1 = u2;
            const v2 = u1;
            particle1.vx = v1 * Math.cos(angle) - v2 * Math.sin(angle);
            particle1.vy = v1 * Math.sin(angle) + v2 * Math.cos(angle);
            particle2.vx = v2 * Math.cos(angle) + v1 * Math.sin(angle);
            particle2.vy = v2 * Math.sin(angle) - v1 * Math.sin(angle);
          }
        }
      }
*/

    

//update();

/*
// Δημιουργία ενός μορίου
function createParticle() {
  let particle = new Konva.Circle({
    x: Math.random() * stage.width(),
    y: Math.random() * stage.height(),
    radius: 10,
    fill: 'blue',
  });

  // Τυχαία ταχύτητα μεταξύ -5 και 5 pixels/frame
  particle.vx = Math.random() * 10 - 5;
  particle.vy = Math.random() * 10 - 5;
  
  layer.add(particle);
  return particle;
}

// Πίνακας για τα μόρια
var particles = [];
for (var i = 0; i < 10; i++) {
  particles.push(createParticle());
}

// Ενημέρωση και απεικόνιση
function animate() {
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
   
   // Ενημέρωση θέσης
   particle.x(particle.x()+particle.vx);
   particle.y(particle.y()+particle.vy)

    // Ανίχνευση συγκρούσεων με τα όρια
    if (particle.x() < particle.radius()+5 || particle.x() > stage.width() - particle.radius()-5) {
      particle.vx *= -1;
    }
    if (particle.y() < particle.radius()+5 || particle.y() > stage.height() - particle.radius()-5) {
      particle.vy *= -1;
    }

    // Ανίχνευση συγκρούσεων μεταξύ των σωματιδίων
    for (let j = i + 1; j < particles.length; j++) {
      const otherParticle = particles[j];
      const dx = particle.x() - otherParticle.x();
      const dy = particle.y() - otherParticle.y();
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < particle.radius() + otherParticle.radius()+5) {
        // Υπολογισμός νέων ταχυτήτων μετά τη σύγκρουση (ελαστική σύγκρουση)
          let v1x = particle.vx;
          let v1y = particle.vy;
          let v2x = otherParticle.vx;
          let v2y = otherParticle.vy;

          let dx = particle.x() - otherParticle.x();
          let dy = particle.y() - otherParticle.y();

          let theta = Math.atan2(dy, dx);
          let cosTheta = Math.cos(theta);
          let sinTheta = Math.sin(theta);

          // Μετατροπή των ταχυτήτων σε ένα σύστημα συντεταγμένων που ευθυγραμμίζεται με τη γραμμή που ενώνει τα κέντρα των σωματιδίων
          let v1x_prime = v1x * cosTheta + v1y * sinTheta;
          let v1y_prime = -v1x * sinTheta + v1y * cosTheta;
          let v2x_prime = v2x * cosTheta + v2y * sinTheta;
          let v2y_prime = -v2x * sinTheta + v2y * sinTheta;

          // Ανταλλαγή των συνιστωσών x των ταχυτήτων
          let temp = v1x_prime;
          v1x_prime = v2x_prime;
          v2x_prime = temp;

          // Μετατροπή των ταχυτήτων πίσω στο αρχικό σύστημα συντεταγμένων **ΠΡΙΝ** την ανταλλαγή
          particle.vx = v1x_prime * cosTheta - v1y_prime * sinTheta;
          particle.vy = v1x_prime * sinTheta + v1y_prime * cosTheta;
          otherParticle.vx = v2x_prime * cosTheta - v2y_prime * sinTheta;
          otherParticle.vy = v2x_prime * sinTheta + v2y_prime * cosTheta;
          
      }
    }
  }

  //let K=0;
  //for (let j = 0; j < particles.length; j++){
    //let vx=particles[j].vx;
    //let vy=particles[j].vy;
   // K+=0.5*(Math.sqrt(vx**2+vy**2));
  //}
  //console.log(K);


  layer.draw();
  requestAnimationFrame(animate);
}
animate();
*/

/*
//Select the canvas from HTML
var canvas = document.getElementById("myCanvas");

//Get the context
var ctx = canvas.getContext("2d");

//Create an array to hold the particles
var particles = [];

//Define the Particle object
function Particle (x, y, vx, vy, size, color) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.color = color;
}

//Add the draw method to the Particle prototype
Particle.prototype.draw = function() {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.size, this.size);
};

//Add the update method to move the particles
Particle.prototype.update = function() {
  this.x += this.vx;
  this.y += this.vy;
  
  //Check for collisions
  //Left or Right
  if(this.x > canvas.width || this.x < 0) {
    this.vx = -this.vx;
  }
  
  //Top or Bottom
  if(this.y > canvas.height || this.y < 0) {
    this.vy = -this.vy;
  }
};

//Create and populate the particles array
for(var i = 0; i < 100; i++) {
  particles.push(new Particle(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*2-1, Math.random()*2-1, Math.random()*5+1, 'white'));
}

//Update all particles and redraw the screen
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for(var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  
  //Call the next frame
  requestAnimationFrame(update);
}

//Start the animation
update();
*/</meta>