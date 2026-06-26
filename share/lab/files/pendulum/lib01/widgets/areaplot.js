import { Chart } from './chart.js';

class AreaPlot extends Chart {
    constructor(options) {
        super(options);

        this.options = {
            ...this.options,
            areaColor: options.areaColor || 'blue',
            points: options.data || [],
        };

        this.graph = this.createGraph(this.options);
        this.add(this.graph);
    }

    createGraph(config) {
        if (this.graph) {
            this.graph.destroy();
        }

        let graph = new Konva.Group({
            x: config.x,
            y: config.y,
        });

        let points = [];
        let len = config.points.length;
        let ratioX = config.majorScaleXWidth / config.majorScaleXUnit;
        let ratioY = config.majorScaleYWidth / config.majorScaleYUnit;

        // Add the first point (start of the area)
        if (len > 0) {
          let x = config.originOffsetX + ratioX * config.points[0];
          let y = config.originOffsetY; // Start at the baseline (y-axis origin)
          points.push(x);
          points.push(y);
        }
        
        for (let i = 0; i < len; i++) {
            let x = config.originOffsetX + ratioX * config.points[i++];
            let y = config.originOffsetY - ratioY * config.points[i];

            if (x >= 0 && x <= config.width && y >= 0 && y <= config.height) {
                points.push(x);
                points.push(y);
            }
        }

        // Add the last point (close the area)
        if (len > 0) {
            let x = config.originOffsetX + ratioX * config.points[len-2]; //x of last point
            let y = config.originOffsetY; // Connect to the baseline
            points.push(x);
            points.push(y);
        }

        if (points.length > 0) {
            graph.add(new Konva.Line({
                points: points,
                fill: config.areaColor, // Fill the area
                stroke: config.areaColor, // Use the same color for the border (optional)
                strokeWidth: 0,         // Optional: Set border width to 0 to only fill
                lineCap: 'round', // Makes the line smoother
                lineJoin: 'round',
                closed: true       // Close the path to create a filled area
            }));
        }

        graph.width(graph.getClientRect().width);
        graph.height(graph.getClientRect().height);

        return graph;
    }

    setData(data) {
        this.options.points = data;
        this.graph = this.createGraph(this.options);
        this.add(this.graph);
    }

    removeData() {
        this.options.points = [];
        this.graph = this.createGraph(this.options);
        this.add(this.graph);
    }
}

export { AreaPlot };