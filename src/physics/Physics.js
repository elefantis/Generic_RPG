class Physics {
    #entities
    constructor() {
        this.#entities = []
    }
    addEntity = function(entity, isSolid){      
        this.#entities.push(new PhysicsEntity(entity, isSolid))
    }
    clearEntities = function() {
        this.#entities = []
    }
    update = function() {
        for(let entity of this.#entities) {           
            entity.vx += entity.ax
            entity.vy += entity.ay
            
            entity.x += entity.vx
            entity.y += entity.vy

            entity.vx = 0
            entity.vy = 0
            entity.ax = 0
            entity.ay = 0
        }
    }
}