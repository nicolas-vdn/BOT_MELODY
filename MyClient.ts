import { Client, Collection } from "discord.js"
import * as fs from "fs"
import path from "path"

export default class MyClient extends Client {
    commands: Collection<unknown, any>
    constructor(options) {
        super(options)
        this.commands = new Collection()
        this.loadCommands()
    }
    loadCommands() {
        const foldersPath = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(foldersPath);

        for (const file of commandFiles) {
            const filePath = path.join(foldersPath, file);
            const command = require(filePath);

            if ('data' in command && 'execute' in command) {
                this.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
}