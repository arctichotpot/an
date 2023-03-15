[中文](./README_CN.MD)


[plugins](./PLUGINS.md)

This is a command-line tool written in `typescript` and `node` that can be used as a plug-in to import and extend your own commands


Install:
```sh
npm i -g an-command

or

yarn global add an-command
```

Usage:


```sh
an command [args]

```
For example, `hello` command:

``` sh
an hello world
# output:  hello,world
```

#### Develop your own plug-in

Create a new file in the `plugins` directory, in which you customize your commands and how they are implemented, and then export them, like this:

``` typescript

import { program } from "commander";

export const name = "hello";

export const command = program.command(name)
.description("Say hello")
.arguments("<name>")
.action((name: string) => {
console.log(`Hello, ${name}! `);
});

```


After we customize the command, all plugins under the `plugins` directory will be loaded in `an.ts`, so we don't need to manually register to use it,see the `an.ts` implementation for details.


#### Test your own plug-in

When the development is complete, we can use the `npm run build` or `yarn build` command to package the ts file, and it will also execute the `npm link` command, and we can run the command test directly.

```sh
an command args
```

