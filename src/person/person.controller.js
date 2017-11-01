const mongoose = require('mongoose');
const Person = mongoose.model('Person');
const _ = require('lodash');

const contactOptions = ['t','w','e']; // standing for telephone, whatsapp and e-amil
exports.create = function(req, res, next) {
  console.log('req.body on create person', req.body);
  const {name, contacts} = req.body;
  let contactsWithUids = contacts? contacts.map(item => {
    return Object.assign({}, item, {uid: _.uniqueId()});
  }) : [];

  //todo: verify if contact types are among valid contact options

  const person = new Person({
    name,
    contacts: contactsWithUids,
  });

  person.save().then(result => {
    console.log('result on person creation', result);
    return res.status(201).json({data:result});
  }, err => {
    console.log('error - person creation', err);
    return res.status(500).json({error:"Unexpected Error"});
  }).catch( err => {
    return res.status(500).json({error:"Unexpected Error"});
  })
};

exports.getPersonById = function(req, res, next, personId) {
  console.log('personId', personId);
  next();
}


exports.update = function(req, res, next) {
  console.log('req.body on update person', req.body);
  return res.status(200).json({data:'success'});
};

exports.getPerson = function(req, res, next) {
  return res.status(200).json({data:'success'});
};

exports.deletePerson = function(req, res, next) {
  console.log('req.body on delete person', req.body);
  return res.status(204);
};

exports.getAllPeople = function(req, res, next) {
  return res.status(200).json({data:'success'});
};


exports.insertContact = function(req, res, next) {
  console.log('req.body on insert person contact', req.body);
  return res.status(200).json({data:'success'});
};

exports.updateContact = function(req, res, next) {
  console.log('req.body on update person contact', req.body);
  return res.status(200).json({data:'success'});
};

exports.deleteContact = function(req, res, next) {
  console.log('req.body on delete person contact', req.body);
  return res.status(204);
};