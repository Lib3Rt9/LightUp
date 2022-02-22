import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref, push, onValue, set, get, child, remove, off } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

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
var reference ;
var rounds;
var time_limit;
var currentTime;
var population;
var theWord;
var theHint;
var drawer;
var drawturn = true;


const canvas = document.getElementById('theCanvas');
const container = document.getElementById('canvasContainer');
const ctx = canvas.getContext('2d');
const words = [
    "alligator",
    "america",
    "angle",
    "ant",
    "applause",
    "apple",
    "archer",
    "arm",
    "army",
    "artist",
    "avocado",
    "baby",
    "backbone",
    "bag",
    "baker",
    "ball",
    "band",
    "baseball",
    "basin",
    "basket",
    "bath",
    "bathroom",
    "battery",
    "bed",
    "bug",
    "bee",
    "beehive",
    "bell",
    "berry",
    "bicycle",
    "bird",
    "birthday cake",
    "birthday",
    "blade",
    "bleach",
    "board",
    "boat",
    "bomb",
    "bone",
    "bonnet",
    "book",
    "boots",
    "bottle",
    "bow tie",
    "box",
    "boy",
    "brain",
    "brake",
    "branch",
    "brick",
    "bridge",
    "bruise",
    "brush",
    "bucket",
    "bulb",
    "button",
    "cabin",
    "cake",
    "camera",
    "card",
    "cardboard",
    "carriage",
    "cart",
    "cat",
    "ceiling",
    "chain",
    "chalk",
    "chameleon",
    "charger",
    "cheerleader",
    "cheese",
    "chef",
    "chess",
    "chime",
    "chin",
    "church",
    "circle",
    "circus",
    "cliff",
    "cloak",
    "clock",
    "cloud",
    "coach",
    "coal",
    "coat",
    "collar",
    "comb",
    "comedian",
    "computer",
    "convertible",
    "cord",
    "cow",
    "cowboy",
    "cruise",
    "crust",
    "cup",
    "cupcake",
    "curtain",
    "cushion",
    "darts",
    "deep",
    "dent",
    "dentist",
    "diving",
    "dog",
    "doghouse",
    "door",
    "doormat",
    "drain",
    "drawer",
    "dream",
    "dress",
    "drip",
    "drop",
    "dust",
    "ear",
    "egg",
    "electricity",
    "engine",
    "extension cord",
    "eyes",
    "face",
    "farm",
    "feather",
    "finger",
    "firefighter",
    "fish",
    "fizz",
    "flag",
    "flagpole",
    "floor",
    "flute",
    "fly",
    "fog",
    "foot",
    "fork",
    "fowl",
    "frame",
    "french fries",
    "frog",
    "garbage",
    "garden",
    "garfield",
    "gate",
    "giant",
    "girl",
    "glove",
    "goat",
    "goblin",
    "golden retriever",
    "gun",
    "hair dryer",
    "hair",
    "hammer",
    "hand",
    "handle",
    "hat",
    "head",
    "headphones",
    "heart",
    "hockey",
    "hook",
    "hopscotch",
    "horn",
    "horse",
    "hospital",
    "hot dog",
    "hot tub",
    "house",
    "houseboat",
    "hurdle",
    "internet",
    "island",
    "jewel",
    "joke",
    "kettle",
    "key",
    "knee",
    "kneel",
    "knife",
    "knight",
    "knot",
    "koala",
    "lace",
    "lap",
    "lawnmower",
    "leaf",
    "leak",
    "leg",
    "light bulb",
    "lighthouse",
    "line",
    "lip",
    "lock",
    "mailman",
    "map",
    "mascot",
    "match",
    "mattress",
    "money",
    "monkey",
    "moon",
    "mouth",
    "muscle",
    "mushroom",
    "music",
    "nail",
    "nature",
    "neck",
    "needle",
    "neet",
    "nerve",
    "net",
    "newspaper",
    "nightmare",
    "nose",
    "nut",
    "oar",
    "office",
    "orange",
    "outside",
    "oven",
    "owl",
    "pajamas",
    "parcel",
    "park",
    "password",
    "peach",
    "pen",
    "pencil",
    "pharmacist",
    "photograph",
    "picnic",
    "picture",
    "pig",
    "pilot",
    "pin",
    "pineapple",
    "ping pong",
    "pinwheel",
    "pipe",
    "pirate",
    "plane",
    "plank",
    "plate",
    "plough",
    "pocket",
    "pool",
    "popsicle",
    "post office",
    "pot",
    "potato",
    "prison",
    "pump",
    "puppet",
    "purse",
    "queen",
    "quilt",
    "raft",
    "rail",
    "raincoat",
    "rat",
    "ray",
    "receipt",
    "ring",
    "rod",
    "roof",
    "root",
    "rug",
    "safe",
    "sail",
    "salmon",
    "salt and pepper",
    "sandbox",
    "scale",
    "school",
    "scissors",
    "screw",
    "season",
    "seed",
    "shallow",
    "shampoo",
    "sheep",
    "sheets",
    "shelf",
    "ship",
    "shirt",
    "shoe",
    "shrink",
    "skate",
    "ski",
    "skin",
    "skirt",
    "sleep",
    "snake",
    "sneeze",
    "snowball",
    "sock",
    "song",
    "spade",
    "speakers",
    "sponge",
    "spoon",
    "spring",
    "sprinkler",
    "square",
    "stamp",
    "star",
    "state",
    "station",
    "stem",
    "stick",
    "stingray",
    "stocking",
    "stomach",
    "store",
    "street",
    "suitcase",
    "sun",
    "sunburn",
    "sushi",
    "swamp",
    "sweater",
    "table",
    "tail",
    "teapot",
    "thief",
    "think",
    "thread",
    "throat",
    "thumb",
    "ticket",
    "time machine",
    "tiptoe",
    "toe",
    "tongue",
    "tooth",
    "town",
    "train",
    "tray",
    "treasure",
    "tree",
    "trip",
    "trousers",
    "turtle",
    "tusk",
    "tv",
    "umbrella",
    "violin",
    "wall",
    "watch",
    "watering can",
    "wax",
    "wedding dress",
    "wheel",
    "whip",
    "whistle",
    "wig",
    "window",
    "wing",
    "wire",
    "worm",
    "yardstick",
    "zoo",
    "zoom",
    
]
var iGame = 1;

