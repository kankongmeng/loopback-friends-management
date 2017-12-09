'use strict';

var AppModels = require('../../server/server').models;
var Utility = require('../custom/utility');

var FriendType = {
  FRIEND: "friend",
  SUBSCRIBE: "subscribe",
  FOLLOWER: "follower",
  BLOCKED: "blocked",
};

module.exports = {

  makeFriend: function(argObject, cb) {
    // Declare response structure
    var response = { "success": false, "message": "error: you are being blocked." };

    // Check whether consist any existing connection.
    let filter = { where: { email: argObject.friends[1], friend_email: argObject.friends[0] }};
    AppModels.FriendManagement.find(filter, function(err, result) {

      // If there is any record.
      if(result != "") {
        // If email2 blocked email1.
        if(result[0].type == FriendType.BLOCKED) {
          cb(null, response);
        } else {
          var bodyObject = {
            email: argObject.friends[0],
            friend_email: argObject.friends[1],
            type: FriendType.FRIEND
          };
          Utility.MakeFriendship(bodyObject, function(err, result) {
            cb(null, result);
          });
        }
      } else {
        // Insert both email as friend relationship
        let bodyObject = [{
          email: argObject.friends[0],
          friend_email: argObject.friends[1],
          type: FriendType.FRIEND
        }, {
          email: argObject.friends[1],
          friend_email: argObject.friends[0],
          type: FriendType.FRIEND
        }, ];
        
        Utility.MakeFriendship(bodyObject, function(err, result) {
          cb(null, result);
        });
      }
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
  
  subscribe: function(argObject, cb) {
    // Declare response structure
    var response = { "success": false, "message": "error: record exist, already is subscriber." };
    var type = FriendType.SUBSCRIBE;
    
    // Check whether consist any existing connection.
    let filter = { where: { email: argObject.friends[0], friend_email: argObject.friends[1] }};
    AppModels.FriendManagement.find(filter, function(err, result) {

      // If there is any record match.
      if(result != "") {
        // If is friend relationship
        if(result[0].type == FriendType.FRIEND) {
          type = FriendType.FOLLOWER;
        } else if(result[0].type == FriendType.FOLLOWER || result[0].type == type) {
          cb(null, response);
          return;
        }
      }
      
      var bodyObject = {
        email: argObject.friends[0],
        friend_email: argObject.friends[1],
        type: type
      };
      
      Utility.UpdateFriendRelationship(bodyObject, function(err, result) {
        cb(null, result);
      });
    });        
  },
  
  block: function(argObject, cb) {
    // Declare response structure.
    var response = { "success": false, "message": "error: record exist, already blocked." };

    // Check whether consist any existing connection.
    let filter = { where: { email: argObject.friends[0], friend_email: argObject.friends[1] }};
    AppModels.FriendManagement.find(filter, function(err, result) {

      // If there is any record with block relationship.
      if(result != "" && result[0].type == FriendType.BLOCKED) {
        cb(null, response);
        return;
      }
      
      var bodyObject = {
        email: argObject.friends[0],
        friend_email: argObject.friends[1],
        type: FriendType.BLOCKED
      };
      
      Utility.UpdateFriendRelationship(bodyObject, function(err, result) {
        cb(null, result);
      });
    });        
  },
  
  sendUpdates: function(updates, cb) {
    // Declare response structure.
    var response = { "success": false, "recipients": "no result found." };
    var recipients = [];
    var email = updates.sender;
    var text = updates.text;
    var arrTaggedEmail = Utility.getTaggedEmail(text);

    // If there is @mentioned in the update.
    if(arrTaggedEmail != null) {
      recipients = recipients.concat(Utility.getTaggedEmail(text));
    }
    
    // Find friend email with input email.
    let filter = { where: { email: email }};
    AppModels.FriendManagement.find(filter, function(err, result) {
    
      // If there is any record match.
      if(result != "") {
        for(var i = 0; i < result.length; i++) {
          // If relationship is not blocked.
          if(result[i].type != FriendType.BLOCKED) {
            recipients.push(result[i].friend_email);
          }
        }
      }
      
      if(recipients.length > 0) {
        response.success = true;
        response.recipients = recipients;
      }
      cb(null, response);
    });    
  }

};
