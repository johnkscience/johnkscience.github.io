let charge, anim, anim1, anim2, timeScale;

//ΠΙΝΑΚΑΣ ΕΛΕΓΧΟΥ

let electronRadius = 7;
//-----------------------------------------------   
      //Κύριος Τίτλος
      /*let labelTitle = new Konva.Text({
        x:50,
        y:10,
        text:'Ηλεκτροσκόπιο',
        fontSize: 48,
        fontFamily: 'Calibri',
        stroke:'gray',
        fill:'yellow',
        strokeWidth:0,
      });
      layer.add(labelTitle);*/
//-------------------------------------------------
       //Κουμπί έναρξης
       let buttonStart = new johnkscienceButton({
        x:800,
        y:400,
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
           anim2.start();
           anim1.start();
          },
      });
      layer.add(buttonStart);
//--------------------------------------------------
      //Κουμπί παύσης
      let buttonStop = new johnkscienceButton({
        x:880,
        y:400,
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
          anim2.stop();
          anim1.stop();
          },
        
      });
      layer.add(buttonStop);
//-------------------------------------------------
      //Δημιουργία του ηλεκτροσκοπίου ως εικόνα
      let electroscopeElectrons=[];
      let labelElectroscope;
      imagesLayer = new Konva.Layer();
      stage.add(imagesLayer);
      var imageObj = new Image();
      imageObj.onload = function () {
        var circuit = new Konva.Image({
          x: 0,
          y: 0,
          image: imageObj,
          width: 1200,
          height: 600,
        });

        // add the shape to the layer
        imagesLayer.add(circuit);
        imagesLayer.moveToBottom();
      };
      imageObj.src = 'circuit.png';
      let electroscope = new Konva.Group({
        x:260,
        y:135,
      });
      layer.add(electroscope); 
      //Αρχικοποιεί τα ηλεκτρόνια
       for(let i=0; i<20; i++){
        let el = electronCreate({
          x:Common.random(0, 40),
          y:Common.random(30, 290),
        }, 'green');
        electroscope.add(el);
        electroscopeElectrons.push({
          shape: el, 
          posx: el.x(), 
          posy: el.y(),
          prevx: el.x(), 
          prevy: el.y(),
          vx:Common.random(-1, 1),
          vy:Common.random(-1, 1), 
        });
      }
      //Θέτει σε κίνηση τα ηλεκτρόνια
      anim2 = new Konva.Animation(function(frame) {
        var t = frame.time,
            dt = frame.timeDiff,
            frameRate = frame.frameRate,
            timeScale = 1;
        // Ενημέρωση θέσεων με τη μέθοδο Verlet
        for(let i=0; i<electroscopeElectrons.length; i++){
            var e = electroscopeElectrons[i];
                //Ενημερώνει τις θέσεις
                e.prevx = e.posx;
                e.prevy = e.posy;
                e.posx += e.vx * timeScale;
                e.posy += e.vy * timeScale;
                //Οταν ο αγωγός πλησιάζει το ηλεκτροσκόπιο τον φορτίζει
                //με επαφή, δηλαδή τα ελεύθερα ηλεκτρόνια μετακινούνται
                //μέσα στο ηλεκτροσκόπιο αλλά και από το ηλεκτροσκόπιο προς τον αγωγό
                //Σε αυτό το σημείο δεν αφήνω το ηλεκροσκόπιο να εκφορτιστεί, διότι
                //υπάρχει μια περιοδική τάση για εκφόρτηση
                if(conductorNegative.x()<320 && 20-electroscopeElectrons.length<-5){
                  if(e.posy<0 ){
                    //Αφαιρεί το ηλεκτρόνιο από το ηλεκτροσκόπιο
                    electroscopeElectrons.splice(i,1);
                    e.shape.remove();
                    //Τον προσθέτει στο αγωγό
                    e.posy=60;
                    e.prevy=60;
                    e.posx+=10;
                    e.prevx=e.posx;
                    conductorNegativeElectrons.push(e);
                    conductorNegative.add(e.shape);
                  }
                }
                //Το ηλεκτρόνιο κτυπάει στα κατακόρυφα άκρα του στελέχους
                if(e.posx<0 || e.posx>40){
                  e.vx *= -1.0;
                  e.posx = e.prevx;
                  e.posy = e.prevy; 
                }
                //Το ηλεκτρόνιο κτυπάει στα οριζόντια άκρα του στελέχους
                if(e.posy<0 || e.posy>290){
                  e.vy *= -1.0;
                  e.posx = e.prevx;
                  e.posy = e.prevy; 
                }
                // Ενημέρωση θέσης του σχήματος στην οθόνη
                e.shape.position({ x:e.posx, y:e.posy });
          }
          //Ενυμερώνω την ετικέτα
          labelElectroscope.text("+20, -"+electroscopeElectrons.length+', Φορτίο: '+(20-electroscopeElectrons.length));

      }, layer);
      anim2.start();
      
      //Ετικέτα με τα θετικά και τα αρνητικά φορτία
      labelElectroscope = new Konva.Text({
        x:70,
        y:100,
        text:"+20, -"+electroscopeElectrons.length,
        fill:'gray',
        stroke:'white',
        strokeWidth:1,
        fontSize:20,
        fontFamily:'Calibri',
      });
      electroscope.add(labelElectroscope);
