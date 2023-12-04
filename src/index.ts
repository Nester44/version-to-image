import { scheduleJob } from 'node-schedule';
import { env } from './env';
import { generateApplicationBadges } from './generateApplicationBadges';
import express from 'express';

scheduleJob('0 */2 * * *', () => generateApplicationBadges(env.APPLICATION_SHORT_NAMES));

const app = express();

generateApplicationBadges(env.APPLICATION_SHORT_NAMES);

app.get('/', (req, res) => {
  res.send('App is running');
});

app.use(express.static('versionImages'));

app.listen(env.PORT, () => {
  console.log(`App is running on port ${env.PORT}`);
});
