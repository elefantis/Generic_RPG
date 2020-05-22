function Atlas(imgSource, tileWidth, tileHeight)
{
    this.imgSource = imgSource
    this.w = Math.floor(imgSource.width / tileWidth)
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight   
}

Atlas.prototype.drawTile = function(ctx, tileNumber, x, y)
{
    tileNumber = tileNumber - 1
    var sx = tileNumber % this.w * this.tileWidth
    var sy = Math.floor(tileNumber / this.w) * this.tileHeight
    
    ctx.drawImage(this.imgSource, sx, sy, this.tileWidth, this.tileHeight, x, y, this.tileWidth, this.tileHeight)
}