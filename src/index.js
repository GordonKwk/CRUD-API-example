'use strict';

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

require('./routes/authRoutes')(app);
require('./routes/todoRoutes')(app);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
