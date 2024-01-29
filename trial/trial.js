const { exec } = require('child_process'); 
 
// Compile the C program 
exec('gcc -o hello hello_world.c', (error, stdout, stderr) => { 
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
  }); 
}); 