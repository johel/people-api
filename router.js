const People = require('./src/person/person.controller');

module.exports = function (app) {
  app.post('/persons', People.create);
  app.param('personId', People.getPersonById);
  app.put('/persons/:personId', People.update);
  app.get('/persons/:personId', People.getPerson);
  app.delete('/persons/:personId', People.deletePerson);
  app.get('/persons', People.getAllPeople);
  app.post('/persons/:personId/contacts', People.insertContact);
  app.put('/persons/:personId/contacts', People.updateContact);
  app.delete('/persons/:personId/contacts', People.deleteContact);
  app.get('*', function (req, res) {
    res.status(404);
  });
};
