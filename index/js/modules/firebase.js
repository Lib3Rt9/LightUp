import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, onValue, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";


const firebaseConfig = {
apiKey: "AIzaSyDhrBmnayr9BviXr3cQ2xt0XIniEajg0DQ",
authDomain: "light-up-8d93a.firebaseapp.com",
databaseURL: "https://light-up-8d93a-default-rtdb.firebaseio.com",
projectId: "light-up-8d93a",
storageBucket: "light-up-8d93a.appspot.com",
messagingSenderId: "219046596000",
appId: "1:219046596000:web:e5a1ad6d905e154e8768c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
var reference;

function addPlayer(player, img) {
    reference = push(ref(db, 'players/'));

    set(reference, {
    name: player,
    avatar: img,
    });
    onValue(ref(db, 'players/'), (snapshot) => {
    var data = Object.keys(snapshot.val());
    console.log(data);
});
};

play_btn.addEventListener('click', function() {
    var img;
    var player;

    const t = 'images/characters/Trump.png';
    const k = 'images/characters/Kim.png';
    const h = 'images/characters/Huan.png';
    const b = 'images/characters/Bo.png';
    const ba = 'images/characters/Banh.png';
    const n = 'images/characters/Nick.png';
    const tn = 'images/characters/TungNui.png';
    const e = 'images/characters/Elonmusk.png';

    const ta = 'images/characters/Trump_avatar.png';
    const ka = 'images/characters/Kim_avatar.png';
    const ha = 'images/characters/Huan_avatar.png';
    const bav = 'images/characters/Bo_avatar.png';
    const baa = 'images/characters/Banh_avatar.png';
    const na = 'images/characters/Nick_avatar.png';
    const tna = 'images/characters/TungNui_avatar.png';
    const ea = 'images/characters/Elonmusk_avatar.png';

    switch (character_img.getAttribute('src')) {
        case t:
            img = ta;
            break;
        case k:
            img = ka;
            break;
        case h:
            img = ha;
            break;
        case b:
            img = bav;
            break;
        case ba:
            img = baa;
            break;
        case n:
            img = na;
            break;
        case tn:
            img = tna;
            break;
        case e:
            img = ea;
            break;
        };
        player = player_name.value;
        
    addPlayer(player, img);
});