// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// מאפשרים להגיש קבצים סטטיים מהתיקייה public
app.use(express.static(path.join(__dirname, "public")));

// ראוט פגיע: /
app.get("/", (req, res) => {
    // 1️⃣ לוקחים את ה-Host מה-Header של X-Forwarded-Host אם קיים, אחרת מה-Host הרגיל
    const host = req.headers["x-forwarded-host"] || req.headers["host"];
    console.log(host)
    // 2️⃣ הוספת Cache-Control header כדי לדמות Cache ציבורי
    res.set("Cache-Control", "public, max-age=100");

    // 3️⃣ מחזירים HTML עם לינק דינמי ל-login
    // אם attacker שולח X-Forwarded-Host, זה ישפיע על הלינק
    res.send(`
<html>
<head>
    <title>User Profile</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa; /* רקע בהיר */
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .container {
            background-color: white;
            border-radius: 10px;
            padding: 40px;
            width: 350px;
            box-shadow: 0 0 15px rgba(0,0,0,0.15);
            text-align: center;
        }

        h1 {
            margin-top: 0;
            color: #333;
        }

        p {
            color: #555;
            margin-bottom: 20px;
        }

        a.link {
            display: block;
            padding: 12px;
            margin-top: 20px;
            background-color: #28a745; /* ירוק לדף תקין */
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }

        a.link:hover {
            background-color: #218838;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to your Profile</h1>
        <p>This is a demo page showing dynamic links based on Host header.</p>
        <!-- כאן נשאר הלינק הדינמי מהשרת -->
        <a class="link" href="http://${host}/login">Login</a>
    </div>
</body>
</html>

    `);
});

// ראוט /login — עמוד התחברות רגיל
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public/login.html"));
});


// Start the HTTP server
app.listen(PORT, () => {
    console.log(`Application Server is running at http://localhost:${PORT}`);
});
