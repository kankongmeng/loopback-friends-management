'use strict';

module.exports = function(Spuser) {
  // Disable all default rest api
  // Spuser.disableRemoteMethodByName('create');     // Removes (POST)
  Spuser.disableRemoteMethodByName('upsert');     // Removes (PUT)
  Spuser.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /:id
  Spuser.disableRemoteMethodByName('updateAll');  // Removes (POST) /update
  Spuser.disableRemoteMethodByName('prototype.updateAttributes');
  Spuser.disableRemoteMethodByName('createChangeStream');
  Spuser.disableRemoteMethodByName('replace');
  Spuser.disableRemoteMethodByName('replaceOrCreate');
  Spuser.disableRemoteMethodByName('upsertWithWhere');
  Spuser.disableRemoteMethodByName('exists');
  Spuser.disableRemoteMethodByName('findById');
  // Spuser.disableRemoteMethodByName('find');
  Spuser.disableRemoteMethodByName('findOne');
  Spuser.disableRemoteMethodByName('count');
  Spuser.disableRemoteMethodByName('replaceById');
  
  // Regex
  // email validation regex
  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // Validation
  Spuser.validatesUniquenessOf('email', {message: 'email is not unique'});
  Spuser.validatesFormatOf('email', {with: emailRegex, message: 'Must provide a valid email'});
};
