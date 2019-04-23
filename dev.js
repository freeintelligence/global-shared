const { Scheduler } = require('task-scheduling')
const { NoNameCommand } = require('./dev/noname_command')
const { WatchCommand } = require('./dev/watch_command')
const { BuildCommand } = require('./dev/build_command')
const { CleanCommand } = require('./dev/clean_command')
const { CopyCommand } = require('./dev/copy_command')

// Commands
Scheduler.registerCommand(new NoNameCommand())
Scheduler.registerCommand(new BuildCommand())
Scheduler.registerCommand(new CleanCommand())
Scheduler.registerCommand(new CopyCommand())
Scheduler.registerCommand(new WatchCommand())

// Run
Scheduler.executeByProcess()
