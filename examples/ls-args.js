var exec = require('..');

exec(['ls', '-lh', '-a'], function(err, out, code) {
  if (err) throw err;
  console.log(out);
  process.exit(code);
});
