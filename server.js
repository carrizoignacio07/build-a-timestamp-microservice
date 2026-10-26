import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

const handleTimestamp = (req, res) => {
  const dateParam = req.params.date;
  const date = dateParam
  ? /^\d+$/.test(dateParam)
    ? new Date(Number(dateParam))
    : new Date(dateParam)
  : new Date();

  if (Number.isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
};

app.get("/api", (req, res) => handleTimestamp(req, res));
app.get("/api/:date", handleTimestamp);


// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
