// require('dotenv').config();
// const { initDB } = require('./src/config/db');
// const app = require('./src/app');

// initDB()
//   .then(() => {
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
//   })
//   .catch(err => {
//     console.error("❌ Failed to connect to DB:", err);
//   });


// require('dotenv').config();
// const { initDB } = require('./src/config/db');

// initDB()
//   .then(() => {
//     const app = require('./src/app'); // import AFTER DB init
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
//   })
//   .catch(err => {
//     console.error("❌ Failed to connect to DB:", err);
//   });


require('dotenv').config();
const { initDB } = require('./src/config/db');
const app = require('./src/app');
const http = require('http');
const { Server } = require("socket.io");



initDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
    });

    io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      // Example: Emit a newBook event
      socket.on("addBook", (book) => {
        io.emit("newBook", book); // all clients get new book
      });

      socket.on("deleteBook", (bookId) => {
        io.emit("deleteBook", bookId); // all clients get deleted book id
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

    server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("❌ Failed to connect to DB:", err);
  });
