import { writeFile } from 'fs';
const versionJSON = {
    "compileTime": new Date().getTime()
}

writeFile("./src/utills/versionJSON.json",versionJSON,(err) => {
    if (err) throw err;
    console.log('deploy time write sucess.');
  })

