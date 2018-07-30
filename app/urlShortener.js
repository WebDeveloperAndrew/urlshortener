module.exports = function (app, db) {
  var primaryURL = process.env.APP_URL || 'https://urlmicro.herokuapp.com/';

  app.route('/:url')
    .get(shortLink);

  app.get('/new/:url*', newLink)

  //Create a new shortened url and add it to the database
  function newLink(req, res) {
    console.log(req.url);
    if (removeParameter(req.url)) {
      console.log("shortening");
      var new_url = req.url.substring(0, req.url.indexOf('?'));
      console.log(new_url);
    }
    else {
      new_url = req.url;
    }
    console.log('Requested Shortened Url: ' + new_url.slice(5));
    var json = {};
    if (testUrl(new_url.slice(5))) {
      json = {
        "originalURL": new_url.slice(5),
        "shortURL": primaryURL + shortURL()
      };
      saveLink(json, db);
    }
    else {
      json = {
        "error": "Wrong URL Format, Please Try Again."
      };
    }
    res.jsonp(json);
  }
  //Check the database for a shortened url 
  function shortLink(req, res) {
    console.log('Requested Url: ' + req.url.slice(1));
    var link = primaryURL + req.url.slice(1);
    console.log(link);
    var sites = db.collection('sites');

    sites.findOne({
      "shortURL": link
    }, function (err, result) {
      if (err) throw err;
      if (result) {
        console.log()
        res.redirect(result.originalURL);
      }
      else {
        res.send({ "error": "This URL is not in the database" });
      }
    });
  }

  //Save link to database
  function saveLink(link, db) {
    console.log('Saving Link: ' + link.originalURL);
    var sites = db.collection('sites');
    sites.save(link, function (err, result) {
      if (err) throw err;
      console.log('Saved');
    });
  }
  //Create a short URL
  function shortURL() {
    var num = Math.floor(1000 + Math.random() * 899999);
    return num.toString().substring(0, 4);
  }
  //Test a URL is valid
  function testUrl(url) {
    //a regular expression for testing a urls validity
    var urlexpression = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
    return urlexpression.test(url);
  }

  function removeParameter(url) {
    if (url.search(/callback=removecallback/i) != -1) {
      return true;
    }
    return false;
  }

};
