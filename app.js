const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  res.send('Test route works!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
