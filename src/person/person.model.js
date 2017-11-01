const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const ContactSchema = require('./contact.schema');
const _ = require('lodash');
const uid = require('uid-safe');
const StringUtils = require('../utils/string');

const personSchema = new mongoose.Schema({
  name: 'string',
  contacts: [ContactSchema]
}, {
	timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
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

//HOOKS
personSchema.pre('save', function(next) {
  let person = this;
  try{
  	person.name = StringUtils.titleCase(person.name);
  }catch(err){
  	return next(err);
  }
  
  next();
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

function insertPersonContact(person, newContact){
  let doesContactValueExist = person.contacts.find(item => item.value == newContact.value);
  if(!doesContactValueExist){
    let contactToInsert = Object.assign(newContact, {uid:uid.sync(18)});
    person.contacts.push(contactToInsert);
  }
}

personSchema.methods.insertContact = function insertContact (newContact) {
  let person = this;
  insertPersonContact(person, newContact);
};


// Create the model class
const ModelClass = mongoose.model('Person', personSchema);

// Export the model
module.exports = ModelClass;

