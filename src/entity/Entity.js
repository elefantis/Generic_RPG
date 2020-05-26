var Entity = (function()
{
    class Entity {
        constructor(def) {
            this.direction = "down";

            this.stateMachine = new StateMachine(def.states);

            this.x = def.x;
            this.y = def.y;
            this.width = def.width;
            this.height = def.height;
            
            this.animations = createAnimations(def.animations);
           
            this.walkSpeed = def.walkSpeed;
            this.health = def.health;

            this.dead = false;
        }
        update(params) {
            this.stateMachine.update(params);

            if (this.animations[this.currentAnimation])            
                this.animations[this.currentAnimation].update();            
        }
        render(ctx) {                    
            if (this.animations[this.currentAnimation])  
                this.animations[this.currentAnimation].render(ctx, this.x, this.y);
        }
        processAI(params) {
            this.stateMachine.processAI(params);
        }
        damage(damage) {
            this.health -= damage;
        }
    }
    
    function createAnimations(animations)
    {
        var returnedAnimations = {}

        for(let animation of animations)        
            returnedAnimations[animation.animationName.replace("/", "")] = new Animation(animation)
        
        return returnedAnimations
    }

    return Entity
})();

