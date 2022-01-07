exports.Config = {
	folderExits: [{
		type: 'list',
		name: 'folder',
		message: '当前文件已经存在，请选择以下操作：',
		choices: [
			{ name: '创建一个新的文件夹', value: 'newFolder' },
			{ name: '覆盖', value: 'exits'},
			{ name: '退出', value: 'exit'}
		]
	}],
	rename: [{
		name: 'input',
		type: 'input',
		message: '请输入新的项目名称'
	}]
}
exports.RepoPath = 'https://github.com/LinXibei/vuecli-template.git';