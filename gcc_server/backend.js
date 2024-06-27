// app.mjs

import express from "express";
import { exec } from "child_process";
import { validateFile } from "./judge.js";
import multer from "multer";
import { deleteUpload } from "./deleteUploads.js";

const app = express();
const port = 3005;

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.any(), (req, res) => {
  const file = req.files[0];
  const testIP = req.files[1];
  const testOP = req.body.output;
  console.log("New Request");
  exec(
    `mv ./${file.path} ./uploads/${file.filename}.cpp`,
    (error, stdout, stderr) => {
      exec(
        `g++-12 -o ./${file.path} ./${file.path}.cpp`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            deleteUpload(`./${file.path}.cpp`);
            deleteUpload(`./${testIP.path}`);
            deleteUpload(`./${file.path}`);
            return res.status(200).send({
              success: false,
              opstatus: "compile",
              error: stderr,
            });
          }
          exec(
            `timeout 3s ./${file.path} < ./${testIP.path}`,
            async (error, stdout, stderr) => {
              deleteUpload(`./${file.path}.cpp`);
              deleteUpload(`./${testIP.path}`);
              deleteUpload(`./${file.path}`);
              if (error) {
                console.error(`exec error: ${error}`);
                return res.status(200).send({
                  success: false,
                  opstatus: "run",
                  error: error,
                });
              }
              if (validateFile(testOP, stdout)) {
                res.status(200).send({
                  success: true,
                  opstatus: "accepted",
                });
              } else {
                res.status(200).send({
                  success: true,
                  opstatus: "wrong",
                });
              }
            }
          );
        }
      );
    }
  );
});

app.listen(port, () => {
  console.log(`GCC container listening at http://localhost:${port}`);
});

// req.files.forEach(file => {
//   fs.unlink(file.path, (err) => {
//     if (err) {
//       console.error('Error deleting file:', err);
//     } else {
//       console.log('File deleted successfully:', file.path);
//     }
//   });
// });
