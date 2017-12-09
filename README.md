# loopback-friends-management
loopback framework / demo friends management Rest API

Example of basic **Friends Management Rest API** application developed with **Strongloop/Loopback JS**.

### Features:
- All below API have common error handling like:
> Verify email address are registered email. <br>
> Verify both email are not equal. (For some API) <br>
> Verify parameter consist two email. (For some API) <br>

* API to create a friend connection between two email addresses.
> Check email one is not blocked by email two. <br>

* API to retrieve the friends list for an email address.
* API to retrieve the common friends list between two email addresses.
* API to subscribe to updates from an email address.
> Subscribe not equal to make friend. <br>

* API to block updates from an email address.
> If friend relationship exist, no longer received updates. <br>
> Else, no new friends connection can be added. <br>

* API to retrieve all email addresses that can receive updates from an email address.
> Has not blocked updates. <br>
> Has a friend connection. <br>
> Has been @mentioned in the update. <br>



### Change The Code! Installation Step Below: <br>
My main goal for this is to give new programmers some code to look at and talk about.

*Open your terminal*
```bash
$ git clone https://github.com/kankongmeng/loopback-friends-management.git
$ cd loopback-friends-management
$ npm install
$ npm start
```

*Remarks: You can use sample registered email from below or register email using SPUser API.*

### Sample Registered Email <br>
Live Demo: https://loopback-friends-management.herokuapp.com/explorer/#!/SPUser/SPUser_find <br>
![SPUser Get](https://raw.githubusercontent.com/kankongmeng/loopback-friends-management/master/screenshot/SampleUserEmail.JPG)

### Main API Explorer <br>
Live Demo: https://loopback-friends-management.herokuapp.com/explorer/ <br>
![Main API Explorer](https://raw.githubusercontent.com/kankongmeng/loopback-friends-management/master/screenshot/MainApiExplorer.JPG)

### Make Friend API Example <br>
Live Demo: https://loopback-friends-management.herokuapp.com/explorer/#!/FriendManagement/FriendManagement_makeFriend <br>
![Make Friend API Example](https://raw.githubusercontent.com/kankongmeng/loopback-friends-management/master/screenshot/UserStory2Example.JPG)


### Deploy?

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

*[learn more about](https://devcenter.heroku.com/articles/app-json-schema)*

