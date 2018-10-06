import Options from "./options";
/**
 * An adapter class containing methods to execute common
 * tmux operations.
 */
declare class Tmux {
    private options;
    constructor(options: Options);
    /**
     * Create a new session of the given name
     *
     * @param name Session name
     * @param command Optional command to execute
     */
    createSession(name: string, command?: string): Promise<void>;
    /**
     * List of sessions currently active
     */
    getSessions(): Promise<string[]>;
    /**
     * Returns whether a session with the given name exists
     *
     * @param name Session to check
     */
    sessionExits(name: string): Promise<boolean>;
    /**
     * Kills the session with the given name
     *
     * @param name Session to kill
     */
    killSession(name: string): Promise<void>;
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
}
/**
 * Create a new Tmux instance with the given options. Returns null when the tmux command
 * cannot be found or executed properly.
 */
export declare function tmux(options?: Options): Promise<Tmux | null>;
export {};
