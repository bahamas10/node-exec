var spawn = require('child_process').spawn,
    v = process.version.split('.')[1],
    StringDecoder = require('string_decoder').StringDecoder;

/**
 * Spawn a child with the ease of exec, but safety of spawn
 *
 * @param args      array   ex. [ 'ls', '-lha' ]
 * @param callback  function(err, out, code)
 *
 * @return spawn object
 */
module.exports = function(args, opts, callback) {
  var out = '',
      err = '',
      code,
      i = 0,
      decoder = new StringDecoder();

  if (typeof opts === 'function') {
    callback = opts;
    opts = null;
  }
  var child = spawn(args[0], args.slice(1), opts);

  child.stdout.on('data', function(data) {
    out += decoder.write(data);
  });
  child.stderr.on('data', function(data) {
    err += decoder.write(data);
  });

  child.on('exit', function(c) {
    code = c;
    if (++i >= 2 || v < 8) callback(err, out, code);
  });

  child.on('close', function() {
    if (++i >= 2) callback(err, out, code);
  });

  return child;
};
