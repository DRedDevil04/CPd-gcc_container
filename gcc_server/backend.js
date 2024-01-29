const express = require('express');
const app = express();
const port = 3000;
const { exec } = require('child_process'); 
var fileupload = require("express-fileupload");
app.use(fileupload());
app.post('/upload', (req, res) => {
    var file;
    if(!req.files){
        res.status(403).send("No file uploaded");

    }
    file = req.files.myFile;
    file.mv('./code/cur_code.cpp', err => {
        if (err) {
            return res.status(500).send(err);
        }
        
        
    });
    exec(`g++-13 -o hello ./code/cur_code.cpp`, (error, stdout, stderr) => { 
        if (error) { 
          console.error(`exec error: ${error}`); 
          res.status(200).send({
            success:false,
            opstatus:"compile",
            error:stderr
          })
          return; 
        } 
        console.log(`stdout: ${stdout}`); 
        console.error(`stderr: ${stderr}`); 
       
        // Execute the program 
        exec('./hello', (error, stdout, stderr) => { 
          if (error) { 
            console.error(`exec error: ${error}`); 
            res.status(200).send({
              success:false,
              opstatus:"run",
              error:error
            })
            return; 
          } 
          console.log(`stdout: ${stdout}`); 
          console.error(`stderr: ${stderr}`); 
          res.status(200).send({
            success:true,
            opstatus:"done",
            output:stdout
          });
        }); 
    }); 
   
});

app.listen(port, () => {
  console.log(`GCC container listening at http://localhost:${port}`);
});