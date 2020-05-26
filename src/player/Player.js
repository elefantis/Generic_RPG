var Player = (function() 
{        
    class Player extends Entity{
        constructor(def) {
            super(def)
            this.nextVx = 0
            this.nextVy = 0
            this.nextDirection = this.direction           

            this.stateMachine = new StateMachine({
                "idleMove": PlayerMoveIdleState
            });

            this.stateMachine.change("idleMove")              
        }
        update() {                                       
            super.update(this)                    
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