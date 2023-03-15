import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { program } from "commander";


export const name = "findFile";


//todo: If the current directory is under the village gitignore file, it will be looked up as a blacklist file
//todo: in the future, you can choose whether to blacklist the gitignore file


export const command = program
    .command('findFile <filename>')
    .description('Find file in current directory and subdirectories')
    .action((filename) => {
        const gitIgnoreFilePath = path.join(process.cwd(), '.gitignore');
        let ignorePatterns: string[] = [];

        if (fs.existsSync(gitIgnoreFilePath)) {
            ignorePatterns = fs
                .readFileSync(gitIgnoreFilePath, 'utf-8')
                .split('\n')
                .filter((line) => !!line.trim() && !line.startsWith('#'))
                .map((pattern) => path.join(process.cwd(), pattern));
        }

        const options = {
            dot: true,
            ignore: ignorePatterns,
            nodir: true,
            realpath: true,

        };

        glob(`**/${filename}`, options).then(files => {
            if (files.length > 0) {
                files.forEach((file: string) => {
                    console.log(`File '${filename}' found at '${file}'.`);
                });
            } else {
                console.log(`File '${filename}' not found in current directory and subdirectories.`);
            }
        }).catch(err => {
            console.log(err);

        })

    });




