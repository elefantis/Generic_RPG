var Path = {}

Path.GetFileName = function(path)
{
    var pathParts = path.split("/")
    var fileNameWithExtension = pathParts[pathParts.length - 1]
    var fileNameWithExtensionParts = fileNameWithExtension.split(".")
    return fileNameWithExtensionParts[0]
}