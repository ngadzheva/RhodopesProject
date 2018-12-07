import * as path from 'path';
import * as bodyParser from 'body-parser';
import { connectRouter } from './router';
import { request } from 'http';

const express = require('express');

const port = 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectRouter(app); // location is important!

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});