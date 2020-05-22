var Animation = (function()
{
    const START_FRAME = 0

    class Animation {
        constructor(def) {           
            this.frames = getFrameList(def.entityName, def.animationName);
            this.interval = def.interval;           
            this.looping = def.looping;

            this.timer = 0;
            this.currentFrame = START_FRAME;

            this.timesPlayed = 0;
        }
        refresh() {
            this.timer = 0;
            this.currentFrame = START_FRAME;
            this.timesPlayed = 0;
        }
        update() {
            if (!this.looping && this.timesPlayed > 0)
                return;

            if (this.frames.length > 1) {
                this.timer++;

                if (this.timer > this.interval) {
                    this.timer = this.timer % this.interval;

                    this.currentFrame = (this.currentFrame + 1) % (this.frames.length);

                    if (this.currentFrame == START_FRAME)
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
                var frame = gAnimationData[entityName].frames[frameName].frame
                var sourceSize = gAnimationData[entityName].frames[frameName].sourceSize

                var frameData = {
                    x: frame.x,
                    y: frame.y,
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