var Animation = (function()
{
    class Animation {
        constructor(def) {           
            this.frames = getFrameList(def.entityName, def.animationName);
            this.interval = def.interval;           
            this.looping = def.looping;

            this.timer = 0;
            this.currentFrame = 0;

            this.timesPlayed = 0;
            this.onFinished = false
        }
        refresh() {
            this.timer = 0;
            this.currentFrame = 0;
            this.timesPlayed = 0;
            this.onFinished = false
        }
        update() {
            if (!this.looping && this.timesPlayed > 0) {
                this.onFinished = true
                return;
            }

            if (this.frames.length > 1) {
                this.timer++;

                if (this.timer > this.interval) {
                    this.timer = this.timer % this.interval;

                    this.currentFrame = (this.currentFrame + 1) % (this.frames.length);

                    if (this.currentFrame == this.frames.length - 1)
                        this.timesPlayed++;
                }
            }
        }
        render(ctx, x, y) {                  
            this.frames[this.currentFrame].render(ctx, x, y);
        }
        getCurrentFrame() {
            return this.frames[this.currentFrame];
        }
    }

    function getFrameList(entityName, animationName) {
        var frames = []
        
        for(let frameName in gAnimationData[entityName].frames) 
        {           
            if(frameName.includes(animationName)) 
            {                
                var spriteSourceSize = gAnimationData[entityName].frames[frameName].spriteSourceSize
                var frame = gAnimationData[entityName].frames[frameName].frame
                var sourceSize = gAnimationData[entityName].frames[frameName].sourceSize

                var frameData = {
                    x: spriteSourceSize.x,
                    y: spriteSourceSize.y,
                    dx: frame.x,
                    dy: frame.y,
                    frameWidth: frame.w,
                    frameHeight: frame.h,
                    width: sourceSize.w,
                    height: sourceSize.h            
                }          
                frames.push(new Frame(gTextures[entityName], frameData))
            }
        }
        return frames
    }

    return Animation
})();