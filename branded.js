var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
var Product=require('./model/product.js')
var Brand=require('./model/brand.js')

mongoose.connect('mongodb://localhost:27017/myDb', {
    useMongoClient: true,
    /* other options */
  })
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));//basically tells the system whether you want to use a simple algorithm for 
                                                  //shallow parsing (i.e. false) or complex algorithm for deep parsing that 
                                                  //can deal with nested objects (i.e. true).  
app.use(bodyParser.json());//basically tells the system that you want json to be used.

var port = process.env.PORT || 4545;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req,res,next){

        console.log("looging here ",req.body)
    next()
})


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

router.route('/products')
    .post(function(req,res){

        var product=new Product();
        product.name=req.body.name;
        product.brand=req.body.brand;

        product.save(function(err,data){
            if(err)
            res.send(err)
            else
            res.send("product with name "+data.name+" created!")
        })
    })
    router.route("/brands").post(function(req,res){
        
                var brand=new Brand();
                brand.name=req.body.name;
        
                brand.save(function(err,data){
                    if(err)
                    res.send(err)
                    else
                    res.send("brand with name "+data.name+" created!")
                })
            })

    .get(function(req,res){
    
        Product.find(function(err,data){

            if(err)
            res.send(err)
            else
            res.json(data);
        })
    })

router.route("/products/:productid")
    .get(function(req,res){
        console.log("got pid",req.params.productid)
        
        // Product.findById(req.params.productid,function(err,data){
        //     if(err)
        //     res.send(err)
        //     else
        //     res.jsonp(data);
        // })

        Product.findOne({
            "_id": req.params.productid
          })
          .populate("brand")
          .exec(function(err, data) {
            if (err) {
                res.send(err)
            } else {
                res.jsonp(data);
            }
          });

    })

    .put(function(req,res){

        Product.findById(req.params.productid,function(err,product){
            if(err)
            res.send(err)

            product.name=req.body.name; 
            product.brand=req.body.brand; 
            
            product.save(function(err,product){
                if(err)
                res.send(err)
                else
                res.send("product name changed to "+product.name);
            })
        })
    })
    .delete(function(req,res){

        Product.remove({_id:req.params.productid},
            
            function(err,product){
            if(err)
            res.send(err)
            else
            res.send("product "+product.name+" deleted");

        })
    })
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);