//-----------------------------------------------------------
      let switchOff, switchOn;
      //Δημιουργία του _ανοικτού_ διακόπτη ως εικόνα
      var imageObj2 = new Image();
      imageObj2.onload = function () {
        switchOff = new Konva.Image({
          x: 588,
          y: 262,
          image: imageObj2,
          width: 55,
          height: 112,
        });

        // add the shape to the layer
        layer.add(switchOff);
        switchOff.show();
        switchOff.on('click', ()=>{
          if(conductorNegative.x()<320){
            conductorNegative.x(350);
          }
          switchOff.hide();
          switchOn.show();
          switchState = true;
          anim.start();
          let delay = 0;
          for(let i=0; i<electroscopeElectrons.length-20; i++){
            setTimeout(()=>{
              electroscopeElectrons[i].shape.destroy();
              electroscopeElectrons.splice(i,1);
            }, delay);
            delay+=600;
          }
          setTimeout(()=>{
            switchOff.show();
            switchOn.hide();
            switchState = false;
            anim.stop();
            plates0.show();
            plates1Negative.hide();
            plates1Positive.hide();
          },delay);
      });
      };
      imageObj2.src = 'switchOff.png';
//-----------------------------------------------------------     
      //Δημιουργία του _κλειστού_ διακόπτη ως εικόνα
      var imageObj3 = new Image();
      imageObj3.onload = function () {
        switchOn = new Konva.Image({
          x: 587,
          y: 262,
          image: imageObj3,
          width: 23,
          height: 112,
        });

        // add the shape to the layer
        layer.add(switchOn);
        switchOn.hide();
      };
      imageObj3.src = 'switchOn.png'; 

//-----------------------------------------------------     
      //Δημιουργία των πλακών 0 ως εικόνα
      var imageObj4 = new Image();
      imageObj4.onload = function () {
        plates0 = new Konva.Image({
          x: 0,
          y: 0,
          image: imageObj4,
          width: 1200,
          height: 600,
        });

        // add the shape to the layer
        imagesLayer.add(plates0);
        plates0.show();
      };
      imageObj4.src = 'plates0.png';
//--------------------------------------------------------
      //Δημιουργία των πλακών 1+ ως εικόνα
      var imageObj5 = new Image();
      imageObj5.onload = function () {
        plates1Positive = new Konva.Image({
          x: 0,
          y: 0,
          image: imageObj5,
          width: 1200,
          height: 600,
        });

        // add the shape to the layer
        imagesLayer.add(plates1Positive);
        plates1Positive.hide();
      };
      imageObj5.src = 'plates1Positive.png';
//----------------------------------------------------------
      //Δημιουργία των πλακών 1- ως εικόνα
      var imageObj6 = new Image();
      imageObj6.onload = function () {
        plates1Negative = new Konva.Image({
          x: 0,
          y: 0,
          image: imageObj6,
          width: 1200,
          height: 600,
        });

        // add the shape to the layer
        imagesLayer.add(plates1Negative);
        plates1Negative.hide();
      };
      imageObj6.src = 'plates1Negative.png';
