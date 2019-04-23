const { BaseCommand } = require('task-scheduling')
const fs = require('fs-extra')
const path = require('path')

const tsconfig = require('./../tsconfig.json')

class CleanCommand extends BaseCommand {

  constructor() {
    super()

    this.name = 'clean'
    this.description = 'Clean the folder destined to the compiled files.'
  }

  async run() {
    console.log('Cleaning', tsconfig.compilerOptions.outDir, 'folder..')
    await fs.emptyDir(path.join(tsconfig.compilerOptions.outDir))
    console.log('¡Successful cleaning!')
  }

}

module.exports.CleanCommand = CleanCommand
