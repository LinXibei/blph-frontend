exports.Config = {
	folderExits: [{
		type: "list",
		name: "folder",
		message: "当前文件已经存在，请选择以下操作：",
		choices: [
			{ name: "创建一个新的文件夹", value: "newFolder" },
			{ name: "覆盖", value: "exits"},
			{ name: "退出", value: "exit"}
		]
	}],
	rename: [{
		name: "input",
		type: "input",
		message: "请输入新的项目名称"
	}],
	frames: [{
		type: "list",
		name: "frame",
		message: "请选择框架语言：",
		choices: [
			{ name: "Vue3", value: "Vue3" },
			{ name: "Vue2", value: "Vue2" },
			{ name: "React", value: "React" }
		]
	}],
	axios: [{
		type: "confirm",
		name: "axios",
		message: "是否安装axios?",
	}],
	vuex: [{
		type: "confirm",
		name: "vuex",
		message: "是否安装vuex?"
	}],
	vueRouter: [{
		type: "confirm",
		name: "vueRouter",
		message: "是否安装vue router?"
	}]
}
exports.RepoPath = "LinXibei/vuecli-template";