//-----------------------------------------------------------
      //Δημιουργία του αρνητικού αγωγού
      let conductorNegativeElectrons=[];
      conductorNegative = new Konva.Group({
        x:730,
        y:69,
        draggable:true,
      });
      var imageObj7 = new Image();
      imageObj7.onload = function () {
        conductor = new Konva.Image({
          x: 0,
          y: 0,
          image: imageObj7,
          width: 414,
          height: 73,
        });
      conductorNegative.add(conductor);
      conductor.moveToBottom();
      };
      imageObj7.src = 'conductor.png';
      layer.add(conductorNegative);
      //Αρχικοποιεί τα ηλεκτρόνια
      for(let i=0; i<50; i++){
        let el = electronCreate({
          x:Common.random(0, 400),
          y:Common.random(10, 60),
        },'#37abc8ff');
        conductorNegative.add(el);
        conductorNegativeElectrons.push({
          shape: el, 
          posx: el.x(), 
          posy: el.y(),
          prevx: el.x(), 
          prevy: el.y(),
          vx:Common.random(-1, 1),
          vy:Common.random(-1, 1), 
        });
      }
      //Θέτει σε κίνηση τα ηλεκτρόνια
      anim1 = new Konva.Animation(function(frame) {
        var t = frame.time,
            dt = frame.timeDiff,
            frameRate = frame.frameRate,
            timeScale = 1;
        // Ενημέρωση θέσεων με τη μέθοδο Verlet
        for(let i=0; i<conductorNegativeElectrons.length; i++){
            var e = conductorNegativeElectrons[i];
                //e.vy += timeScale;
                //e.vx += timeScale;
                e.prevx = e.posx;
                e.prevy = e.posy;
                e.posx += e.vx * timeScale;
                e.posy += e.vy * timeScale;
                //Οταν η σφαίρα πλησιάζει τον αγωγό τον φορτίζει
                //με επαφή, δηλαδή τα ελεύθερα ηλεκτρόνια μετακινούνται
                //μέσα στο ηλεκτροσκόπιο.
                if(conductorNegative.x()<320){
                  if(e.posy>60 && e.posx<50 && e.posx>10){
                    //Αφαιρεί το ηλεκτρόνιο από τον αγωγό
                    conductorNegativeElectrons.splice(i,1);
                    e.shape.remove();
                    //Τον προσθέτει στο ηλεκτροσκόπιο
                    e.posy=0;
                    e.prevy=0;
                    e.vy*=-1.0;
                    e.vx*=-1.0;
                    e.posx-=10;
                    e.prevx=e.posx;
                    electroscopeElectrons.push(e);
                    electroscope.add(e.shape);
                  }
                }
                //Συγκρούσεις με τις κατακόρυφες πελυρές
                if(e.posx<0 || e.posx>400){
                  e.vx *= -1.0;
                  e.posx = e.prevx;
                  e.posy = e.prevy; 
                }
                //Συγκρούσεις με τις οριζόντιες πλευρές
                if(e.posy<10 || e.posy>60){
                  e.vy *= -1.0;
                  e.posx = e.prevx;
                  e.posy = e.prevy; 
                }
                // Ενημέρωση θέσης του σχήματος στην οθόνη
                e.shape.position({ x:e.posx, y:e.posy });
          }
          labelPos.text("+20, -"+conductorNegativeElectrons.length+', Φορτίο: '+(20-conductorNegativeElectrons.length));
      }, layer);
      anim1.start();
      //Ετικέτα με τα θετικά και τα ερνητικά φορτία
      let labelPos = new Konva.Text({
        x:200,
        y:-25,
        text:"+20, -"+conductorNegativeElectrons.length,
        fill:'gray',
        strike:'gray',
        strokeWidth:4,
        fontSize:20,
        fontFamily:'Calibri',
      });
      conductorNegative.add(labelPos);
      var originalY = conductorNegative.y();
      conductorNegative.on('dragmove', () => {
        conductorNegative.y(originalY);
        //Ο αγωγός κολλάει στο ηλεκτροσκόπιο
        if(conductorNegative.x()<320){
          conductorNegative.x(250);
          plates0.hide();
          plates1Negative.show();
          plates1Positive.hide();
        }
        //Ο αγωγός κινείται σε ευθεία 
        conductorNegative.x(Math.max(conductorNegative.x(), 250));
        
      });
