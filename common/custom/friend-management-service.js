'use strict';

var AppModels = require('../../server/server').models;
var Utility = require('../custom/utility');

var FriendType = {
  FRIEND: "friend",
  SUBSCRIBE: "subscribe",
  FOLLOWER: "follower"
};

module.exports = {

  makeFriend: function(argObject, cb) {
    // Declare response structure
    var response = { "success": false, "message": null };

    // Insert both email as friend relationship
    AppModels.FriendManagement.create({
      email: argObject.friends[0],
      friend_email: argObject.friends[1],
      type: FriendType.FRIEND,
      block: '0'
    }, function(err, result) {
    
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
  },
  
  retrieveCommon: function(argObject, cb) {
    // Declare response structure
    var response = { "success": null, "friends": null, "count": 0 };
    var friendsListOne = [];
    var friendsListTwo = [];
    var commonFriends = [];
    
    // Retrieve friend list for first email address.
    AppModels.FriendManagement.retrieveFriend({ email: argObject.friends[0] }, function(err, result) {
      
      // If there is any record match.
      if(result != "" && result.friends.length > 0) {
        friendsListOne = result.friends;
        
        // Retrieve friend list for second email address.
        AppModels.FriendManagement.retrieveFriend({ email: argObject.friends[1] }, function(err, result) {
          
          // If there is any record match.
          if(result != "" && result.friends.length > 0) {
            friendsListTwo = result.friends;
            
            // Get common friend from two friend list
            if(friendsListOne.length > 0 && friendsListTwo.length > 0) {
              commonFriends = Utility.ArrfindMatch(friendsListOne, friendsListTwo);
              
              // If there is any common friend, return it.
              if(commonFriends.length > 0) {
                response.success = true;
                response.friends = commonFriends;
                response.count = commonFriends.length;
                cb(null, response);
              } else {
              
                // If there is no record match.
                response.success = false;
                response.friends = "no result found.";
                cb(null, response);
              }
            }              
          }
        });
      }
    });
  },

};
