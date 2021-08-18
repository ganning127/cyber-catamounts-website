var express = require('express');
var app = express();
var router = express.Router();
var hasura = require("./hasura.js")
const bodyParser = require('body-parser');

// express is what helps us "route" the html pages. Usually on websites, you don't see /index.html. 
// Why? Because they use routing! When you navigate to /about, the web server with THIS code returns the HTML about.html page.

app.set('view engine', 'ejs');
app.set('views', __dirname);

// this is just setting up configuration for where all the files are.

var path = __dirname;
var jsonParser = bodyParser.json();

//__dirname is the current directory we are in. Remember that every website literally has a computer running behind it!

app.use('/', router);
app.use('/assets', express.static(path + '/assets'))

// challenge submission

router.get('/login', function (req, res) {
  var scopes = 'playlist-modify-public playlist-modify-private';
  const client_id = "090f5686143f41f5988044fc4bdc163e";
  const redirect_uri = "https://stark-plateau-71330.herokuapp.com/success";

  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + client_id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

router.get('/success', function (req, res) {
  res.sendFile(path + '/pages/success.html');
});

router.get('/', function (req, res) {
  res.sendFile(path + '/pages/index.html');
});


// Try navigating to the /about directory on the website. Now, the about.html page will show.
// Note: it won't work if you click the "about" button because we haven't changed the code there!

app.listen(process.env.PORT || 3000,
  () => console.log("Server is running..."));



// https://words.bighugelabs.com/admin/92db72d7d8e512f532b0cdddd9f726c0
// 92db72d7d8e512f532b0cdddd9f726c0
// https://words.bighugelabs.com/api/2/92db72d7d8e512f532b0cdddd9f726c0/word/json
