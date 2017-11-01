const mongoose = require('mongoose');
const Person = mongoose.model('Person');
const _ = require('lodash');
const uid = require('uid-safe');

const contactOptions = ['t','w','e']; // standing for telephone, whatsapp and e-amil
exports.create = function(req, res, next) {
  console.log('req.body on create person', req.body);
  const {name, contacts} = req.body;
  let contactsWithUids = contacts? contacts.map(item => {
    return Object.assign({}, item, {uid: uid.sync(18)});
  }) : [];

  const person = new Person({
    name,
    contacts: contactsWithUids,
  });

  return person.save().then(result => {
    console.log('result on creation', result);
    return res.status(201).json({data:result.toClient()});
  }, err => {
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

  return req.person.save().then(result => {
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

exports.removePerson = function(req, res, next) {
  return req.person.remove().then(result => {
    console.log('result on delete', result);
    return res.status(204).json();
  },err =>{
    return res.status(400).json({error:err.message});
  }).catch(err => {
    return res.status(500).json({error:"Unexpected Error"});
  })
};

exports.getAllPeople = function(req, res, next) {
  Person
    .find()
    .sort({ name: 1 }) //use .collation({locale: "pt" }) for case insensitive -> only works in recent mongo versions
    .exec()
    .then(result => {
      console.log('result', result);
      return res.status(200).json({data:result.map(item=>item.toClient())});
    }, err => {
      return res.status(400).json({error:err.message});
    }).catch(err => {
      return res.status(500).json({error:"Unexpected Error"});
    })
};


exports.insertContact = function(req, res, next) {
  let newContact = req.body;
  req.person.insertContact(newContact);

  return req.person.save().then(result => {
    let contacts = result.contacts;
    return res.status(200).json({data:contacts[contacts.length-1]});
  }, err => {
    return res.status(400).json({error:err.message});
  }).catch( err => {
    return res.status(500).json({error:"Unexpected Error"});
  })
};


exports.updateContact = function(req, res, next) {
  console.log('req.body on update person contact', req.body);
  let {uid,data} = req.body;
  let contacts = req.person.contacts;
  let index = contacts.findIndex(item => item.uid == uid);
  if(index === -1) return res.status(404).json({error: "No item found"});
  contacts[index] = Object.assign({}, data, {uid});

  return req.person.save().then(result => {
    console.log('result on update contacts', result);
    return res.status(200).json({data:result.contacts[index]});
  }, err => {
    return res.status(400).json({error:err.message});
  }).catch( err => {
    return res.status(500).json({error:"Unexpected Error"});
  })
};

exports.removeContact = function(req, res, next) {
  console.log('req.body on remove person contact', req.body);
  let {uid} = req.body;
  let index = req.person.contacts.findIndex(item => item.uid == uid);
  if(index === -1) return res.status(404).json({error: "No item found"});
  req.person.contacts.splice(index,1);

  return req.person.save().then(result => {
    console.log('result on remove contact', result);
    return res.status(204).json();
  }, err => {
    return res.status(400).json({error:err.message});
  }).catch( err => {
    return res.status(500).json({error:"Unexpected Error"});
  })
};