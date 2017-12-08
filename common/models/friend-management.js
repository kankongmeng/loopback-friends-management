'use strict';

module.exports = function(Friendmanagement) {
  // Disable all default rest api
  Friendmanagement.disableRemoteMethodByName('create');     // Removes (POST)
  Friendmanagement.disableRemoteMethodByName('upsert');     // Removes (PUT)
  Friendmanagement.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /:id
  Friendmanagement.disableRemoteMethodByName('updateAll');  // Removes (POST) /update
  Friendmanagement.disableRemoteMethodByName('prototype.updateAttributes');
  Friendmanagement.disableRemoteMethodByName('createChangeStream');
  Friendmanagement.disableRemoteMethodByName('replace');
  Friendmanagement.disableRemoteMethodByName('replaceOrCreate');
  Friendmanagement.disableRemoteMethodByName('upsertWithWhere');
  Friendmanagement.disableRemoteMethodByName('exists');
  Friendmanagement.disableRemoteMethodByName('findById');
  // Friendmanagement.disableRemoteMethodByName('find');
  Friendmanagement.disableRemoteMethodByName('findOne');
  Friendmanagement.disableRemoteMethodByName('count');
  Friendmanagement.disableRemoteMethodByName('replaceById');
  
};
