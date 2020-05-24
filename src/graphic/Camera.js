var Camera = (function()
{
    function Camera(rect, maps) 
    {
        this.x = rect.x
        this.y = rect.y
        this.maps = maps
        this.w = maps[0].width * maps[0].tileWidth
        this.h = maps[0].height * maps[0].tileHeight
        
        if(this.w < CANVAS_WIDTH)        
            this.dx = (CANVAS_WIDTH - this.w) / 2
        else
        {
            this.dx = 0
            this.w = CANVAS_WIDTH
        }

        if(this.h < CANVAS_HEIGHT)
            this.dy = (CANVAS_HEIGHT - this.h) / 2      
        else
        {
            this.dy = 0
            this.h = CANVAS_HEIGHT
        }
    }

    Camera.prototype.update = function()
    {       
      
      
    }

    Camera.prototype.render = function(ctx)
    {
        for(let map of this.maps)
            map.draw(ctx, this.x, this.y, this.w, this.h, this.dx, this.dy, this.w, this.h)
    }

    Camera.prototype.getCenterPosition = function()
    {
        var x, y
        
        if(this.w < CANVAS_WIDTH)        
            x = (CANVAS_WIDTH - this.w) / 2
        else        
            x = 0
        
        if(this.h < CANVAS_HEIGHT)
            y = (CANVAS_HEIGHT - this.h) / 2      
        else        
            y = 0           
        
        return { x, y } 
    }

    return Camera
})();