const fs = require('fs');
const versionJSON = {
    "compileTime": new Date().getTime()
}

fs.writeFile("../src/utils/versionJSON.json", JSON.stringify(versionJSON), (err)=>{
    console.log('deploy time write sucess.');
})

module.exports = {

}
