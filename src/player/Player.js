var Player = (function() 
{        
    class Player extends Entity{
        constructor(def) {
            super(def)
            this.nextVx = 0
            this.nextVy = 0
            this.nextDirection = this.direction                  
        }
        update() {
            this.vx = this.nextVx * this.walkSpeed
            this.vy = this.nextVy * this.walkSpeed
            this.direction = this.nextDirection  
            this.nextVx = 0
            this.nextVy = 0

            this.isMoving = this.vx != 0 || this.vy != 0               
            this.currentAnimation = Util.parseDirection(this.direction) + " - " + (this.isMoving == true ? "Walking" : "Idle")                           
            super.update()                       
        }
        move(direction)
        {
            this.nextDirection = direction
            if(this.nextDirection == Keys.RIGHT || this.nextDirection == Keys.LEFT)
                this.nextVx = Util.directionToVector(direction).x           
            
            if(this.nextDirection == Keys.UP || this.nextDirection == Keys.DOWN)
                this.nextVy = Util.directionToVector(direction).y     
        }
    }

    return Player
})();