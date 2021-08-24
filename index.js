const puppeteer = require('puppeteer');
const fs = require("fs");
(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.setViewport({width: 1400, height: 700});
    await page.goto('https://mcqsets.com/mcq-questions-2/computer-fundamentals/100-mcq-questions-fundamentals-computer/', {waitUntil: 'domcontentloaded'});

    const results = await page.evaluate(async () => {
        const jsonArray = [];
        const elements = document.querySelectorAll(".thrv_paste_content.thrv_wrapper.tve_empty_dropzone > p");
        for (let i = 0; i < elements.length ; i++) {
            let ele = elements[i];
            const innerTextArray = ele.innerText.split("\n");
            if(innerTextArray.length === 5){
                const q = innerTextArray[0].substr(5);
                const a = innerTextArray[1].substr(3);
                const b = innerTextArray[2].substr(3);
                const c = innerTextArray[3].substr(3);
                const d = innerTextArray[4].substr(3);
                jsonArray.push({
                    q,a,b,c,d
                });
            }
        }
        return jsonArray;


    });
    fs.writeFileSync("csmcqs-1.json", JSON.stringify(results));
    await browser.close();

})();