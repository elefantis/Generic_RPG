var Frame = (function()
{
    class Frame {
        constructor(texture, frameData) {            
            this.dx = frameData.x;
            this.dy = frameData.y;
            this.frameWidth = frameData.frameWidth;
            this.frameHeight = frameData.frameHeight;
            this.width = frameData.width;
            this.height = frameData.height;
            this.texture = texture;
        }
        render(context, x, y) {
            x = x + this.width - this.frameWidth;
            y = y + this.height - this.frameHeight;                  
            context.drawImage(this.texture, this.dx, this.dy, this.frameWidth, this.frameHeight, x, y, this.frameWidth, this.frameHeight);
        }
    }
    return Frame
})();