import {setGoogleKey} from "../lib/storage-service";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter your Google Gemini API key: ", apiKey => {
  // Add the API key
  setGoogleKey(apiKey);
  console.log("Google Gemini API key has been added successfully!");
  rl.close();
});
