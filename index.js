var spawn = require('child_process').spawn,
    StringDecoder = require('string_decoder').StringDecoder;

/**
 * Spawn a child with the easy of exec, but safety of spawn
 *
 * @param args      array   ex. [ 'ls', '-lha' ]
 * @param callback  function(err, out, code)
 *
 * @return spawn object
 */
module.exports = function(args, callback) {
  var out = '',
      err = '',
      decoder = new StringDecoder,
      child = spawn(args[0], args.slice(1));

  child.stdout.on('data', function(data) {
    out += decoder.write(data);
  });
  child.stderr.on('data', function(data) {
    err += decoder.write(data);
  });

  child.on('exit', function(code) {
    return callback(err, out, code);
  });

  return child;
};
