import { Widget } from './widget.js';

class FormattedText extends Widget {
    constructor(options) {
        super(options);

        this.options.name = "FormattedText"+this.options.id;
        this.options = {
            ...this.options,
            source: options.source || "<mpro></mpro>",
            fontSize: options.fontSize || 16,
            fontFamily: options.fontFamily || 'Arial',
            fontColor: options.fontColor || 'black',
            padding: 1,
        };
        
        this.x(0);
        this.y(0);
        
        this.ft = this.render(this.options); // Κλήση της συνάρτησης render για την απόδοση του κειμένου
        this.add(this.ft);
        this.width(this.ft.width());
        this.height(this.ft.height());
        
    }

    render(config){
        let active = true;
        //Το κύριο αντικείμενο
        let formatedText  = new Konva.Group({
            x: config.x,
            y: config.y,
            });
        //Οι τρέχον συντεταγμένες εκτύπωσης
        let xPos=0;
        let yPos=0;
        //Το διάστημα μετά από κάθε στοιχείο
        let s=config.padding;
        //Το διάστημα μεταξύ των στοιχείων ενώς γρουπ
        let ss=2;
        //Πλάτος και ύψος τελευταίου στοιχειοθετημένου στοιχείου
        let lastElementWidth;
        let lastElementHeight;
        //Πλάτος και ύψος τελευταίου στοιχειοθετημένου κλάσματος
        let lastFractionNumHeight;
        let lastFractionDenHeight;
        //Αναλύει τον πηγαίο κώδικα σε δέντρο λεκτικών σημείων
        const parser = new DOMParser();
        const doc = parser.parseFromString(config.source, "application/xml");
        //Εάν το doc δεν έχει παιδιά
        if(!doc.children) return formatedText;
    
        //Κύριος Βρόχγος
        for(let i=0; i<doc.children[0].childElementCount; i++){
            formatedText.add(main(doc.children[0].children[i]));
        }
    
        function main(node){
            switch(node.tagName){
                case 'mi':
                    return mi(node);
                case 'mo':
                    return mo(node);
                case 'mn':
                    return mn(node);
                case 'ms':
                    return ms(node);
                case 'mp':
                    return mp(node);
                case 'mf':
                    return mf(node);
                case 'mc':
                    return mc(node);
                case 'mtext':
                    return mtext(node);
                case 'msub':
                    return msub(node);
                case 'msup':
                    return msup(node); 
                case 'mfrac':
                    return  mfrac(node);  
                case 'msqrt':
                    return  msqrt(node); 
                case 'mroot':
                    return  mroot(node); 
                case 'mrow':
                    return mrow(node);
                case 'mspace':
                    return mspace(node);
                case 'msubsup':
                    return msubsup(node);
                case 'mvec':
                    return mvec(node);
                case 'mbar':
                    return mbar(node);
                case 'mangle':
                    return mangle(node);
                default:
                    return def(node);
            }
        }
    
        function mrow(node){
            let mrow  = new Konva.Group({
                x: 0,
                y: 0,
                });
            let max=0;
            let nMax=0;
            let dMax=0;
            let eWidth=0;
            let eHeight=0;
            for(let i=0; i<node.childElementCount; i++){
                switch(node.children[i].tagName){
                   case 'mi':
                        mrow.add(mi(node.children[i]));
                        break;
                    case 'mo':
                        mrow.add(mo(node.children[i]));
                        break;
                    case 'mn':
                        mrow.add(mn(node.children[i]));
                        break;
                    case 'ms':
                        mrow.add(ms(node.children[i]));
                        break;
                    case 'mf':
                        mrow.add(mf(node.children[i]));
                        break;
                    case 'mp':
                        mrow.add(mp(node.children[i]));
                        break;
                    case 'mc':
                        mrow.add(mc(node.children[i]));
                        break;
                    case 'mtext':
                        mrow.add(mtext(node.children[i]));
                        break;
                    case 'msub':
                        mrow.add(msub(node.children[i]));
                        break;
                    case 'msup':
                        mrow.add(msup(node.children[i]));
                        break;
                    case 'mrow':
                        mrow.add(mrow(node.children[i]));
                        break;
                    case 'mfrac':
                        mrow.add(mfrac(node.children[i]));
                        break;
                    case 'msqrt':
                        mrow.add(msqrt(node.children[i]));
                        break;
                    case 'mroot':
                        mrow.add(mroot(node.children[i]));
                        break;
                    case 'mspace':
                        mrow.add(mspace(node.children[i]));
                        break;
                    case 'msubsup':
                        mrow.add(msubsup(node.children[i]));
                        break;
                    case 'mvec':
                        mrow.add(mvec(node.children[i]));
                        break;
                    case 'mbar':
                        mrow.add(mbar(node.children[i]));
                        break;
                    case 'mangle':
                        mrow.add(mangle(node.children[i]));
                        break;
                    default:
                        mrow.add(def(node.children[i]));
                }
                eWidth+=lastElementWidth;
                eHeight>max ? max=eHeight : max;
                lastFractionNumHeight>nMax ? nMax=lastFractionNumHeight : nMax;
                lastFractionDenHeight>dMax ? dMax=lastFractionDenHeight : dMax;
            }
            lastElementWidth=eWidth;
            lastElementHeight=max;
            lastFractionNumHeight=nMax;
            lastFractionDenHeight=dMax;
            
            return mrow;
        }
        function mi(node){
            //console.log(node.attributes.length);
            //console.log(node.attributes[0]);
            //console.log(node.attributes[0].name);
            //console.log(node.attributes[0].value);
            let xInit=xPos;
            let yInit=yPos;
            let mi  = new Konva.Group({
                x: 0,
                y: 0,
            });
            let text = new Konva.Text({
                x:xPos,
                y:yPos,
                text: node.textContent,
                fontSize: config.fontSize,
                fontFamily:config.fontFamily,
                fill: config.fontColor,
                });
            lastElementWidth=text.width()+s;
            lastElementHeight=config.fontSize;
            lastFractionNumHeight=config.fontSize/2;
            lastFractionDenHeight=config.fontSize/2;
            xPos+=lastElementWidth;
            mi.add(text);
            return mi;
        }
        function mo(node){
            let xInit=xPos;
            let yInit=yPos;
            //Το κύριο αντικείμενο
            let mo  = new Konva.Group({
                x: 0,
                y: 0,
            });
            //Επιλογή των τελεστών
            let op = {
                'cdot':'\u{2219}',
                '+-': '\u{2213}',
                'in': '\u{2208}',
                'notin':'\u{2209}',
                'inf': '\u{221e}',
                'le': '\u{2264}',
                'ge': '\u{2265}',
                'drarrow': '\u{21d2}',
                'dlrarrow': '\u{21d4}',
                'forall': '\u{2200}',
                'partial': '\u{2201}',
                'exist': '\u{2203}',
                'notexist': '\u{2204}',
                'emptyset': '\u{2205}',
                'delta': '\u{2206}',
                'nabla': '\u{2207}',
                'endofproof': '\u{220e}',
                'ring': '\u{2218}',
                'prop': '\u{221d}',
                'rightangle': '\u{221F}',
                'angle': '\u{2220}',
                'parallel': '\u{2225}',
                'notparallel': '\u{2226}',
                'and': '\u{2227}',
                'or': '\u{2228}',
                'intersection': '\u{2229}',
                'union': '\u{222a}',
                'almost': '\u{2248}',
                'def': '\u{225d}',
                'neq': '\u{2260}',
                'identical': '\u{2262}',
                'subset': '\u{2282}',
                'superset': '\u{2283}',
                'subsetequal': '\u{2286}',
                'supersetequal': '\u{2287}',
                'vectorin': '\u{2297}',
                'vectorout': '\u{2299}',
                'star': '\u{22c6}',
                'rarrow': '\u{2192}',
                'larrow': '\u{2190}',
                'samearrows': '\u{21c8}',
                'opositearrows': '\u{21c5}',
                'euro': '\u{20ac}',
                'triangle': '\u{25b3}',
            }
            
            let scaleY=1;
            for(let i=0; i<node.attributes.length; i++){
                if(node.attributes[i].name == 'scaleY'){
                    scaleY = node.attributes[i].value;
                }
            }
            
            let text = new Konva.Text({
                x: xPos,
                y: yPos,
                text: op[node.textContent] ?? node.textContent,
                fontSize: config.fontSize,
                fontFamily: config.fontFamily,
                fill: config.fontColor,
                scaleY: scaleY,
                });
            if(scaleY!=1){
                text.y(-(scaleY-1)*config.fontSize/2);
            }
    
            lastElementWidth=text.width()+s;
            lastElementHeight=config.fontSize;
            lastFractionNumHeight=config.fontSize/2;
            lastFractionDenHeight=config.fontSize/2;
            xPos+=lastElementWidth;
            mo.add(text);
            return mo;
        }
        function mn(node){
            let xInit=xPos;
            let yInit=yPos;
            let mn  = new Konva.Group({
                x: 0,
                y: 0,
            });
            let text = new Konva.Text({
                x:xPos,
                y:yPos,
                text: node.textContent,
                fontSize: config.fontSize,
                fontFamily:config.fontFamily,
                fill: config.fontColor,
                });
            //formatedText.add(text);
            lastElementWidth=text.width()+s;
            lastElementHeight=config.fontSize;
            lastFractionNumHeight=config.fontSize/2;
            lastFractionDenHeight=config.fontSize/2;
            xPos+=lastElementWidth;
            mn.add(text);
            return mn;
        }
        function ms(node){
            let xInit=xPos;
            let yInit=yPos;
            let ms  = new Konva.Group({
                x: 0,
                y: 0,
            });
            let text = new Konva.Text({
                x:xPos,
                y:yPos,
                text: node.textContent,
                fontSize: config.fontSize,
                fontFamily:config.fontFamily,
                fill: config.fontColor,
                });
            //formatedText.add(text);
            lastElementWidth=text.width()+s;
            lastElementHeight=config.fontSize;
            lastFractionNumHeight=config.fontSize/2;
            lastFractionDenHeight=config.fontSize/2;
            xPos+=lastElementWidth;
            ms.add(text);
            return ms;
        }
        function mf(node){
            let xInit=xPos;
            let yInit=yPos;
            let ms  = new Konva.Group({
                x: 0,
                y: 0,
            });
            let text = new Konva.Text({
                x:xPos,
                y:yPos,
                text: node.textContent,
                fontSize: config.fontSize,
                fontFamily:config.fontFamily,
                fill: config.fontColor,
                });
            //formatedText.add(text);
            lastElementWidth=text.width()+ss;
            lastElementHeight=config.fontSize;
            lastFractionNumHeight=config.fontSize/2;
            lastFractionDenHeight=config.fontSize/2;
            xPos+=lastElementWidth;
            ms.add(text);
            return ms;
        }
        function mc(node){
            let xInit=xPos;
            let yInit=yPos;
            let ms  = new Konva.Group({
                x: 0,
                y: 0,
            });
            xPos-=s-ss;
            let text = new Konva.Text({
                x:xPos,
                y:yPos,
                text: node.textContent,
                fontSize: config.fontSize,
                fontFamily:config.fontFamily,
                fill: config.fontColor,
                });
            //formatedText.add(text);
            lastElementWidth=text.width()+s;
            lastElementHeight=config.fontSize;
            lastFractionNumHeight=config.fontSize/2;
            lastFractionDenHeight=config.fontSize/2;
            xPos+=lastElementWidth;
            ms.add(text);
            return ms;
        }
        function mp(node){
            let xInit=xPos;
            let yInit=yPos;
            let op;
            let spaceAfter=0;
            let spaceBefore=0;
            //Το κύριο αντικείμενο
            let mp  = new Konva.Group({
                x: 0,
                y: 0,
            });
            //Επιλογή των τελεστών
            switch(node.textContent){
                case '(':
                    op='(';
                    xPos=xInit;
                    spaceAfter=0;
                    break;
                case ')':
                    op=')';
                    xPos=xInit-s;
                    spaceAfter=s;
                    break;
                case '[':
                    op='[';
                    xPos=xInit;
                    spaceAfter=0;
                    break;
                case ']':
                    op=']';
                    xPos=xInit-s;
                    spaceAfter=s;
                    break;
                case '{':
                    op='{';
                    xPos=xInit;
                    spaceAfter=0;
                    break;
                case '}':
                    op='}';
                    xPos=xInit-s;
                    spaceAfter=s;
                    break;
                case 'leftAngleBracket':
                    op='\u{27E8}';
                    xPos=xInit;
                    spaceAfter=0;
                    break;
                case 'rightAngleBracket':
                    op='\u{27E9}';
                    xPos=xInit-s;
                    spaceAfter=s;
                    break;
                default:
                    //op=node.textContent;
                    break;
            }
            let scaleY=1;
            let offsetY=0;
            for(let i=0; i<node.attributes.length; i++){
                switch(node.attributes[i].name){
                    case 'scaleY': 
                        scaleY = node.attributes[i].value;
                        break;
                    case 'offsetY':
                        offsetY = node.attributes[i].value;
                        break;
                }
            }
            
            let text = new Konva.Text({
                x: xPos,
                y: yPos,
                text: op,
                fontSize: config.fontSize,
                fontFamily: config.fontFamily,
                fill: config.fontColor,
                scaleY: scaleY,
                });
            if(scaleY!=1){
                text.y(-(scaleY-1)*config.fontSize/2 + offsetY*config.fontSize/2);
            }
    
            lastElementWidth=text.width()+spaceAfter;
            lastElementHeight=config.fontSize;
            lastFractionNumHeight=config.fontSize/2;
            lastFractionDenHeight=config.fontSize/2;
            xPos+=lastElementWidth;
            mp.add(text);
            return mp; 
        }
        function mvec(node){
            let xInit=xPos;
            let yInit=yPos;
            let fontSizeInit=config.fontSize;
            let mover  = new Konva.Group({
                x: 0,
                y: 0,
                });
    
            //Διαβάζει τις παραμέτρους
            let offsetY=0;
            for(let i=0; i<node.attributes.length; i++){
                switch(node.attributes[i].name){
                    case 'offsetY':
                        offsetY = node.attributes[i].value;
                        break;
                }
            }
            //Διαβάζει την βάση
            let base = main(node.children[0]);
            let baseWidth=lastElementWidth;
            let baseHeight = lastElementHeight;
            mover.add(base);
            //Διαβάζει το σύμβολο
            yPos-=3*config.fontSize/10;
            xPos=xInit;
            config.fontSize=5*config.fontSize/10;
            let over = new Konva.Text({
                x: xPos,
                y: yPos,
                text: '\u{2192}', //vector
                fontSize: config.fontSize,
                fontFamily: config.fontFamily,
                fill: config.fontColor,
                });
            config.fontSize=fontSizeInit;
            let overWidth=over.getClientRect().width;
            let overHeight = lastElementHeight;
            mover.add(over);
            over.scaleX((baseWidth-s)/overWidth);
            over.y(offsetY*config.fontSize/10);
            
            baseWidth>overWidth ? lastElementWidth=baseWidth : lastElementWidth=overWidth;
            lastElementWidth = mover.getClientRect().width;
            lastElementHeight = mover.getClientRect().height;
            lastFractionNumHeight = lastElementHeight/2;
            lastFractionDenHeight = lastElementHeight/2;
            xPos=lastElementWidth+s;
            yPos=yInit;
            return mover;
        }
        function mbar(node){
            let xInit=xPos;
            let yInit=yPos;
            let fontSizeInit=config.fontSize;
            let mover  = new Konva.Group({
                x: 0,
                y: 0,
                });
    
            //Διαβάζει τις παραμέτρους
            let offsetY=0;
            for(let i=0; i<node.attributes.length; i++){
                switch(node.attributes[i].name){
                    case 'offsetY':
                        offsetY = node.attributes[i].value;
                        break;
                }
            }
            //Διαβάζει την βάση
            let base = main(node.children[0]);
            let baseWidth=lastElementWidth;
            let baseHeight = lastElementHeight;
            mover.add(base);
            //Διαβάζει το σύμβολο
            yPos-=3*config.fontSize/10;
            xPos=xInit;
            config.fontSize=5*config.fontSize/10;
            let over = new Konva.Text({
                x: xPos,
                y: yPos,
                text: '\u{2015}', //bar
                fontSize: config.fontSize,
                fontFamily: config.fontFamily,
                fill: config.fontColor,
                });
            config.fontSize=fontSizeInit;
            let overWidth=over.getClientRect().width;
            let overHeight = lastElementHeight;
            mover.add(over);
            over.scaleX((baseWidth-s)/overWidth);
            over.y(offsetY*config.fontSize/10);
            
            baseWidth>overWidth ? lastElementWidth=baseWidth : lastElementWidth=overWidth;
            lastElementWidth = mover.getClientRect().width;
            lastElementHeight = mover.getClientRect().height;
            lastFractionNumHeight = lastElementHeight/2;
            lastFractionDenHeight = lastElementHeight/2;
            xPos=lastElementWidth+s;
            yPos=yInit;
            return mover;
        }
        function mangle(node){
            let xInit=xPos;
            let yInit=yPos;
            let fontSizeInit=config.fontSize;
            let mover  = new Konva.Group({
                x: 0,
                y: 0,
                });
    
            //Διαβάζει τις παραμέτρους
            let offsetY=0;
            for(let i=0; i<node.attributes.length; i++){
                switch(node.attributes[i].name){
                    case 'offsetY':
                        offsetY = node.attributes[i].value;
                        break;
                }
            }
            //Διαβάζει την βάση
            let base = main(node.children[0]);
            let baseWidth=lastElementWidth;
            let baseHeight = lastElementHeight;
            mover.add(base);
            //Διαβάζει το σύμβολο
            yPos-=3*config.fontSize/10;
            xPos=xInit;
            config.fontSize=5*config.fontSize/10;
            let over = new Konva.Text({
                x: xPos,
                y: yPos,
                text: '\u{2227}', //angle
                fontSize: config.fontSize,
                fontFamily: config.fontFamily,
                fill: config.fontColor,
                });
            config.fontSize=fontSizeInit;
            let overWidth=over.getClientRect().width;
            let overHeight = lastElementHeight;
            mover.add(over);
            over.scaleX((baseWidth-s)/(overWidth*2));
            over.y(offsetY*config.fontSize/10);
            over.x(baseWidth/4);
            
            baseWidth>overWidth ? lastElementWidth=baseWidth : lastElementWidth=overWidth;
            lastElementWidth = mover.getClientRect().width;
            lastElementHeight = mover.getClientRect().height;
            lastFractionNumHeight = lastElementHeight/2;
            lastFractionDenHeight = lastElementHeight/2;
            xPos=lastElementWidth+s;
            yPos=yInit;
            return mover;
        }
        function mfrac(node){
            yPos=0;
            //Πρέπει να δουλέψω με group
            let xInit=xPos;
            let yInit=yPos;
            let fontSizeInit=config.fontSize;
            let mfrac  = new Konva.Group({
                x: 0,
                y: 0,
            });
    
            //O Ο αριθμητής
            let num = main(node.children[0]);
            let numWidth = lastElementWidth;
            let numHeight = lastElementHeight;
            let numNumHeight = lastFractionNumHeight;
            let numDenHeight = lastFractionDenHeight;
            
            //Ο παρανομαστής
            xPos=xInit;
            let den = main(node.children[1]);
            let denWidth = lastElementWidth;
            let denHeight = lastElementHeight;
            let denNumHeight = lastFractionNumHeight;
            let denDenHeight = lastFractionDenHeight;
    
            //Τακτοποιεί τον αριθμητή, τον παρανομαστή οριζόντια
            let max;
            numWidth>denWidth ? max=numWidth : max=denWidth;
            num.x((max-numWidth)/2);
            den.x((max-denWidth)/2);
    
            //Η γραμμή του κλάσματος
            let  line = new Konva.Line({
                points: [xInit, yPos, xInit+max-2*s/3, yPos],
                stroke: config.fontColor,
                strokeWidth: 1,
                lineCap: 'round',
            });
    
            //Προσθέτει τα στοιχεία μέσα στα κλάσμα
            mfrac.add(num);
            mfrac.add(den);
            mfrac.add(line);
            
            //Τακτοποιεί τον αριθμητή, τον παρανομαστή και την γραμμή
            //αλλά και το κλάσμα κατακόρυφα
            num.y(-numDenHeight-ss);
            den.y(+denNumHeight+ss);
            line.y(+config.fontSize/2);
    
            xPos=xInit+max-2*s/3+s;
            lastElementWidth=max+s;
            lastElementHeight=numHeight+denHeight+2*ss;
            lastFractionNumHeight=numHeight+ss;
            lastFractionDenHeight=denHeight+ss;
    
            return mfrac;
    
        }
        function msqrt(node){
            //Πρέπει να δουλέψω με group
            let xInit=xPos;
            let yInit=yPos;
            let fontSizeInit=config.fontSize;
            let msqrt  = new Konva.Group({
                x: 0,
                y: 0,
            });
    
            //Η υπόριζη ποσότητα
            let under = main(node.children[0]);
            let underWidth = under.getClientRect().width;
            let underHeight = under.getClientRect().height;
            under.x(7+ss);
            msqrt.add(under);
    
            //Η γραμμή της ρίζας
            let uc=under.getClientRect().y;
            let lc=(under.getClientRect().height+under.getClientRect().y)-2;
            let  vline = new Konva.Line({
                points: [xInit, yInit+config.fontSize/2, 
                         xInit+3, yInit+config.fontSize/2,
                         xInit+5, lc,
                         xInit+7, uc-ss,
                         xInit+7+ss+underWidth, uc-ss
                        ],
                stroke: config.fontColor,
                strokeWidth: 1,
                lineCap: 'round',
                linejoin: 'round',
            });
            msqrt.add(vline);
            xPos=xInit+7+ss+underWidth+s+ss;
            yPos=yInit;
            lastElementWidth=7+ss+underWidth+s+ss;
            lastElementHeight=vline.getClientRect().height;
            lastFractionNumHeight=vline.getClientRect().height/2+4;
            lastFractionDenHeight=vline.getClientRect().height/2;
    
            return msqrt;
    
        }
        function msub(node){
            let xInit=xPos;
            let yInit=yPos;
            let fontSizeInit=config.fontSize;
            let msub  = new Konva.Group({
                x: 0,
                y: 0,
                });
            let base = main(node.children[0]);
            let baseWidth=lastElementWidth;
            let baseHeight = lastElementHeight;
            msub.add(base);
            yPos-=2*config.fontSize/10;
            xPos-=s-ss;
            config.fontSize=8*config.fontSize/10;
            let sub = main(node.children[1]);
            let subWidth=lastElementWidth;
            let subHeight = lastElementHeight;
            msub.add(sub);
            yPos=yInit;
            config.fontSize=fontSizeInit;
            lastElementWidth=baseWidth+subWidth;
            lastElementHeight = msub.getClientRect().height;//13*config.fontSize/10;
            lastFractionNumHeight = lastElementHeight/2;
            lastFractionDenHeight = lastElementHeight/2;
            return msub;
        }
        function msup(node){
            let xInit=xPos;
            let yInit=yPos;
            let fontSizeInit=config.fontSize;
            let msup  = new Konva.Group({
                x: 0,
                y: 0,
                });
            let base = main(node.children[0]);
            let baseWidth=lastElementWidth;
            msup.add(base);
            yPos+=5*config.fontSize/10;
            xPos-=s;//-ss;
            config.fontSize=8*config.fontSize/10;
            let sup = main(node.children[1]);
            let subWidth=lastElementWidth;
            msup.add(sup);
            yPos=yInit;
            config.fontSize=fontSizeInit;
            lastElementWidth=baseWidth+subWidth+s;
            lastElementHeight = msup.getClientRect().height;//13*config.fontSize/10;
            lastFractionNumHeight = lastElementHeight/2;
            lastFractionDenHeight = lastElementHeight/2;
            return msup;
        }
        function msubsup(node){
            let xInit=xPos;
            let yInit=yPos;
            let fontSizeInit=config.fontSize;
            let msubsup  = new Konva.Group({
                x: 0,
                y: 0,
                });
            //Υπολογίζει και προσθέτει την βάση
            let base = main(node.children[0]);
            let baseWidth=lastElementWidth;
            let baseHeight = lastElementHeight;
            msubsup.add(base);
            //Υπολογίζει και προσθέτει τον εκθέτη
            yPos-=3*config.fontSize/10;
            xPos-=s;//-ss;
            config.fontSize=8*config.fontSize/10;
            let sub = main(node.children[1]);
            let subWidth=lastElementWidth;
            let subHeight = lastElementHeight;
            msubsup.add(sub);
            //Υπολογίζει και προσθέτει τον δείκτη
            config.fontSize=fontSizeInit;
            yPos+=7*config.fontSize/10;
            xPos-=s-2*ss+subWidth;
            config.fontSize=8*config.fontSize/10;
            let sup = main(node.children[2]);
            let supWidth=lastElementWidth;
            msubsup.add(sup);
            
            let max=0
            subWidth>supWidth ? max=subWidth : max=supWidth;
    
    
            xPos=xInit+baseWidth+max;
            yPos=yInit;
            config.fontSize=fontSizeInit;
            lastElementWidth=baseWidth+max;
            lastElementHeight = msubsup.getClientRect().height;
            lastFractionNumHeight = lastElementHeight/2;
            lastFractionDenHeight = lastElementHeight/2;
            return msubsup;
        }
        function mroot(node) {
            let xInit = xPos;
            let yInit = yPos;
            let fontSizeInit = config.fontSize;
            let mroot = new Konva.Group({
                x: 0,
                y: 0,
            });
        
            // Ο βαθμός της ρίζας (αν υπάρχει)
            let degree = null;
            let degreeWidth = 0;
            let degreeHeight = 0;
            config.fontSize=6*config.fontSize/10;
        
            if (node.childElementCount === 2) { // Έχει και βαθμό
                degree = main(node.children[0]);
                degreeWidth = lastElementWidth;
                degreeHeight = lastElementHeight;
                mroot.add(degree);
                degree.x(0);
                degree.y(-ss);
            }

            xPos = xPos-7+ss;
            //yPos = yPos+ss;
            config.fontSize=fontSizeInit;
            // Η υπόριζη ποσότητα
            let under = main(node.children[1]); // Πάντα το τελευταίο παιδί
            let underWidth = under.getClientRect().width;
            let underHeight = under.getClientRect().height;
            under.x(7+ss);
            mroot.add(under);
        
            //Η γραμμή της ρίζας
            let uc=under.getClientRect().y;
            let lc=(under.getClientRect().height+under.getClientRect().y)-2;
            let  vline = new Konva.Line({
                points: [xInit+degreeWidth-3-ss, yInit+config.fontSize/2, 
                         xInit+degreeWidth+3-3-ss, yInit+config.fontSize/2,
                         xInit+degreeWidth+5-3-ss, lc,
                         xInit+degreeWidth+7-3-ss, uc-ss,
                         xInit+degreeWidth+7+ss+underWidth-3-ss, uc-ss
                        ],
                stroke: config.fontColor,
                strokeWidth: 1,
                lineCap: 'round',
                linejoin: 'round',
            });
            mroot.add(vline);
        
            xPos=xInit+7+ss+underWidth+s+ss;
            yPos=yInit;
            lastElementWidth=7+ss+underWidth+s+ss;
            lastElementHeight = vline.getClientRect().height;
            lastFractionNumHeight = vline.getClientRect().height / 2 + 4;
            lastFractionDenHeight = vline.getClientRect().height / 2;
        
            return mroot;
        }
        
        function table(node){
            
        }
    
        function mspace(node){
            let xInit=xPos;
            let yInit=yPos;
            let op;
            let mspace  = new Konva.Group({
                x: 0,
                y: 0,
            });
            switch(node.textContent){
                case 'single':
                    op=' ';
                    break;
                case 'double':
                    op='  ';
                    break;
                case 'extra':
                    op='    ';
                    break;
                default:
                    op=' ';
                    break;
            }
            let text = new Konva.Text({
                x:xPos,
                y:yPos,
                text:op,
                fontSize: config.fontSize,
                fontFamily:config.fontFamily,
                fill: config.fontColor,
                });
            lastElementWidth=text.width()+s;
            lastElementHeight=config.fontSize;
            lastFractionNumHeight=config.fontSize/2;
            lastFractionDenHeight=config.fontSize/2;
            xPos+=lastElementWidth;
            mspace.add(text);
            return mspace;
        }
        function def(node){
            let xInit=xPos;
            let yInit=yPos;
            let ms  = new Konva.Group({
                x: 0,
                y: 0,
            });
            let text = new Konva.Text({
                x:xPos,
                y:yPos,
                text: '',
                fontSize: config.fontSize,
                fontFamily:config.fontFamily,
                fill: config.fontColor,
                });
            lastElementWidth=text.width()+s;
            lastElementHeight=config.fontSize;
            lastFractionNumHeight=config.fontSize/2;
            lastFractionDenHeight=config.fontSize/2;
            xPos+=lastElementWidth;
            ms.add(text);
            return ms;
        }
    
        
        formatedText.width = function(){
            return formatedText.getClientRect().width;
        }
        formatedText.height = function(){
            return formatedText.getClientRect().height;
        }
        /*formatedText.active = function (condition) {
            active=!!condition;
            condition ? formatedText.listening(true) : formatedText.listening(false); 
        }*/
        //console.log(2*config.x-formatedText.getClientRect().x);
       //formatedText.y(formatedText.getClientRect().y);
       //formatedText.x(config.x-formatedText.getClientRect().x);
       formatedText.y(2*config.y-formatedText.getClientRect().y);
        
       
       return formatedText;
    }

    
}

export { FormattedText };