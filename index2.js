const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("../starter/modules/replaceTemplate");

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~
const tempOverview = require(`../starter/templates/template-overview.html`, "utf-8");

const tempCard = fs.readFileSync(
  `../starter/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `../starter/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync("../starter/dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

const server = http.createServer((req,res)=> 
{
    const {query , pathname} = url.parse(req.url ,true);
    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200 , {"content-type" : "text/html"});
        const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard,el)).join("");
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
        res.end(output);

    }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listning to request on port 8000");
});