const { spawn } = require('child_process')

function spawnPromise(command, options) {
  return new Promise((resolve, reject) => {
    const ls = spawn(command, options)

    let stdout = ''
    let stderr = ''

    ls.stdout.on('data', (data) => {
      stdout += data.toString()
    })
    ls.stderr.on('data', (data) => {
      stderr += data
    })

    ls.on('close', (code) => {
      if(!code) {
        resolve({ stdout: stdout })
      }
      else {
        reject({ code: code, stderr: stderr, stdout: stdout })
      }
    })
  })
}

module.exports.spawn = spawnPromise
