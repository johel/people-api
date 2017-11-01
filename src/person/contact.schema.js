const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const _ = require('lodash');
const EMAIL_TYPE = 'e', TELEPHONE_TYPE = 't', WHATSAPP_TYPE = 'w';
const CONTACT_TYPES = [EMAIL_TYPE, TELEPHONE_TYPE, WHATSAPP_TYPE];
const ValidationUtils = require('../utils/validations');



const ContactSchema = mongoose.Schema({
        uid: 'string',
        type: {type: 'string', enum: CONTACT_TYPES},
        value: {type:'string'},
    }, {_id: false});

 ContactSchema.pre('save', function(next) {
    let contact = this;
  if(!validateContactEmail(contact)) {
    return next(new Error('email is invalid'));
  }

  next();
});


//VALIDATIONS


function validateContactEmail (contact) {
	var result = true;

  if(contact.type === EMAIL_TYPE){
    result = ValidationUtils.validateEmail(contact.value);
  }

  return result;
};


module.exports = ContactSchema;