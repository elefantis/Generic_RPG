var Player = (function() 
{        
    class Player extends Entity{
        constructor(def) {
            super(def)           
        }
        update() {            
            this.currentAnimation = Util.parseDirection(this.direction) + " - " + "Idle"
            super.update()            
        }
        move(direction)
        {
            this.direction = direction
            this.vx = Util.directionToVector(direction).x  * this.walkSpeed         
            this.vy = Util.directionToVector(direction).y  * this.walkSpeed       
        }
    }

    return Player
})();