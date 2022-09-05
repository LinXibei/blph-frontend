const { parseCmdParams, removeGitSomeFiles, hasYarn, install, start, sleep } = require('../utils/utils');
const { logWithSpinner, stopSpinner } = require("../utils/spinner");
const ora = require('ora');
const path = require('path');
const fs = require('fs-extra');
const { RepoPath, Config } = require('../utils/config');
const download = require('download-git-repo');
const { prompt } = require('inquirer');
const ReadFrameTemplate = require("./ReadFrameTemplate");
const chalk = require("chalk");

class Creator {
	isYarn = true;
	constructor(source, options, opts = {}) {
		this.source = source;
		this.cmdParams = parseCmdParams(options);
		this.RepoMaps = Object.assign({
			repo: RepoPath,
			temp: path.join(__dirname, '../../__temp__'),
			target: this.genTargetPath(this.source)
		}, opts);
		this.gitUser = {};
		this.spinner = ora();
		this.init();
	}
	async init() {
		try {
			// 检查目标路径文件是否正确
			const folderUrl = await this.checkFolderExist();
			// 选择框架语言
			const frame = await this.checkFrames();
			// 在对应文件夹创建相关文件
			logWithSpinner("↓", "模板正在下载中");
			ReadFrameTemplate(frame, folderUrl);
			stopSpinner();
			// console.log(chalk.blue("下载成功"))
			// 拉取git上的项目模板
			// await this.downloadRepo();
			
			// // 把下载下来的资源文件，拷贝到目标文件夹
			// await this.copyRepoFiles();
			// // 根据用户git信息等，修改项目模板中package.json的一些信息
			// await this.updatePackage();
			// // 对我们的项目进行git初始化
			// await this.initGit();
			// 最后安装依赖、启动项目等！
			logWithSpinner("正在安装环境依赖...");
			stopSpinner();	
			await this.runApp(folderUrl);
			stopSpinner();
		} catch(e) {
			console.error(e);
			process.exit(1);
		} finally {
			this.spinner.stop();
		}
	}
	genTargetPath(source) {
		return path.resolve(process.cwd(), source)
	}
	async checkFrames() {
		return new Promise(async (resolve, reject) => {
			try {
				const { frame } = await prompt(Config.frames);
				return resolve(frame);
			} catch(e) {
				console.error(e);
				process.exit(1);	
			}
		})
	}
	async checkFolderExist() {
		return new Promise(async (resolve, reject) => {
			const { target } = this.RepoMaps;
			// blph-frontend create XXX -f 
			// blph-frontend create XXXX --force
			if (this.cmdParams.force) {
				await fs.removeSync(target);
				return resolve();
			} 
			try {
				// 文件名称重复了
				const isTarget = await fs.pathExistsSync(target);
				if (!isTarget) return resolve(this.RepoMaps.target);
				const { folder } = await prompt(Config.folderExits);

				if (folder === 'newFolder') {
					const { input } = await prompt(Config.rename);
					this.source = input;
					this.RepoMaps.target = this.genTargetPath(`./${input}`);
					return resolve(this.RepoMaps.target)
				} else if (folder === 'exits') {
					await fs.removeSync(target);
					return resolve(this.RepoMaps.target);
				} else {
					process.exit(1);
				}
			} catch(e) {
				console.error(e);
				process.exit(1);
			}
		})
	}
	async downloadRepo() {
		this.spinner.start('正在拉取模板...');
		const { temp, repo } = this.RepoMaps;
		return new Promise(async (resolve, reject) => {
			await fs.removeSync(temp);
			download(repo, temp, async (err) => {
				if (err) return reject(err);
				this.spinner.succeed('下载成功~~~~');
				return resolve();
			});
		});
	}
	async copyRepoFiles() {
		const { temp, target } = this.RepoMaps;
		await removeGitSomeFiles(temp, target, ['./git', './changelogs']);
	}
	async updatePackage() {

	}
	async runApp(folderUrl) {
		try {
			const env = hasYarn() ? "yarn" : "npm";
			logWithSpinner(" ");
			await install(env, folderUrl);
			// await start(env, folderUrl);
		}	catch(e) {
			const { name, message } = e;
			console.log(chalk.bgRed.white(`${name}安装失败: ${message}`))
		}
	}
	// async hasNpmOrYarnEnv() {
	// 	try {
	// 		await HasYarn();
	// 	} catch(e) {
	// 		const { message } = e;
	// 		if (message.indexOf("npm") > -1) {
	// 			// console.log(chalk.red("当前环境没有安装npm，请手动安装npm"))
	// 			console.error("当前环境没有安装npm，请手动安装npm");
	// 			process.exit(1);
	// 		}
	// 	}
	// }
}
module.exports = Creator;