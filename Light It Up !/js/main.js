const t = 'images/characters/Trump.png';
const k = 'images/characters/Kim.png';
const h = 'images/characters/Huan.png';
const b = 'images/characters/Bo.png';
const ba = 'images/characters/Banh.png';
const n = 'images/characters/Nick.png';
const tn = 'images/characters/TungNui.png';
const e = 'images/characters/Elonmusk.png';

function next(){
    switch (character_img.getAttribute('src')) {
        case t:
            character_img.setAttribute('src', k);
            break;
        case k:
            character_img.setAttribute('src', h);
            break;
        case h:
            character_img.setAttribute('src', b);
            break;
        case b:
            character_img.setAttribute('src', ba);
            break;
        case ba:
            character_img.setAttribute('src', n);
            break;
        case n:
            character_img.setAttribute('src', tn);
            break;
        case tn:
            character_img.setAttribute('src', e);
            break;
        case e:
            character_img.setAttribute('src', t);
            break;
        }
}

function back(){
    switch (character_img.getAttribute('src')) {
        case t:
            character_img.setAttribute('src', e);
            break;
        case e:
            character_img.setAttribute('src', tn);
            break;
        case tn:
            character_img.setAttribute('src', n);;
            break;
        case n:
            character_img.setAttribute('src', ba);
            break;
        case ba:
            character_img.setAttribute('src', b);
            break;
        case b:
            character_img.setAttribute('src', h);
            break;
        case h:
            character_img.setAttribute('src', k);
            break;
        case k:
            character_img.setAttribute('src', t);;
            break;
        }
};

function exit() {
    location.href = "https://www.google.com";
};
function credit() {
    location.href = "credit.html";
};

function toggle(id) {
    if (document.getElementById(id).style.visibility == "hidden") {
        document.getElementById(id).style.visibility = "visible";
    } else {
        document.getElementById(id).style.visibility = "hidden";
    }
};

function updateUser() {

    console.log(sessionStorage.username);
    console.log(sessionStorage.totalscore);
    console.log(sessionStorage.highestscore);
    console.log(sessionStorage.nation);

    if (sessionStorage.username){
        document.getElementById("guest").innerHTML = sessionStorage.username + '&nbsp;<span class="u-icon u-text-palette-1-dark-2 u-icon-1"><svg class="u-svg-content" viewBox="0 0 490.677 490.677" x="0px" y="0px" style="width: 1em; height: 1em;"><path d="M489.272,37.339c-1.92-3.307-5.44-5.333-9.259-5.333H10.68c-3.819,0-7.339,2.027-9.259,5.333    c-1.899,3.307-1.899,7.36,0.021,10.667l234.667,405.333c1.899,3.307,5.419,5.333,9.237,5.333s7.339-2.027,9.237-5.333 L489.251,48.005C491.149,44.72,491.149,40.645,489.272,37.339z"></path></svg><img></span>';
        document.getElementById("user").innerHTML = sessionStorage.username;
        document.getElementById("highscore").innerHTML = sessionStorage.highestscore;
        document.getElementById("totalscore").innerHTML = sessionStorage.totalscore;
        var imgname = sessionStorage.nation.split("/")[2];
        console.log(imgname);
        document.getElementById("nation").src = "images/flags_big/" + imgname;
    }
};


