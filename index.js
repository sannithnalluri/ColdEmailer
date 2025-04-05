const express = require('express')
const DataRouter = require('./Controller/DataRouter');
const app = express();


app.use('/data', DataRouter);


app.get('/', (req, res) => {
  res.send('Hello World!')
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 


