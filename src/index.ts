import Debug from "debug";
import express, { Request } from "express";
import path from "path";
import request from "request";
import uuid from "uuid";

const debug = Debug("streamer-event-viewer");

const PORT = process.env.PORT || 5000;
const CLIENT_ID = "izn0cq219lfj27aa4xksew3vo4vyxt";

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "..", "views")));

function _show_req(req: Request) {
  debug(
    "request on %s://%s%s, %s",
    req.protocol,
    req.headers.host,
    req.originalUrl,
    req.query
  );
}

app.get("/hello", (req, res) => {
  res.send("Hello world!");
});

app.get("/", function(req, res) {
  _show_req(req);

  let loggedIn = false;
  if (req.query.access_token) {
    loggedIn = true;
  }

  res.render("pages/index", {
    clientId: CLIENT_ID,
    loginRedirectUrl: `http://localhost:${PORT}`,
    responseType: "token",
    scope: "user:edit",
    state: uuid.v4(),
    loggedIn
  });
});

app.get("/subscribe", function(req, res) {
  _show_req(req);

  const uname = req.query.favorteStreamerName;

  const opt = {
    url: `https://api.twitch.tv/helix/users?login=${uname}`,
    headers: {
      "Client-ID": CLIENT_ID
    }
  };

  function cb(error: any, response: request.Response, body: any) {
    if (!error && response.statusCode == 200) {
      debug(body);
      var json = JSON.parse(body);
      res.render("pages/streamer", {
        subsribedUsername: json.data[0].login
      });
    }
  }

  debug(opt);

  request(opt, cb);
});

// start the Express server
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
