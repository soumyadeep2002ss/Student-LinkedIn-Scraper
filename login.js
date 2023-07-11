// login.js
async function login(page) {
    await page.goto('https://www.linkedin.com/login');
    await page.waitForSelector('#username');

    // Enter the user's email address and password
    email = 'abc@gmail.com';
    password = '12345';

    await page.type('#username', email);
    await page.type('#password', password);

    // Click the login button
    await page.click('button[type="submit"]');

    // Wait for the login process to complete
    await page.waitForNavigation();
}

module.exports = {
    login,
};

