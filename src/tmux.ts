import NodeTmuxOptions from "./options";
import {exec} from "child_process";

/* The format prevents  */
const NAME_FORMAT = /^[^"';]+$/;

/**
 * An adapter class containing methods to execute common
 * tmux operations.
 */
export class Tmux {

	private options: NodeTmuxOptions;

	constructor(options: NodeTmuxOptions) {
		this.options = {command: "tmux", ...options};
	}

	/**
	 * Create a new session of the given name
	 * 
	 * @param name Session name
	 * @param command Optional command to execute
	 */
	public async newSession(name: string, command?: string) : Promise<void> {
		if(!this._validate(name) || name.length > 50) {
			throw new Error(`Illegal session name`);
		} else if(await this.hasSession(name)) {
			throw new Error(`Session '${name}' already exists`);
		}

		const ext = command ? ` ${command}` : '';

		await this._exec(`${this.options.command} new -d -s "${name}"` + ext);
	}

	/**
	 * List of sessions currently active
	 */
	public async listSessions() : Promise<string[]> {
		const out = await this._exec(`${this.options.command} ls -F "#S"`, true);
		if(!out) return [];
		return out.split('\n').filter(s => !!s);
	}

	/**
	 * Returns whether a session with the given name exists
	 * 
	 * @param name Session to check
	 */
	public async hasSession(name: string) : Promise<boolean> {
		if(!this._validate(name) || name.length > 50) {
			throw new Error(`Illegal session name`);
		}

		try {
			await this._exec(`${this.options.command} has-session -t "${name}"`);
			return true;
		} catch(err) {
			return false
		}
	}

	/**
	 * Kills the session with the given name
	 * 
	 * @param name Session to kill
	 */
	public async killSession(name: string) : Promise<void> {
		if(!this._validate(name) || name.length > 50) {
			throw new Error(`Illegal session name`);
		} else if(!(await this.hasSession(name))) {
			throw new Error(`Session '${name}'does not exist`);
		}

		await this._exec(`${this.options.command} kill-session -t "${name}"`);
	}

	/**
	 * Rename the session with the given name
	 * 
	 * @param name Session to kill
	 */
	public async renameSession(name: string, newName: string) : Promise<void> {
		if(!this._validate(name) || name.length > 50) {
			throw new Error(`Illegal session name`);
		} else if(!(await this.hasSession(name))) {
			throw new Error(`Session '${name}'does not exist`);
		}

		await this._exec(`${this.options.command} rename-session -t "${name}" "${newName}"`);
	}

	/**
	 * Write text input to the given process
	 * 
	 * @param name Session name
	 * @param print Text to write
	 * @param newline Whether the end with an eneter (Execute input). Defaults to false
	 */
	public async writeInput(name: string, print: string, newline: boolean = false) : Promise<void> {
		if(!this._validate(name) || name.length > 50) {
			throw new Error(`Illegal session name`);
		} else if(!(await this.hasSession(name))) {
			throw new Error(`Session '${name}'does not exist`);
		}

		const ext = newline ? ' Enter' : '';

		await this._exec(`${this.options.command} send-keys -t "${name}" "${print}"` + ext);
	}

	/**
	 * Command Execution utility method
	 * 
	 * @param command Command to execute
	 */
	private _exec(command: string, ignoreError: boolean = false) : Promise<string> {
		return new Promise((success, reject) => {
			exec(command, this.options, (err, stdout) => {
				if(err && !ignoreError) {
					reject(err);
				} else {
					success(stdout);
				}
			});
		})
	};

	/**
	 * Validate the given session name
	 * 
	 * @param name Session name
	 */
	private _validate(name: string) {
		return NAME_FORMAT.test(name);
	}

}

/**
 * Create a new Tmux instance with the given options. Returns null when the tmux command
 * cannot be found or executed properly.
 */
export function tmux(options: NodeTmuxOptions = {}) : Promise<Tmux> {
	return new Promise((success, reject) => {
		const cmd = `${options.command || "tmux"} -V`;

		let process = exec(cmd, {
			shell: options.shell
		});

		process.on('exit', (code) => {
			if(code == 0) {
				success(new Tmux(options));
			} else {
				reject(new Error(`Failed to locate tmux command (exit code ${code})`));
			}
		});
	});
}