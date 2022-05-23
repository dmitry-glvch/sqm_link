import { dirname, basename, resolve } from 'path'

import dir from 'es-dirname'

import webpack from 'webpack'


export const aliases = (relativePaths) =>
    Object.fromEntries(
        relativePaths.map((relativePath) => [
          basename(relativePath),
          resolve(dir(), relativePath)
        ] ))
  
export const replacements = (branch) => (modules) =>
    modules
        .map((module) => ({
          target: `config/${module}/${module}.js`,
          replacement: `config/${module}/${branch}/${module}.js`
        }))
        .map(({ target, replacement }) =>
            new webpack.NormalModuleReplacementPlugin(
              new RegExp(target),
              replacement
            ))
