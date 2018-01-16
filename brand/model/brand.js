/* *This file is for data modeling.
Use this file for functions that need DB query 
 */
var mongoose = require('mongoose');
var brandSchema = new mongoose.Schema({
	name: String
});


module.exports = mongoose.model('brand', brandSchema);