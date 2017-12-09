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
    }, {
      email: argObject.friends[1],
      friend_email: argObject.friends[0],
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

};
