import { Widget } from './widget.js'; // Υποθέτουμε ότι υπάρχει το widget.js
import { Button } from './button.js'; // Υποθέτουμε ότι υπάρχει το button.js

class Window extends Widget {
    constructor(option) {
        super(option); // Κληρονομούμε από το Widget

        this.options.name = "Window"+this.options.id;
        this.option = {
            ...this.options,
            x: option.x || 0,
            y: option.y || 0,
            width: option.width || 300,
            height: option.height || 200,
            fontSize: option.fontSize || 12,
            fontFamily: option.fontFamily || "Arial",
            fontColor: option.fontColor || "black",
            fill: option.fill || "snow",
            stroke: option.stroke || "gray",
            strokeWidth: option.strokeWidth || 1,
            cornerRadius: option.cornerRadius || 0,
            name: option.name || "Window",
            title: option.title || "Window",
            info: option.info || "",
            infoWidth: option.infoWidth || 200,
            padding: option.padding || 5,
            plateImage: option.plateImage,
            plateWidth: option.plateWidth,
            plateHeight: option.plateHeight,
            titleFill: option.titleFill || 'lightgray',
        };

        this.active = true; // Αρχική κατάσταση: ενεργό

        this.minWindow = new Konva.Group();
        this.maxWindow = new Konva.Group();

        this.titleBar = new Konva.Rect({
            width: this.option.width,
            height: this.option.fontSize + 2 * this.option.padding,
            fill: this.option.titleFill,
            stroke: this.option.stroke,
            strokeWidth: this.option.strokeWidth,
            cornerRadius: this.option.cornerRadius,
        });

        this.minframe = new Konva.Rect({
            width: this.option.width,
            height: this.option.fontSize + 2 * this.option.padding,
            fill: this.option.fill,
            stroke: this.option.stroke,
            strokeWidth: this.option.strokeWidth,
            cornerRadius: this.option.cornerRadius,
        });

        this.maxframe = new Konva.Rect({
            width: this.option.width,
            height: this.option.height,
            fill: this.option.fill,
            stroke: this.option.stroke,
            strokeWidth: this.option.strokeWidth,
            cornerRadius: this.option.cornerRadius,
        });

        this.buttonClose = new Button({ // Χρήση της κλάσης Button
            x: this.option.width - (this.option.padding + this.option.fontSize + 2),
            y: this.option.padding,
            text: '\u{1f5d9}',
            fontSize: this.option.fontSize,
            fontFamily: this.option.fontFamily,
            fontColor: this.option.fontColor,
            fill: this.option.fill,
            stroke: this.option.fill,
            strokeWidth: 1,
            cornerRadius: 0,
            padding: 1,
            onClick: () => { this.closeWindow(); },
        });

        this.buttonMax = new Button({
            x: this.option.width - 2 * (this.option.padding + this.option.fontSize + 2),
            y: this.option.padding,
            text: '\u{1f5d6}',
            fontSize: this.option.fontSize,
            fontFamily: this.option.fontFamily,
            fontColor: this.option.fontColor,
            fill: this.option.fill,
            stroke: this.option.fill,
            strokeWidth: 1,
            cornerRadius: 0,
            padding: 1,
            onClick: () => { this.maximizeWindow(); },
        });

        this.buttonMin = new Button({
            x: this.option.width - 3 * (this.option.padding + this.option.fontSize + 2),
            y: this.option.padding,
            text: '\u{1f5d5}',
            fontSize: this.option.fontSize,
            fontFamily: this.option.fontFamily,
            fontColor: this.option.fontColor,
            fill: this.option.fill,
            stroke: this.option.fill,
            strokeWidth: 1,
            cornerRadius: 0,
            padding: 1,
            onClick: () => { this.minimizeWindow(); },
        });

        this.buttonInfo = new Button({
            x: this.option.padding,
            y: this.option.padding,
            height:0,
            width:10,
            text: '\u{2139}',
            fontSize: this.option.fontSize,
            fontFamily: this.option.fontFamily,
            fontColor: this.option.fontColor,
            fill: this.option.fill,
            stroke: this.option.fill,
            strokeWidth: 1,
            cornerRadius: 0,
            padding: 1,
            onClick: () => { 
                if(this.info.isVisible()){
                    this.info.hide();
                }else{
                    this.info.show();
                }

            }, // Add click functionality if needed
        });

        this.title = new Konva.Text({
            x: 2 * this.option.padding + this.buttonInfo.width() + 10,
            y: this.option.padding,
            text: this.option.title,
            fontSize: this.option.fontSize,
            fontFamily: this.option.fontFamily,
            fill: this.option.fontColor,
        });

        this.info = new Konva.Group({
            x:20,
            y:20,
        });
        this.infoText = new Konva.Text({
            x: this.option.padding,
            y: this.option.padding,
            text: this.option.info,
            fontSize: this.option.fontSize,
            fontFamily: this.option.fontFamily,
            fill: this.option.fontColor,
            align: 'left',
            width: this.option.infoWidth,
            wrap: 'wrap',
        });

        this.infoBox = new Konva.Rect({
            width: this.option.infoWidth + this.option.padding,
            height: this.infoText.height() + 2 * this.option.padding,
            fill: 'white',
            stroke: 'gray',
            strokeWidth: 1,
            cornerRadius: 3,
        });

        this.plate = new Konva.Image({
            image: this.option.plateImage,
            width: this.option.plateWidth,
            height: this.option.plateHeight,
        });

        this.plate.on('click', () => { this.maximizeWindow(); });
        this.plate.hide();
        this.info.add(this.infoBox, this.infoText);
        this.info.hide();

        this.minWindow.add(this.minframe);
        this.maxWindow.add(this.maxframe);

        this.add(this.minWindow);
        this.add(this.maxWindow);
        this.add(this.titleBar);
        this.add(this.title);
        this.add(this.buttonClose);
        this.add(this.buttonMax);
        this.add(this.buttonMin);
        this.add(this.buttonInfo);
        this.add(this.info);
        this.add(this.plate);

        this.maxWindow.show(); // Αρχικά κρυφό
        this.minWindow.hide(); // Αρχικά κρυφό

    }

    addElement(element) {
        element.absolutePosition({
            x: element.x() + this.option.padding,
            y: element.y() + this.option.fontSize + 2 * this.option.padding
        });
        this.maxWindow.add(element);
    }

    closeWindow() {
        this.maxWindow.hide();
        this.minWindow.hide();
        this.title.hide();
        this.buttonInfo.hide();
        this.buttonClose.hide();
        this.buttonMax.hide();
        this.buttonMin.hide();
        this.plate.show();
    }

    maximizeWindow() {
        this.maxWindow.show();
        this.minWindow.hide();
        this.plate.hide();
    }

    minimizeWindow() {
        this.maxWindow.hide();
        this.minWindow.show();
        this.plate.hide();
    }

}

export { Window };