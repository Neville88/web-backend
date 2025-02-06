const fs = require('fs');
const readline = require('readline');
const bcrypt = require('bcrypt');

const USERS_FILE = 'users.json';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Load users from JSON file
function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
}

// Save users to JSON file
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Register a new user
function register() {
    rl.question('Enter your name: ', (name) => {
        rl.question('Enter your email: ', (email) => {
            rl.question('Enter your password: ', async (password) => {
                let users = loadUsers();

                if (users.some(user => user.email === email)) {
                    console.log('Email already registered. Try logging in.');
                    mainMenu();
                    return;
                }

                const hashedPassword = await bcrypt.hash(password, 10);
                users.push({ name, email, password: hashedPassword });
                saveUsers(users);
                console.log('Registration successful!');
                mainMenu();
            });
        });
    });
}

// Login function
function login() {
    rl.question('Enter your email: ', (email) => {
        rl.question('Enter your password: ', async (password) => {
            let users = loadUsers();
            let user = users.find(user => user.email === email);

            if (!user) {
                console.log('User not found. Please register.');
                mainMenu();
                return;
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                console.log('Incorrect password. Try again.');
                mainMenu();
                return;
            }

            console.log(`Welcome, ${user.name}!`);
            userMenu(user);
        });
    });
}

// User menu after login
function userMenu(user) {
    console.log('\nUser Menu:');
    console.log('1. View Profile');
    console.log('2. Logout');
    console.log('3. Exit');

    rl.question('Choose an option: ', (choice) => {
        switch (choice) {
            case '1':
                console.log(`\nName: ${user.name}\nEmail: ${user.email}\n`);
                userMenu(user);
                break;
            case '2':
                console.log('Logged out successfully.');
                mainMenu();
                break;
            case '3':
                console.log('Exiting...');
                rl.close();
                break;
            default:
                console.log('Invalid option, try again.');
                userMenu(user);
        }
    });
}

// Main menu
function mainMenu() {
    console.log('\nMain Menu:');
    console.log('1. Register');
    console.log('2. Login');
    console.log('3. Exit');

    rl.question('Choose an option: ', (choice) => {
        switch (choice) {
            case '1':
                register();
                break;
            case '2':
                login();
                break;
            case '3':
                console.log('Goodbye!');
                rl.close();
                break;
            default:
                console.log('Invalid option, try again.');
                mainMenu();
        }
    });
}

mainMenu();