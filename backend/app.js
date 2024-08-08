const express = require("express");
const cors = require("cors");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const app = express();


// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

require("dotenv").config();

const port = 8000;

// Configure AWS SDK
const s3Client = new S3Client({
  endpoint: "https://nyc3.digitaloceanspaces.com", // Find your endpoint in the control panel, under Settings. Prepend "https://".
  forcePathStyle: false, // Configures to use subdomain/virtual calling format
  region: "nyc3",
  credentials: {
    accessKeyId: process.env.SPACES_KEY, // Access key pair. You can create access key pairs using the control panel or API.
    secretAccessKey: process.env.SPACES_SECRET, // Secret access key defined through an environment variable.
  },
});

app.get("/", async (req, res) => {
  try {
    res.status(200).send("hello world");
  } catch (error) {
    res.status(500).json({ error: "backend is not running!!" });
  }
});

// Endpoint to get a signed URL for a private file
app.get("/get-file", async (req, res) => {
  const { fileName } = req.query;
  const command = new GetObjectCommand({
    Bucket: process.env.SPACES_BUCKET,
    Key: fileName,
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    res.json({ url });
  } catch (error) {
    res.status(500).json({ error: "Error generating signed URL" });
  }
});


app.listen(port, () => {
  console.log(`app listening to port ${port}`);
});
