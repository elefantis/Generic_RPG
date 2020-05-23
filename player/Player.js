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
            console.log(this.currentAnimation)
            console.log(direction, this.direction)
        }
    }

    return Player
})();