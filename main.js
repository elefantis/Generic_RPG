Game.load = function() 
{
    Game.setupScreen(VIRTUAL_WIDTH, VIRTUAL_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT)
    Game.setTitle("Generic RPG")

     this.gStateMachine = new StateMachine({
        "load": LoadState,
        "play": PlayState
    });

    this.gStateMachine.change("load")
}

Game.update = function()
{
    this.gStateMachine.update()
}

Game.render= function()
{
    this.gStateMachine.render()
}

Game.startGame();