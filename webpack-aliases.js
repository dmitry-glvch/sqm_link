const path = require('path')


module.exports = (relativePaths) =>
    Object.fromEntries(
        relativePaths.map((relativePath) => [
          path.basename(relativePath),
          path.resolve(__dirname, relativePath)
        ] ))
