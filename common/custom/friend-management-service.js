'use strict';

var AppModels = require('../../server/server').models;
var Utility = require('../custom/utility');

var FriendType = {
  FRIEND: "friend",
  SUBSCRIBE: "subscribe"
};

module.exports = {

  makeFriend: function(argObject, cb) {
    // Declare response structure
    var response = { "success": false, "message": null };
    
    // Insert both email as friend relationship
    AppModels.FriendManagement.create([{
      email: argObject.friends[0],
      friend_email: argObject.friends[1],
      type: FriendType.FRIEND,
      block: '0'
    }, ], function(err, result) {
    
      // If error occurs when insert record.
      if(err) {
        response.message = err;
        cb(null, response);
        return;
      }
      
      // If no error, return result.
      response.success = true;
      response.message = result;
      cb(null, response);
    });
  },
  
  retrieveFriend: function(argString, cb) {
    // Declare response structure
    var response = { "success": false, "friends": "no result found.", "count": 0 };
    var friends = [];
    let filter = { where: { email: argString.email }};
    
    // Find friend email with input email
    AppModels.FriendManagement.find(filter, function(err, result) {
    
      // If there is any record match.
      if(result != "") {
        for(var i = 0; i < result.length; i++) {
          friends.push(result[i].friend_email);
        }
        if(friends.length > 0) {
          response.success = true;
          response.friends = friends;
          response.count = friends.length;
        }
      }
      cb(null, response);
    });    
  }

};
