const fs = require('fs');
const superagent = require('superagent');

const readfilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('image not found');
      resolve(data);
    });
  });
};

const writefilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('image not found');
      resolve('success');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readfilePro('./dog.txt');
    console.log(`${data}`);

    const res1 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`,
    );
     const res2 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`,
    );
     const res3 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`,
    );

    const collectaALL = await Promise.all([res1,res2,res3]);
    const imgs = collectaALL.map(ele => ele.body.message)
    // console.log(res.body.message);

    await writefilePro('dog-image.txt', imgs.join('\n'));
    console.log('dog image is fetching...🫡');
  } catch (error) {
    console.log(error);
  }
};

getDogPic();

// .then((data) => {

//   return
// })
// .then((res) => {
//   return
// })
// .then(() => {

// })
// .catch((err) => {
//   console.log(err.message);
// });
