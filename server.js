'use strict';
const express = require('express');
const app = express();
require('dotenv').config();
app.use(cors());
const PORT = process.env.PORT || 3003;

