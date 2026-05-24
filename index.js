const app = require('express')();
const PORT = 3333;

const Pool = new Pool()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/dinosaur', (req, res) => {
  res.status(200).send({
    Dino: "T-rex!"
  })
});

