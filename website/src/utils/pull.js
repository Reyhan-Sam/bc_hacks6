import { getDatabase, ref, query, orderByChild, equalTo, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import fs from 'fs/promises'; 

const firebaseConfig = {

};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function getUserDataByUsername(username) {
    try {
        const usersRef = ref(db, 'users');
        const usernameQuery = query(usersRef, orderByChild('username'), equalTo(username));

        const snapshot = await get(usernameQuery);

        if (snapshot.exists()) {
            const userData = Object.values(snapshot.val())[0]; // Get the data object
            return userData;
        } else {
            return null; // User not found
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

async function saveUserDataToFile(userData, filename = 'user.json') {
    try {
        if (userData) {
            const jsonData = JSON.stringify(userData, null, 2); // Pretty print JSON
            await fs.writeFile(filename, jsonData, 'utf8');
            console.log(`User data saved to ${filename}`);
        }
    } catch (error) {
        console.error("Error saving to file:", error);
    }
}

async function main() {
    const usernameToFind = "JohnDoe";

    if (!usernameToFind) {
        console.error("Usage: node get_user_data.js <username>");
        process.exit(-1); // Exit with -1 if username is not provided
        return;
    }

    const userData = await getUserDataByUsername(usernameToFind);

    if (userData) {
        await saveUserDataToFile(userData);
        process.exit(0); // Exit with 0 if user data is found and saved
    } else {
        console.log(`No user found with username: ${usernameToFind}`);
        process.exit(-1); // Exit with -1 if user is not found
    }
}

main();