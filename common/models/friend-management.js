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
  
  var Utility = require('../custom/utility');
  var FriendManagementService = require('../custom/friend-management-service');
  
  // SP Group full stack engineer user story.
  // 1. As a user, I need an API to create a friend connection between two email addresses.
  Friendmanagement.makeFriend = function(argObject, cb) {
    // Ensure both email is valid.
    var validateResult = Utility.ValidateBothEmail(argObject);
    if(!validateResult.success) {
      cb(null, validateResult);
    } else {
      // Ensure both email addresses is registered emails.  
      Utility.ValidateBothRegisteredEmail(argObject, function(err, result) {
        if(result.success) {
          FriendManagementService.makeFriend(argObject, function(err, result) {
            cb(null, result);
          });
        } else {
          cb(null, result);
        }
      });
    }
  };
  
  // 2. As a user, I need an API to retrieve the friends list for an email address.
  Friendmanagement.retrieveFriend = function(argString, cb) {
    FriendManagementService.retrieveFriend(argString, function(err, result) {
      cb(null, result);
    });
  };  
  
  // Remote method for all the user story API function.
  Friendmanagement.remoteMethod(
    'makeFriend', {
      accepts: { arg: 'friends', type: 'object', http: { source: 'body' }, required: true,
        description: '{ "friends": ["andy@example.com", "john@example.com"] }',
      },
      returns: { arg: 'response', type: 'object' },
      http: { path: '/makeFriend', verb: 'post' }
    }
  );
  
  Friendmanagement.remoteMethod(
    'retrieveFriend', {
      accepts: { arg: 'email', type: 'object', http: { source: 'body' }, required: true,
        description:'{ "email": "andy@example.com" }',
      },
      returns: { arg: 'response', type: 'object' },
      http: { path: '/retrieveFriend', verb: 'post' }
    }
  );

};
