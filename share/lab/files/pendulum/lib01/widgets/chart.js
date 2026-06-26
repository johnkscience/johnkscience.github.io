import { Widget } from './widget.js'; // Υποθέτουμε ότι το widget.js είναι στο ίδιο φάκελο

class Chart extends Widget {
    constructor(options) {
        super(options);

        this.options = {
            ...this.options, // Κρατάμε τις επιλογές του Widget
            title: options.title || '', // Τίτλος γραφήματος
            xAxisLabel: options.xAxisLabel || '', // Ετικέτα άξονα x
            yAxisLabel: options.yAxisLabel || '', // Ετικέτα άξονα y
            padding: options.padding || 5, // Αποστάσεις από τα όρια του widget για τις ετικέτες και τους άξονες
            //data: options.data || [], // Τα δεδομένα του γραφήματος
            // ... άλλες επιλογές όπως χρώματα, στυλ, κλπ.
            width: options.width || 200,
            height: options.height || 200,
            decimals: options.decimals || 1,
            originOffsetX: options.originOffsetX || 100,
            originOffsetY: options.originOffsetY || 100,
            majorScaleX: options.majorScaleX || true,
            majorScaleY: options.majorScaleY ||true,
            majorScaleXWidth: options.majorScaleXWidth || 20,
            majorScaleYWidth: options.majorScaleYWidth || 20,
            majorScaleXUnit: options.majorScaleXUnit || 1,
            majorScaleYUnit: options.majorScaleYUnit || 1,
            fill: options.fill || 'snow',
            fontSize: options.fontSize || 10,
            fontColor: options.fontColor || 'gray',
            fontFamily: options.fontFamily || 'Times',
        };

        //Τυπωνει τον τιτλο
        if(this.options.title){
            this.title = new Konva.Text({
                text: this.options.title,
                y: this.options.y - this.options.fontSize-4 - this.options.padding, // Τοποθετούμε τον τίτλο πάνω από το γράφημα
                align: 'center',
                fontSize: this.options.fontSize+4,
                fontColor: this.options.fontColor,
                fontFamily: this.options.fontFamily,
            });
            
            this.title.x( this.options.x + this.options.width / 2 - this.title.width()/2);
            this.add(this.title);
        }

        //Τυπώνει το τιτλο στον χ αξονα
        if(this.options.xAxisLabel){
            this.xAxisLabel = new Konva.Text({
                text: this.options.xAxisLabel,
                y: this.options.y + this.options.height + 2 + this.options.padding, // Τοποθετούμε την ετικέτα κάτω από το γράφημα
                align: 'center',
                fontSize: this.options.fontSize+2,
                fontColor: this.options.fontColor,
                fontFamily: this.options.fontFamily,
            });
            this.xAxisLabel.x( this.options.x + this.options.width / 2 - this.xAxisLabel.width()/2);
            this.add(this.xAxisLabel);
        }
        //Τυπώνει το τιτλο στον y αξονα
        if(this.options.yAxisLabel){
            this.yAxisLabel = new Konva.Text({
                text: this.options.yAxisLabel,
                x: this.options.x - this.options.padding - this.options.fontSize-2, // Τοποθετούμε την ετικέτα αριστερά του γραφήματος
                
                rotation: -90, // Περιστρέφουμε την ετικέτα κατά 90 μοίρες
                align: 'center',
                fontSize: this.options.fontSize+2,
                fontColor: this.options.fontColor,
                fontFamily: this.options.fontFamily,
            });
            this.yAxisLabel.y(this.options.y+ this.options.height/2+this.yAxisLabel.width()/2);
            this.add(this.yAxisLabel);

        }

        this.origin = this.origin(this.options);

        this.add(this.origin);
    }

