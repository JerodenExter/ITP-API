import express from 'express'

const app = express();
const port = process.env.PORT || 3000;

// Middleware om statische bestanden (zoals HTML/CSS) te serveren
app.use(express.static('public'));

// Eenvoudige route
app.get('/', (req, res) => {
  res.send('Hallo wereld! 🌍');
});

// Start server
app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});