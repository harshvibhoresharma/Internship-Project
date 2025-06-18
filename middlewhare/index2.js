const fs = require('fs');
function logFiles(filename){
    return (req,res,next)=>{
        const logLine=`\n ${new Date().toISOString()} | ${req.ip} | ${req.method} | ${req.url} `;
        fs.appendFile(filename,logLine,
            (err) => {if(err){console.log(err)}}
        );
        next();
        
    }
}
module.exports=logFiles;