const puppeteer = require('puppeteer');
// npm install puppeteer@10.2.0 puppeteer-core@10.2.0
// npm install  puppeteer jest 
// npm test

jest.setTimeout(60000)

 
describe('Test main website load properly', () => {
  let browser;
  let page;

  beforeAll(async () => {

    browser = await puppeteer.launch({
      headless: false,
      args:['--start-maximized']
    });

    page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080});

    await page.goto('http://localhost:3000');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Test main website load properly', async () => {
    await new Promise(r => setTimeout(r, 2000))
    
    const elements = await page.$x('//a[contains(text(), "Hamburgers")]'); //XPATH
    
    //expect(elements.length).toBeGreaterThan(0) 
    //same
    expect(elements.length != 0).toBe(true);

  });

});


describe('Test login', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args:['--start-maximized']
    });
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080});
    await page.goto('http://localhost:3000');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('do login', async () => {

        await page.click('#login');

        // Fill in the name input
        await new Promise(r => setTimeout(r, 1000))

        await page.type('#email', 'f');
        await page.type('#password', 'opa');
        // Click the submit button
        await new Promise(r => setTimeout(r, 1000))
        await page.click('#continue');
        await new Promise(r => setTimeout(r, 1000))

        const pYourOrder = await page.$x('//p[contains(text(), "Your order")]'); //XPATH
        const aStatus = await page.$x('//a[contains(text(), "Status of orders")]'); //XPATH
        
        expect( aStatus.length!=0).toBe(true);
        expect(pYourOrder.length != 0 ).toBe(true);
  });

});


describe('put in cart hamburger', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args:['--start-maximized']
    });
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080});
    await page.goto('http://localhost:3000');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('put in cart hamburger', async () => {

        await page.click('#login');

        // Fill in the name input
        await new Promise(r => setTimeout(r, 1000))

        await page.type('#email', 'f');
        await page.type('#password', 'opa');
        // Click the submit button
        await new Promise(r => setTimeout(r, 1000))
        await page.click('#continue');
        await new Promise(r => setTimeout(r, 1000))
        await page.click('#hamburgers');
        await new Promise(r => setTimeout(r, 1000))
        await page.click('#Vegetal');
        await new Promise(r => setTimeout(r, 2000))
      

       //const buttonBack = await page.$x('//button[contains(text(), "+")]'); //XPATH
       //await buttonBack[0].click();
       await page.click('#VegetalPlus');
       await new Promise(r => setTimeout(r, 2000))
       const pQuantity= await page.$x('//p[contains(text(), "Quantity in cart 1")]'); //XPATH
       await new Promise(r => setTimeout(r, 2000))
       expect(pQuantity.length != 0 ).toBe(true);
       await page.click('#VegetalMinus');
       await new Promise(r => setTimeout(r, 2000))

  });

});



describe('put comment', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args:['--start-maximized']
    });
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080});
    await page.goto('http://localhost:3000');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('put comment and delete a commet', async () => {

        await page.click('#login');

        // Fill in the name input
        await new Promise(r => setTimeout(r, 1000))

        await page.type('#email', 'f');
        await page.type('#password', 'opa');
        // Click the submit button
        await new Promise(r => setTimeout(r, 1000))
        await page.click('#continue');
        await new Promise(r => setTimeout(r, 1000))
        await page.click('#hamburgers');
        await new Promise(r => setTimeout(r, 1000))
        await page.click('#Vegetal');
        await new Promise(r => setTimeout(r, 2000))
       await page.type('#userComment', 'So tasty');
       await new Promise(r => setTimeout(r, 2000))
       await page.click('#sentComment');
       await new Promise(r => setTimeout(r, 2000))
       const commentList = await page.$x('//p[contains(text(), "So tasty")]'); //XPATH
       expect(commentList.length > 0 ).toBe(true);

       await new Promise(r => setTimeout(r, 2000))
       const commentId = await page.evaluate(e => e.id , commentList[0]); 
       // comment-81

       await page.click('#delete-'+commentId);
       await new Promise(r => setTimeout(r, 2000))

       const commentListAftherDelete = await page.$x('//p[contains(text(), "So tasty")]'); //XPATH
       expect(commentListAftherDelete.length == 0 ).toBe(true);



       //const buttonDeleteList = await page.$x('//button[@title="delete"]'); //XPATH
       //await buttonDeleteList[0].click();
       //await new Promise(r => setTimeout(r, 2000))

  });

});



