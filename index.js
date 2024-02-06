import puppeteer from "puppeteer";
import fs from "fs/promises";

async function openWebPage(){
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 400
    }); //este nos permitira manipural el navegador
    const page = await browser.newPage(); // es un navegador aparte
    await page.goto('https://example.com');

    await browser.close();
}

//openWebPage();

async function screenshotWebPage(){
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 400
    }); //este nos permitira manipural el navegador
    const page = await browser.newPage(); // es un navegador aparte
    await page.goto('https://example.com');
    await page.screenshot({path: 'example.png'});
    await browser.close();
}

//screenshotWebPage();

async function navigateWebPage(){ //como navegar en una pagina dando click en enlaces
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 400
    }); //este nos permitira manipural el navegador
    const page = await browser.newPage(); // es un navegador aparte
    await page.goto('https://quotes.toscrape.com/');
    await page.click('a[href="/login"]');
    await new Promise(r => setTimeout(r,2000));
    await page.screenshot({path:'example.png'});
    await browser.close();
}

//navigateWebPage();


async function getDataFromWebPage(){ //obtener datos
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 400
    }); //este nos permitira manipural el navegador
    const page = await browser.newPage(); // es un navegador aparte
    await page.goto('https://example.com/');
    const result = await page.evaluate(() => {
        //tengo acceso al DOM
        const title = document.querySelector('h1').innerText;
        const description = document.querySelector('p').innerText;
        const more = document.querySelector('a').innerText;

        //devuelve un objeto 
        return {
            title,
            description,
            more
        }


    }); // evaluate es dentro del navegador, no lee variables por fuera
    console.log(result);
    await browser.close();
}
//getDataFromWebPage();


async function handleDynamicWebPage(){ //obtener datos dinamicos
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 100
    }); //este nos permitira manipural el navegador
    const page = await browser.newPage(); // es un navegador aparte
    await page.goto('https://quotes.toscrape.com/');
    const result = await page.evaluate(() => {
        //tengo acceso al DOM
        const quotes = document.querySelectorAll('.quote');
        const data = [...quotes].map(quote => {
            const quoteText = quote.querySelector('.text').innerText;
            const quoteAuthor = quote.querySelector('.author').innerText;
            const quoteTags = [...quote.querySelectorAll('.tag')].map(tag => tag.innerText);
            return {
                quoteText,
                quoteAuthor,
                quoteTags
            }
        });
        //devuelve un objeto 
        return data;

    }); // evaluate es dentro del navegador, no lee variables por fuera
    //console.log(result);

    fs.writeFile('quotes.json',JSON.stringify(result,null, 2))//guardar el archivo
    await browser.close();
}
handleDynamicWebPage();
