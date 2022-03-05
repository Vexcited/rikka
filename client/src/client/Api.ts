import express from "express";

export function startApiServer () {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to Rikka API",
      documentation: "https://rikka.vexcited.me/api",
      environnement: process.env.NODE_ENV,
      hostname: req.hostname
    });
  });

  const PORT = process.env.NODE_ENV === "production"
    ? process.env.PROD_PORT
    : process.env.DEV_PORT
    // Default port if none is set.
    || 8080;

  app.listen(PORT, () => {
    console.log(`[API] Server started on port ${PORT}.`);
  });
}