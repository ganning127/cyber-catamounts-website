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

router.post('/api/submit', jsonParser, async function(req,res){
  let info = req.body
  let check = hasura.checkFlag(info.flag)
  console.log(info)
  console.log(check)

  if (check == true) {
    let resp = hasura.addEntry(info.challengeID, info.challengeName, info.email, info.flag, info.name, info.challengeDescription)
    console.log(resp)
    res.send({"status": "success"})
  } else {
    res.send({"status": "fail"})
  }

  res.sendFile(path + '/pages/challenge.html');
});

router.get('/challenge',function(req,res){
  res.sendFile(path + '/pages/challenge.html');
});

// home and terminal page
router.get('/home',function(req, res){
  res.sendFile(path + '/pages/index.html');
});

router.get('/',function(req, res){
  res.sendFile(path + '/pages/terminal.html');
});

router.get('/about',function(req, res){
    res.sendFile(path + '/pages/about.html');
  });


// other pages
router.get('/services',function(req,res){
  res.sendFile(path + '/pages/services.html');
});

router.get('/index',function(req,res){
  res.sendFile(path + '/pages/index.html');
});

router.get('/blog',function(req,res){
  res.sendFile(path + '/pages/blog.html');
});

router.get('/team',function(req,res){
  res.sendFile(path + '/pages/team.html');
});

router.get('/blog/test-blog',function(req,res){
  res.sendFile(path + '/pages/blog-single.html');
});

// Try navigating to the /about directory on the website. Now, the about.html page will show.
// Note: it won't work if you click the "about" button because we haven't changed the code there!

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));