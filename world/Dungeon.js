var Dungeon = (function() 
{
    var  _index, _shiftSpeed, _destCurrentX, _destCurrentY, _destNextX, _destNextY, _nextRoom

    function Dungeon(player)
    {           
        this.player = player
        
        this.dungeon = [ 
            new Room(Random.next(15, 20),  Random.next(8,14), this.player),
            new Room(Random.next(15, 20),  Random.next(8,14), this.player),
            new Room(Random.next(15, 20),  Random.next(8,14), this.player),
            new Room(Random.next(15, 20),  Random.next(8,14), this.player),
            new Room(Random.next(15, 20),  Random.next(8,14), this.player),
            new Room(Random.next(15, 20),  Random.next(8,14), this.player),
            new Room(Random.next(15, 20),  Random.next(8,14), this.player)  
        ]
        
        this.shifting = false
        _shiftSpeed = 25
        _index = Random.next(0, this.dungeon.length)        
        this.currentRoom = this.dungeon[_index]

        Game.bindAction(Keys.LEFT, () => { this.shiftRoom.bind(this)(Keys.LEFT) })
        Game.bindAction(Keys.UP, () => { this.shiftRoom.bind(this)(Keys.UP) })
        Game.bindAction(Keys.RIGHT, () => { this.shiftRoom.bind(this)(Keys.RIGHT) })
        Game.bindAction(Keys.DOWN, () => { this.shiftRoom.bind(this)(Keys.DOWN) })
    }

    Dungeon.prototype.update = function()
    {
        if(this.shifting)
            shifting(this)
        else
            this.currentRoom.update()
    }

    Dungeon.prototype.render = function()
    {
        this.currentRoom.render()
       
        if(this.shifting)        
            _nextRoom.render()                    
    }

    Dungeon.prototype.shiftRoom = function(direction) 
    {     
        if(this.shifting) return

        _index = (_index  + 1) % this.dungeon.length
        this.shifting = true
        beginShifting(direction, this.currentRoom, this.dungeon[_index])
    }
    
    function beginShifting(direction, currentRoom, nextRoom)
    {        
        var currentDest = {}
        var currentNext = {}

        _nextRoom = nextRoom
        currentDest[LEFT] = { x: CANVAS_WIDTH, y: currentRoom.camera.dy }
        currentDest[DOWN] = { x: currentRoom.camera.dx, y: -CANVAS_HEIGHT }
        currentDest[RIGHT] = { x: -CANVAS_WIDTH, y: currentRoom.camera.dy }
        currentDest[UP] = { x: currentRoom.camera.dx, y: CANVAS_HEIGHT }
        
        currentNext[LEFT] = {x: -CANVAS_WIDTH - currentRoom.camera.dx, y: nextRoom.camera.getCenterPosition().y}
        currentNext[DOWN] = {x: nextRoom.camera.getCenterPosition().x, y: CANVAS_HEIGHT + currentRoom.camera.dy}
        currentNext[RIGHT] = {x: CANVAS_WIDTH + currentRoom.camera.dx, y: nextRoom.camera.getCenterPosition().y}
        currentNext[UP] = {x: nextRoom.camera.getCenterPosition().x, y: -CANVAS_HEIGHT - currentRoom.camera.dy}
        
        _destCurrentX = currentDest[direction].x
        _destCurrentY = currentDest[direction].y
        _destNextX = nextRoom.camera.getCenterPosition().x
        _destNextY = nextRoom.camera.getCenterPosition().y

        _nextRoom.camera.dx = currentNext[direction].x
        _nextRoom.camera.dy = currentNext[direction].y
    }

    function shifting(dungeon)
    {   
        var ready = []             
        ready[0] = moveIn(dungeon.currentRoom.camera, _destCurrentX, "dx", _shiftSpeed)
        ready[1] = moveIn(_nextRoom.camera, _destNextX, "dx", _shiftSpeed)
        ready[2] = moveIn(dungeon.currentRoom.camera, _destCurrentY, "dy", _shiftSpeed)
        ready[3] = moveIn(_nextRoom.camera, _destNextY, "dy", _shiftSpeed)                 

        if(ready[0] && ready[1] && ready[2] && ready[3])
        {                   
            dungeon.shifting = false
            dungeon.currentRoom = _nextRoom
            _nextRoom = null
        }
    }

    function moveIn(source, dest, atr, speed)
    {               
        if(Math.abs(source[atr] - dest) != 0)                 
            if(Math.abs(source[atr] - dest) < speed)
                source[atr] = dest
            else
                source[atr] += speed * (Math.floor(-source[atr] + dest) / Math.floor(Math.abs(-source[atr] + dest)))        
        else
            return true
        return false
    }

    return Dungeon;
})();