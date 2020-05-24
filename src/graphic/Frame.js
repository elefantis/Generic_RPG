var Frame = (function()
{
    class Frame {
        constructor(texture, frameData) {
            this.dx = frameData.dx;
            this.dy = frameData.dy;         
            this.x = frameData.x;
            this.y = frameData.y;         
            this.width = frameData.width;
            this.height = frameData.height;
            this.texture = texture;
            this.frameWidth = frameData.frameWidth
            this.frameHeight = frameData.frameHeight

            this.cx = this.x - this.width * 0.5
            this.cy = this.y - this.height * 0.5
        }
        render(context, x, y) { 
            x += this.cx
            y += this.cy        
      
            context.drawImage(this.texture, this.dx, this.dy, this.frameWidth, this.frameHeight,  x,  y, this.frameWidth, this.frameHeight);
        }
    }
    return Frame
})();