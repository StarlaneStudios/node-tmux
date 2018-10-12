export default interface NodeTmuxOptions {

	/**
	 * The path of the shell to use
	 */
	shell?: string;

	/**
	 * The command to use. Defaults to "tmux"
	 */
	command?: string;
}