const puppeteer = require('puppeteer');
const fs = require("fs");
const PdfPrinter = require('pdfmake');
const printer = new PdfPrinter({
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Bold.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-BoldItalic.ttf'
    },
    OpenSans: {
        normal: 'OpenSans-Regular.ttf',
        bold: 'OpenSans-Bold.ttf',
        italics: 'OpenSans-Italic.ttf',
        bolditalics: 'OpenSans-BoldItalic.ttf'
    },

});

// (async () => {
//     const browser = await puppeteer.launch({
//         headless: false
//     });
//     const page = await browser.newPage();
//     await page.setViewport({width: 1400, height: 700});
//     await page.goto('https://mcqsets.com/mcq-questions-2/computer-fundamentals/100-mcq-questions-fundamentals-computer/', {waitUntil: 'domcontentloaded'});
//
//     const results = await page.evaluate(async () => {
//         const jsonArray = [];
//         const elements = document.querySelectorAll(".thrv_paste_content.thrv_wrapper.tve_empty_dropzone > p");
//         for (let i = 0; i < elements.length ; i++) {
//             let ele = elements[i];
//             const innerTextArray = ele.innerText.split("\n");
//             if(innerTextArray.length === 5){
//                 const q = innerTextArray[0].substr(5);
//                 const a = innerTextArray[1].substr(3);
//                 const b = innerTextArray[2].substr(3);
//                 const c = innerTextArray[3].substr(3);
//                 const d = innerTextArray[4].substr(3);
//                 jsonArray.push({
//                     q,a,b,c,d
//                 });
//             }
//         }
//         return jsonArray;
//
//
//     });
//     fs.writeFileSync("csmcqs-1.json", JSON.stringify(results));
//     await browser.close();
//
// })();

