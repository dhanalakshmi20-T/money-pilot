const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const testRoutes = require("./routes/test.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: this.true }));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Money Pilot Backend API is running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

module.exports = app;