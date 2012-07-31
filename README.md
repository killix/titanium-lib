# titanium-lib

Simple collection of tools for developing Titanium mobile apps. It consists of
a set of small modules that work together to provide a set of reusable
functions that remove the need for rewriting basic things in each app. This
library grows from my own development needs and hence may not be all that
useful to anybody else.

## Available modules

- `audio`: Minimal code for playing sounds
- `config`: Configuration handler with handling of different platforms
- `debug`: Debugging tools
- `lib`: Base loader lib
- `net`: Network tools
- `phpjs`: About to be removed. Collection of functions from phpjs, used in other modules
- `rotate`: Rotation handling
- `system`: Basic os detection and app handling
- `tools`: Various misc. tools
- `UI`: Interface tools
- `window`: Manages multiple windows.

## TODO

- Remove dependency on phpjs functions, remove phpjs module
- Move property get/set functions from tools to new separate module
- Manage dependencies between modules better
- Remove cross-dependencies as much as possible
