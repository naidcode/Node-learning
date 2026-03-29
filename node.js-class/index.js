// const hello = "hello nahid pasha";
// console.log(hello)

const fs = require('fs');

/////////////////////////
// FILES

// Blocking synchronous
// const textIn = fs.readFileSync('./txt/index.txt' , 'utf-8')   //reading the file
// console.log(textIn)
// const textINN = `this is about myself ${textIn}  i created on this date ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt' , textINN);  //writing the file
// fs.writeFileSync('./txt/done.txt' , textINN)

// console.log(textINN)

// non-Blocking Asynchronous
// fs.readFile('./txt/start.txt' , 'utf-8' , (err , data1) => {
//   if(err) return console.log("ERROR!");
//   fs.readFile(`./txt/read-this.txt` , 'utf-8' , (err , data2) => {
//   console.log(data2)
//   fs.readFile('./txt/append.txt' , 'utf-8' , (err , data3) => {
//   console.log(data3)

//   fs.writeFile('./txt/final.txt' , `${data2} \n ${data3}` , 'utf-8' , err => {
//     console.log('file written you can check');
//   })
// })
// })
// })

// console.log('hello world')
// console.log('hello world')

/////////////////////////////
// SERVER

const overviewdata = fs.readFileSync('./templates/overview.html', 'utf-8');
const productdata = fs.readFileSync('./templates/product.html', 'utf-8');
const Carddata = fs.readFileSync('./templates/card.html', 'utf-8');
const jsondata = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataobj = JSON.parse(jsondata);

const http = require('http');
const { URL } = require('url');
const replacetempletes = require(`${__dirname}/modules/replacetemplates`);
const slugify = require('slugify');

const slug = dataobj.map((ele) => slugify(ele.productName, { lower: true }));
console.log(slug);

let server = http.createServer((req, res) => {
  const myUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = myUrl.pathname;
  const query = Object.fromEntries(myUrl.searchParams);

  // overview
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'content-type': 'text/html' });
    const cardHtml = dataobj
      .map((ele) => replacetempletes(Carddata, ele))
      .join('');
    const output = overviewdata.replace('{%PRODUCT_CARDS%}', cardHtml);
    res.end(output);

    //api
  } else if (pathname === '/api') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(jsondata);

    //product
  } else if (pathname === '/product') {
    res.writeHead(200, { 'content-type': 'text/html' });
    const product = dataobj[query.id];
    const output = replacetempletes(productdata, product);
    res.end(output);
    // res.end(productdata);

    //not found!
  } else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'my-own-text': 'hello world',
    });
    res.end(`<h1 class="h11">Page not found!</h1>`);
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('hello out port number is 3000');
});
