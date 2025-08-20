const { initDB } = require('./src/config/db');
const app = require('./src/app');

initDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("❌ Failed to connect to DB:", err);
  });
