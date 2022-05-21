import { dirname, basename, resolve } from 'path'

import dir from 'es-dirname'

import webpack from 'webpack'


export const aliases = (relativePaths) =>
    Object.fromEntries(
        relativePaths.map((relativePath) => [
          basename(relativePath),
          resolve(dir(), relativePath)
        ] ))
  
export const replacements = (branch) => (paths) =>
    paths.map((path) =>
        new webpack.NormalModuleReplacementPlugin(
          new RegExp(`^${path}$`),
          `${dirname(path)}/${branch}/${basename(path)}`
        ))
