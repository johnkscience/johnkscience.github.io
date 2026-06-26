import { Chart } from './chart.js';

class BarPlot extends Chart {
    constructor(options) {
        super(options);

        this.options = {
            ...this.options,
            barColor: options.barColor || 'blue',
            barWidth: options.barWidth || 20, // Default width for bars
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

        let len = config.points.length;
        let ratioX = config.majorScaleXWidth / config.majorScaleXUnit;
        let ratioY = config.majorScaleYWidth / config.majorScaleYUnit;

        for (let i = 0; i < len; i++) {
            let x = config.originOffsetX + ratioX * config.points[i++];
            let y = config.originOffsetY - ratioY * config.points[i];
            let height = config.originOffsetY - y; // Calculate bar height

            if (x >= 0 && x <= config.width && y >= 0 && y <= config.height) {
                graph.add(new Konva.Rect({
                    x: x - config.barWidth / 2, // Center the bar
                    y: y,
                    width: config.barWidth,
                    height: height,
                    fill: config.barColor,
                }));
            }
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

export { BarPlot };