/* ΒΑΣΙΚΕΣ ΣΥΝΑΡΤΗΣΕΙΣ ΠΑΡΑΘΥΡΩΝ
*  Εξαρτώνται από το Konva.js
*  Τελευταία ενημέρωση 15-10-2024
*  Τεκμηρίωση: johnkscienceLibrary006
*  Κουμουνδούρος Γιάννης
*/

let johnkscienceFormatedText = function (config){
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

    function mroot(node){

    }
    function mfenced(node){
        //<mfenced open="{" close="}" separators=";;,"> 

    }
   
    function munder(node){

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
    formatedText.active = function (condition) {
        active=!!condition;
        condition ? formatedText.listening(true) : formatedText.listening(false); 
    }
    //console.log(config.x-formatedText.getClientRect());
   formatedText.y(2*config.y-formatedText.getClientRect().y);
    
   
   return formatedText;
}

let johnkscienceButton = function (config){
    let active = true;

    let button  = new Konva.Group({
        x: config.x,
        y: config.y,
        });
    
    let text = new Konva.Text({
        x:config.padding,
        y:config.padding,
        text: config.text,
        fontSize: config.fontSize,
        fontFamily:config.fontFamily,
        fill: config.fontColor,
        });
    let w;
    !!config.width ? w=config.width : w = text.width()+2*config.padding;  
    
    if(config.formatedText){
        text =  new johnkscienceFormatedText({
            x:config.padding,
            y:config.padding,
            source: config.formatedText,
            fontSize :config.fontSize,
            fontFamily: config.fontFamily,
            fontColor: config.fontColor,
            padding: 3,
      });
    w = text.width()+2.5*config.padding; 
    }
    //

    let box = new Konva.Rect({
        x: 0,
        y: 0,
        width: w, 
        height: text.height()+2*config.padding,
        name: config.name,
        fill: config.fill,
        stroke: config.stroke,
        strokeWidth: config.strokeWidth,
        cornerRadius: config.cornerRadius,
        opacity:1,
    });

    button.add(box);
    button.add(text);

    button.on('mouseover', function () {
        if(config.mouseoverFill){
            box.fill(config.mouseoverFill)
        }else{
            box.opacity(0.7);
        }
      });
    button.on('mouseout', function () {
        if(config.mouseoverFill){
            box.fill(config.fill)
        }else{
            box.opacity(1);
        }
    });
    button.on('click tap', config.onClickFunc);

    //button.fill = function (color) {
       // box.fill(color);
   // }

    button.active = function (condition) {
        active=!!condition;
        condition ? button.listening(true) : button.listening(false); 
    }

    button.width = function () {
        return box.width(); 
    }

    button.height = function () {
        return box.height(); 
    }

    return button;

}

let johnkscienceInput = function(config){

    let active = true; //Εάν το αντικείμενο είναι ενεργό
    let cursor = '\u{258F}'; //Ο χαρακτήρας του κέρσορα
    let buffer = config.text; //Το κείμενο προς επεξεργασία
    let pointer = config.text.length;  //Ο δείκτης μέσα στο κείμενο

    //Υπολογίζει το πλάτος του ενός χαρακτήρα
    let context = document.createElement('canvas').getContext('2d');
    context.font = config.fontSize + 'px Courier';
    let charWidth = context.measureText('m').width;
   
    let input  = new Konva.Group({
        x: config.x,
        y: config.y,
        });
   
    var box = new Konva.Rect({
        x: 0,
        y: 0,
        width: config.width, 
        height: config.fontSize+2*config.padding,
        name: config.name,
        fill: config.fill,
        stroke: config.stroke,
        strokeWidth: config.strokeWidth,
        cornerRadius: config.cornerRadius,
    });

    var text = new Konva.Text({
        x:config.padding,
        y:config.padding,
        text: getDisspliedText(),
        fontSize: config.fontSize,
        fontFamily:'Courier',
        fill: config.fontColor,
        });

    input.add(box);
    input.add(text);

    input.on('click tap', function () {
        active=true;
      });

    /** Επιστρέφει το κείμενο που θα τυποθεί στην οθόνη  */  
    function getDisspliedText(){
    let result;
    

    let numberOfChars=Math.floor( (box.width()-2*config.padding) / charWidth );
    let s=pointer-(numberOfChars-3)<=0 ? 0 : pointer-(numberOfChars-3) ;
    let e=s+numberOfChars;
    
    if(pointer<numberOfChars-3){
        if(active){
            result=buffer.substring(0,pointer)+cursor+buffer.substring(pointer,e);
        }else{
            result=buffer.substring(0,pointer)+buffer.substring(pointer,e);
        }
    }else{
        if(active){
            result=buffer.substring(s,pointer)+cursor+buffer.substring(pointer, e);
        }else{
            result=buffer.substring(s,pointer)+buffer.substring(pointer, e);
        }
    }
    return result;
}

    document.addEventListener('keydown', function (event) {
        if(active){
            event.preventDefault();
			if(event.ctrlKey && (event.key=='d' ||  event.key=='D' || event.key=='δ' || event.key=='Δ')){
				buffer='';
				pointer=0;
			}else if(event.ctrlKey && (event.key=='E' ||  event.key=='e' || event.key=='Ε' || event.key=='ε')){
				pointer=buffer.length;
			}else if(event.ctrlKey && (event.key=='A' ||  event.key=='a' || event.key=='Α' || event.key=='α')){
				pointer=0;
			}else if(event.shiftKey && (event.keyCode>=65 && event.keyCode<=90) ){
				buffer=buffer.substring(0,pointer)+event.key+buffer.substring(pointer);
				pointer++;
			}else if(event.key>='a' && event.key<='z' ){
				buffer=buffer.substring(0,pointer)+event.key+buffer.substring(pointer);
				pointer++;
			}else if(event.key>='0' && event.key<='9'){
				buffer=buffer.substring(0,pointer)+event.key+buffer.substring(pointer);
				pointer++;
			}else if(event.key>='Ά' && event.key<='ώ'){
				buffer=buffer.substring(0,pointer)+event.key+buffer.substring(pointer);
				pointer++;
			}else if(event.key=='/' || event.key=='*' || event.key=='-' || event.key=='+' || event.key=='.' || event.key=='!' || event.key=='@' || event.key=='#'|| event.key=='$' || event.key=='%' || event.key=='^' || event.key=='&' || event.key=='(' || event.key==')' || event.key=='_' || event.key=='=' || event.key=='{' || event.key=='}' || event.key=='[' || event.key==']' || event.key=='|' || event.key==';' || event.key=="'" || event.key==',' || event.key=='?' || event.key=='<' || event.key=='>' || event.key==':' || event.key=='~' ){
				buffer=buffer.substring(0,pointer)+event.key+buffer.substring(pointer);
				pointer++;
			}else if(event.key==' '){
				buffer=buffer.substring(0,pointer)+event.key+buffer.substring(pointer);
				pointer++;
			}else if(event.key=='Backspace'){
				if(pointer>0){
					buffer=buffer.substring(0,pointer-1)+buffer.substring(pointer);
					pointer--;
				}
			}else if(event.key=='Delete'){
				if(pointer<buffer.length){
					buffer=buffer.substring(0,pointer)+buffer.substring(pointer+1);
				}
			}else if(event.key=='ArrowLeft'){
				if(pointer>0){
					pointer--;
				}
			}else if(event.key=='ArrowRight'){
				if(pointer<buffer.length){
					pointer++;
				}
			}else if(event.key=='Enter'){

            }
            text.text(getDisspliedText());

			
		}
    });

    input.active = function (condition){
        active = !!condition;
        //condition ? input.listening(true) : input.listening(false);
    }

    input.getValue = function (){
        return buffer;
    }

    input.width = function(){
        return input.getClientRect().width;
    }
    input.height = function(){
        return input.getClientRect().height;
    }

    input.setValue = function (value){
        buffer=value;
        pointer = value.length;
        text.text(getDisspliedText());
    }

    return input;
}

let johnkscienceRadio = function(config){
    let value;
    let active=true;
    //Το κύριο αντικείμενο
    let radio  = new Konva.Group({
        x: config.x+config.fontSize/2+2,
        y: config.y+config.fontSize/2+2,
        });
    let len = config.values.length;
    let element=[];
    for(let i=0; i<len; i++){
        element[i]  = new Konva.Group({
            x: 0,
            y: 0,
            });
        let outerCircle=new Konva.Circle({
            x: 0,
            y: i*(config.fontSize+config.padding),
            name:'outerCircle',
            radius: config.fontSize/2,
            stroke: config.stroke,
            strokeWidth: 2,
        });

        let innerCircle = new Konva.Circle({
            x: 0,
            y: i*(config.fontSize+config.padding),
            name:'innerCircle',
            radius: config.fontSize/2-3,
            fill: config.fill,
        });

        let text = new Konva.Text({
            x: config.fontSize/2+config.padding,
            y: i*(config.fontSize+config.padding)-4*config.fontSize/10,
            text: config.values[i],
            name:'text',
            fontSize: config.fontSize,
            fontFamily: config.fontFamily,
            fill: config.fontColor,
          });
        
        element[i].add(outerCircle);
        element[i].add(innerCircle);
        element[i].add(text);

        element[i].on('click tap', function(){
            for(let k=0; k<len; k++){
                if(k!=i){
                    element[k].getChildren()[1].hide()
                }
            }
            element[i].getChildren()[1].show();
            value=this.getChildren()[2].text();
            config.listener.fire('radioChangeValue', {value:value, name:config.name})

        });
        
        element[i].getChildren()[1].hide();

        radio.add(element[i]);

    }
    
    //Αρχικοποιεί το πρώτο αντικείμενο στην σειρά
    if(element[0]){
        element[0].getChildren()[1].show();
        value=element[0].getChildren()[2].text();
    }else{
        value='';
    }
    
    radio.getValue = function (){
        return value;
    }

    radio.active = function (condition) {
        active=!!condition;
        condition ? radio.listening(true) : radio.listening(false); 
    }

    radio.width = function () {
        let max=element[0].getChildren()[2].width();
        for(let i=0; i<len; i++){
            if(element[0].getChildren()[2].width()>max){
                max=element[0].getChildren()[2].width();
            }
        }
        return config.fontSize+config.padding+max+4;
    }

    radio.height = function () {
        return len*(config.fontSize+4); 
    }

    return radio;

}

let johnkscienceRange = function(config){
    function round(nbr,dec_places) {
        return nbr.toFixed(dec_places);
        //let mult = Math.pow(10,dec_places);
        //return Math.round(nbr * mult) / mult;
    }; 
    //Εάν το στοιχείο είναι ενεργό
    let active = true;
    //Στοιχειώδη μονάδα μήκους. Οι αποστάσεις είναι σχετικές με αυτήν
    let u = config.fontSize;
    //Η αρχική θέση του δρομέα 
    let initPos = config.lineWidth*(config.initialValue-config.startValue)/
    (config.endValue-config.startValue);
    //Η επιλεγμένη τιμή του range
    let value=round(config.initialValue, config.approx);
    //Τα κείμενα πρέπει να ορίζονται στην αρχή, ώστε να μπορείς να
    //χρησιμοποιείς το πλάτος και το ύψος τους.
    //Το αρχικό κείμενο
    let startText =  new Konva.Text({
        x: 0,
        y: u+1,
        text: config.startText,
        fontSize: config.fontSize,
        fontFamily: config.fontFamily,
        fill: config.fontColor,
      });
    //Το τελικό κείμενο
    let endText =  new Konva.Text({
        x: 0,
        y: u+1,
        text: config.endText,
        fontSize: config.fontSize,
        fontFamily: config.fontFamily,
        fill: config.fontColor,
      });
    //selector offset
    let selectorOffsetX=startText.width()/2;
    let selectorOffsetY=0;
   //Το κύριο αντικείμενο
   let range  = new Konva.Group({
    x: config.x,
    y: config.y,
    });


    let main  = new Konva.Group({
        x: startText.width()/2,
        y: 15*config.fontSize/10,
        });

    //Η μπάρα επιλογής (γραμμή και δρομέας)
    let selector  = new Konva.Group({
        x:0,//selectorOffsetX,
        y:0,//selectorOffsetY,
    });

    let line = new Konva.Line({
        x:0,
        y:0,
        points: [0, 0, config.lineWidth, 0],
        stroke: config.stroke,
        strokeWidth: 3,
        });
    //Ο δρομέας (circle, label)
    let indAbsStartPos = config.x-initPos+selectorOffsetX;
    let indAbsEndPos = indAbsStartPos+line.width();
    let ratio;
    let indicator = new Konva.Group({
        x:0,
        y:0,
        draggable:true,
        dragBoundFunc: function (pos) {
            if(pos.x>=indAbsStartPos && pos.x<=indAbsStartPos+1){
                value=config.startValue;
                label.text(round(value, config.approx));
                return{
                    x:indAbsStartPos,
                    y: this.absolutePosition().y,
                };
            }else if(pos.x>=indAbsEndPos-1 && pos.x<=indAbsEndPos){
                value=config.endValue;
                label.text(round(value, config.approx));
                return{
                    x:indAbsEndPos,
                    y: this.absolutePosition().y,
                };
            }else if(pos.x>=indAbsStartPos && pos.x<=indAbsEndPos){
                ratio=(pos.x-(indAbsStartPos))/(indAbsEndPos-indAbsStartPos);
                value=config.startValue+ratio*(config.endValue-config.startValue);
                label.text(round(value, config.approx));
                return {
                x: pos.x,
                y: this.absolutePosition().y,
                };
            }else{
                return{
                    x: this.absolutePosition().x,
                    y: this.absolutePosition().y
                };
            }
        },
    });

    let circle = new Konva.Circle({
        x: 0,
        y: 0,
        radius: config.fontSize/2,
        fill: config.fill,
        stroke: 'gray',
        strokeWidth: 1,
        });
    
    let label = new Konva.Text({
        x: 0,
        y: -15*config.fontSize/10,
        text: ''+value,
        name:'endLabel',
        fontSize: config.fontSize,
        fontFamily: config.fontFamily,
        fill: config.fontColor,
        });
    //Αρχικοποιηση
    circle.x(initPos);
    label.x( initPos-label.width()/2); 

    //Διαγράμμιση
    main.add( new Konva.Line({
        points: [0,-1,0,u],
        stroke: config.stroke,
        strokeWidth: 1,
        }));
    main.add( new Konva.Line({
        points: [config.lineWidth/4,-1,config.lineWidth/4,u/2],
        stroke: config.stroke,
        strokeWidth: 1,
        }));
    main.add( new Konva.Line({
        points: [config.lineWidth/2,-1,config.lineWidth/2,3*u/4],
        stroke: config.stroke,
        strokeWidth: 1,
        }));
    main.add( new Konva.Line({
        points: [3*config.lineWidth/4,-1,3*config.lineWidth/4,u/2],
        stroke: config.stroke,
        strokeWidth: 1,
        }));
    main.add( new Konva.Line({
        points: [config.lineWidth,-1,config.lineWidth,u],
        stroke: config.stroke,
        strokeWidth: 1,
        }));
    
    //Ετικέτες στην διαγράμιση
    startText.x(-startText.width()/2)
    main.add(startText);
    endText.x(config.lineWidth-endText.width()/2)
    main.add(endText);
/*
    //Το υπόβαθρο
    let background = new Konva.Rect({
        x: 0,
        y: 0,
        width: startText.width()/2+line.width()+endText.width()/2, 
        height: 35*u/10+1,
        fill: 'white',
        //stroke: 'gray',
        strokeWidth: 1,
        cornerRadius: 3,
        opacity:1,
    });
*/
   
    indicator.add(circle);
    indicator.add(label);
    selector.add(line);
    selector.add(indicator);
    main.add(selector);
    //range.add(background);
    range.add(main);
    

    range.getValue = function(){
        return value;
    }

    range.config = function(){
        return config;
    }

    range.height = function(){
        return 35*u/10+1;
    }

    range.width = function(){
        return startText.width()/2+line.width()+endText.width()/2;
    }

    range.active = function(condition){
        active = !!condition;
        !!condition ? range.listening(true) : range.listening(false); 
    }

    return range;

}

let johnkscienceSelect = function(config){
    //Το κύριο αντικείμενο
    let select  = new Konva.Group({
        x: config.x,
        y: config.y,
        });
    //Εάν το στοιχείο είναι ανοικτό
    let isopen=false;
    //Εάν το στοιχείο είναι ενεργό
    let active = true;
    //Στοιχειώδη μονάδα μήκους. Οι αποστάσεις είναι σχετικές με αυτήν
    let u = config.fontSize;
    //Το μήκος του πίνακα με τις τιμές
    let len = config.values.length;
    //Εάν δεν υπάρχουν τιμές, δεν επιστρέφει τίποτα
    if(len == 0) return select;
    //Η επιλεγένη τιμή
    let value = config.values[0];
    //Τα κείμενα με τις τιμές
    let text = [];
    for(let i=0; i<len; i++){
        text.push( new Konva.Text({
            x: 0,
            y: i*u+config.padding,
            text: config.values[i],
            fontSize: config.fontSize,
            fontFamily: config.fontFamily,
            fill: config.fontColor,
          }));
    };
    //Το μεγαλύτερο πλάτος από τα παραπάνω κείμενα
    let max=text[0].width();
    let maxPos=0;
    for(let i=1; i<len;i++){
        if(max<text[i].width()){
            max=text[i].width();
            maxPos=i;
        }
    }

    //-----------------------------
    //Το παράθυρο με την επιλεγμένη τιμή
    let valueBox  = new Konva.Group({
        x: 0,
        y: 0,
        });
    //Το πλαίσιο της τιμής
    let box = new Konva.Rect({
        x: 0,
        y: 0,
        width: max+4*config.padding,
        height: u+2*config.padding,
        fill: config.fill,
        stroke: config.stroke,
        strokeWidth: 1,
        cornerRadius: 3,
    });
    let label = new Konva.Text({
        x: 2*config.padding,
        y: config.padding,
        text: ''+value,
        name:'valueLabel',
        fontSize: config.fontSize,
        fontFamily: config.fontFamily,
        fill: config.fontColor,
        });

    valueBox.add(box);
    valueBox.add(label);
    select.add(valueBox);

    //--------------------------
    //Το παράθυρο με τις επιλογές
    let selectBox  = new Konva.Group({
        x: 0,
        y:u+2*config.padding,
        });
    //Το υπόβαθρο του παραθύρου με τις επιλογές
    let backgroundSelectBox = new Konva.Rect({
        x: 0,
        y: 0,
        width: max+4*config.padding,
        height: 0,
        fill: config.fill,
        stroke: config.stroke,
        strokeWidth: 1,
        cornerRadius: 3,
    });
    selectBox.add(backgroundSelectBox);
    //Τα κουμπιά επιλογής
    let buttonGroup  = new Konva.Group({
        x: config.padding,
        y: config.padding,
        });
    let button=[];
    for(let i=0; i<len; i++){
        button.push(new johnkscienceButton({
            x:0,
            y:0,
            width:max+2*config.padding,
            name: 'κουμπί'+i,
            fill: config.fill,
            mouseoverFill: config.mouseoverFill,
            //stroke: config.fill,
            strokeWidth:1,
            cornerRadius:5,
            fontSize:config.fontSize,
            fontFamily: config.fontFamily,
            fontColor:  config.fontColor,
            text: config.values[i],
            padding:config.padding/2,
            onClickFunc: function () {
               value=config.values[i];
               label.text(value);
               selectBox.hide();
               isopen=false;
              },
            
        }));
        button[i].y(i*button[i].height());
        buttonGroup.add(button[i]);    
    }
    selectBox.add(buttonGroup);
    backgroundSelectBox.height(len*button[0].height()+2*config.padding);
    select.add(selectBox);
    selectBox.hide();

    //-----------------------------
    //Το κουμπί ανάπτυξης του μενου
    let buttonOpen = new johnkscienceButton({
        x:max+4*config.padding,
        y:0,
        name: 'buttonOpen',
        fill: config.fill,
        mouseoverFill: config.mouseoverFill,
        stroke:config.stroke,
        strokeWidth:1,
        cornerRadius:3,
        fontSize:config.fontSize+6,
        fontFamily:config.fontFamily,
        fontColor:config.fontColor,
        text:'\u{25be}',
        padding:0,
        onClickFunc: function () {
            isopen ? selectBox.hide() : selectBox.show();
            isopen=!isopen;
          },
        
        });
    select.add(buttonOpen);

    select.getValue = function(){
        return value;
    }

    select.config = function(){
        return config;
    }

    select.height = function(){
        return box.height();
    }

    select.width = function(){
        return box.width()+buttonOpen.width();
    }

    select.active = function(condition){
        active = !!condition;
        !!condition ? select.listening(true) : select.listening(false); 
    }

    
   
    return select;
}

let johnkscienceCheckBox = function(config){
   //Το κύριο αντικείμενο
   let checkBox  = new Konva.Group({
    x: config.x,
    y: config.y,
    });
    //Εάν το στοιχείο είναι ενεργό
    let active = true;
    //Στοιχειώδη μονάδα μήκους. Οι αποστάσεις είναι σχετικές με αυτήν
    let u = config.fontSize;
    //Η τιμή του
    let value = config.value;
    //Τα κουμπιά
    let buttonUnchecked= new Konva.Rect({
        x:0,
        y:0,
        name: 'buttonUnchecked',
        fill:config.fill,
        width:u,
        height:u,
        stroke:config.stroke,
        strokeWidth:1,
        cornerRadius:2,
    });
    buttonUnchecked.on('click tap', function(){
        buttonChecked.show();
        value=true;
    })
    let buttonChecked= new Konva.Text({
        x:0,
        y:-4,
        text: '\u{2713}',
        fontSize: config.fontSize+6,
        fontFamily: config.fontFamily,
        fill: config.fontColor,
    });
    buttonChecked.on('click tap', function(){
        buttonChecked.hide();
        value=false;
    });
    //Το κείμενο
    let text= new Konva.Text({
        x:buttonUnchecked.width()+u/3,
        y:0,
        text: config.text,
        fontSize: config.fontSize,
        fontFamily: config.fontFamily,
        fill: config.fontColor,
    });
    //Αρχικοποίηση
    if(!config.value){
        buttonChecked.hide();
    }

    //Συναρτήσεις
    checkBox.getValue = function(){
        return value;
    }

    checkBox.config = function(){
        return config;
    }

    checkBox.height = function(){
        return buttonUnchecked.height();
    }

    checkBox.width = function(){
        return buttonUnchecked.width()+u/3+text.width();
    }

    checkBox.active = function(condition){
        active = !!condition;
        !!condition ? checkBox.listening(true) : checkBox.listening(false); 
    }

    checkBox.add(buttonUnchecked);
    checkBox.add(buttonChecked);
    checkBox.add(text);
    return checkBox;
}

let johnkscienceSteper = function(config){
    //Το κύριο αντικείμενο
    let steper  = new Konva.Group({
     x: config.x,
     y: config.y,
     });
     //Εάν το στοιχείο είναι ενεργό
     let active = true;
     //Στοιχειώδη μονάδα μήκους. Οι αποστάσεις είναι σχετικές με αυτήν
     let u = config.fontSize;
     //Η τιμή του
     let value = config.initialValue;
     let text;
     
     let buttonBack = new johnkscienceButton({
        x:0,
        y:0,
        name: 'buttonBack',
        fill:config.fill,
        mouseoverFill: config.mouseoverFill,
        stroke: config.stroke,
        strokeWidth:1,
        cornerRadius:2,
        fontSize:config.fontSize,
        fontFamily:config.fontFamily,
        fontColor: config.fontColor,
        text:'\u{23f4}',
        padding:config.padding,
        onClickFunc: function () {
            if(value>=config.startValue+config.step){
                value-=config.step;
            }
            text.text(value);
            box.width(text.width()+2*config.padding,);
            buttonForward.x(buttonBack.width()+2*config.padding+box.width());
          },
        });

    //Η τιμή
    text= new Konva.Text({
        x:buttonBack.width()+2*config.padding,
        y:config.padding,
        text: config.initialValue,
        fontSize: config.fontSize,
        fontFamily: config.fontFamily,
        fill: config.fontColor,
    });

    //Τo πλαίσιο με την τιμή
    let box= new Konva.Rect({
        x:buttonBack.width()+config.padding,
        y:0,
        name: 'box',
        fill: config.textFill,
        width: text.width()+2*config.padding,
        height: buttonBack.height(),
        stroke:config.stroke,
        strokeWidth:1,
        cornerRadius:2,
    });

    let buttonForward = new johnkscienceButton({
        x:buttonBack.width()+2*config.padding+box.width(),
        y:0,
        name: 'buttonForward',
        fill:config.fill,
        mouseoverFill: config.mouseoverFill,
        stroke: config.stroke,
        strokeWidth:1,
        cornerRadius:2,
        fontSize:config.fontSize,
        fontFamily:config.fontFamily,
        fontColor: config.fontColor,
        text:'\u{23f5}',
        padding:config.padding,
        onClickFunc: function () {
            if(value<=config.endValue-config.step){
                value+=config.step;
            }
            text.text(value);
            box.width(text.width()+2*config.padding,);
            buttonForward.x(buttonBack.width()+2*config.padding+box.width());
          },
        });

        //Συναρτήσεις
    steper.getValue = function(){
        return value;
    }

    steper.config = function(){
        return config;
    }

    steper.height = function(){
        return buttonBack.height();
    }

    steper.width = function(){
        return buttonBack.width()+2*config.padding+text.width()+buttonForward.width();
    }

    steper.active = function(condition){
        active = !!condition;
        !!condition ? steper.listening(true) : steper.listening(false); 
    }
     
        steper.add(buttonBack);
        steper.add(box);
        steper.add(text);
        steper.add(buttonForward);
        return steper;
}   

let johnkscienceOrigin = function(config){
    let active = true;
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
        while(i<config.width-20){
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
                text: n.toFixed(config.decimalsX),
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
        while(i>15){
            scaleX.add( new Konva.Line({
                points: [i, config.height, i, 0 ],
                stroke: '#b3b3b3',
                strokeWidth: 1,
            }));
            scaleX.add(new Konva.Text({
                x: i,
                y: y,
                text: n.toFixed(config.decimalsX),
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
        i=config.originOffsetY-config.majorScaleYWidth;
        n=config.majorScaleYUnit;
        //Προσωρινό κείμενο για να μετρήσω το πλάτος
        tmpText1 = new Konva.Text({
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
        while(i > 15){
            scaleY.add( new Konva.Line({
                points: [0, i, config.width, i ],
                stroke: '#b3b3b3',
                strokeWidth: 1,
            }));
            scaleX.add(new Konva.Text({
                x: x,
                y: i,
                text: n.toFixed(config.decimalsY),
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
        while(i<config.height-15){
            scaleX.add( new Konva.Line({
                points: [0, i, config.width, i ],
                stroke: '#b3b3b3',
                strokeWidth: 1,
            }));
            scaleX.add(new Konva.Text({
                x: x,
                y: i,
                text: n.toFixed(config.decimalsY),
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

    origin.width = function(){
        return origin.getClientRect().width;
    }
    origin.height = function(){
        return origin.getClientRect().height;
    }
    origin.active = function (condition) {
        active=!!condition;
        condition ? origin.listening(true) : origin.listening(false); 
    }
    origin.config = function(){
        return config;
    }
 
    return origin;
}

let johnkscienceGraphPointsXY = function(config){
    let active = true;
    //Το κύριο αντικείμενο
    //Η γραφική παράσταση (Σημεία ΧΥ)
    let graph  = new Konva.Group({
        x: config.x,
        y: config.y,
        });
    let x,y;
    let len = config.points.length;
    let ratioX = config.majorScaleXWidth / config.majorScaleXUnit;
    let ratioY = config.majorScaleYWidth / config.majorScaleYUnit;
    for(let i=0; i<len;i++){
        x=config.originOffsetX+ratioX*config.points[i++];
        y=config.originOffsetY-ratioY*config.points[i];
        if(x>0 && x<config.width &&
        y>0 && y<config.height ){
                graph.add(new Konva.Circle({
                    x: x,
                    y: y,
                    radius: config.pointRadius,
                    fill: config.graphFill,
                    stroke: config.graphStroke,
                    strokeWidth: config.graphStrokeWidth,
                }));
        }
    }

    graph.points = function(points){
        len = points.length;
        graph.destroyChildren();
        for(let i=0; i<len;i++){
            x=config.originOffsetX+ratioX*points[i++];
            y=config.originOffsetY-ratioY*points[i];
            if(x>0 && x<config.width &&
            y>0 && y<config.height ){
                    graph.add(new Konva.Circle({
                        x: x,
                        y: y,
                        radius: config.pointRadius,
                        fill: config.graphFill,
                        stroke: config.graphStroke,
                        strokeWidth: config.graphStrokeWidth,
                    }));
            }
        }   
    }
    graph.width = function(){
        return graph.getClientRect().width;
    }
    graph.height = function(){
        return graph.getClientRect().height;
    }
    graph.active = function (condition) {
        active=!!condition;
        condition ? graph.listening(true) : graph.listening(false); 
    }
    graph.config = function(){
        return config;
    }
    return graph;
}

let johnkscienceGraphLineXY = function(config){
    let active = true;
    //Το κύριο αντικείμενο
    //Η γραφική παράσταση (Σημεία ΧΥ)
    let graph  = new Konva.Group({
        x:config.x,
        y:config.y,
        clip: {
            x: 0,//config.x,
            y: 0,//config.y,
            width: config.width,
            height: config.height,
        },
    });



    let x,y;
    let g=[];
    let len = config.points.length;
    let ratioX = config.majorScaleXWidth / config.majorScaleXUnit;
    let ratioY = config.majorScaleYWidth / config.majorScaleYUnit;
    for(let i=0; i<len; i++){
        g.push(config.originOffsetX+ratioX*config.points[i++]);
        g.push(config.originOffsetY-ratioY*config.points[i]);
    }
    
    let line = new Konva.Line({
        points: g,
        stroke:config.graphStroke,
        strokeWidth: config.graphStrokeWidth,
        //fill: 'gray',//config.graphFill,
        tension: 0.7,
    });
    graph.add(line);

    graph.points = function(points){
        let len = points.length;
        g=[];
        for(let i=0; i<len; i++){
            g.push(config.originOffsetX+ratioX*points[i++]);
            g.push(config.originOffsetY-ratioY*points[i]);
        }
        
        line.destroy();
        line = new Konva.Line({
            points: g,
            stroke:config.graphStroke,
            strokeWidth: config.graphStrokeWidth,
            tension: 0.7,
        });
        graph.add(line);
    }

    graph.width = function(){
        return graph.getClientRect().width;
    }
    graph.height = function(){
        return graph.getClientRect().height;
    }
    graph.active = function (condition) {
        active=!!condition;
        condition ? graph.listening(true) : graph.listening(false); 
    }
    graph.config = function(){
        return config;
    }

    return graph;
}

let johnkscienceGraphBarsXY = function(config){
    let active = true;
    //Το κύριο αντικείμενο
    //Η γραφική παράσταση (Σημεία ΧΥ)
    let graph  = new Konva.Group({
        x: config.x,
        y: config.y,
        });
    let x,y;
    let len = config.points.length;
    let ratioX = config.majorScaleXWidth / config.majorScaleXUnit;
    let ratioY = config.majorScaleYWidth / config.majorScaleYUnit;
    for(let i=0; i<len;i++){
        x=config.originOffsetX+ratioX*config.points[i++];
        y=config.originOffsetY-ratioY*config.points[i];
        if(x>0 && x<config.width &&
        y>0 && y<config.height ){
                graph.add(new Konva.Rect({
                    x: x-config.barWidth/2,
                    y: y,
                    width: config.barWidth,
                    height:ratioY*config.points[i],
                    //radius: config.pointRadius,
                    fill: config.colors[(i-1)/2],
                    stroke: config.graphStroke,
                    strokeWidth: config.graphStrokeWidth,
                    
                }));
                graph.add(new Konva.Text({
                    x: x,
                    y: y-config.fontSize,
                    text: config.label[(i-1)/2],
                    fontSize: config.fontSize,
                    fontFamily:config.fontFamily,
                    fill: config.fontColor,
                    rotation:-90,
                }));
        }
    }
    graph.width = function(){
        return graph.getClientRect().width;
    }
    graph.height = function(){
        return graph.getClientRect().height;
    }
    graph.active = function (condition) {
        active=!!condition;
        condition ? graph.listening(true) : graph.listening(false); 
    }
    graph.config = function(){
        return config;
    }
    return graph;
}

/** Γεννήτρια Συνάρτηση που αναπαριστά ένα παράθυρο
 * Επιστρέφει ένα αντικείμενο τύπου Konva.Group που
 * σχεδιάζει ένα παράθυρο στον καμβά που είναι εφο-
 * διασμένο με λειτουργικότητα.
 * 
 * @param {Object} config - Αντικείμενο με τις ιδιότητες του παραθύρου
 * @param {string} config.name - Το όνομα του παραθύρου.
 * @param {number} config.x - H τετμημένη του παραθύρου (πάνω αριστερά)
 * @param {number} config.y - H τεταγμένη του παραθύρου (πάνω αριστερά)
 * @param {number} config.height - Το ύψος του παραθύρου
 * @param {color} config.fill - Το χρώμα γεμίσματος του παραθύρου
 * @param {color} config.stroke - Το περίγραμα του παραθύρου
 * @param {number} config.strokeWidth - Το πλάτος του περιγράματος
 * @param {number} config.radius - Η ακτίνα του περιγράματος
 * @param {number} config.fontSize - Το μέγεθος της γραμματοσειράς
 * @param {string} config.fontFamily - H γραμματοσειρά
 * @param {color} config.fontColor - Το χρώμα της γραμματοσειράς
 * @param {string} config.title - Ο τίτλος του παραθύρου
 * @param {number} config.infoWidth - Το πλάτος του παραθύρου βοήθειας
 * @param {string} config.info - Το κείμενο βοήθειας
 * @param {number} config.padding - Ο κενός χώρος πριμετρικά και εσωτερικά
 * @param {image} config.plateImage - Η εικόνα του πλακιδίου
 * @param {number} config.plateWidth - Το πλάτος του πλακιδίου
 * @param {number} config.plateHeight - Το υψος του πλακιδίου
 * 
 * @returns Konva.Group
 */
let johnkscienceWindow = function (config){
    let active=true;
    
    let window  = new Konva.Group({
        x: config.x,
        y: config.y,
        draggable: true,
        });
    let maxWindow = new Konva.Group({
        x: 0,
        y: 0,
        });
    let minWindow = new Konva.Group({
        x: 0,
        y: 0,
        });
    
    let minframe = new Konva.Rect({
        x: 0,
        y: 0,
        width: config.width, 
        height: config.fontSize+2*config.padding,
        name: config.name,
        fill: config.fill,
        stroke: config.stroke,
        strokeWidth: config.strokeWidth,
        cornerRadius: config.cornerRadius,
    });

    let maxframe = new Konva.Rect({
        x: 0,
        y: 0,
        width: config.width, 
        height: config.height,
        name: config.name,
        fill: config.fill,
        stroke: config.stroke,
        strokeWidth: config.strokeWidth,
        cornerRadius: config.cornerRadius,
    });

    let buttonClose = new johnkscienceButton({
        x:config.width-1*(config.padding+config.fontSize+2),
        y:config.padding,
        name: 'buttonClose',
        fill:config.fill,
        stroke:config.fill,
        strokeWidth:1,
        cornerRadius:0,
        fontSize:config.fontSize,
        fontFamily:config.fontFamily,
        fontColor:config.fontColor,
        text:'\u{1f5d9}',
        padding:1,
        onClickFunc: function(){
            maxWindow.hide();
            minWindow.hide();
            title.hide();
            buttonInfo.hide();
            buttonClose.hide();
            buttonMax.hide();
            buttonMin.hide();
            plate.show();
        },
    });

    let buttonMax = new johnkscienceButton({
        x:config.width-2*(config.padding+config.fontSize+2),
        y:config.padding,
        name: 'buttonMax',
        fill:config.fill,
        stroke:config.fill,
        strokeWidth:1,
        cornerRadius:0,
        fontSize:config.fontSize,
        fontFamily:config.fontFamily,
        fontColor:config.fontColor,
        text:'\u{1f5d6}',
        padding:1,
        onClickFunc: function(){
            maxWindow.show();
            minWindow.hide();
            plate.hide();
        },
    });

    let buttonMin = new johnkscienceButton({
        x:config.width-3*(config.padding+config.fontSize+2),
        y:config.padding,
        name: 'buttonMin',
        fill:config.fill,
        stroke:config.fill,
        strokeWidth:1,
        cornerRadius:0,
        fontSize:config.fontSize,
        fontFamily:config.fontFamily,
        fontColor:config.fontColor,
        text:'\u{1f5d5}',
        padding:1,
        onClickFunc: function(){
            maxWindow.hide();
            minWindow.show();
            plate.hide();
        },
    });

    let buttonInfo = new johnkscienceButton({
        x:config.padding,
        y:config.padding,
        name: 'buttonInfo',
        fill:config.fill,
        stroke:config.fill,
        strokeWidth:1,
        cornerRadius:0,
        fontSize:config.fontSize,
        fontFamily:config.fontFamily,
        fontColor:config.fontColor,
        text:'\u{2139}',
        padding:0,
        onClickFunc: function(){},
    });

    buttonInfo.on('mouseover', function(){
        info.show();
    });

    buttonInfo.on('mouseout', function(){
        info.hide();
    });

    let title = new Konva.Text({
        x: 2*config.padding + buttonInfo.width()+10,
        y: config.padding,
        text: config.title,
        fontSize: config.fontSize,
        fontFamily:config.fontFamily,
        fill: config.fontColor,
        });

    let info = new Konva.Group({
        x: 10,
        y: 10,
        });

    let infoText = new Konva.Text({
        x: config.padding,
        y: config.padding,
        text: config.info,
        fontSize: config.fontSize,
        fontFamily:config.fontFamily,
        fill: config.fontColor,
        align:'left',
        });
    
    let infoBox = new Konva.Rect({
        x: 0,
        y: 0,
        width: config.infoWidth, 
        height: infoText.height()+2*config.padding,
        name: 'infobox',
        fill: 'white',
        stroke: 'gray',
        strokeWidth: 1,
        cornerRadius: 3,
    });

    var plate = new Konva.Image({
        x: 0,
        y: 0,
        image: config.plateImage,
        width: config.plateWidth,
        height: config.plateHeight,
      });

    plate.on('click tap', function(){
        maxWindow.show();
        minWindow.hide();
        title.show();
        buttonInfo.show();
        buttonClose.show();
        buttonMax.show();
        buttonMin.show();
        plate.hide();
    });



    plate.hide();

    info.add(infoBox, infoText);
    info.hide();

    minWindow.add(minframe);
    maxWindow.add(maxframe);
    
    window.add(minWindow);
    window.add(maxWindow);
    window.add(title);
    window.add(buttonClose);
    window.add(buttonMax);
    window.add(buttonMin);
    window.add(buttonInfo);
    window.add(info);
    window.add(plate);

    window.addElement = function (element){
        element.absolutePosition({
            x:element.x()+config.padding, 
            y:element.y()+config.fontSize+2*config.padding});
        maxWindow.add(element);
    }

    window.active = function (condition) {
        active = !!condition;
    }

    return window;
}

let johnkscienceLineCalculator = function (config){
    let lineCalculator  = new Konva.Group({
        x: config.x,
        y: config.y,
        });

        let imageObj = new Image();
        imageObj.src = 'calculator.png';
    
    let window = new johnkscienceWindow({
        x: 0,
        y: 0,
        name: 'window',
        width: 310,
        height: 100,
        fill: config.fill,
        stroke: config.stroke,
        strokeWidth: 1,
        cornerRadius: 3,
        fontSize: config.fontSize,
        fontFamily: config.fontFamily,
        fontColor: config.fontColor,
        title:'Αριθμομηχανή γραμμής',
        infoWidth:200,
        info:
`ΑΡΙΘΜΟΝΗΧΑΝΗ
Εισάγετε ένα μαθηματικό τύπο για να 
υπολογίστε το αποτέλεσμα.
ΤΕΛΕΣΤΕΣ: +, -, *, /, **, %, mod, 
div, !, :=, (), 
ΣΥΝΑΡΤΗΣΕΙΣ: sqrt pow sin cos  tan 
asin acos atan sinh cosh tanh asinh 
acosh atanh conj arg abs root inner
cross exp ln log loga radToDegree 
degreeToRad radToGrad gradToRad
gamma factorial floor ceil round 
polar rand.
ΜΙΓΑΔΙΚΟΣ ΑΡΙΘΜΟΣ: α+β*i`,
        padding:5,
        plateImage: imageObj,
        plateWidth:60,
        plateHeight:60
    });
 
    let prompt =  new Konva.Text({
        x:config.padding,
        y:config.padding,
        text: 'Εισάγετε τον τύπο που θέλετε να υπολογίσετε:',
        fontSize: config.fontSize,
        fontFamily:config.fontFamily,
        fill: 'gray',
        });

    let result =  new Konva.Text({
        x: 0,
        y: 50,
        text: 'Αποτέλεσμα:',
        fontSize: config.fontSize,
        fontFamily: config.fontFamily,
        fill: 'gray',
        });
    
    let expresion = new johnkscienceInput({
        x: 0,
        y: 20,
        name: 'input1',
        width: 245,
        fill:'white',
        stroke:'gray',
        strokeWidth:1,
        cornerRadius:3,
        fontSize:12,
        fontFamily:'Courier',
        fontColor:'gray',
        text:'',
        padding:5,
        });
    
    let buttonCalc = new johnkscienceButton({
        x:250,
        y:20,
        name: 'buttonCalc',
        fill:'lightgreen',
        stroke:'gray',
        strokeWidth:1,
        cornerRadius:3,
        fontSize:18,
        fontFamily:'Arial',
        fontColor:'gray',
        text:'\u{23f5}',
        padding:2,
        onClickFunc: function () {
				let command='0';
				if(expresion.getValue()){
					command=expresion.getValue();
				}
				result.text( 'Αποτέλεσμα: '+
					johnkscienceMathComplexRecToHuman( 
						johnkscienceInterpreterRunProgram(
							command
						)[0], 0, 'normal', 9));
            },
        onMouseoverFunc: function(){},
        onMouseoutFunc: function(){},
        });
    
    let buttonClear = new johnkscienceButton({
        x:275,
        y:20,
        name: 'buttonClear',
        fill:'lightgreen',
        stroke:'gray',
        strokeWidth:1,
        cornerRadius:3,
        fontSize:18,
        fontFamily:'Arial',
        fontColor:'gray',
        text:'\u{1f5d8}',
        padding:2,
        onClickFunc: function () {
            expresion.setValue('');
        },
        onMouseoverFunc: function(){},
        onMouseoutFunc: function(){},
        
        });

    

    window.addElement(prompt);
    window.addElement(result);
    window.addElement(expresion);
    window.addElement(buttonCalc);
    window.addElement(buttonClear);

    lineCalculator.add(window);
    return lineCalculator;
}

let johnkscienceChronometer = function (config){
    //Μετρητής τουχρώνου σε miliseconds
    let miliseconds = 0;
    let intervalPointer;
    let stoped=false;
    function timeToString(time){
        let result="";
        let min, sec, msec;
        
        min=Math.floor(time / (100*60));
        result += min<10 ? "0"+min+":" : min+":";
        sec=Math.floor( (time % (100*60)) / 100 );
        result += sec<10 ? "0"+sec+"." : sec+".";
        msec=Math.floor( (time % (100*60)) % 100 );
        result += msec<10 ? "0"+msec : msec+"";
        
        return result;
    }

    //Κατασκευάζει το κύριο group
    let chronometer  = new Konva.Group({
        x: config.x,
        y: config.y,
        });

    //Φορτώνει την εικόνα του πλακιδίου
    let imageObj = new Image();
    imageObj.src = 'chronometer.png';
    
    //Κατασκευάζει το κύριο παράθυρο
    let window = new johnkscienceWindow({
        x: 0,
        y: 0,
        name: 'window',
        width: 165,
        height: 130,
        fill: config.fill,
        stroke: config.stroke,
        strokeWidth: 1,
        cornerRadius: 3,
        fontSize: config.fontSize,
        fontFamily: config.fontFamily,
        fontColor: config.fontColor,
        title:'Χρονόμετρο',
        infoWidth:200,
        info:
`ΧΡΟΝΟΜΕΤΡΟ
Με το όργανο αυτό μετράμε χρο-
νικά διαστήματα.`,
        padding:5,
        plateImage: imageObj,
        plateWidth:80,
        plateHeight:93,
    });

    //Κατασκευάζει το στοιχείο που προβάλει το χρόνο
    let time  = new Konva.Group({
        x: 0,
        y: 5,
        });
 
    let timeText =  new Konva.Text({
        x:0+5,
        y:0+5,
        text: '00:00.00',
        fontSize: 36,
        fontFamily:'Arial',
        fill: 'gray',
        });
    
    var timeBox = new Konva.Rect({
        x: 0,
        y: 0,
        width: 155, 
        height: 44,
        name: 'timeBox',
        fill: 'white',
        stroke: 'gray',
        strokeWidth: 1,
        cornerRadius: 3,
    });

    //Κατασκευάζει τα κουμπιά ελέγχου
    let buttonStart = new johnkscienceButton({
        x:9,
        y:60,
        name: 'buttonStart',
        fill:'lightgreen',
        stroke:'gray',
        strokeWidth:1,
        cornerRadius:3,
        fontSize:30,
        fontFamily:'Arial',
        fontColor:'gray',
        text:'\u{23f5}',
        padding:0,
        onClickFunc: function () {
            if(!intervalPointer && !stoped){
                intervalPointer = setInterval( function(){
                    miliseconds++;
                    timeText.text(timeToString(miliseconds));
                });
            }
        },
        onMouseoverFunc: function(){},
        onMouseoutFunc: function(){},
        });
    
    let buttonPause = new johnkscienceButton({
        x:44,
        y:60,
        name: 'buttonPause',
        fill:'lightgreen',
        stroke:'gray',
        strokeWidth:1,
        cornerRadius:3,
        fontSize:30,
        fontFamily:'Arial',
        fontColor:'gray',
        text:'\u{23f8}',
        padding:0,
        onClickFunc: function () {
            clearInterval(intervalPointer);
            intervalPointer=null;
        },
        onMouseoverFunc: function(){},
        onMouseoutFunc: function(){},
        
        });

    let buttonStop = new johnkscienceButton({
        x:79,
        y:60,
        name: 'buttonStop',
        fill:'lightgreen',
        stroke:'gray',
        strokeWidth:1,
        cornerRadius:3,
        fontSize:22,
        fontFamily:'Arial',
        fontColor:'gray',
        text:'\u{23f9}',
        padding:4,
        onClickFunc: function () {
            clearInterval(intervalPointer);
            intervalPointer=null;
            stoped=true;
        },
        onMouseoverFunc: function(){},
        onMouseoutFunc: function(){},
        
        });

    let buttonClear = new johnkscienceButton({
        x:112,
        y:60,
        name: 'buttonClear',
        fill:'lightgreen',
        stroke:'gray',
        strokeWidth:1,
        cornerRadius:3,
        fontSize:30,
        fontFamily:'Arial',
        fontColor:'gray',
        text:'\u{1f5d8}',
        padding:0,
        onClickFunc: function () {
            clearInterval(intervalPointer);
            intervalPointer=null;
            miliseconds=0;
            timeText.text(timeToString(miliseconds));
            stoped=false;
        },
        onMouseoverFunc: function(){},
        onMouseoutFunc: function(){},
        
        });

    time.add(timeBox);
    time.add(timeText);
    window.addElement(time);
    window.addElement(buttonStart);
    window.addElement(buttonPause);
    window.addElement(buttonStop);
    window.addElement(buttonClear);


    chronometer.add(window);
    return chronometer;


}
