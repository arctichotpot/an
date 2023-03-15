import path from 'path';
import fs from 'fs';
import commander from 'commander';

interface Plugin {
    name: string;
    command: commander.Command;
}

// load plugins
async function loadPlugins(pluginPath: string): Promise<Plugin[]> {
    const files = await fs.promises.readdir(pluginPath);
    const plugins: Plugin[] = [];

    for (const file of files) {
        const pluginModule = await import(path.join(pluginPath, file));
        const plugin: Plugin = {
            name: pluginModule.name,
            command: pluginModule.command,
        };
        plugins.push(plugin);
    }

    return plugins;
}
// create CLI
function createCLI(plugins: Plugin[]): commander.Command {
    const program = new commander.Command();
    program.version('1.0.0');

    for (const plugin of plugins) {
        program.addCommand(plugin.command);
    }

    return program;
}

const pluginPath = path.join(__dirname, 'plugins');

loadPlugins(pluginPath)
    .then(plugins => createCLI(plugins))
    .then(program => program.parse(process.argv))
    .catch(err => console.error(err));
