/* *This file is for data modeling.
Use this file for functions that need DB query 
 */
var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var productSchema = new mongoose.Schema({
	name: String,
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'brand'
      },
});


module.exports = mongoose.model('products', productSchema);