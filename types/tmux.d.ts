import NodeTmuxOptions from "./options";
/**
 * An adapter class containing methods to execute common
 * tmux operations.
 */
export declare class Tmux {
    private options;
    constructor(options: NodeTmuxOptions);
    /**
     * Create a new session of the given name
     *
     * @param name Session name
     * @param command Optional command to execute
     */
    newSession(name: string, command?: string): Promise<void>;
    /**
     * List of sessions currently active
     */
    listSessions(): Promise<string[]>;
    /**
     * Returns whether a session with the given name exists
     *
     * @param name Session to check
     */
    hasSession(name: string): Promise<boolean>;
    /**
     * Kills the session with the given name
     *
     * @param name Session to kill
     */
    killSession(name: string): Promise<void>;
    /**
     * Rename the session with the given name
     *
     * @param name Session to kill
     */
    renameSession(name: string, newName: string): Promise<void>;
    /**
     * Write text input to the given process
     *
     * @param name Session name
     * @param print Text to write
     * @param newline Whether the end with an eneter (Execute input). Defaults to false
     */
    writeInput(name: string, print: string, newline?: boolean): Promise<void>;
    /**
     * Command Execution utility method
     *
     * @param command Command to execute
     */
    private _exec;
    /**
     * Validate the given session name
     *
     * @param name Session name
     */
    private _validate;
}
/**
 * Create a new Tmux instance with the given options. Returns null when the tmux command
 * cannot be found or executed properly.
 */
export declare function tmux(options?: NodeTmuxOptions): Promise<Tmux>;
