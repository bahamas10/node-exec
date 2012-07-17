var spawn = require('child_process').spawn;

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
      child = spawn(args[0], args.slice(1));

  child.stdout.on('data', function(data) {
    out += data;
  });
  child.stderr.on('data', function(data) {
    err += data;
  });

  child.on('exit', function(code) {
    return callback(err, out, code);
  });

  return child;
};
