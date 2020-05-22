var Random = {}

Random.next = function(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min
}
