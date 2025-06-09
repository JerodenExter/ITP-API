import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

// Serveer statische bestanden uit de 'public' map
app.use(express.static('public'));

// Route die de afbeelding ophaalt en doorstuurt
app.get('/api/bear', async (req, res) => {
  try {
    // Haal breedte en hoogte op uit query, met standaardwaarden
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    if (width && height) {
      // Bouw de URL voor PlaceBear
      const imageUrl = `https://placebear.com/${width}/${height}`;

      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Kon beer niet ophalen');

      res.set('Content-Type', 'image/jpeg');
      response.body.pipe(res);
    } else {
      res.status(400).send('Ongeldige breedte of hoogte');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Fout bij ophalen van beer');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});