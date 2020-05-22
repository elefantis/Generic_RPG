
LoadState.prototype = new BaseState()

function LoadState(stateMachine) {
    this.stateMachine = stateMachine
    this.loaded = 0
}

(function() {
    var loaded = 0
    var currentText = LoadingMessages.loading;
    var dTypes = {
        "Textures": loadTextures,
        "Sounds": loadSoundS,
        "MapData": loadMapData,
        "AnimationsData": (urls) => { loadJsonListData(urls, gAnimationData) },
        "Entities": (urls) => { loadJsonListData(urls, gEntities) },        
    }

    LoadState.prototype.enter = function()
    {        
        Game.loadJSON("data/data.JSON").then((data, reject) =>
        {
            
            for(let type in data)            
                if(dTypes[type])
                    dTypes[type](data[type])                          
            
        }).catch( ( error) => 
        {
            console.error(error)
        } ) 
                 
    }

    function loadTextures(url)
    {
        var promises = []
        var  textureNames = []      
        currentText = LoadingMessages.textures

        Game.loadJSON(url).then( (textures, reject) => 
        {
            for(let textureName in textures)
            {
                promises.push(Game.loadImage(textures[textureName]))
                textureNames.push(textureName)
            }
            
            Promise.all(promises).then( (imgs, fail) => 
            {
                for(let i in imgs)
                    gTextures[textureNames[i]] = imgs[i]
                loaded++
            })
        })
    }

    function loadSoundS(url)
    {
        currentText = LoadingMessages.sounds
        var promises = []
        var soundNames = []

        Game.loadJSON(url).then((sounds, reject) => 
        {
            for(let soundName in sounds)
            {
                promises.push(Game.loadSound(sounds[soundName]))
                soundNames.push(soundName)
            }
            
            Promise.all(promises).then((sounds, fail) => 
            {
                for(let i in sounds)
                    gSounds[soundNames[i]] = sounds[i]
                loaded++                             
            })
        })
    }

    function loadMapData(url)
    {
        currentText = LoadingMessages.data   

        Game.loadJSON(url).then( (mapData, reject) => 
        {        
            gMapData = mapData  
            loaded++  
        })
    }

    function loadJsonListData(urls, dictionary)
    {        
        currentText = LoadingMessages.animationData
        var promises = []
        for(let url of urls)
        {
            Game.loadJSON(url).then( (mapData, reject) => 
            {        
                dictionary[Path.GetFileName(url)] = mapData                 
            })
        }
        loaded++         
    }

    LoadState.prototype.update = function()
    {        
        if(loaded >= Util.countAttributes(dTypes))
        {            
            this.stateMachine.change("play")
        }
    }

    LoadState.prototype.render = function()
    {
        Game.ctx.font = "30px Arial";
        Game.ctx.fillText(currentText, CANVAS_WIDTH / 2 - 100, CANVAS_HEIGHT / 2);
    }
})()