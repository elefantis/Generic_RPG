var DoorwayGenerator = {}

DoorwayGenerator.generateDoorway = function(map, w, mapTileData, doorway)
{
    var leftStart = Util.convertCartesian(0, Math.floor((Util.getHeight(map.length, w)) / 2) - 1, w)
    var upStart = Util.convertCartesian(Math.floor(w / 2) - 1, 0, w)
    var rightStart = Util.convertCartesian(w - 2, Math.floor((Util.getHeight(map.length, w)) / 2) - 1, w)
    var downStart = Util.convertCartesian(Math.floor(w / 2) - 1, Math.floor((Util.getHeight(map.length, w)) - 2), w)

    var doorwaysRects = 
    {
        "LEFT": { "start": leftStart, "data": mapTileData.TILES_LEFT_DOORWAY, "side": 2},
        "TOP": { "start": upStart, "data": mapTileData.TILES_TOP_DOORWAY, "side": 3},
        "RIGHT": {"start": rightStart, "data": mapTileData.TILES_RIGHT_DOORWAY, "side": 2},
        "BOTTOM": {"start": downStart, "data": mapTileData.TILES_BOTTOM_DOORWAY, "side": 3},
        "KEY_LEFT": {"start": Util.convertCartesian(1, Math.floor((Util.getHeight(map.length, w) - 2) / 2), w), "data": mapTileData.TILES_LEFT_DOORWAY_KEY, "side": 1},
        "KEY_TOP": {"start": Util.convertCartesian(w / 2 - 1, 1, w), "data": mapTileData.TILES_TOP_DOORWAY_KEY, "side": 3},
        "KEY_RIGHT": {"start": Util.convertCartesian(w - 2, Math.floor((Util.getHeight(map.length, w) - 2) / 2), w), "data": mapTileData.TILES_RIGHT_DOORWAY_KEY, "side": 1},
        "KEY_BOTTOM": {"start": Util.convertCartesian(w / 2 - 1, Math.floor((Util.getHeight(map.length, w) - 2)), w), "data": mapTileData.TILES_BOTTOM_DOORWAY_KEY, "side": 3},
        "TOP_LIGHT": { "start": upStart, "data": mapTileData.TILES_TOP_DOORWAY_LIGHT, "side": 3},
        "BOTTOM_LIGHT": { "start": downStart - w, "data": mapTileData.TILES_BOTTOM_DOORWAY_LIGHT, "side": 3},
    }
            
    return Util.insertRect(doorwaysRects[doorway].start, map, w, doorwaysRects[doorway])
}

DoorwayGenerator.groundDoorway = function(map, w, mapTileData, doorway)
{
    var left = Util.convertCartesian(1, Math.floor((Util.getHeight(map.length, w)) / 2), w)
    var top = Util.convertCartesian(Math.floor(w / 2), 1, w)
    var right = Util.convertCartesian(w - 2, Math.floor((Util.getHeight(map.length, w)) / 2), w)
    var bottom = Util.convertCartesian(Math.floor(w / 2), Math.floor((Util.getHeight(map.length, w)) - 2), w)

    var removeFloor = 
    {
        "LEFT": () => { map[left] = mapTileData.TILE_FLOORS[Random.next(0, 2)] },
        "TOP": () => { map[top] = mapTileData.TILE_FLOORS[Random.next(0, 2)] },
        "RIGHT": () => { map[right] = mapTileData.TILE_FLOORS[Random.next(0, 2)] },
        "BOTTOM": () => { map[bottom] = mapTileData.TILE_FLOORS[Random.next(0, 2)] },
        "TOP_LIGHT": () => { map[top] = mapTileData.TILE_EMPTY },
        "BOTTOM_LIGHT": () => { map[bottom] = mapTileData.TILE_EMPTY },
    }

    if(removeFloor[doorway])
        removeFloor[doorway]()
    return map
}
