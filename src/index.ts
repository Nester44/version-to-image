import { scheduleJob } from 'node-schedule';
import { env } from './env';
import { generateApplicationBadges } from './generateApplicationBadges';
import express from 'express';

const IMAGES_FOLDER = 'versionImages/';


scheduleJob('0 */2 * * *', () => generateApplicationBadges(env.APPLICATION_SHORT_NAMES, IMAGES_FOLDER));

const app = express();

generateApplicationBadges(env.APPLICATION_SHORT_NAMES, IMAGES_FOLDER);

app.get('/', (_req, res) => {
  res.send('App is running');
});

app.use(express.static(IMAGES_FOLDER));

app.listen(env.PORT, () => {
  console.log(`App is running on port ${env.PORT}`);
});