    origin(config){
        //Το κύριο αντικείμενο
        let origin  = new Konva.Group({
            x: config.x,
            y: config.y,
            });
    
        //Το υπόβαθρο
        let background = new Konva.Rect({
            x: 0,
            y: 0,
            width: config.width,
            height: config.height,
            name: 'background',
            fill: config.fill,
            //stroke: '',
            strokeWidth: 1,
            cornerRadius: 3,
        });
    
        //Το σύστημα των δύο αξόνων
        let xAxis = new Konva.Line({
            x: 0,
            y: 0,
            points: [0, config.originOffsetY,
                 config.width, config.originOffsetY],
            pointerLength: 6,
            pointerWidth: 3,
            fill: '#535353',
            stroke: '#535353',
            strokeWidth: 1.5,
        });
        let yAxis = new Konva.Line({
            x: 0,
            y: 0,
            points: [config.originOffsetX, config.height,
                 config.originOffsetX, 0],
            pointerLength: 6,
            pointerWidth: 3,
            fill: '#535353',
            stroke: '#535353',
            strokeWidth: 1.5,
        });
    
        //Η κύρια κλίμακα στον x άξονα
        let scaleX  = new Konva.Group({
            x: 0,
            y: 0,
            });
        if(config.majorScaleX){
            let x,y;
            //Ο δείκτης των γραμμών
            let i=config.originOffsetX+config.majorScaleXWidth;
            //Ο δείκτης των αριθμών
            let n=config.majorScaleXUnit;
            //Οι αριθμοί στον x άξονα θα τυπωθεί επάνω
            //ή κάτω από τον άξονα.
            if(config.originOffsetY<config.height/2){
                y=config.originOffsetY+3;
            }else{
                y=config.originOffsetY-config.fontSize-3;
            }
            //Τυπώνει στον θετικό ημιάξονα
            while(i<config.width-10){
                //Τυπώνει τις κατακόρυφες κύριες γραμμές 
                scaleX.add( new Konva.Line({
                    points: [i, config.height, i, 0],
                    stroke: '#b3b3b3',
                    strokeWidth: 1,
                }));
                //Τυπώνει τους αριθμούς στον x άξονα, 
                //επάνω ή κάτω από τον άξονα
                scaleX.add(new Konva.Text({
                    x: i,
                    y: y,
                    text: n.toFixed(this.options.decimals),
                    fontSize: config.fontSize,
                    fontFamily:config.fontFamily,
                    fill: config.fontColor,
                }));
                i+=config.majorScaleXWidth;
                n+=config.majorScaleXUnit;
            }
            //Τυπώνει στον αρνητικό ημιάξονα
            i=config.originOffsetX-config.majorScaleXWidth;
            n=-config.majorScaleXUnit;
            while(i>10){
                scaleX.add( new Konva.Line({
                    points: [i, config.height, i, 0 ],
                    stroke: '#b3b3b3',
                    strokeWidth: 1,
                }));
                scaleX.add(new Konva.Text({
                    x: i,
                    y: y,
                    text: n.toFixed(this.options.decimals),
                    fontSize: config.fontSize,
                    fontFamily:config.fontFamily,
                    fill: 'gray',//config.fontColor,
                }));
                i-=config.majorScaleXWidth;
                n-=config.majorScaleXUnit;
            }
        }
    
        //Η κύρια κλίμακα στον y άξονα
        let scaleY  = new Konva.Group({
                x: 0,
                y: 0,
            });
        if(config.majorScaleY){
            let x,y;
            let i=config.originOffsetY-config.majorScaleYWidth;
            let n=config.majorScaleYUnit;
            //Προσωρινό κείμενο για να μετρήσω το πλάτος
            let tmpText1 = new Konva.Text({
                x: 0,
                y: 0,
                text: ''+config.majorScaleYUnit,
                fontSize: config.fontSize,
                fontFamily:config.fontFamily,
                fill: config.fontColor,
            });
            //Οι τετμημέςνες των αριθμών στα δεξιά 
            //ή αριστερά του άξονα y
            if(config.originOffsetX<config.width/2){
                x=config.originOffsetX+3;
            }else{
                x=config.originOffsetX-tmpText1.width()-5;
            }
            //Τυπώνει τον θετικό ημιάξονα y
            while(i > 10){
                scaleY.add( new Konva.Line({
                    points: [0, i, config.width, i ],
                    stroke: '#b3b3b3',
                    strokeWidth: 1,
                }));
                scaleX.add(new Konva.Text({
                    x: x,
                    y: i,
                    text: n.toFixed(this.options.decimals),
                    fontSize: config.fontSize,
                    fontFamily:config.fontFamily,
                    fill: config.fontColor,
                }));
                i-=config.majorScaleYWidth;
                n+=config.majorScaleYUnit;
            }
            //Τυπώνει τον αρνητικό ημιάξονα y
            i=config.originOffsetY+config.majorScaleYWidth;
            n=-config.majorScaleYUnit;
            while(i<config.height-10){
                scaleX.add( new Konva.Line({
                    points: [0, i, config.width, i ],
                    stroke: '#b3b3b3',
                    strokeWidth: 1,
                }));
                scaleX.add(new Konva.Text({
                    x: x,
                    y: i,
                    text: n.toFixed(this.options.decimals),
                    fontSize: config.fontSize,
                    fontFamily:config.fontFamily,
                    fill: 'gray',//config.fontColor,
                }));
                i+=config.majorScaleYWidth;
                n-=config.majorScaleYUnit;
            }
        }
    
        origin.add(background);
        origin.add(scaleX);
        origin.add(scaleY);
        origin.add(xAxis);
        origin.add(yAxis);
    
        origin.width(origin.getClientRect().width);
        origin.height(origin.getClientRect().height);
     
        return origin;
    }

}

export { Chart };