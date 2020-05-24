class Room {
    #atlas
    constructor(width, height, player) {
        this.player = player
        this.mapData = new RoomGenerator(width, height)
        this.#atlas = new Atlas(gTextures[this.mapData.tileSet], 64, 64)
        this.map = new Map(this.#atlas, this.mapData)
        this.map.objects.push(this.player)          
        this.camera = new Camera({ x: 0, y: 0 }, [this.map])
    }
    update() {
        this.map.update()
    }
    render() {
        this.camera.render(Game.ctx)
    }
}


