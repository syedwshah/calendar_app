import Rebase from 're-base';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDgq71_ei2Uifk9fTIShRyOwDCvL9kPooY",
  authDomain: "calendar-8a386.firebaseapp.com",
  databaseURL: "https://calendar-8a386.firebaseio.com",
  projectId: "calendar-8a386",
  storageBucket: "",
  messagingSenderId: "963138439604"
};

const app = firebase.initializeApp(config);
const base = = Rebase.createClass(app.database());

export { base }
