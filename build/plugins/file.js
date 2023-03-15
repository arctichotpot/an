"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = exports.name = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const glob_1 = tslib_1.__importDefault(require("glob"));
const commander_1 = require("commander");
exports.name = "findFile";
//todo: If the current directory is under the village gitignore file, it will be looked up as a blacklist file
//todo: in the future, you can choose whether to blacklist the gitignore file
exports.command = commander_1.program
    .command('findFile <filename>')
    .description('Find file in current directory and subdirectories')
    .action((filename) => {
    const gitIgnoreFilePath = path_1.default.join(process.cwd(), '.gitignore');
    let ignorePatterns = [];
    if (fs_1.default.existsSync(gitIgnoreFilePath)) {
        ignorePatterns = fs_1.default
            .readFileSync(gitIgnoreFilePath, 'utf-8')
            .split('\n')
            .filter((line) => !!line.trim() && !line.startsWith('#'))
            .map((pattern) => path_1.default.join(process.cwd(), pattern));
    }
    const options = {
        dot: true,
        ignore: ignorePatterns,
        nodir: true,
        realpath: true,
    };
    (0, glob_1.default)(`**/${filename}`, options).then(files => {
        if (files.length > 0) {
            files.forEach((file) => {
                console.log(`File '${filename}' found at '${file}'.`);
            });
        }
        else {
            console.log(`File '${filename}' not found in current directory and subdirectories.`);
        }
    }).catch(err => {
        console.log(err);
    });
});
