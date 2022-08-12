const fs = require("fs-extra");

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