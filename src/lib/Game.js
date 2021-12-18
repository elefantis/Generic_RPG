var Game = 
{
    canvas: document.createElement("canvas"),
    ctx: null,
    keysPressed: [],
    onePressAction: [],
    wasPressed: function(key) {},
    load: function() {},
    update: function(dt){},
    render: function(){},
    actions: {},
    actionsOnePress: {},
    muted: false,
    audioContext: new (window.AudioContext || window.webkitAudioContext)(),
}

Game.setupScreen = function(virtualWidth, virtualHeight, canvasWidth, canvasHeight)
{
    this.virtualWidth = virtualWidth
    this.virtualHeight = virtualHeight
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    Game.addCanvas()
}

Game.addCanvas = function()
{
    this.canvas.width = this.canvasWidth
    this.canvas.height = this.canvasHeight
    this.canvas.style.width = this.virtualWidth + "px"
    this.canvas.style.height = this.virtualHeight + "px"
    this.canvas.style.backgroundColor = "black"
    this.ctx = this.canvas.getContext("2d")
    this.ctx.fillStyle = "white"
    document.body.appendChild(this.canvas)
}

Game.setTitle = function(title)
{
    document.title = title    
}

document.addEventListener( "keydown", function(key)
{

    if(Game.keysPressed.indexOf(key.keyCode) == -1)
    {
        Game.keysPressed.push(key.keyCode)
        Game.wasPressed(key.keyCode)
    }
})

document.addEventListener( "keyup", function(key)
{
    var keyIndex = Game.keysPressed.indexOf(key.keyCode)
    if(keyIndex != -1)
    {
        Game.keysPressed.splice(keyIndex, 1)

        if(Game.onePressAction.indexOf(key.keyCode) != -1)
            Game.onePressAction.splice(keyIndex, 1)
    }
})

Game.startGame = function()
{
    var ctx = Game.audioContext
    this.gainNode = ctx.createGain()
    this.gainNode.connect(ctx.destination)

    this.load()

    var gameLoop = function(dt)
    {
        Game.processInput()       
        Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height)
        Game.update(dt)
        Game.render()
        requestAnimationFrame(gameLoop)  
    }
    requestAnimationFrame(gameLoop) 
}

Game.ToggleFullScreen = function()
{
    if (document.fullscreenElement) 
        document.exitFullscreen() 
    else
        Game.canvas.webkitRequestFullScreen() 
}

Game.processInput = function()
{      
    for(let key of Game.keysPressed)
    {
        if(Game.actions[key])        
            Game.actions[key]()
        
        if(Game.actionsOnePress[key] && Game.onePressAction.indexOf(key) == -1)
        {
            Game.actionsOnePress[key]()
            Game.onePressAction.push(key)
        }
    }       
}

Game.bindAction = function(key, action) 
{
    Game.actions[key] = action
}

Game.bindActionOnePress = function(key, action)
{
    Game.actionsOnePress[key] = action
}


