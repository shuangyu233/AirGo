import { writeFile } from 'fs';
const versionJSON = {
    "compileTime": new Date().getTime()
}

writeFile("./src/versionJSON.airgo",versionJSON,(err) => {
    if (err) throw err;
    console.log('deploy time write sucess.');
  })

