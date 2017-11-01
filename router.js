const People = require('./src/person/person.controller');

const currentVersion = 'v1';

module.exports = function (app) {
  app.post(`/${currentVersion}/persons`, People.create);
  app.param(`personId`, People.getPersonById);
  app.put(`/${currentVersion}/persons/:personId`, People.update);
  app.get(`/${currentVersion}/persons/:personId`, People.getPerson);
  app.delete(`/${currentVersion}/persons/:personId`, People.removePerson);
  app.get(`/${currentVersion}/persons`, People.getAllPeople);
  app.post(`/${currentVersion}/persons/:personId/contacts`, People.insertContact);
  app.put(`/${currentVersion}/persons/:personId/contacts`, People.updateContact);
  app.delete(`/${currentVersion}/persons/:personId/contacts`, People.removeContact);
  app.get('*', function (req, res) {
    res.status(404);
  });
};
