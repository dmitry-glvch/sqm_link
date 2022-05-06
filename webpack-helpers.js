const path = require('path')

const HtmlPlugin = require('html-webpack-plugin')


const aliases = (relativePaths) =>
    Object.fromEntries(
        relativePaths.map((relativePath) => [
          path.basename(relativePath),
          path.resolve(__dirname, relativePath)
        ] ))

const entryPoints = ({ template, favicon }) => (pages) =>
    pages.map(({ file, title }) => new HtmlPlugin({
      template,
      filename: `${file}.html`,
      title,
      favicon
    }))


module.exports = {
  aliases,
  entryPoints
}