//-----------------------------------------------------------    
      //ΡΟΗ ΗΛΕΚΤΡΟΝΙΩΝ ΣΕ ΑΓΩΓΟΥΣ
      //Καθολικές μεταβλητές
     
      //Οι διαδρομές των ηλεκτρονίων
      let paths = [
        [305, 175, 595, 175, 595,255], 
        [595, 380, 595, 610],
      ];
     
      //Αριθμός κλάδων κάθε διαδρομής
      let nop = [];
      for(let i=0; i<paths.length; i++){
        nop.push(paths[i].length/2-1);
      }
      //Διαδρομές με μορφή διανυσμάτων
      let vectorPaths = [];
      for(let i=0;i<paths.length; i++){
        vectorPaths.push([]);
        for(let j=0; j<paths[i].length; j+=2){
          vectorPaths[i].push({x:paths[i][j],y:paths[i][j+1]} );
        }
      }
      //Η γωνία κατεύθυνσης κάθε διαδρομής
      let anglePaths = [];
      for(let i=0;i<vectorPaths.length; i++){
        anglePaths.push([]);
        for(let j=0; j<vectorPaths[i].length-1; j++){
          anglePaths[i].push(Vector.angle(vectorPaths[i][j],vectorPaths[i][j+1]));
        }
      }
      //Κατασκευάζει ένα ηλεκτρόνιο στην θέση {x,y} '#37abc8ff'
      function electronCreate(position, color){
        let electron = new Konva.Group({
          x:position.x,
          y:position.y,
        })
        let circle = new Konva.Circle({
          x: 0,
          y: 0,
          radius: electronRadius,
          //fill: '#37abc8ff',
          stroke: 'white',
          strokeWidth: 1,
          fillRadialGradientStartPoint: { x: 0, y: 0 },
          fillRadialGradientStartRadius: 0,
          fillRadialGradientEndPoint: { x: 0, y: 0 },
          fillRadialGradientEndRadius: 10*electronRadius/10,
          fillRadialGradientColorStops: [0, color , 1, 'gray'],
        });
        let sympol = new Konva.Text({
          x:-electronRadius/3,
          y:-electronRadius,
          text:'-',
          stroke:"white",
          strokeWidth:1,
        })
        electron.add(circle);
        electron.add(sympol);
        layer.add(electron);
        return electron;
      }
      //Αρχικές θέσεις των ηλεκρονίων
      //Κατασκευάζει όλα τα ηλεκτρόνια σε κάθε διαδρομή
      //Σε κάθε κλάδο τοποθετείται ένα ηλεκτρόνιο στην αρχή
      //αλλά όχι στο τέλος. Τα κέντρα των ηλεκτονίων 
      //απέχουν κατά 4r
      let electrons = [];
      let N, //Αριθμός ηλεκτρονίων ανά κλάδο 
          dx, //Απόσταση κέντρων δύο γειτονικών ηλεκτρονίων
          posx,
          posy,
          electron,
          signx,//Ταχύτητα
          signy;//Ταχύτητα
      for(let i=0;i<vectorPaths.length; i++){
        electrons.push([]);
        for(let j=0; j<vectorPaths[i].length-1; j++){
          N = Math.ceil(Vector.magnitude(Vector.sub(vectorPaths[i][j],vectorPaths[i][j+1])) / (4*electronRadius));
          dx = Vector.magnitude(Vector.sub(vectorPaths[i][j],vectorPaths[i][j+1])) / N;
          if(vectorPaths[i][j+1].x != vectorPaths[i][j].x){
            signx = Common.sign(vectorPaths[i][j+1].x - vectorPaths[i][j].x);
          }else{
            signx=0;
          }
          if(vectorPaths[i][j+1].y != vectorPaths[i][j].y){
            signy = Common.sign(vectorPaths[i][j+1].y - vectorPaths[i][j].y);
          }else{
            signy=0;
          }
          posx=vectorPaths[i][j].x;
          posy=vectorPaths[i][j].y;
          for(k=0; k<N; k++){
            electrons[i].push({
              shape:electronCreate({
                x:posx+Math.cos(anglePaths[i][j])*k*dx,
                y:posy+Math.sin(anglePaths[i][j])*k*dx,
              }, '#37abc8ff'),
              vx:signx,
              vy:signy,
              posx:posx+Math.cos(anglePaths[i][j])*k*dx,
              posy:posy+Math.sin(anglePaths[i][j])*k*dx,
              revx:posx+Math.cos(anglePaths[i][j])*k*dx,
              pevy:posy+Math.sin(anglePaths[i][j])*k*dx,
              index:j,
            })
          }
        }
      }

      //Τα ηλεκτρόνια τίθονται σε κίνηση
      anim = new Konva.Animation(function(frame) {
        var t = frame.time,
            dt = frame.timeDiff,
            frameRate = frame.frameRate,
            timeScale = 1;
        // Ενημέρωση θέσεων με τη μέθοδο Verlet
        for(let i=0;i<electrons.length; i++){
          for(let j=0; j<electrons[i].length; j++){
            var e = electrons[i][j];
                
                //e.vy += timeScale;
                //e.vx += timeScale;
                e.prevx = e.posx;
                e.prevy = e.posy;
                e.posx += e.vx * timeScale;
                e.posy += e.vy * timeScale;

                // Ανίχνευση και αντιμετώπιση
                // του γεγονότος ότι το ηλεκτρόνιο φτάνει 
                //στο τέλος του κλάδου. Εκεί θα πρέπει να 
                //αλλάζει ταχύτητα
                let lastx = vectorPaths[i][e.index+1].x;
                let lasty = vectorPaths[i][e.index+1].y;
                if (Math.sqrt((e.posx-lastx)**2+(e.posy-lasty)**2 < 2*electronRadius)){
                  if(j!=electrons[i].length-1){
                    e.vx = electrons[i][j+1].vx;
                    e.vy = electrons[i][j+1].vy;
                    e.posx = lastx;
                    e.posy = lasty;
                    e.index++;
                  }else if(j==electrons[i].length-1){
                    e.vx = electrons[i][0].vx;
                    e.vy = electrons[i][0].vy;
                    e.posx = lastx;
                    e.posy = lasty;
                    e.index++;
                  }
                }
                
                // Ανίχνευση και αντιμετώπιση
                // του γεγονότος ότι το ηλεκτρόνιο φτάνει 
                //στο τέλος της διαδρομής. Εκεί θα πρέπει να εξεφανίζεται
                //και να επανεμφανίζεται στην αρχή της διαδρομής
                lastx = vectorPaths[i][vectorPaths[i].length-1].x;
                lasty = vectorPaths[i][vectorPaths[i].length-1].y;
                if (Math.sqrt((e.posx-lastx)**2+(e.posy-lasty)**2 < 2*electronRadius)) {
                    //Αφαίρεση αυτού του ηλεκτρονίου
                    electrons[i].splice(j,1);
                    e.shape.destroy();
                    //Δημιουργία ενός νέου στο αριστερό όριο
                    if(vectorPaths[i][1].x != vectorPaths[i][0].x){
                      signx = Common.sign(vectorPaths[i][1].x - vectorPaths[i][0].x);
                    }else{
                      signx=0;
                    }
                    if(vectorPaths[i][1].y != vectorPaths[i][0].y){
                      signy = Common.sign(vectorPaths[i][1].y - vectorPaths[i][0].y);
                    }else{
                      signy=0;
                    }
                    electrons[i].unshift({
                      shape:electronCreate({
                        x:vectorPaths[i][0].x,
                        y:vectorPaths[i][0].y,
                      },'#37abc8ff'),
                      vx:signx,
                      vy:signy,
                      posx:vectorPaths[i][0].x,
                      posy:vectorPaths[i][0].y,
                      revx:vectorPaths[i][0].x,
                      pevy:vectorPaths[i][0].y,
                      index:0,
                    })
                }
                

                // Ενημέρωση θέσης του σχήματος στην οθόνη
                e.shape.position({ x:e.posx, y:e.posy });
          }
        }
            
      }, layer);
      //-----------------------------------




