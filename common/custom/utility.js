'use strict';

var AppModels = require('../../server/server').models;

module.exports = {

  ArrfindMatch: function(arrayOne, arrayTwo) {
    var res = []
    for (var i = 0; i < arrayOne.length; i++) {
      for (var j = 0; j < arrayTwo.length; j++) {
        if (arrayOne[i] === arrayTwo[j]) {
          res.push(arrayOne[i]);
        }
      }
    }
    return res;
  },

  ValidateBothEmail: function(argObject) {
    var response = { "success": false, "message": null };
    
    if(argObject.friends.length != 2) {
      response.message = "error: invalid request, please enter two email address only.";
    } else if(argObject.friends[0] == argObject.friends[1]) {
      response.message = "error: both email cannot be equal.";
    } else {
      response.success = true;
      response.message = "valid";
    }
    return response;
  },
  
  ValidateBothRegisteredEmail: function(argObject, cb) {
    var response = { "success": false, "message": null };
    // Ensure both email address is registered email. 
    let filter = {where: {email: {inq: [argObject.friends[0], argObject.friends[1]]}}};
    AppModels.SPUser.find(filter, function(err, result) {
      if(result.length == 2) {
        response.success = true;
        cb(null, response);
      } else {
        response.message = "error: either one or both is not registered email address.";
        cb(null, response);
      }      
    });
  },
  
  UpdateFriendRelationship: function(bodyObject, cb) {
    var response = { "success": false, "message": null };
    // Insert both email as friend relationship
    AppModels.FriendManagement.replaceOrCreate(bodyObject, function(err, result) {
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
  }  

};
