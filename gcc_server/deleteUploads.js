import fs from "fs";

function deleteUpload(file_path) {
  fs.unlink(file_path, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted successfully:", file_path);
    }
  });
}

export { deleteUpload };
