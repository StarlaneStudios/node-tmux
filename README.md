# node-tmux

This library allows you to manage your tmux sessions from node, using an easy to use API. 

# Installation & usage

First, make sure the machine you are going to run this on has tmux installed. When `tmux` cannot be found, trying to obtain the tmux reference will fail (See below).

You can install this package from npm
```
npm install node-tmux
```

## Obtaining tmux instance

In order to execute any tmux commands, the library has to validate the existance of tmux first. In order to retrieve an instance of tmux, use the following

```
import {tmux} from 'node-tmux';

tmux().then(tm => {

	// Use your tm instance

}).catch(() => {

	// Command not found

});
```

## API

node-tmux currently supplies the following methods:

- **newSession(name: string, command?: string)** - Creates a new tmux session with the given name
- **getSessions()** - Returns an array listing all session names
- **isSession(name: string)** - Returns whether a session by the given name exists
- **killSession(name: string)** - Kills the session with the given name
- **writeInput(name: string, print: string, newline: boolean = false)** - Write the specified string to the given session. Set newline to true to write a newline after this string (Usually triggers command execution).
