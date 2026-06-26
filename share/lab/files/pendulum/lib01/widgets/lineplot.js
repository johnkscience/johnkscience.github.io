import { Chart } from './chart.js';

class LinePlot extends Chart {
    constructor(options) {
        super(options);

        this.options = {
            ...this.options,
            lineColor: options.lineColor || 'blue',
            lineWidth: options.lineWidth || 2,
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

        let points = []; // Array to store Konva.Line points
        let len = config.points.length;
        let ratioX = config.majorScaleXWidth / config.majorScaleXUnit;
        let ratioY = config.majorScaleYWidth / config.majorScaleYUnit;

        for (let i = 0; i < len; i++) {
            let x = config.originOffsetX + ratioX * config.points[i++];
            let y = config.originOffsetY - ratioY * config.points[i];

            if (x >= 0 && x <= config.width && y >= 0 && y <= config.height) {  // Fixed condition
                points.push(x);
                points.push(y);
            }
        }

        if (points.length > 0) { // Check if there are any points to draw
            graph.add(new Konva.Line({
                points: points,
                stroke: config.lineColor,
                strokeWidth: config.lineWidth,
                lineCap: 'round', // Makes the line smoother
                lineJoin: 'round',
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

export { LinePlot };