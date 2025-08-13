const { initDB } = require('./src/config/db');
const app = require('./src/app');

initDB().then(() => {
  app.listen(5000, () => console.log('Server running on port 5000'));
}).catch(err => {
  console.error("Failed to connect to DB:", err);
});
