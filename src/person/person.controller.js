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
    console.log('result on creation', result);
    return res.status(201).json({data:result.toClient()});
  }, err => {
    console.log('error - person creation', err);
    return res.status(400).json({error:err.message});
  }).catch( err => {
    return res.status(500).json({error:"Unexpected Error"});
  })
};

exports.getPersonById = function(req, res, next, personId) {
  Person.findOne({_id: personId}, function(err, person) {
    if (err) {
      next(err);
    } else if (person) {
      req.person = person;
      next();
    } else {
      return res.status(400).json({error:"There is no person with the specified id"});
    }
  });
}


exports.update = function(req, res, next) {
  let bodyData = req.body;
  req.person = Object.assign(req.person, bodyData);

  req.person.save().then(result => {
    console.log('result on person update', result);
    return res.status(200).json({data:result.toClient()});
  }, err => {
    console.log('error - person update', err);
    return res.status(400).json({error:err.message});
  }).catch( err => {
    return res.status(500).json({error:"Unexpected Error"});
  })
};

exports.getPerson = function(req, res, next) {
    return res.status(200).json({data:req.person.toClient()});
};

exports.deletePerson = function(req, res, next) {
  req.person.remove().then(result => {
    console.log('result on delete', result);
    return res.status(204).json();
  },err =>{
    return res.status(400).json({error:err.message});
  }).catch(err => {
    return res.status(500).json({error:"Unexpected Error"});
  })
};

exports.getAllPeople = function(req, res, next) {
  Person.
    find().
    sort({ name: 1 }).
    exec().
    then(result => {
      console.log('result', result);
      return res.status(200).json({data:result.map(item=>item.toClient())});
    }, err => {
      return res.status(400).json({error:"Unexpected Error"});
    }).catch(err => {
      return res.status(500).json({error:"Unexpected Error"});
    })
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
  return res.status(204).json();
};