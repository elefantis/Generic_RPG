Game.loadImage = function(path)
{
    return new Promise( ( resolve, reject ) => {
        let img = new Image( )
        img.addEventListener( 'load', e => resolve( img ) )
        img.addEventListener( 'error', ( ) => {
          reject( new Error( `Failed to load image's URL: ${ path }` ) )
        } )
        img.src = path
    } )
}

Game.loadJSON = function(url)
{
    return new Promise( function( resolve, reject ) {
        var req = new XMLHttpRequest(  )
        req.open( 'GET', url )
        
        req.onload = function(  ) {          
            if ( req.status == 200 ) {                   
                resolve( JSON.parse( req.response ) )
            }
            else {              
                let message  = ""
                try {
                    message = JSON.parse( req.response ).message
                } catch (error) {
                    message = req.response
                }
                reject( { status: req.status, message: Error( message ) } )
            }
        };
        
        req.onerror = function(  ) {
            reject( Error( "No es posible conectar con el servidor, verifique su conexión a internet" ) )
        }
              
        req.send( )
    } )
}

Game.loadSound = function(url)
{
    return new Promise( (resolve, reject) => {
        try
        {        
            fetch(url)
                .then(data => data.arrayBuffer())
                .then(arrayBuffer => Game.audioContext.decodeAudioData(arrayBuffer))
                .then(decodedAudio => {
                    resolve(decodedAudio)
                })
        }
        catch(error)
        {
            reject({message: "can't load " + url, error: error})
        }                
    } )
}

Game.playSound = function(audio, looping)
{
    
    var ctx = Game.audioContext
    var source = ctx.createBufferSource()
    source.buffer = audio   
    source.connect(this.gainNode)    
    source.start(ctx.currentTime)
  
    if(looping == true)
        source.loop = true
}

Game.mute = function()
{
    if(this.muted)
    {
        this.gainNode.gain.value = 1;
        this.muted = false
    }else
    {
        this.gainNode.gain.value = 0
        this.muted = true        
    }
}