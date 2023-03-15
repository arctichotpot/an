"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const commander_1 = tslib_1.__importDefault(require("commander"));
// load plugins
async function loadPlugins(pluginPath) {
    var _a;
    const files = await fs_1.default.promises.readdir(pluginPath);
    const plugins = [];
    for (const file of files) {
        const pluginModule = await (_a = path_1.default.join(pluginPath, file), Promise.resolve().then(() => tslib_1.__importStar(require(_a))));
        const plugin = {
            name: pluginModule.name,
            command: pluginModule.command,
        };
        plugins.push(plugin);
    }
    return plugins;
}
// create CLI
function createCLI(plugins) {
    const program = new commander_1.default.Command();
    program.version('1.0.0');
    for (const plugin of plugins) {
        program.addCommand(plugin.command);
    }
    return program;
}
const pluginPath = path_1.default.join(__dirname, 'plugins');
loadPlugins(pluginPath)
    .then(plugins => createCLI(plugins))
    .then(program => program.parse(process.argv))
    .catch(err => console.error(err));
