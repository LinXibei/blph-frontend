const { parseCmdParams, removeGitSomeFiles } = require('../utils/utils')
const ora = require('ora');
const path = require('path');
const fs = require('fs-extra');
const { RepoPath, Config } = require('../utils/config');
const download = require('download-git-repo');
const { prompt } = require('inquirer');
class Creator {
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
			await this.checkFolderExist();
			// 拉取git上的项目模板
			await this.downloadRepo();
			// // 把下载下来的资源文件，拷贝到目标文件夹
			await this.copyRepoFiles();
			// // 根据用户git信息等，修改项目模板中package.json的一些信息
			// await this.updatePackage();
			// // 对我们的项目进行git初始化
			// await this.initGit();
			// // 最后安装依赖、启动项目等！
			// await this.runApp();
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
	async checkFolderExist() {
		return new Promise(async (resolve, reject) => {
			const { target } = this.RepoMaps;
			if (this.cmdParams.force) {
				await fs.removeSync(target);
				return resolve();
			} 
			try {
				const isTarget = await fs.pathExistsSync(target);
				if (!isTarget) return resolve();
				const { folder } = await prompt(Config.folderExits);

				if (folder === 'newFolder') {
					const { input } = await prompt(Config.rename);
					this.source = input;
					this.RepoMaps.target = this.genTargetPath(`./${input}`);
					return resolve()
				} else if (folder === 'exits') {
					await fs.removeSync(target);
					return resolve();
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
}
module.exports = Creator;