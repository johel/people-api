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


// Create the model class
const ModelClass = mongoose.model('Person', personSchema);

// Export the model
module.exports = ModelClass;



//VALIDATIONS