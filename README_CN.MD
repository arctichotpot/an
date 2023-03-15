这是一个用typescript和node写的一个命令行工具,可以通过插件式的方式引入以及扩展属于你的命令并引入使用

#### 使用


用法:  
```sh
an command [args]

```
例如 `hello`命令:

``` sh
an hello world
# output:  hello,world
```
#### 开发自己的插件

在 `plugins`目录下新建一个文件,在里面自定义你的命令以及实现方式,然后导出,就像这样:

``` typescript

import { program } from "commander";

export const name = "hello"; 

export const command = program.command(name)
  .description("Say hello")
  .arguments("<name>")
  .action((name: string) => {
    console.log(`Hello, ${name}!`);
  });

```


当我们自定义完命令之后在`an.ts`中会加载`plugins`目录下所有插件,就不用我们手动注册使用了


#### 测试自己的插件

当开发完成时,我们可以使用 ` npm run build ` 或者 `yarn build`命令打包ts文件,同时他也会执行 `npm link`命令,我们就可以直接运行命令测试了

```sh
an command args
```


