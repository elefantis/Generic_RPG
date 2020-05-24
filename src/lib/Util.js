var Util = {}

Util.convertCartesian = function(x, y, w)
{
    return y * w + x
}

Util.insertRect = function(start, map, w, rect)
{           
    var x, y

    for(let i = 0; i < rect.data.length; i++)
    {
        x = i % rect.side
        y = Math.floor(i / rect.side)            
        map[y * w + x + start] = rect.data[i]
    }   
    return map;
}

Util.getHeight = function(length, w)
{
    return Math.floor(length / w)
}

Util.countAttributes = function(object)
{
    var counter = 0
    
    for(let i in object)
        if(object.hasOwnProperty(i))
            counter++    
    return counter
}

Util.parseDirection = function(direction)
{
    var changes = 
    {
        "left": "Left",
        "up": "Back",
        "right": "Right",
        "down": "Front",
        "37": "Left",
        "38": "Back",
        "39": "Right",
        "40": "Front",
        
    }
    return changes[direction]
}