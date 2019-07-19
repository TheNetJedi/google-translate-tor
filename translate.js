var querystring = require("querystring");
var token = require("@vitalets/google-translate-token");
var tr = require("tor-request");

var config = require("./config.json");

tr.setTorAddress(config.torHost, config.torPort);

function translate(text) {
  return new Promise((resolve, reject) => {
    return token.get(text).then(token => {
      var url = "https://translate.google.com/translate_a/single";
      var data = {
        client: "t",
        sl: "auto",
        tl: "en",
        hl: "en",
        dt: ["at", "bd", "ex", "ld", "md", "qca", "rw", "rm", "ss", "t"],
        ie: "UTF-8",
        oe: "UTF-8",
        otf: 1,
        ssel: 0,
        tsel: 0,
        kc: 7,
        q: text
      };
      data[token.name] = token.value;
      var requrl = url + "?" + querystring.stringify(data);
      tr.request(requrl, (err, res, body) => {
        if (err) throw err;
        var transname = JSON.parse(body);
        var result = transname[0][0][0];
        resolve(result);
      });
    });
  });
}

module.exports = translate;
