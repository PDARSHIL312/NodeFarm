// Npm stand for node program manager
const fs = require("fs"); // It is used for file related operations
const http = require("http"); // It is used for web Server
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("../starter/modules/replaceTemplate"); 

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~SERVER
const tempOverview = fs.readFileSync(
  `../starter/templates/template-overview.html`,
  "utf-8"
);
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
console.log(slugs);

const server = http.createServer((req, res) => 
{
  // if wanna see each detail than see red dot
  // const pathName = req.url;
  const { query, pathname } = url.parse(req.url, true);

  // OVERVIEW PAGES
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObj // So here data.obj is containg array of objects
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    //  console.log(cardsHtml);
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.end(output);

    // PRODUCT PAGE
  } 
  else if (pathname === "/" || pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API PAGE
  } 
  else if (pathname === "/api") {
    fs.readFile("../starter/dev-data/data.json", "utf-8", (err, data) => {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(data);
    });
    // NOT FOUND
  } 
  else {
    res.writeHead(404, {
      "Content-Type": "text/html",
    });
    res.end(`<h1>Page Not Found</h1>`);
  }
});

server.listen
(8000, "127.0.0.1", () => 
{
  console.log("Listning to request on port 8000");
}
);

// Blocking synchrouns way so i now it is in synchrouns due to that one after another will be work and callback hell like
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const texOut = `This is what we konw about the avocado :${textIn}.\n created on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt',texOut);
// console.log(`Task Done!!!!`);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Non - blocking asynchrouns way
/*
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  // Here this function does not have it's own this keyword but it use paarent's this so this type of this is call as laxican this while dedicated function has it's own this
  if (err) return console.log("ERROR! 💥"); // here used func is use first error keyword and after that it use data means it may be anything

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Your file has been written 😁");
      });
    });
  });
});
console.log("Will read file!");
*/

// ~~~~~~~~~~~~~~~~~~~~~11 Creating a simple web server
/* //⭐⭐⭐
const server = http.createServer((req, res) => {
  // Creating server
  // Here it will use callback function and it take two var as an input request and responce
  //   console.log(req);
  const pathName = req.url;

  // OVERVIEW PAGES
  if (pathName === "/" || pathName === "overview") {
    writeHead(200, { "Cotent-type": "text/html" });
    res.end(tempOverview);

    // PRODUCT PAGE
  } else if (pathName === "/" || pathName === "/product") {
    res.end("this is product");

    // API PAGE
  } else if (pathName === "/api") {
    // fs.readFile('./starter/dev-data/data.json');
    fs.readFile(
      "../starter/dev-data/data.json", // first dot for exit from recent folder and second for enter to new file
      "utf-8",
      (err, data) => {
        // The utf-8 encoding specifies how the bytes in the file should be interpreted as characters. In this case, it indicates that the file being read is expected to contain text data encoded in UTF-8 format.
        // console.log(productData);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(data);
      }
    );
    // NOT FOUND
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      // 'my-own-header': 'Hello-world'
    });
    res.end(`<h1>Page Not Found</h1>`);
  }

  //So  here req have all type of stuff like end and much more etc..\
  // here each time new request occure this callback function will be called and all fufillment will be done by request
});

//listtneing client request
server.listen(8000, "127.0.0.1", () => {
  console.log("Listning to request on port 8000");
}); // First one is port  , second one is ip address
*/
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~12 Routing   (Means different action for different url)   Done above

//~~~~~~~~~~~~~~~~~~~~~~~~~13 ( building a very simple API )  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~14 HTml templating creating templates ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/* changing into html formate of the  */

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~15Html Templating Filling the Templates ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
