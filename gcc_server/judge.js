function convertToHex(str) {
  var hex = "";
  for (var i = 0; i < str.length; i++) {
    hex += "" + str.charCodeAt(i).toString(16);
  }
  return hex;
}

function validateFile(output, compareString) {
  console.log("Submission:  ");

  try {
    //console.log(`Output: ${output.replace(/\s+/g, ' ')}`)
    //console.log(`Output: ${compareString.replace(/\s+/g, ' ')}`)
    const cleanedOP = compareString.replace(/\s+/g, " ").trim();
    const cleanedExp = output.replace(/\s+/g, " ").trim();
    if (cleanedExp === cleanedOP) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

export { validateFile };
