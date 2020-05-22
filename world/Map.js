var Map = (function()
{
    var  _ctx, _atlas

    class Map {
        constructor(atlas, mapData) {
            this.width = mapData.width
            this.height = Math.floor(mapData.layers[0].length / mapData.width)
            this.tileWidth = atlas.tileWidth
            this.tileHeight = atlas.tileHeight
            _atlas = atlas
            this.canvas = document.createElement("canvas")
            _ctx = this.canvas.getContext("2d")
            this.canvas.width = atlas.tileWidth * this.width
            this.canvas.height = atlas.tileHeight * Math.floor(mapData.layers[0].length / this.width)

            for (let layer of mapData.layers)
                generateCanvasMap(this, layer)        
        }

        update() {
            
        }

        draw(ctx, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
            if (arguments.length == 3)
                return ctx.drawImage(this.canvas, sx, sy)
            else if (arguments.length == 5)
                return ctx.drawImage(this.canvas, sx, sy, sWidth, sHeight)
            else
                return ctx.drawImage(this.canvas, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        }
    }

    function generateCanvasMap(map, layerData)
    {
        var x = 0, y = 0
        for(let i in layerData)
        {
            x = i % map.width * map.tileWidth
            y = Math.floor(i / map.width) * map.tileHeight           
            _atlas.drawTile(_ctx, layerData[i], x, y)           
        }
    }

    return Map
})();