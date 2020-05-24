// 11, 11
var RoomGenerator =  ((function()
{
    var _mapTileData;

    class RoomGenerator {
        constructor(w, h, doors) {
            this.tileSet = "tiles"
            this.width = w
            this.height = h
            this.layers = []
            this.doors = !doors ? GenerateRandomDoors() : doors
            _mapTileData = gMapData["Dungeon1"].Tiles
            
            generateGroundLayer(this)           
        }
        setTileData(name) {
            _mapTileData = gMapData[name].Tiles
        }
    }

    function GenerateRandomDoors()
    {
        var left = [0, "LEFT", "KEY_LEFT"],
        top = [0, "TOP", "KEY_TOP", "TOP_LIGHT"], 
        right = [0, "RIGHT", "KEY_RIGHT"], 
        bottom = [0, "BOTTOM", "KEY_BOTTOM", "BOTTOM_LIGHT"]
        
        return [ left[Random.next(0, left.length)], 
            top[Random.next(0, top.length)], 
                right[Random.next(0, right.length)], 
                    bottom[Random.next(0, bottom.length) ] ]
    }


    function generateGroundLayer(mapData)
    {
        var length = mapData.width * mapData.height       
        var groundLayer = Array(length).fill(_mapTileData.TILE_EMPTY)
        var groundLayer2 = Array(length).fill(_mapTileData.TILE_EMPTY)

        groundLayer = generateCorners(groundLayer, mapData.width)
        groundLayer = generateWalls(groundLayer, mapData.width)        
        groundLayer = generateGround(groundLayer, mapData.width)
        
        for(let door of mapData.doors) 
        {
            if(door != 0)
            {
                groundLayer = DoorwayGenerator.groundDoorway(groundLayer, mapData.width, _mapTileData, door)
                groundLayer2 = DoorwayGenerator.generateDoorway(groundLayer2, mapData.width, _mapTileData, door)

            }
        }
                
        mapData.layers.push(groundLayer)
        mapData.layers.push(groundLayer2)
    }

    function generateCorners(map, w)
    {         
        var corners = {
            "TOP_LEFT_CORNER": {"data": _mapTileData.TILES_TOP_LEFT_CORNER, "side": 2 },
            "TOP_RIGHT_CORNER": {"data":  _mapTileData.TILES_TOP_RIGHT_CORNER, "side": 2 },
            "BOTTOM_LEFT_CORNER": {"data":  _mapTileData.TILES_BOTTOM_LEFT_CORNER, "side": 2 },
            "BOTTOM_RIGHT_CORNER": {"data":  _mapTileData.TILES_BOTTOM_RIGHT_CORNER, "side": 2 }
        }
        
        map = Util.insertRect(0, map, w, corners.TOP_LEFT_CORNER)        
        map = Util.insertRect(w - 2, map, w, corners.TOP_RIGHT_CORNER)        
        map = Util.insertRect(map.length - w * 2, map, w, corners.BOTTOM_LEFT_CORNER)        
        map = Util.insertRect(map.length - w * 2 + w - 2, map, w, corners.BOTTOM_RIGHT_CORNER)

        return map       
    }

    function generateWalls(map, w)
    {
        var height = Math.floor(map.length / w)
        var walls ={
            "LEFT_WALL": { "data": generateVerticalWalls(_mapTileData.TILE_LEFT_WALL_UP, _mapTileData.TILE_LEFT_WALL_DOWN, height - 4), "side": 2 },
            "TOP_WALL": { "data": generateHorizontalWall(_mapTileData.TILE_TOP_WALL_UP, _mapTileData.TILE_TOP_WALL_DOWN, w - 4), "side": w - 4 },
            "RIGHT_WALL": { "data": generateVerticalWalls(_mapTileData.TILE_RIGHT_WALL_DOWN, _mapTileData.TILE_RIGHT_WALL_UP, height - 4), "side": 2 },
            "BOTTOM_WALL": { "data": generateHorizontalWall(_mapTileData.TILE_BOTTOM_WALL_DOWN, _mapTileData.TILE_BOTTOM_WALL_UP, w - 4), "side": w - 4 }
        }

        map = Util.insertRect(w*2, map, w, walls.LEFT_WALL)
        map = Util.insertRect(2, map, w, walls.TOP_WALL)
        map = Util.insertRect(w*2+w-2, map, w, walls.RIGHT_WALL)
        map = Util.insertRect(map.length - w * 2 + 2, map, w, walls.BOTTOM_WALL)

        return map
    }

    function generateHorizontalWall(top, down, w)
    {
        var wall = []

        for(let i = 0; i < w * 2; i++)        
            if(i < w)
                wall.push(top[Random.next(0, top.length)])
            else
                wall.push(down[Random.next(0, down.length)])        

        return wall
    }

    function generateVerticalWalls(top, down, w)
    {
        var wall = []
        for(let i = 0; i < w * 2; i++)        
            if(i % 2 == 0)
                wall.push(top[Random.next(0, top.length)])
            else
                wall.push(down[Random.next(0, down.length)])        
        return wall
    }

    function generateGround(map, w)
    {
        var groundLength = (Math.floor(map.length / w) - 4) * (w - 4)
        var ground = {
            "data": fillGround(groundLength),
            "side": w - 4
        }
        return Util.insertRect(Util.convertCartesian(2, 2, w), map, w, ground)
    }

    function fillGround(groundLength)
    {
        var ground = []
        for(let i = 0; i < groundLength; i++)
            ground.push(_mapTileData.TILE_FLOORS[Random.next(0, 2)])
        return ground
    }

    function generateGroundCorners(map, w)
    {
        var height = Math.floor(map.length / w)
        var corners = {
            "TOP_LEFT": { x: 2, y: 2 },
            "TOP_RIGHT": { x: w - 3, y: 2 },
            "BOTTOM_LEFT": { x: 2, y: height - 3 },
            "BOTTOM_RIGHT": { x: w - 3, y: height - 3 }
        }
        map[Util.convertCartesian(corners.TOP_LEFT.x, corners.TOP_LEFT.y, w)] = _mapTileData.TILE_TOP_LEFT_PINK_GROUND
        map[Util.convertCartesian(corners.TOP_RIGHT.x, corners.TOP_RIGHT.y, w)] = _mapTileData.TILE_TOP_RIGHT_PINK_GROUND
        map[Util.convertCartesian(corners.BOTTOM_LEFT.x, corners.BOTTOM_LEFT.y, w)] = _mapTileData.TILE_BOTTOM_LEFT_PINK_GROUND
        map[Util.convertCartesian(corners.BOTTOM_RIGHT.x, corners.BOTTOM_RIGHT.y, w)] = _mapTileData.TILE_BOTTOM_RIGHT_PINK_GROUND
        return map
    }

    return RoomGenerator
}))();