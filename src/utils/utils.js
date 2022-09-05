'use strict';
const fs = require("fs-extra");
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const spwan = require("node:child_process").spawn;
const execSync = require("node:child_process").execSync;
const isFunction = (val) => {
  return typeof val === 'function'
}
exports.isFunction = isFunction;
exports.parseCmdParams = (cmd) => {
	if (!cmd || Object.keys(cmd).length === 0) return {};
	const resOps = {};
	cmd.options.forEach(element => {
		const key = element.long.replace(/^--/, '');
		if (cmd[key] && !isFunction(cmd[key])) {
			resOps[key] = cmd[key]
		}
	});
	return resOps;
}
exports.sleep = (timeout) => {
  return new Promise((resolve => {
    setTimeout(resolve, timeout);
  }));
}
exports.removeGitSomeFiles = async (tmpPath, targetPath, excludes = []) => {
	await fs.copySync(tmpPath, targetPath);
	if (excludes && excludes.length) {
		await Promise.all(
			excludes.map(
				item => async () => await fs.removeSync(path.resolve(targetPath, item))
			)
		)
	}
}
function execCommand(command, args, options) {
	const win32 = process.platform === "win32";
	const cmd = win32 ? "cmd" : command;
	const cmdArgs = win32 ? ["/c"].concat(command, args) : args;
	return spwan(cmd, cmdArgs, options || {});
}
exports.execCommand = execCommand;
exports.install = (env, targetPath) => {
	return new Promise((resolve, reject) => {
		const result = spwan(env, ["install"], {stdio: 'inherit', cwd: targetPath});
		result.on("error", e => reject(e));
		result.on("exit", r => resolve(r));
	})
}
exports.start = (env, targetPath) => {
	const options = env === "yarn" ? "serve" : "run serve";
	return new Promise((resolve, reject) => {
		const result = spwan(env, [options], {stdio: 'inherit', cwd: targetPath});
		result.on("error", e => reject(e));
		result.on("exit", r => resolve(r));
	})
}
exports.exec = exec;
let _hasYarn = null;
exports.hasYarn = () => {
	if (_hasYarn !== null) {
		return _hasYarn;
	}
	try {
		execSync("yarn --version", { stdio: "ignore" });
		return (_hasYarn = true);
	} catch(e) {
		return (_hasYarn = false);
	}
}
exports.HasYarn = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await exec("yarn -v");
      resolve();
    } catch(e) {
      console.log("当前环境没有安装yarn");
      reject(e);
    }
  });
}
// Object.assign(exports, require("./spinner"));
// import { chalk } from "chalk";
// exports.chalk = require('chalk');
// exports.execa = require('execa');