//============================================

      //Τίτλος επιλογής φορτίου A
      let labelRadioChargeΑ = new Konva.Text({
        x:50,
        y:70,
        text:'Φορτίο σφαίρας Α',
        fontSize: 14,
        fontFamily: 'Calibri',
        stroke:'gray',
        strokeWidth:1,
      });
      layer.add(labelRadioChargeΑ);

      //Το στοιχείο radio επιλογής του φορτίου της σφαίρας Α
      let radioChargeA = new johnkscienceRadio({
        x:50,
        y:100,
        name:'radioChargeΒ',
        fill:'red',
        stroke:"blue",
        values:[ 'Θετικό', 'Αρνητικό'],
        fontSize:14,
        fontFamily:'Calibri',
        fontColor:'black',
        padding:5,
        listener: layer,
      })
      layer.add(radioChargeA);
      
      //Το στοιχείο επιλογής του φορτίου qA
      let rangeChargeA = new johnkscienceRange({
        x:140,
        y:100,
        name: 'range',
        lineWidth: 100,
        fill:'lightgreen',
        stroke:'gray',
        fontSize:14,
        fontFamily:'Calibri',
        fontColor:'blue',
        padding:5,
        initialValue:1,
        startValue:1,
        endValue:2,
        startText:'1',
        endText:'2',
        approx:1,
        });
        layer.add(rangeChargeA);

      //Τίτλος επιλογής φορτίου B
      let labelRadioChargeB = new Konva.Text({
        x:50,
        y:180,
        text:'Φορτίο σφαίρας Β',
        fontSize: 14,
        fontFamily: 'Calibri',
        stroke:'gray',
        strokeWidth:1,
      });
      layer.add(labelRadioChargeB);

      //Το στοιχείο radio επιλογής του φορτίου της σφαίρας Α
      let radioChargeB = new johnkscienceRadio({
        x:50,
        y:200,
        name:'radioChargeΒ',
        fill:'red',
        stroke:"blue",
        values:[ 'Θετικό', 'Αρνητικό'],
        fontSize:14,
        fontFamily:'Calibri',
        fontColor:'black',
        padding:5,
        listener: layer,
      })
      layer.add(radioChargeB);

      //Το στοιχείο επιλογής του φορτίου qB
      let rangeChargeB = new johnkscienceRange({
        x:140,
        y:200,
        name: 'range',
        lineWidth: 100,
        fill:'lightgreen',
        stroke:'gray',
        fontSize:14,
        fontFamily:'Calibri',
        fontColor:'blue',
        padding:5,
        initialValue:1,
        startValue:1,
        endValue:2,
        startText:'1',
        endText:'2',
        approx:1,
        });
        layer.add(rangeChargeB);

      //Τίτλος κλιμάκωσης δύναμης
      let labelRadiok = new Konva.Text({
        x:50,
        y:280,
        text:'Κλιμάκωση δύναμης',
        fontSize: 14,
        fontFamily: 'Calibri',
        stroke:'gray',
        strokeWidth:1,
      });
      layer.add(labelRadiok);

      //Το στοιχείο κλιμάκωσης της δύναμης
      let radiok = new johnkscienceRadio({
        x:50,
        y:300,
        name:'radiok',
        fill:'red',
        stroke:"blue",
        values:[ 'Κανονικά', 'Σμίκρυνση', 'Μεγέθυνση'],
        fontSize:14,
        fontFamily:'Calibri',
        fontColor:'black',
        padding:5,
        listener: layer,
      })
      layer.add(radiok);
      
      //Το φορτίο Α
      let qA = rangeChargeA.getValue();
      let chargeA = new johnkscienceCharge({
        x:500,
        y:300,
        radius:50,
        stroke:'gray',
        strokeWidth:1,
        positiveFill:'red',
        negativeFill:'blue',
        charge: '+',
        draggable: true,
      });
      layer.add(chargeA);
      let rA =chargeA.getRadius();

      //Το φορτίο B
      let qB = rangeChargeB.getValue();
      let chargeB = new johnkscienceCharge({
        x:800,
        y:250,
        radius:50,
        stroke:'gray',
        strokeWidth:1,
        positiveFill:'red',
        negativeFill:'blue',
        charge: '+',
        draggable: true,
      });
      layer.add(chargeB);
      let rB =chargeB.getRadius();

      //Το τετράγωνο της απόστασης
      let r2 = (chargeA.x()-chargeB.x())**2 + (chargeA.y()-chargeB.y())**2;

      //Ο συνετελεστής αναλογίας
      let k = 10000000/2 ;

      //Η κετεύθυνση των δυνάμεων
      //+1 για ελκτικές -1 για απωστικές
      let sign = -1;

      //Οι δυνάμεις
      //Μέτρο δύναμης
      let forceMag =  k * qA * qB / r2;
      //Οι θέσεις των φορτίων
      let v1 = Vector.create(chargeA.x(), chargeA.y());
      let v2 = Vector.create(chargeB.x(), chargeB.y());
      //Η δύναμη στο φορτίο Α
      let force1 =Vector.sub(v2,v1);
      force1 = Vector.mult(Vector.normalise(force1), sign*forceMag);
      force1 = Vector.add(force1, v1);
      //Η δύναμη στο φορτίο Β
      let force2 =Vector.sub(v1,v2);
      force2 = Vector.mult(Vector.normalise(force2), sign*forceMag);
      force2 = Vector.add(force2, v2);
      //Σχεδιάζω την δύναμη στο φορτίο Α
      let forceA = new Konva.Arrow({
        //x: chargeA.x(),
        //y: chargeA.y(),
        points: [chargeA.x(), chargeA.y(), force1.x, force1.y],
        pointerLength: 20,
        pointerWidth: 10,
        fill: 'yellow',
        stroke: 'yellow',
        strokeWidth: 5,
        opacity:0.7,
        shadowColor: 'gray',
        shadowBlur: 2,
        shadowOffset: { x: 5, y: 5 },
        shadowOpacity: 0.5,
        
      });
      layer.add(forceA);
      //Σχεδιάζω την δύναμη στο φορτίο Β
      let forceB = new Konva.Arrow({
        points: [chargeB.x(), chargeB.y(), force2.x, force2.y],
        pointerLength: 20,
        pointerWidth: 10,
        fill: 'yellow',
        stroke: 'yellow',
        strokeWidth: 5,
        opacity: 0.7,
        shadowColor: 'gray',
        shadowBlur: 2,
        shadowOffset: { x: 5, y: 5 },
        shadowOpacity: 0.5,
        
      });
      layer.add(forceB);

      //Κατά την μετακίνηση του φορτίου Α
      chargeA.on('dragmove', ()=>{
        //Το τετράγωνο της απόστασης
        r2 = (chargeA.x()-chargeB.x())**2 + (chargeA.y()-chargeB.y())**2;
        //Μέτρο δύναμης
        forceMag =  k * qA * qB / r2;
        //Οι θέσεις των φορτίων
        v1 = Vector.create(chargeA.x(), chargeA.y());
        v2 = Vector.create(chargeB.x(), chargeB.y());
        //Η δύναμη στο φορτίο Α
        force1 =Vector.sub(v2,v1);
        force1 = Vector.mult(Vector.normalise(force1), sign*forceMag);
        force1 = Vector.add(force1, v1);
        //Η δύναμη στο φορτίο Β
        force2 =Vector.sub(v1,v2);
        force2 = Vector.mult(Vector.normalise(force2), sign*forceMag);
        force2 = Vector.add(force2, v2);
        forceA.points([chargeA.x(), chargeA.y(), force1.x, force1.y]);
        forceB.points([chargeB.x(), chargeB.y(), force2.x, force2.y]);
      })
      //Κατά την μετακίνηση του φορτίου B
      chargeB.on('dragmove', ()=>{
        //Το τετράγωνο της απόστασης
        r2 = (chargeA.x()-chargeB.x())**2 + (chargeA.y()-chargeB.y())**2;
        //Μέτρο δύναμης
        forceMag =  k * qA * qB / r2;
        //Οι θέσεις των φορτίων
        v1 = Vector.create(chargeA.x(), chargeA.y());
        v2 = Vector.create(chargeB.x(), chargeB.y());
        //Η δύναμη στο φορτίο Α
        force1 =Vector.sub(v2,v1);
        force1 = Vector.mult(Vector.normalise(force1), sign*forceMag);
        force1 = Vector.add(force1, v1);
        //Η δύναμη στο φορτίο Β
        force2 =Vector.sub(v1,v2);
        force2 = Vector.mult(Vector.normalise(force2), sign*forceMag);
        force2 = Vector.add(force2, v2);
        forceA.points([chargeA.x(), chargeA.y(), force1.x, force1.y]);
        forceB.points([chargeB.x(), chargeB.y(), force2.x, force2.y]);
      });

      //Αλλάγή του φορτίου Α
      radioChargeA.on('click', ()=>{
        if(radioChargeA.getValue()=='Θετικό'){
          chargeA.setChargeType(1);
        }else{
          chargeA.setChargeType(-1);
        }
        sign = - chargeA.getChargeType() * chargeB.getChargeType();
        //Το τετράγωνο της απόστασης
        r2 = (chargeA.x()-chargeB.x())**2 + (chargeA.y()-chargeB.y())**2;
        //Μέτρο δύναμης
        forceMag =  k * qA * qB / r2;
        //Οι θέσεις των φορτίων
        v1 = Vector.create(chargeA.x(), chargeA.y());
        v2 = Vector.create(chargeB.x(), chargeB.y());
        //Η δύναμη στο φορτίο Α
        force1 =Vector.sub(v2,v1);
        force1 = Vector.mult(Vector.normalise(force1), sign*forceMag);
        force1 = Vector.add(force1, v1);
        //Η δύναμη στο φορτίο Β
        force2 =Vector.sub(v1,v2);
        force2 = Vector.mult(Vector.normalise(force2), sign*forceMag);
        force2 = Vector.add(force2, v2);
        forceA.points([chargeA.x(), chargeA.y(), force1.x, force1.y]);
        forceB.points([chargeB.x(), chargeB.y(), force2.x, force2.y]);
      });

      //Αλλαγή του φορτίου Β
      radioChargeB.on('click', ()=>{
        if(radioChargeB.getValue()=='Θετικό'){
          chargeB.setChargeType(1);
        }else{
          chargeB.setChargeType(-1);
        }
        sign = - chargeA.getChargeType() * chargeB.getChargeType();
        //Το τετράγωνο της απόστασης
        r2 = (chargeA.x()-chargeB.x())**2 + (chargeA.y()-chargeB.y())**2;
        //Μέτρο δύναμης
        forceMag =  k * qA * qB / r2;
        //Οι θέσεις των φορτίων
        v1 = Vector.create(chargeA.x(), chargeA.y());
        v2 = Vector.create(chargeB.x(), chargeB.y());
        //Η δύναμη στο φορτίο Α
        force1 =Vector.sub(v2,v1);
        force1 = Vector.mult(Vector.normalise(force1), sign*forceMag);
        force1 = Vector.add(force1, v1);
        //Η δύναμη στο φορτίο Β
        force2 =Vector.sub(v1,v2);
        force2 = Vector.mult(Vector.normalise(force2), sign*forceMag);
        force2 = Vector.add(force2, v2);
        forceA.points([chargeA.x(), chargeA.y(), force1.x, force1.y]);
        forceB.points([chargeB.x(), chargeB.y(), force2.x, force2.y]);
      });

      rangeChargeA.on('dragmove', ()=>{
        qA = rangeChargeA.getValue();
        chargeA.setRadius(rA*qA);
        //Το τετράγωνο της απόστασης
        r2 = (chargeA.x()-chargeB.x())**2 + (chargeA.y()-chargeB.y())**2;
        //Μέτρο δύναμης
        forceMag =  k * qA * qB / r2;
        //Οι θέσεις των φορτίων
        v1 = Vector.create(chargeA.x(), chargeA.y());
        v2 = Vector.create(chargeB.x(), chargeB.y());
        //Η δύναμη στο φορτίο Α
        force1 =Vector.sub(v2,v1);
        force1 = Vector.mult(Vector.normalise(force1), sign*forceMag);
        force1 = Vector.add(force1, v1);
        //Η δύναμη στο φορτίο Β
        force2 =Vector.sub(v1,v2);
        force2 = Vector.mult(Vector.normalise(force2), sign*forceMag);
        force2 = Vector.add(force2, v2);
        forceA.points([chargeA.x(), chargeA.y(), force1.x, force1.y]);
        forceB.points([chargeB.x(), chargeB.y(), force2.x, force2.y]);
        
      });

      rangeChargeB.on('dragmove', ()=>{
        qB = rangeChargeB.getValue();
        chargeB.setRadius(rA*qB);
        //Το τετράγωνο της απόστασης
        r2 = (chargeA.x()-chargeB.x())**2 + (chargeA.y()-chargeB.y())**2;
        //Μέτρο δύναμης
        forceMag =  k * qA * qB / r2;
        //Οι θέσεις των φορτίων
        v1 = Vector.create(chargeA.x(), chargeA.y());
        v2 = Vector.create(chargeB.x(), chargeB.y());
        //Η δύναμη στο φορτίο Α
        force1 =Vector.sub(v2,v1);
        force1 = Vector.mult(Vector.normalise(force1), sign*forceMag);
        force1 = Vector.add(force1, v1);
        //Η δύναμη στο φορτίο Β
        force2 =Vector.sub(v1,v2);
        force2 = Vector.mult(Vector.normalise(force2), sign*forceMag);
        force2 = Vector.add(force2, v2);
        forceA.points([chargeA.x(), chargeA.y(), force1.x, force1.y]);
        forceB.points([chargeB.x(), chargeB.y(), force2.x, force2.y]);
        
      })

      radiok.on('click', ()=>{
        if(radiok.getValue() ==='Σμίκρυνση'){
          k = 10000000/4;
        }else if(radiok.getValue() ==='Μεγέθυνση'){
          k = 10000000;
        }
        //Το τετράγωνο της απόστασης
        r2 = (chargeA.x()-chargeB.x())**2 + (chargeA.y()-chargeB.y())**2;
        //Μέτρο δύναμης
        forceMag =  k * qA * qB / r2;
        //Οι θέσεις των φορτίων
        v1 = Vector.create(chargeA.x(), chargeA.y());
        v2 = Vector.create(chargeB.x(), chargeB.y());
        //Η δύναμη στο φορτίο Α
        force1 =Vector.sub(v2,v1);
        force1 = Vector.mult(Vector.normalise(force1), sign*forceMag);
        force1 = Vector.add(force1, v1);
        //Η δύναμη στο φορτίο Β
        force2 =Vector.sub(v1,v2);
        force2 = Vector.mult(Vector.normalise(force2), sign*forceMag);
        force2 = Vector.add(force2, v2);
        forceA.points([chargeA.x(), chargeA.y(), force1.x, force1.y]);
        forceB.points([chargeB.x(), chargeB.y(), force2.x, force2.y]);
         
      });


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
      