function initG(){
    reference = ref(db, '/players/' + iGame.toString());
    onValue(reference, (snapshot) => {
    let data = [];
    if (snapshot.exists()){
        snapshot.forEach((child) => {
            data.push(child.val());
        })
        console.log(data);
        document.getElementById('ava'+iGame.toString()).src = data[0];
        document.getElementById('flag'+iGame.toString()).src = "images/flags_small/" + data[1];
        document.getElementById('name'+iGame.toString()).innerHTML = data[2];
        document.getElementById('score'+iGame.toString()).innerHTML = "<span style='color:darkgreen'>"+ data[3]+"</span>";
        document.getElementById('container'+iGame.toString()).style.visibility = "visible";
        iGame++;
        reference = ref(db, '/players/' + iGame.toString());
        initG();
    } else {
        if (iGame == 10){
            return;
        } else {
            return;
        }   
    }
}) 
}
document.getElementById('game').addEventListener('load', initGame());
function initGame() {
    document.getElementById('w1').addEventListener('click', newWord1);
    document.getElementById('w2').addEventListener('click', newWord2);
    document.getElementById('w3').addEventListener('click', newWord3);
    
    canvas.addEventListener('mouseup', stopPainting);
    initG();
    generateWords();
}
// Resizes the canvas to the available size of the window.
// function startPainting(){
//     console.log('mousedown');
// }
// function stopPainting(){
//     console.log('mouseup');
// }
// function sketch(){
//     console.log('mousedrag');
// }
// document.getElementById('w1').addEventListener('click', newWord);
// document.getElementById('w2').addEventListener('click', newWord);
// document.getElementById('w3').addEventListener('click', newWord);

get(ref(db, 'rules')).then((snapshot) => {
    let data = [];
    snapshot.forEach((child) => {
        data.push(child.val());
    })
    console.log(data);
    rounds = parseInt(data[1]);
    time_limit = parseInt(data[2]);
    console.log("Rounds:"+rounds);
    console.log("Time:"+time_limit);
   
})// get rules

// onValue(ref(db, 'current'), (snapshot) => {
//     let data;
//     if (snapshot.exists()){
//         snapshot.forEach((child) => {
//             data = child.val();
//         })
//         currentTime = data;
//         console.log("current time:"+data);
//         setTimeout(hint(theWord), 1000);
//     }
// }) //get current time of drawer

onValue(ref(db, 'players'), (snapshot) => {
    var count = 0;
    snapshot.forEach((child) => {
        count++;
    })
    population = count;
    console.log(population);
}) //count number of player

onValue(ref(db, 'round'), (snapshot) => {
    let data = [];
    snapshot.forEach((child) => {
        data.push(child.val());
    })
    console.log('round:'+ data);
    console.log(data[2]);
    drawer = data[0];
    console.log("init:"+drawer);
    if(!drawer) {
        drawer = 1;
        console.log("update:"+drawer);
    }
    else if (drawer == population) {
        drawer = 1;
    } else {
        drawer++;
    }
    console.log("last:"+drawer);
    theWord = data[2];
    console.log('theword:'+ theWord)
    if(theWord){
        sessionStorage.word = theWord;
        theHint = decrypt(theWord);
        hint();
    }
})

