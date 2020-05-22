PlayState.prototype = new BaseState()

function PlayState(stateMachine) 
{   
    this.stateMachine = stateMachine
    this.player = new Player(
        {
            x: 500, y:500, width: 64, height: 64, walkSpeed: gEntities["player"].walkSpeed, health: gEntities["player"].health,
            animations:  gEntities["player"].animations
        });
    this.dungeon = new Dungeon(this.player)
}

PlayState.prototype.update = function()
{
    this.dungeon.update()
    
    this.player.update()
}

PlayState.prototype.render = function()
{
   this.dungeon.render()
   
   this.player.render(Game.ctx)
}

Game.bindActionOnePress(Keys.SPACE, () => Game.playSound(gSounds["sword"]))
Game.bindActionOnePress(Keys.M, () => Game.mute())
Game.bindActionOnePress(Keys.A, () => Game.playSound(gSounds["music"], true))
Game.bindActionOnePress(Keys.F, () => Game.ToggleFullScreen())

