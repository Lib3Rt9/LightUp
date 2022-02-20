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

var iHall = 1;

function initHall(){

    reference = ref(db, '/players/' + iHall.toString());
    //reference = ref(db, '/players/1' );
    onValue(reference, (snapshot) => {
    let data = [];
    if (snapshot.exists()){
        snapshot.forEach((child) => {
            data.push(child.val());
            console.log(data);
        })
        document.getElementById('ava'+iHall.toString()).src = data[0];
        document.getElementById('flag'+iHall.toString()).src = "images/flags_small/" + data[1];
        if (iHall == 1){
            document.getElementById('name'+iHall.toString()).innerHTML = "<span style='color: darkmagenta; font-weight: bold;'>" + data[2] + "</span>";
        } else {
            document.getElementById('name'+iHall.toString()).innerHTML = data[2];
        }
        document.getElementById('container'+iHall.toString()).style.visibility = "visible";
        console.log(iHall);
        iHall++;
        console.log(iHall);
        reference = ref(db, '/players/' + iHall.toString());
        initHall();
    } else {
        if (iHall == 10){
            return;
        } else {
            return;
        }   
    }
}) 
}
document.getElementById('hall').addEventListener('load', initHall());

function validateCustomwords(){
    var temp = document.getElementById('textarea-4ce1').value.split(',');
    if (temp.length < 4 && document.getElementById('textarea-4ce1').value != '') {
        alert("Please add at least 4 words,\nSeparated by a comma (',') !\nExample: black,white,green,red,....");
    }
}
function setRules() {
    validateCustomwords();
    var rounds = document.getElementById('select-dc6f').value;
    console.log(document.getElementById('select-dc6f').value);
    var limit = document.getElementById('select-3ca8').value;
    console.log(document.getElementById('select-3ca8').value);
    var words = document.getElementById('textarea-4ce1').value;
    console.log(document.getElementById('textarea-4ce1').value);
    var toggle = document.getElementById('checkbox-d998').value;
    console.log(document.getElementById('checkbox-d998').value);
    reference = ref(db, '/rules/');
    set(reference, {
        time: limit,
        round: rounds,
        custom: words,
        toggle: toggle,
    });
    window.location.href = 'game.html';
}

document.getElementById('start_btn').addEventListener('click', setRules);

//end of hall.html