# calendar_app
It's a calendar app where you may schedule your events

Front-End: React
The front end files are basically located in /client


Back-End: Firebase
Since this is a React+Firebase App, the backend is instantiated here
and kept on Firebase's server. Connection to the backend is made
in /client/src/base.js

Deployed Link: https://calendar-dbeab.firebaseapp.com/

**Calendar** App built using React and Firebase .

Submitted by: **Syed W Shah**

## User Stories

The following **required** functionality is complete:

* [x] Click on a day box, and be able to create a new event on that day which gets sent to the backend on clicking submit. 
* [x] The UI has appropriate rows and columns per calendar month for mo/yr combination

The following **optional** features are implemented:
* [x] UI view allows you to view any month of any year
* [x] Switch between months

* [x] Handle too many events to fit in your box UI on a given day.
* [x] Can create a GET, POST, or DELETE request from the API


The following **additional** features are implemented:
* [x] Switch between years

## Walkthrough

Here's a walkthrough of implemented user stories:

https://github.com/syedwshah/calendar_app/blob/master/README.md


## Notes

Thanks to Firebase usage of sockets, if the app is open by multiple sources, they all share the same rendered view!
This makes React and Firebase a great combination, since they can seamlessly create live re-renders of React components.
