import { Chart } from './chart.js';

class ScatterPlot extends Chart {
    constructor(options) {
        super(options);

        this.options = {
            ...this.options,
            pointRadius: options.pointRadius || 5,
            pointColor: options.pointColor || 'blue',
            points: options.data || [],
        };

        this.graph = this.createGraph(this.options);
        this.add(this.graph);
        this.x(0 );
        this.y(0)
    }

    createGraph(config){
        if(this.graph){
            this.graph.destroy();
        }
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
                        fill: config.pointColor,
                        //stroke: config.graphStroke,
                        //strokeWidth: config.graphStrokeWidth,
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
        this.options.points = []; // Clear the data points
        this.graph = this.createGraph(this.options);
        this.add(this.graph);
    }
}

export { ScatterPlot };