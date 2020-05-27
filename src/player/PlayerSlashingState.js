class PlayerSlashingState extends BaseState {
    constructor() {
        super()
    }
    enter = function() {
        Game.playSound(gSounds["sword"])
    }
    update = function(player) {     
        player.currentAnimation = Util.parseDirection(player.direction) + " - " + "Slashing"        

        if(player.animations[player.currentAnimation].onFinished) {
            player.stateMachine.change("idleMove")
            player.animations[player.currentAnimation].refresh()
            player.slashing = false
            player.currentAnimation = Util.parseDirection(player.direction) + " - " + "Idle"
        }
    }
}