function hint() {
    let temp = time_limit;
    var interval = setInterval(function() {
        wordhint.innerHTML = 'Hint: ' + theHint + '(' + temp-- + ')';
        if (temp == -1) {
            clearInterval(interval);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            history.splice(0, history.length)
            document.getElementById('notification').style.visibility = "visible";
            generateWords();
        } else if (document.getElementById('notification').style.visibility == "visible"){
            clearInterval(interval);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            history.splice(0, history.length);
            generateWords();
        }
    }, 1000);
}
function decrypt(word) {
    var temp = word.split(' ');
    console.log(temp);
    var text = '';

    for (var i = 0; i < temp.length; i++){
        let str = new Array(temp[i].length + 1).join('ˍ');
        if (temp[i].length < 4) {
            var random =  Math.floor(Math.random() * temp[i].length);
            str = str.substring(0, random) + temp[i][random] + str.substring(random + 1);
        }
        else {
            for (var j = 0; j < Math.floor(temp[i].length/4); j++) {
            var random =  Math.floor(Math.random() * temp[i].length);
            str = str.substring(0, random) + temp[i][random] + str.substring(random + 1);
            }
        }
        text += str + " ";
    }
    return text;
}

function newWord1() {
    theWord = document.getElementById('w1').innerHTML;
    console.log(theWord);
    document.getElementById('notification').style.visibility = "hidden";
    set(ref(db, 'round'), {
        drawer: drawer,
        word: theWord,
        time: time_limit,
    });
}
function newWord2() {
    theWord = document.getElementById('w2').innerHTML;
    console.log(theWord);
    document.getElementById('notification').style.visibility = "hidden";
    set(ref(db, 'round'), {
        drawer: drawer,
        word: theWord,
        time: time_limit,
    });
}
function newWord3() {
    theWord = document.getElementById('w3').innerHTML;
    console.log(theWord);
    document.getElementById('notification').style.visibility = "hidden";
    set(ref(db, 'round'), {
        drawer: drawer,
        word: theWord,
        time: time_limit,
    });
}
function generateWords(){
    document.getElementById('guess').removeAttribute("disabled");
    document.getElementById('guess').value = "";
    document.getElementById('guess').focus();
    while (true){
        document.getElementById('w1').innerHTML = words[Math.floor(Math.random()*words.length)];
        document.getElementById('w2').innerHTML = words[Math.floor(Math.random()*words.length)];
        document.getElementById('w3').innerHTML = words[Math.floor(Math.random()*words.length)];
        if (document.getElementById('w1').innerHTML != document.getElementById('w2').innerHTML 
        && document.getElementById('w1').innerHTML != document.getElementById('w3').innerHTML 
        && document.getElementById('w3').innerHTML != document.getElementById('w2').innerHTML){
            break;
        } else {
            continue;
        }
    }
    document.getElementById('notification').style.visibility = "visible";
    var i = 12;
    var nohesitation = setInterval(function() {
        document.getElementById('choices').innerHTML = 'Choose a word to draw (' + i-- + ')';
        console.log(i);
        if (document.getElementById('notification').style.visibility == "hidden") {
            clearInterval(nohesitation);
        }
        else if (i == -1) {
            clearInterval(nohesitation);
            theWord = document.getElementById('w2').innerHTML;
            document.getElementById('notification').style.visibility = "hidden";
            set(ref(db, 'round'), {
                drawer: drawer,
                word: theWord,
                time: time_limit,
            });
        }
    }, 1000);    
}
  
const history = [];

var drawlines;

onValue(ref(db, 'canvas'), (snapshot) => {
    let data;
    snapshot.forEach((child) => {
        data = child.val();
    })
    var img = new Image();
    img.src = data;
    img.onload = function () {
        ctx.drawImage(this, 0, 0);
    }
})
document.getElementById('reset').addEventListener('click', Reset);
function Reset(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawlines = canvas.toDataURL();
    history.push(drawlines);

    set(ref(db, 'canvas'), {
        draw: drawlines,
    });
}
document.getElementById('undo').addEventListener('click', Undo);
function Undo(){
    history.pop();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = new Image();
    img.src = history[history.length - 1];
    img.onload = function () {
        ctx.drawImage(this, 0, 0); 
    } 
    drawlines = history[history.length - 1];
    set(ref(db, 'canvas'), {
        draw: drawlines,
    });
}

function stopPainting(){
    drawlines = canvas.toDataURL();
    history.push(drawlines);

    set(ref(db, 'canvas'), {
        draw: drawlines,
    });
}   










