var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
const cors = require("./cors");
const jsonfile = require('jsonfile');
const pathadd = require('path');
var dirname = require('./utils.js').dirname;




router.use(bodyParser.json());

/* GET users listing. */

router.options('/', cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
  console.log("may br ptrcheck");
})
.get('/',cors.cors, function(req, res, next) {
 // const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
 
 //const file = `${dirname}/awcreds.json`

 const file = nw.App.dataPath + "/awcreds.json"
  console.log("my file ",file)
  if (file)
  res.json(jsonfile.readFileSync(file)) 
 //console.dir(jsonfile.readFileSync(file)


/*(file, async function (err, data) {
  if (err) console.error(err)
  
    //  res.statusCode = 200;
      //res.setHeader("Content-Type", "application/json");
      console.log("settings ", data)
      res.json(data);
    },
    err => next(err)
    */
 // )
  
})

.post('/',cors.corsWithOptions,
  async ( req, res, next) => {
   

      console.log("path toto", dirname);
      console.log("path toto 33", nw.App.dataPath);

   // const file = `${dirname}/awcreds.json`
    const file = nw.App.dataPath + "/awcreds.json"
    console.log("file  titi", file)
    console.log(req.body);
  
    
  var data = {
    awurl: req.body.awurl,
     apikey: req.body.apikey,
     awencoded: req.body.awencoded,
     awadmin: req.body.awadmin,
     awpassword: req.body.awpassword
     
  };

  jsonfile.writeFileSync(file, data)
  res.json("this is Working");
 
}
)

module.exports = router;
