const puppeteer = require('puppeteer');
// npm install puppeteer@18.1.0
// npx jest __tests__/login.test.js
// npx jest __tests__/login.test.js

jest.setTimeout(50000) 


describe('Check Text', () => {
  test('Text found', async () => {
    const browser = await puppeteer.launch({
      headless: false //hace que se muestre el navegador 
    });
    const page = await browser.newPage();

    await page.goto('http://localhost:3000');

    const foundH1WithText = await page.evaluate(() => {
      return document.querySelector('h1').textContent === 'My Website';
    });

    expect(foundH1WithText).toBe(true);

    //const buttonElement = await page.getElement('button:contains(Button text)');
    //await new Promise(r => setTimeout(r, 20000))

    //await page.waitForSelector("h1[@id='title']");

    await browser.close();
  });
});


describe('Login', () => {
  test('should successfully log in with correct credentials', async () => {
    const browser = await puppeteer.launch({
      headless: false //hace que se muestre el navegador 
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    // Fill in the name input
    await page.type('#userName', 'Josh');

    // Click the submit button
    await page.click('#submitButton');

    // Wait for the page to load
    await new Promise(r => setTimeout(r, 5000))

    // Check that the login was successful
    const foundMessageLogin = await page.evaluate(() => {
      return document.querySelector('#message').textContent === 'Cookie Destroyed';
    });

    expect(foundMessageLogin).toBe(true);

    await browser.close();
  });
});
