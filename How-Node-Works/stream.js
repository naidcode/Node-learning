const fs = require('fs')
const server = require('http').createServer();

server.on('request' , (req , res) => {

  //solution 1
  // fs.readFile('text-file.txt' , (err , data) => {
  //   if(err) console.log(err)
  //   res.end(data)
  // })

  //solution 2
  // const readable = fs.createReadStream('text-file.txt');
  // readable.on('data' , chunk => {
  //   res.write(chunk)
  // })

  // readable.on('end' , () => {
  //   res.end();
  // })

  // readable.on('error' , () => {
  //   console.log('not found!')
  //   res.statusCode = 500;
  //   res.end('not found')
  // })

  //solution 3
  const read = fs.createReadStream('text-file.txt');
  read.pipe(res);
})

server.listen(2000 , '127.0.0.1' , () => {
  console.log('port number 2000')
})