class PlayerMoveIdleState extends BaseState{
    constructor() {
        super()        
    }
    update = function(player) {
        player.vx = player.nextVx * player.walkSpeed
        player.vy = player.nextVy * player.walkSpeed
        player.direction = player.nextDirection
        player.nextVx = 0
        player.nextVy = 0
        player.isMoving = player.vx != 0 || player.vy != 0
        player.currentAnimation = Util.parseDirection(player.direction) + " - " + (player.isMoving == true ? "Walking" : "Idle")
    }
}