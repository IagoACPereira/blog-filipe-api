require('dotenv').config();
const app = require('./src/app');

const porta = process.env.PORTA;

// eslint-disable-next-line no-console
app.listen(porta, () => console.log(`Servidor rodando ok em http://localhost:${porta}`));
