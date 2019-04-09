'use strict';

const express = require('express');

let app = express();

app.use(express.static(`${__dirname}/dist`));

app.listen(process.env.NODE_PORT || 3000);

