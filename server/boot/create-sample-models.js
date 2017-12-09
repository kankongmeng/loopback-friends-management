'use strict';

var async = require('async');
module.exports = function(app) {

  app.dataSources.mysqlDs.automigrate('SPUser', function(err) {
    if (err) throw err;

    app.models.SPUser.create([{
      email: 'andy@example.com'
    }, {
      email: 'john@example.com'
    }, {
      email: 'common@example.com'
    }, {
      email: 'lisa@example.com'
    }, {
      email: 'kate@example.com'
    }, {
      email: 'abc@example.com'
    }, {
      email: 'bcd@example.com'
    }, {
      email: 'cde@example.com'
    }, ], function(err, result) {
      if (err) throw err;

      console.log('SPUser Models created: \n', result);
    });
  });
  
  app.dataSources.mysqlDs.automigrate('FriendManagement', function(err) {
    if (err) throw err;

    app.models.FriendManagement.create([{
      email: 'abc@example.com',
      friend_email: 'bcd@example.com',
      type: 'friend',
      block: '0'
    }, {
      email: 'bcd@example.com',
      friend_email: 'abc@example.com',
      type: 'friend',
      block: '0'
    }, {
      email: 'bcd@example.com',
      friend_email: 'cde@example.com',
      type: 'friend',
      block: '0'
    }, {
      email: 'cde@example.com',
      friend_email: 'bcd@example.com',
      type: 'friend',
      block: '0'
    }, {
      email: 'abc@example.com',
      friend_email: 'cde@example.com',
      type: 'friend',
      block: '0'
    }, {
      email: 'cde@example.com',
      friend_email: 'abc@example.com',
      type: 'friend',
      block: '0'
    }, ], function(err, result) {
      if (err) throw err;
      console.log('FriendManagement Models created: \n', result);
    });
  });

};
