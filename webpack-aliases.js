import { basename, resolve } from 'path'
import dirname from 'es-dirname'


export default (relativePaths) =>
    Object.fromEntries(
        relativePaths.map((relativePath) => [
          basename(relativePath),
          resolve(dirname(), relativePath)
        ] ))
