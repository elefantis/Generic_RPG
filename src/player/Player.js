var Player = (function() 
{        
    class Player extends Entity{
        constructor(def) {
            super(def)
            this.nextVx = 0
            this.nextVy = 0
            this.nextDirection = this.direction
            this.slashing = false
                         

            this.stateMachine = new StateMachine({
                "idleMove": PlayerMoveIdleState,
                "slash": PlayerSlashingState
            });        
            this.stateMachine.change("idleMove")   
        }
        update() {            
            if(this.slashing == true && this.stateMachine.currentStateName == "idleMove")
                this.stateMachine.change("slash")
               
            super.update(this)                    
        }
        move = function(direction)
        {
            this.nextDirection = direction
            if(this.nextDirection == Keys.RIGHT || this.nextDirection == Keys.LEFT)
                this.nextVx = Util.directionToVector(direction).x           
            
            if(this.nextDirection == Keys.UP || this.nextDirection == Keys.DOWN)
                this.nextVy = Util.directionToVector(direction).y     
        }
        attack = function() {
            this.slashing = true
        }

    }

    return Player
})();