import { tmux } from "./tmux";

tmux({
	shell: 'C:\\cygwin64\\bin\\mintty.exe'
}).then(async term => {

	if(term == null) {
		console.log("Tmux cannot be loaded");
		return;
	}

	const sessions = term.listSessions();

	console.log(sessions);

});