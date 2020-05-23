var Map = (function()
{
    var  _groundCtx,  _shadowCtx, _atlas

    class Map {
        constructor(atlas, mapData) {
            this.width = mapData.width
            this.height = Math.floor(mapData.layers[0].length / mapData.width)
            this.tileWidth = atlas.tileWidth
            this.tileHeight = atlas.tileHeight
            _atlas = atlas

            this.groundCanvas = document.createElement("canvas")
            this.objectsCanvas = document.createElement("canvas")
            this.shadowCanvas = document.createElement("canvas")
            
            _groundCtx = this.groundCanvas.getContext("2d")
            this.objectCtx = this.objectsCanvas.getContext("2d")
            _shadowCtx = this.shadowCanvas.getContext("2d")
            
            var width = atlas.tileWidth * this.width
            var height = atlas.tileHeight * Math.floor(mapData.layers[0].length / this.width)
            this.groundCanvas.width = width
            this.objectsCanvas.width = width
            this.shadowCanvas.width = width
            
            this.groundCanvas.height = height
            this.objectsCanvas.height = height
            this.shadowCanvas.height = height

            this.objects = []

            for (let layer of mapData.layers)
                generateCanvasMap(this, layer)        
        }

        update() {
            for(var gameObject of this.objects)
                gameObject.update()
        }

        draw(ctx, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
            this.render()       
            drawCanvas(this.groundCanvas, ctx, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
            drawCanvas(this.objectsCanvas, ctx, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
            drawCanvas(this.shadowCanvas, ctx, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        }
        
        render() {
            this.objectCtx.clearRect(0, 0, this.objectsCanvas.width, this.objectsCanvas.height)
            
            for(var gameObject of this.objects)
                gameObject.render(this.objectCtx)
        }
    }

    function generateCanvasMap(map, layerData)
    {
        var x = 0, y = 0
        for(let i in layerData)
        {
            x = i % map.width * map.tileWidth
            y = Math.floor(i / map.width) * map.tileHeight           
            _atlas.drawTile(_groundCtx, layerData[i], x, y)           
        }
    }

    function drawCanvas(canvas, ctx, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    {
        if (arguments.length == 3)
                return ctx.drawImage(canvas, sx, sy)
            else if (arguments.length == 5)
                return ctx.drawImage(canvas, sx, sy, sWidth, sHeight)
            else
                return ctx.drawImage(canvas, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    }

    return Map
})();