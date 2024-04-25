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
    file.mv('./cur_code.cpp', err => {
        if (err) {
            return res.status(500).send(err);
        }
        
        
    });
    exec(`g++ -o hello ./cur_code.cpp`, (error, stdout, stderr) => { 
        if (error) { 
          console.error(`exec error: ${error}`); 
          return; 
        } 
        console.log(`stdout: ${stdout}`); 
        console.error(`stderr: ${stderr}`); 
       
        // Execute the program 
        exec('./hello', (error, stdout, stderr) => { 
          if (error) { 
            console.error(`exec error: ${error}`); 
            return; 
          } 
          console.log(`stdout: ${stdout}`); 
          console.error(`stderr: ${stderr}`); 
          res.send(stdout);
        }); 
    }); 
   
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});