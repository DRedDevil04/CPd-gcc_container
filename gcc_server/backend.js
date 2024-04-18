// app.mjs

import express from 'express';
import { exec } from 'child_process';
import fileUpload from 'express-fileupload';
import { validateFile } from './judge.js';

const app = express();
const port = 3005;

app.use(fileUpload());

app.post('/upload', (req, res) => {
    var file, testIP,testOP;
    if(!req.files.myFile){
        res.status(403).send("No file uploaded");
    }
    if(!req.files.input){
      res.status(403).send("No file uploaded");
  }
    if(!req.files.output){
      res.status(403).send("No file uploaded");
  }

    file = req.files.myFile;
    testIP = req.files.input
    testOP = req.files.output.data.toString('utf-8');
    file.mv('./code/cur_code.cpp', err => {
        if (err) {
            return res.status(500).send(err);
        }
    });
    testIP.mv('./testIP.txt', err => {
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
        exec('timeout 3s ./hello < ./testIP.txt', async (error, stdout, stderr) => { 
          if (error) { 
            console.error(`exec error: ${error}`); 
            res.status(200).send({
              success:false,
              opstatus:"run",
              error:error
            })
            return; 
          } 
          
          if(await validateFile(testOP,stdout)){
            res.status(200).send({
              success:true,
              opstatus:"accepted",
            });
          }
          else{
            res.status(200).send({
              success:true,
              opstatus:"wrong",
            });
          }
        }); 
    }); 
   
});

app.listen(port, () => {
  console.log(`GCC container listening at http://localhost:${port}`);
});