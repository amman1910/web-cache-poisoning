// evil-server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = 4000;

// מאפשרים להגיש קבצים סטטיים מהתיקייה public
app.use(express.static(path.join(__dirname, "public")));

// ראוט /evil-login — עמוד התחברות מזויף
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public/evil-login.html"));
});

// Start the HTTP server
app.listen(PORT, () => {
    console.log(`Application Server is running at http://localhost:${PORT}`);
});
