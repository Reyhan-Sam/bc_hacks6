// push_user_data.js

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import fs from 'fs/promises';

// Your Firebase configuration (REPLACE THESE WITH YOUR ACTUAL CONFIG)
const firebaseConfig = {

};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function getUsernameFromJson(jsonData) {
    if (jsonData && jsonData.username) {
      return jsonData.username;
    } else {
      return null; 
    }
}

async function getUsernameFromFile(filePath) {
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        try {
          const jsonData = JSON.parse(fileContent);
          return getUsernameFromJson(jsonData); 
        } catch (jsonError) {
          console.error("File content is not valid JSON:", jsonError);
          return null; 
        }
    } catch (error) {
        console.error("Error reading file:", error);
        return null;
    }
}

async function pushUserDataToFirebase(userData, userId) { 
    try {
        await set(ref(db, `users/${userId}`), userData);
        console.log(`User data for ${userId} pushed to Firebase successfully!`);
    } catch (error) {
        console.error("Error pushing user data:", error);
    }
}

async function readUserDataFromFile(filePath) {
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        try {
          const jsonData = JSON.parse(fileContent);
          return jsonData;
        } catch (jsonError) {
          console.error("File content is not valid JSON:", jsonError);
          return null; // Return null if JSON parsing fails
        }
    } catch (error) {
        console.error("Error reading file:", error);
        return null;
    }
}

async function main() {
    const filePath = "user.json"; 
    const userId = await getUsernameFromFile("user.json"); 

    const userData = await readUserDataFromFile(filePath);
    if (userData) {
        pushUserDataToFirebase(userData, userId); // No need to check for nested users object
    } else {
        console.error("User data not found in the file.");
    }
    process.exit();
}

main().then(() => {  // Ensure the script exits after main() completes
    console.log("Script finished.");
});


