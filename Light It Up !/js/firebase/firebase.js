import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref, push, onValue, set, get, child, remove } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

const firebaseConfig = {
apiKey: "AIzaSyDhrBmnayr9BviXr3cQ2xt0XIniEajg0DQ",
authDomain: "light-up-8d93a.firebaseapp.com",
databaseURL: "https://light-up-8d93a-default-rtdb.firebaseio.com",
projectId: "light-up-8d93a",
storageBucket: "light-up-8d93a.appspot.com",
messagingSenderId: "219046596000",
appId: "1:219046596000:web:e5a1ad6d905e154e8768c5"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
var reference;
