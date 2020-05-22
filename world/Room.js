var Room = (function() 
{
    var _mapData, _atlas, _map

    class Room {
        constructor(width, height) {
            _mapData = new RoomGenerator(width, height);
            _atlas = new Atlas(gTextures[_mapData.tileSet], 64, 64);
            _map = new Map(_atlas, _mapData);
            this.camera = new Camera({ x: 0, y: 0 }, [_map]);
        }
        update() {
        }
        render() {
            this.camera.render(Game.ctx);
        }
    }
    return Room
})();

