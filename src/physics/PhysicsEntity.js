class PhysicsEntity{
    #object
    constructor(def, isSolid){
        this.#object = def
        this.solid = isSolid || false
    }
    get width(){
        return this.#object.width
    }
    get height() {
        return this.#object.height
    }
    get halfWidth() {
        return this.#object.width * .5
    }
    get halfHeight(){
        return this.#object.height * .5
    }
    get x() {
        return this.#object.x
    }
    get y() {
        return this.#object.y
    }
    get vx() {
        return this.#object.vx || 0
    }
    get vy() {
        return this.#object.vy || 0
    }
    get ax() {
        return this.#object.ax || 0
    }
    get ay() {
        return this.#object.ay || 0
    }
    set vx(value) {
         this.#object.vx = value
    }
    set vy(value) {
         this.#object.vy = value
    }
    set ax(value) {
         this.#object.ax = value
    }
    set ay(value) {
         this.#object.ay = value
    }
    set x(value) {
         this.#object.x = value
    }
    set y(value) {
         this.#object.y = value
    }
}