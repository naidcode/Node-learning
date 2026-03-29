const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/Data/tours.json`),
);


exports.Getalltours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.PatchallTours = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid',
    });
  }

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: '<updated/>',
    },
  });
};

exports.secondGetalltours = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((ele) => ele.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.PostallTours = (req, res) => {
  const newId = tours.length + 1;
  const newTours = Object.assign({ id: newId }, req.body);

  tours.push(newTours);
  fs.writeFile(
    `${__dirname}/dev-data/Data/tours.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTours,
        },
      });
    },
  );

  // res.send('Done')
};

exports.deleteTours = (req, res) => {
  res.status(204).json({
    status: 'success',
    results: tours.length,
    data: null,
  });
};
