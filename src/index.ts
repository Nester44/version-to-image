import { env } from './env';
import { generateApplicationBadges } from './generateApplicationBadges';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('App is running');
});

app.use(express.static('versionImages'));

app.listen(env.PORT, () => {
  console.log(`App is running on port ${env.PORT}`);
});

generateApplicationBadges(env.APPLICATION_SHORT_NAMES.slice(0, 5));
