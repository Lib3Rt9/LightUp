function chat_guess(event) {
    let unicode= event.which;
    if (unicode == 13){
        event.preventDefault();
        if (guess.value != ''){
            if (guess.value.toLowerCase() == theWord.toLowerCase()){
                document.getElementById("chatmsg").innerHTML += "<span style='color:green;'>Username guessed the word !</span><br>";
                document.getElementById('guess').setAttribute("disabled", "true");
                chatmsg.scrollTop = chatmsg.scrollHeight;
            } else {
                document.getElementById("chatmsg").innerHTML += guess.value + "<br>";
                guess.value = "";
                chatmsg.scrollTop = chatmsg.scrollHeight;
            }
            
        }
    }
}
function chat_guess2() {
    if (guess.value != ''){
        if (guess.value.toLowerCase() == theWord.toLowerCase()){
            document.getElementById("chatmsg").innerHTML += "<span style='color:green;'>Username guessed the word !</span><br>";
            document.getElementById('guess').setAttribute("disabled", "true");
            chatmsg.scrollTop = chatmsg.scrollHeight;
            guess.focus();
        } else {
            document.getElementById("chatmsg").innerHTML += guess.value + "<br>";
            guess.value = "";
            chatmsg.scrollTop = chatmsg.scrollHeight;
            guess.focus();
        }
    } else {
        guess.focus();
    }
}

const canvas = document.getElementById('theCanvas');
const container = document.getElementById('canvasContainer');

function initCanvas() {
    resize();
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mousemove', sketch);
    window.addEventListener('resize', resize);
    hint('Hall of Vahalla'); //test function
}


// Resizes the canvas to the available size of the window.
function resize(){
    ctx.canvas.width = container.clientWidth;
    ctx.canvas.height = container.clientHeight;
}

const ctx = canvas.getContext('2d');
let coord = {x:0 , y:0}; 
let coord2 = {x:0 , y:0}; 
let paint = false;


    
var mode = 'normal';

function toggle(entermode){
    mode = entermode;
}
function getPosition(event){
    coord.x = event.offsetX;
    coord.y = event.offsetY;
}  
function getPosition2(event){
    coord2.x = event.offsetX;
    coord2.y = event.offsetY;
}  
function startPainting(event){
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';  
    ctx.strokeStyle = lineColor;

    if (mode == 'normal') {
        paint = true;
        getPosition(event);
    } else if (mode == 'line') {
        getPosition(event);
        ctx.beginPath();
      
        ctx.moveTo(coord.x, coord.y);
    } else if (mode == 'circle') {
        getPosition(event);
        paint = true;
    } else if (mode == 'hexagon') {
        var numberOfSides = 6;
        var size = lineWidth * 10;
        getPosition(event);
        
        ctx.beginPath();
        ctx.moveTo (coord.x +  size * Math.cos(0), coord.y +  size *  Math.sin(0));          
        
        for (var i = 1; i <= numberOfSides;i += 1) {
        ctx.lineTo (coord.x + size * Math.cos(i * 2 * Math.PI / numberOfSides), coord.y + size * Math.sin(i * 2 * Math.PI / numberOfSides));
        }
        ctx.stroke();
    }
}
function stopPainting(event){
    if (mode == 'normal') {
        paint = false;
    } else if (mode == 'line') {
        getPosition(event);
      
        ctx.lineTo(coord.x , coord.y);
        ctx.stroke();
    } else if (mode == 'circle') {
        if (!paint) {
            return;
        }
        ctx.stroke();
        paint = false;
    }

    saveState(); 
}   
function sketch(event){

    if (mode == 'normal'){
        if (!paint) return;
        ctx.beginPath();
      
        ctx.moveTo(coord.x, coord.y);
      
        getPosition(event);
      
        ctx.lineTo(coord.x , coord.y);
      
        ctx.stroke();
    } else if (mode == 'circle'){
        if (!paint) {
            return;
        }
        getPosition2(event);

        ctx.beginPath();
        ctx.moveTo(coord.x, coord.y + (coord2.y - coord.y) / 2);
        ctx.bezierCurveTo(coord.x, coord.y, coord2.x, coord.y, coord2.x, coord.y + (coord2.y - coord.y) / 2);
        ctx.bezierCurveTo(coord2.x, coord2.y, coord.x, coord2.y, coord.x, coord.y + (coord2.y - coord.y) / 2);
        ctx.closePath();
    }
}




document.getElementById('canvasContainer');

var lineWidth = 10;
var lineColor = '#000000';

function changeLC(color) {

    if (color == '#FFFFFF' && lineColor != '#FFFFFF'){
        document.getElementById('linewidth').min =  4;
        document.getElementById('linewidth').max = 36;
        document.getElementById('linewidth').step = 4;
        document.getElementById('linewidth').value = lineWidth * 2;
        lineWidth = document.getElementById('linewidth').value;
        lineColor = color;
    }
    else if (color != '#FFFFFF' && lineColor == '#FFFFFF') {
        document.getElementById('linewidth').min =  2;
        document.getElementById('linewidth').max = 18;
        document.getElementById('linewidth').step = 2;
        document.getElementById('linewidth').value = lineWidth / 2;
        lineWidth = document.getElementById('linewidth').value;
        lineColor = color;     
    }
    else{
        lineColor = color;
    }
}

function changeLW() {
    lineWidth = document.getElementById('linewidth').value;
}

function resetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveState();
}

const history = [];

function saveState(){      
    history.push(canvas.toDataURL()); 
}

function undo() {
    if(history.length) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        history.pop();

        var img = new Image();
        img.width = canvas.width;
        img.height = canvas.height;
        img.src = history[history.length - 1];

        img.onload = function () {
            ctx.drawImage(this, 0, 0);
        }
    }
}

var time_limit = 60;

function hint(word) {
    var temp = word.split(' ');
    console.log(temp);
    var text = '';

    for (var i = 0; i < temp.length; i++){
        str = new Array(temp[i].length + 1).join('ˍ');
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

    var interval = setInterval(function() {
        wordhint.innerHTML = 'Hint: ' + text + '(' + time_limit-- + ')';
        if (time_limit == -1) {
            clearInterval(interval);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            history.splice(0, history.length)
            document.getElementById('notification').style.visibility = "visible";
            generateWords();
        }
    }, 1000);
}

function newWord(event) {
    x = event.target;
    time_limit = 60;
    theWord = x.innerHTML;
    hint(theWord);
    document.getElementById('notification').style.visibility = "hidden";
}

var theWord = "Hall of Vahalla";

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
            time_limit = 60;
            hint(theWord);
            document.getElementById('notification').style.visibility = "hidden";
        }
    }, 1000);    
}

function gameEnd(){
    //document.getElementById('finalScore').value = ? ;
    document.getElementById('gamend').submit();
}

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
