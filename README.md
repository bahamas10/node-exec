exec
====

Call a child process with the ease of exec and safety of spawn


**Note:** The API has changed slightly with `v0.1.0` of this module

Why?
----

This module provides the best of both worlds of `spawn` and `exec`

It will callback with 2 strings containing stdout and stderr
(like `child_process.exec`), but will take an array of process arguments
(like `child_process.spawn`) to avoid any potentially harmful shell expansion.

Usage
-----

``` js
var exec = require('exec');
```

Example
-------

``` js
var exec = require('exec');

exec(['ls', '-lha'], function(err, out, code) {
  // if `err` is an Error object, something went wrong spawing the command.
  // the `err` object is the same as `.on('error', function(e) {})` of the
  // spawn object
  if (err instanceof Error)
    throw err;
  process.stderr.write(err);
  process.stdout.write(out);
  process.exit(code);
});
```

The example above will call `ls -lha` safely, by passing the arguments directly
to `exec(2)` without using an shell expansion/word splitting.

It returns a `child_process.spawn` object, and callbacks with any stdout,
stderr, and the exit status of the command.  The above example will throw an
error if anything went wrong during the spawn, otherwise it will print the stdout,
stderr, and exit with the exit code of `ls`.

`err` and `out` are encoded as`utf-8` strings by default

For backwards compatibility with `child_process.exec`, it is also possible
to pass a string to `exec`.  The string will automatically be converted to
`['/bin/sh', '-c', '{string}'], which will cause the string to be parsed on the
shell.  Note that if you use this method, you are at risk of shell expansion,
word splitting, and other shell features that could be potentially unsafe.

``` js
exec('cat foo | grep bar', function(err, out, code) {
  if (err instanceof Error)
    throw err;
  process.stderr.write(err);
  process.stdout.write(out);
  process.exit(code);
});
```

Functions
---------

### exec(['args'], [opts], callback)

- `args`: an array of arguments to execute
- `opts`: is additional options to pass to `child_process.spawn`

In addition to the `child_process.spawn` options, more options have been added to mimic the behavior
of `child_process.exec`

- `opts.timeout`: number of milliseconds to wait for the program to complete before sending it
`SIGTERM`.  Note that by default, your program will wait indefinitely for the
spawned program to terminate.  Upon sending the fatal signal, `exec` will return
with whatever stdout and stderr was produced.
- `opts.killSignal`: the signal to use when `opts.timeout` is used, defaults to `SIGTERM`
- `opts.encoding`: the encoding to use for stdout and stderr.  **NOTE**: unlike `child_process.exec`, this defaults
to `'utf-8'` if unset.  Set to `'buffer'` to handle binary data.

Installation
------------

    npm install exec

License
-------

MIT
