const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const ContactSchema = mongoose.Schema({
  uid: 'string',
  type: {type: 'string'},
  value: {type:'string'},
}, {_id: false});

const personSchema = new mongoose.Schema({
  name: 'string',
  contacts: [ContactSchema]
});

personSchema.plugin(autoIncrement.plugin, 'Person');

//***VIRTUALS PROPERTIES***

// create a virtual id field when person object is retrieved from mongoDB
personSchema.virtual('id').get(function(){
  return this._id;
});

// ensure virtual fields are serialised
personSchema.set('toJSON', {
  virtuals: true
});


//***INTANCE METHODS***

//get rid of unnecessary properties to the cliente
personSchema.method('toClient', function() {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;

  return obj;
});


//VALIDATIONS


// Create the model class
const ModelClass = mongoose.model('Person', personSchema);

// Export the model
module.exports = ModelClass;