const createPdf = () => {
    const items = [
        {
            "q": "What was the expected feature of fifth generation computers when Japan started FGCS?",
            "a": "Operating Systems",
            "b": "Paralled Processing",
            "c": "ULSI",
            "d": "None of above"
        },
        {
            "q": "Which of the following memory medium is not used as main memory system?",
            "a": "Magnetic core",
            "b": "Semiconductor",
            "c": "Magnetic tape",
            "d": "Both semiconductor and magnetic tape"
        },
        {
            "q": "The storage subsystem in a microcomputer consists mainly of __ or __ media with varying capacities",
            "a": "Memory or video",
            "b": "Magnetic or optical",
            "c": "Optical or memory",
            "d": "Video or magnetic"
        },
        {
            "q": "Programs designed to perform specific tasks is known as",
            "a": "system software",
            "b": "application software",
            "c": "utility programs",
            "d": "operating system"
        },
        {
            "q": "Computer operators",
            "a": "writes computer programs for specific problems",
            "b": "operate the device which input and output data from the computer",
            "c": "normally require a college degree in computer science",
            "d": "all of the above"
        },
        {
            "q": "Which of the following is not anti-viruses software?",
            "a": "NAV",
            "b": "F-Prot",
            "c": "Oracle",
            "d": "McAfee"
        },
        {
            "q": "What is a compiler?",
            "a": "A compiler does a conversion line by line as the program is run",
            "b": "A compiler converts the whole of a higher level program code into machine code in one step",
            "c": "A compiler is a general purpose language providing very efficient execution",
            "d": "None of the above"
        },
        {
            "q": "_______ computers are also called personal computers",
            "a": "Mainframe Computer",
            "b": "Mini Computers",
            "c": "Micro Computers",
            "d": "Super Computers"
        },
        {
            "q": "Which of the following is not input unit device?",
            "a": "scanner",
            "b": "camera",
            "c": "plotter",
            "d": "digitizer"
        },
        {
            "q": "Identify the correct statement",
            "a": "IBM PCs used RISC CPU designs",
            "b": "Macintosh used CISC CPU design",
            "c": "IBM used CISC CPU design",
            "d": "None of above is true"
        }
    ];
    let docDefinition = {
        defaultStyle: {
            font: 'Roboto'
        },
        header: {},
        footer: function (currentPage, pageCount, pageSize) {
            return [
                {image: 'dot.png', height: 30, width: 20, alignment: "right", margin: [10, 0]}
            ]
        },
        pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
            return currentNode.headlineLevel === 1 && followingNodesOnPage.length < 15;
        }
    };
    const content = [];
    const styles = {
        title: {
            fontSize: 25,
            font: 'OpenSans',
            color: "#202124",
            bold: true
        },
        question: {
            fontSize: 12,
            font: 'OpenSans',
            color: "#202124"
        },
        option: {
            fontSize: 9,
            font: 'OpenSans',
            color: "#202124"
        },
        optionLabel: {
            fontSize: 10,
            font: 'OpenSans',
            color: "#202124",
            italics: true
        }
    }
    content.push({
        text: `Computer fundamentals`,
        style: 'title', margin: [18, 5], alignment: 'left'
    });
    content.push({
        text: `@Tricdot`,
        link: 'https://tricdot.com',
        style: 'optionLabel', margin: [18, 5]
    });
    for (let i = 0; i < items.length; i++) {
        content.push({
            headlineLevel:1,
            columns: [
                {
                    margin: [0, 15, 0, 5],
                    width: 21,
                    text: `${i + 1}.`,
                    style: 'question',
                },
                {
                    width: "auto",
                    margin: [0, 15, 0, 5],
                    text: `${items[i].q}`,
                    style: 'question',
                }],
            columnGap: 0
        })
        // content.push({
        //     text: `${i + 1}.  ${items[i].q}`,
        //     style: 'question', margin: [0, 15, 0, 5]
        // });
        content.push({
            text: `    Mark only one oval.`,
            style: 'optionLabel', margin: [18, 5]
        })
        content.push({
            columns: [
                {
                    margin: [18, 4, 0, 4],
                    width: 21,
                    height: 15,
                    svg: `<svg width="21" height="15"><rect x="1" y="1" rx="6" ry="6" width="18" height="12" style="fill:transparent;stroke:grey;stroke-width:1;opacity:1" /></svg>`
                },
                {
                    width: "auto",
                    margin: [18, 4, 0, 4],
                    text: `${items[i].a}`,
                    style: 'option',
                }],
            columnGap: 5
        })
        content.push({
            columns: [
                {
                    margin: [18, 4, 0, 4],
                    width: 21,
                    height: 15,
                    svg: `<svg width="21" height="15"><rect x="1" y="1" rx="6" ry="6" width="18" height="12" style="fill:transparent;stroke:grey;stroke-width:1;opacity:1" /></svg>`
                },
                {
                    width: "auto",
                    margin: [18, 4, 0, 4],
                    text: `${items[i].b}`,
                    style: 'option',
                }],
            columnGap: 5
        })
        content.push({
            columns: [
                {
                    margin: [18, 4, 0, 4],
                    width: 21,
                    height: 15,
                    svg: `<svg width="21" height="15"><rect x="1" y="1" rx="6" ry="6" width="18" height="12" style="fill:transparent;stroke:grey;stroke-width:1;opacity:1" /></svg>`
                },
                {
                    width: "auto",
                    margin: [18, 4, 0, 4],
                    text: `${items[i].c}`,
                    style: 'option',
                }],
            columnGap: 5
        })
        content.push({
            columns: [
                {
                    margin: [18, 4, 0, 4],
                    width: 21,
                    height: 15,
                    svg: `<svg width="21" height="15"><rect x="1" y="1" rx="6" ry="6" width="18" height="12" style="fill:transparent;stroke:grey;stroke-width:1;opacity:1" /></svg>`
                },
                {
                    width: "auto",
                    margin: [18, 4, 0, 4],
                    text: `${items[i].d}`,
                    style: 'option',
                }],
            columnGap: 5
        })
    }
    docDefinition.content = content;
    docDefinition.styles = styles;
    let options = {};
    var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream('document1.pdf'));
    pdfDoc.end();
};

(async () => {
    createPdf();
})();