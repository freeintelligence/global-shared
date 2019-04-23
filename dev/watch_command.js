const { BaseCommand, Scheduler } = require('task-scheduling')
const { CopyCommand } = require('./copy_command')
const watch = require('node-watch')
const path = require('path')

const tsconfig = require('./../tsconfig.json')

class WatchCommand extends BaseCommand {

  constructor() {
    super()

    this.name = 'watch'
    this.description = 'Compile every time a file change is detected.'

    this.files = new CopyCommand().files
  }

  async run() {
    await this.execute('build')

    watch(tsconfig.compilerOptions.baseUrl, { recursive: true }, async (event, filename) => await this.execute('build'))

    for(let i = 0; i < this.files.length; i++) {
      watch(path.join(this.files[i]), { }, async (event, filename) => await this.execute('copy'))
    }
  }

  async execute(command) {
    await Scheduler.execute([command])
  }

}

module.exports.WatchCommand = WatchCommand
