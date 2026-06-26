//Ο σταθερός αγωγός
let conductor = new johnkscienceConductor({
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
  stage.add(conductor); //είναι ένα layer
  conductor.on('radioChangeValue', (event)=>{
    if(event.value == 'Αργά'){
      conductor.setTimeScale(0.5);
    }else if(event.value == 'Γρήγορα'){
      conductor.setTimeScale(2);
    }else{
      conductor.setTimeScale(1);
    }
  })

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
      