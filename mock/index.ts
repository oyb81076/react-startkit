import express from 'express';

import router from './router';
import { delay, throwError } from './utils';

const app = express();

app.use(delay(0));
app.use(throwError({ message: 'This is Some Error', status: 500, work: false }));

app.use('/api', router);
app.listen(8080, () => console.log('server start at http://localhost:8080'));
