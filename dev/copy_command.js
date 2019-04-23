const { BaseCommand } = require('task-scheduling')
const fs = require('fs-extra')
const path = require('path')

const tsconfig = require('./../tsconfig.json')

class CopyCommand extends BaseCommand {

  constructor() {
    super()

    this.name = 'copy'
    this.description = 'Copy certain files to the compilation folder.'

    this.files = [
      'package.json',
      'readme.md',
      'nalv.json'
    ]
  }

  async run() {
    console.log('Copying important files (not compiled)..')

    this.files.forEach(async (file) => {
      const to = path.join(tsconfig.compilerOptions.outDir, file)
      await fs.remove(to)
      await fs.copy(file, to)
    })

    console.log('¡Files copied successfully!')
  }

}

module.exports.CopyCommand = CopyCommand
