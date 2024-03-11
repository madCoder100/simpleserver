const puppeteer = require('puppeteer');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/',async (req, res) => {
    try{
        const numberOfBeers = req.body.name;
        // const email = req.body.email;
        
        console.log('number of beers:', { numberOfBeers });
        
        
        // Send a response
      
        const browser = await puppeteer.launch();
        const browser = await puppeteer.launch({
           executablePath: '/path/to/chromium/executable', // Replace this with the actual path to the Chromium executable
           headless: true // Set to true for headless mode
       });

        const page = await browser.newPage();

        await page.goto('https://www.calculator.net/bac-calculator.html');
        await page.type('input[name="ba"]', req.body.name);
        await page.evaluate(() => {
            const inputField = document.querySelector('input[name="ba"]');
            const event = new Event('keyup');
            inputField.dispatchEvent(event);
          });
          await page.click('input[type="submit"][name="x"][value="Calculate"]');
          const alcoholConcentration = await page.$eval('p.verybigtext', element => element.textContent);
          console.log('your blood alcohol concentration is:'+ alcoholConcentration);

          await page.close();
          res.send('your blood alcohol concentration is :' + alcoholConcentration);
    }catch(error){
        console.error(error);
    }
});

// Define a route handler for the root URL ('/')
app.get('/', (req, res) => {
    res.send('Hello, world! This is the root route.');
});



// Start the server and make it listen for incoming requests
app.listen(PORT, () => {
    // console.log(`Server is running on http://localhost:${PORT}`);
});
