import Options from "./options";
import {exec} from "child_process";

/**
 * An adapter class containing methods to execute common
 * tmux operations.
 */
class Tmux {

	private options: Options;

	constructor(options: Options) {
		this.options = options;
	}

	/**
	 * Create a new session of the given name
	 * 
	 * @param name Session name
	 * @param command Optional command to execute
	 */
	public async createSession(name: string, command?: string) : Promise<void> {
		if(this.sessionExits(name)) throw new Error(`Session '${name}' already exists`);
		await this._exec(`tmux new -s ${name}` + (command ? ` ${command}` : ''));
	}

	/**
	 * List of sessions currently active
	 */
	public async getSessions() : Promise<string[]> {
		const out = await this._exec(`tmux ls -F "#S"`);
		return out.split('\n').filter(s => !!s);
	}

	/**
	 * Returns whether a session with the given name exists
	 * 
	 * @param name Session to check
	 */
	public async sessionExits(name: string) : Promise<boolean> {
		const list = await this.getSessions();
		return list.indexOf(name) != -1;
	}

	/**
	 * Kills the session with the given name
	 * 
	 * @param name Session to kill
	 */
	public async killSession(name: string) : Promise<void> {
		if(!this.sessionExits(name)) throw new Error(`Session '${name}'does not exist`);
		await this._exec(`tmux kill-session -s ${name}`);
	}

	/**
	 * Write text input to the given process
	 * 
	 * @param name Session name
	 * @param print Text to write
	 * @param newline Whether the end with an eneter (Execute input). Defaults to false
	 */
	public async writeInput(name: string, print: string, newline: boolean = false) : Promise<void> {
		if(!this.sessionExits(name)) throw new Error(`Session '${name}'does not exist`);
		await this._exec(`tmux send-keys -s ${name} "${print}"` + (newline ? ' Enter' : ''));
	}

	/**
	 * Command Execution utility method
	 * 
	 * @param command Command to execute
	 */
	private _exec(command: string) : Promise<string> {
		return new Promise((success, reject) => {
			exec(command, this.options, (err, stdout, stderr) => {
				if(err) {
					reject(err);
				} else {
					success(stdout);
				}
			});
		})
	};

}

/**
 * Create a new Tmux instance with the given options. Returns null when the tmux command
 * cannot be found or executed properly.
 */
export function tmux(options: Options = {}) : Promise<Tmux|null> {
	return new Promise((success) => {
		let process = exec('tmux ls', options);

		process.on('exit', (code) => {
			if(code == 0) {
				success(new Tmux(options));
			} else {
				success(null);
			}
		});
	});
}