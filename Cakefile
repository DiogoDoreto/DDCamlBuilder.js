fs     = require 'fs'
{exec} = require 'child_process'

appName  = 'DDCamlBuilder'
appFiles = [
  'ddcamlbuilder'
]

task 'build', 'Build single application file from source files', ->
  appContents = new Array remaining = appFiles.length
  for file, index in appFiles then do (file, index) ->
    fs.readFile "src/#{file}.coffee", 'utf8', (err, fileContents) ->
      throw err if err
      appContents[index] = fileContents
      process() if --remaining is 0
  process = ->
    fs.writeFile "#{appName}.coffee", appContents.join('\n\n'), 'utf8', (err) ->
      throw err if err
      exec "coffee --compile #{appName}.coffee", (err, stdout, stderr) ->
        throw err if err
        console.log stdout + stderr

        fs.unlink "#{appName}.coffee", (err) ->
          throw err if err

        exec "uglifyjs -o #{appName}.min.js #{appName}.js", (err, stdout, stderr) ->
          throw err if err
          console.log stdout + stderr
