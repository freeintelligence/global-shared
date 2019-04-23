const { BaseCommand, Scheduler } = require('task-scheduling')
const { red } = require('colors')
const { spawn } = require('./helpers/spawn_promise')
const tsconfig = require('./../tsconfig.json')

class BuildCommand extends BaseCommand {

  constructor() {
    super()

    this.name = 'build'
    this.description = 'Compile (clean and copy) typescript code to javascript.'

    this.compiling = false
  }

  async run() {
    if(this.compiling) return;

    this.compiling = true

    await Scheduler.execute(['clean'])
    await Scheduler.execute(['copy'])

    console.log('Starting compilation of the', tsconfig.compilerOptions.baseUrl, 'directory..')
    
    try {
      const result = await spawn('node_modules/.bin/tsc')
      console.log('¡Successful compilation!')
    }
    catch(err) {
      console.error(red('\nErrors in the compilation:'))
      console.error(red(err.stdout))
    }

    console.log()

    this.compiling = false
  }

}

module.exports.BuildCommand = BuildCommand
