const config = require('../../config.js');
// DB Setup
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const autoIncrement = require('mongoose-auto-increment');
console.log('config.db', config.db);
const connection = mongoose.connect(config.db);
autoIncrement.initialize(connection);
const Person = require('./person.model');


const superagent = require('superagent');
const {expect,assert} = require('chai');
const port = config.port;


const personWithTwoContacts = {
  name:"pessoa com dois contatos",
  contacts: [{type:'w', value:'+5585998218766'}, {type:'e', value:'johel@gmail.com'}]
}

const personWithInvalidEmail = {
  name:"pessoa com email inválido",
  contacts: [{type:'e', value:'invalidemail'}]
}

function createPersonViaAPI(person){
  return new Promise(function(resolve,reject){
    superagent
    .post(`http://localhost:${port}/v1/persons`)
    .send(person)
    .end(function(e, res){
      if(e) return reject(e);
      resolve(res);
    })
  });
}


describe('person creation', function(){

  it('create person with two contacts', function(done){
  	this.timeout(5 * 1000);
		createPersonViaAPI(personWithTwoContacts)
  		.then(res => {
        let contacts = res.body.data.contacts;
	      expect(res.status).to.be.equal(201);
        expect(contacts.length).to.be.equal(2);
        expect(contacts[0].uid).to.not.be.equal(contacts[1].uid);
      	done();
  		}, err => {
        console.log('err', err);
  			done(err);
  		})
  		.catch( err => {
  			console.log('deu erro no catch');
  			done(err);
  		});

  });

  it('does not create person with invalid email format', function(done){
    this.timeout(5 * 1000);
    createPersonViaAPI(personWithInvalidEmail)
      .then(res => {
        expect(res.status).to.be.equal(400);
        done();
      }, err => {
        expect(err.status).to.be.equal(400);
        done()
      })
      .catch( err => {
        console.log('deu erro no catch', err);
        done(err);
      });
  });

  after(function(done){
    Person.remove({}).then(result=>{
      console.log("coleção people removida com sucesso")
      done();
    }, err=>{
      console.log('chegou no then de erro')
      done(new Error('chegou no then de erro'));
    }).catch(err=>{
      console.log("Não conseguiu limpar a coleção de pessoas")
      done(new Error("Não conseguiu limpar a coleção de pessoas"));
    })
  })

});

