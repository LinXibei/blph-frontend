const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
function ReadFrameTemplate(frame, folder) {
  const folderArr = folder.split("/");
  const folderName = folderArr[folderArr.length - 1];
  const htmlEJS = fs.readFileSync(path.resolve(__dirname, `../template/html.ejs`), "utf-8");
  const jsonEJS = fs.readFileSync(path.resolve(__dirname, `../template/${frame.toLowerCase()}`, "package.ejs"), "utf-8");

  const htmlResult = ejs.render(htmlEJS, { cliName: `${frame} create`});
  const jsonResult = ejs.render(jsonEJS, { packageName: `${folderName}`})
  try {
    // 执行blph-frontend create ly
    // 创建ly文件夹
    fs.mkdirSync(folder);

    // 在文件夹ly中，写入index.html，写入package.json
    fs.writeFileSync(`${folder}/index.html`, htmlResult);
    fs.writeFileSync(`${folder}/package.json`, jsonResult);

    // 在文件夹ly中，创建src文件夹
    fs.mkdirSync(`${folder}/src`);

    // 在ly/src下，写入App.vue，写入main.ts
    const AppVue = fs.readFileSync(path.resolve(__dirname, `../template/${frame.toLowerCase()}`, "App.ejs"), "utf-8");
    const mainTs = fs.readFileSync(path.resolve(__dirname, `../template/${frame.toLowerCase()}`, "main.ejs"), "utf-8");
    const webpackConfig = fs.readFileSync(path.resolve(__dirname, `../template/${frame.toLowerCase()}`, "webpack.config.ejs"), "utf-8");
    const shim = fs.readFileSync(path.resolve(__dirname, `../template/${frame.toLowerCase()}`, "shims-vue.d.ejs"), "utf-8");
    const tsConfig = fs.readFileSync(path.resolve(__dirname, `../template/${frame.toLowerCase()}`, "tsconfig.json.ejs"), "utf-8");
    fs.writeFileSync(`${folder}/src/App.vue`, AppVue);
    fs.writeFileSync(`${folder}/src/main.ts`, mainTs);
    fs.writeFileSync(`${folder}/webpack.config.js`, webpackConfig);
    fs.writeFileSync(`${folder}/shim-vue.d.ts`, shim);
    fs.writeFileSync(`${folder}/tsconfig.json`, tsConfig);

    // 在ly/src创建assets文件夹
    fs.mkdirSync(`${folder}/src/assets`);

    // 在ly/src/assets中，写入对应的vue.png或者react.svg图片
    const curImg = frame.indexOf("Vue") > -1 ? "vue.png" : "react.svg";
    const imgRead = fs.createReadStream(path.resolve(__dirname, `../template/assets/${curImg}`));
    const targetImgFolder = fs.createWriteStream(`${folder}/src/assets/${curImg}`);
    imgRead.pipe(targetImgFolder);
  } catch(e) {
    console.log(e);
    process.exit();
  }
}
module.exports = ReadFrameTemplate