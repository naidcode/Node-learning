const fs = require('fs')
const http = require('http')
const { URL } = require('url')

const overviewdata = fs.readFileSync('./templates/overview.html' , 'utf-8')
const bookdata = fs.readFileSync('./templates/book.html' , 'utf-8')
const carddata = fs.readFileSync('./templates/card.html' , 'utf-8')
const dataobj = fs.readFileSync('./data/data.json' , 'utf-8')
const bookjson = JSON.parse(dataobj)

function replacetemplate(temp , product){
  let output = temp.replace(/{%COVER%}/g , product.cover)
  output = output.replace(/{%BOOKNAME%}/g , product.bookName)
    output = output.replace(/{%PRICE%}/g , product.price)
  output = output.replace(/{%AUTHOR%}/g , product.author)
  output = output.replace(/{%GENRE%}/g , product.genre)
  output = output.replace(/{%RATING%}/g , product.rating)
  output = output.replace(/{%DESCRIPTION%}/g , product.description)
  output = output.replace(/{%ID%}/g , product.id)


  return output;

}

  //SERVER
const server = http.createServer((req , res) => {
  const myUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = myUrl.pathname;
  const query = Object.fromEntries(myUrl.searchParams);

  //OVERVIEW
  if(pathname === '/' || pathname === '/overview'){
    res.writeHead(200 , {'content-type': 'text/html'})

    const cardhtml = bookjson.map(ele => replacetemplate(carddata , ele)).join('')
    const output = overviewdata.replace(/{%BOOK_CARDS%}/g , cardhtml)
    res.end(output)

    //API
  } else if(pathname === '/api'){
    res.writeHead(200 , {'content-type': 'application/json'})
    res.end(dataobj)

    //BOOK
  } else if(pathname === '/book'){
    const book = bookjson[query.id]
    
    if(!book){
      res.writeHead(404 , {'content-type': 'text/html'})
      res.end('<h1> Page not found</h1>');
    } 
    res.writeHead(200 , {'content-type': 'text/html'})
    const output = replacetemplate(bookdata , book)
    res.end(output);

    //NOT FOUND PAGE!
  } else{
    res.writeHead(404 , {'conetnt-type': 'error'})
    res.end('page not found!')
  }
})

server.listen(5000 , '127.0.0.1' , () => {
  console.log("our port number is 5000")
})