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

function modify() {
    window.location.href='modify.html?id='+phpid;
}

if (phpdata) { 
    document.getElementById("flag").src = "images/flags/" + phpdata[3];
    document.getElementById("flag_btn").removeAttribute("onclick");
    document.getElementById("name-1d20").value = phpdata[0];
    document.getElementById("name-1d20").setAttribute("disabled", "true");
    document.getElementById("guest").innerHTML = phpdata[0] + '&nbsp;<span class="u-icon u-text-palette-1-dark-2 u-icon-1"><svg class="u-svg-content" viewBox="0 0 490.677 490.677" x="0px" y="0px" style="width: 1em; height: 1em;"><path d="M489.272,37.339c-1.92-3.307-5.44-5.333-9.259-5.333H10.68c-3.819,0-7.339,2.027-9.259,5.333    c-1.899,3.307-1.899,7.36,0.021,10.667l234.667,405.333c1.899,3.307,5.419,5.333,9.237,5.333s7.339-2.027,9.237-5.333 L489.251,48.005C491.149,44.72,491.149,40.645,489.272,37.339z"></path></svg><img></span>';
    document.getElementById("user").innerHTML = phpdata[0];
    document.getElementById("highscore").innerHTML = phpdata[1];
    document.getElementById("totalscore").innerHTML = phpdata[2];
    document.getElementById("big_flag").src = "images/flags_big/" + phpdata[3];
}

if (phplist) {
    for (var i = 0; i < phplist[0].length;i++){
        if (i == 0){
            document.getElementById("top_player").innerHTML += "<div class='u-border-2 u-border-grey-75 u-container-style u-list-item u-palette-3-light-3 u-repeater-item u-list-item-10'><div class='u-container-layout u-similar-container u-container-layout-10'><img class='u-image u-image-default u-preserve-proportions u-image-12' src=images/flags/" + phplist[3][i] +" alt='' data-image-width='80' data-image-height='60'><h3 class='u-text u-text-default u-text-2'><span style='color: crimson;'>" + phplist[0][i] + "</span><span style='color:darkmagenta;'>#" + (i+1) + "</span></h3><h3 class='u-text u-text-default u-text-3'>Total:" + phplist[1][i] + "</h3><h3 class='u-text u-text-default u-text-4'>Highscore:" + phplist[2][i] + "</h3></div></div>";
        } else if (i == 1) {
            document.getElementById("top_player").innerHTML += "<div class='u-border-2 u-border-grey-75 u-container-style u-list-item u-palette-3-light-3 u-repeater-item u-list-item-10'><div class='u-container-layout u-similar-container u-container-layout-10'><img class='u-image u-image-default u-preserve-proportions u-image-12' src=images/flags/" + phplist[3][i] +" alt='' data-image-width='80' data-image-height='60'><h3 class='u-text u-text-default u-text-2'><span style='color:darkblue;'>" + phplist[0][i] + "</span><span style='color:darkmagenta;'>#" + (i+1) + "</span></h3><h3 class='u-text u-text-default u-text-3'>Total:" + phplist[1][i] + "</h3><h3 class='u-text u-text-default u-text-4'>Highscore:" + phplist[2][i] + "</h3></div></div>";
        } else if (i == 2){
            document.getElementById("top_player").innerHTML += "<div class='u-border-2 u-border-grey-75 u-container-style u-list-item u-palette-3-light-3 u-repeater-item u-list-item-10'><div class='u-container-layout u-similar-container u-container-layout-10'><img class='u-image u-image-default u-preserve-proportions u-image-12' src=images/flags/" + phplist[3][i] +" alt='' data-image-width='80' data-image-height='60'><h3 class='u-text u-text-default u-text-2'><span style='color:orangered;'>" + phplist[0][i] + "</span><span style='color:darkmagenta;'>#" + (i+1) + "</span></h3><h3 class='u-text u-text-default u-text-3'>Total:" + phplist[1][i] + "</h3><h3 class='u-text u-text-default u-text-4'>Highscore:" + phplist[2][i] + "</h3></div></div>";
        } else {
            document.getElementById("top_player").innerHTML += "<div class='u-border-2 u-border-grey-75 u-container-style u-list-item u-palette-3-light-3 u-repeater-item u-list-item-10'><div class='u-container-layout u-similar-container u-container-layout-10'><img class='u-image u-image-default u-preserve-proportions u-image-12' src=images/flags/" + phplist[3][i] +" alt='' data-image-width='80' data-image-height='60'><h3 class='u-text u-text-default u-text-2'><span style='color:green;'>" + phplist[0][i] + "</span><span style='color:darkmagenta;'>#" + (i+1) + "</span></h3><h3 class='u-text u-text-default u-text-3'>Total:" + phplist[1][i] + "</h3><h3 class='u-text u-text-default u-text-4'>Highscore:" + phplist[2][i] + "</h3></div></div>";
        }
    }
}

function checkLength(event){
    if (document.getElementById("name-1d20").value.length == 15){
        event.preventDefault();
        alert("Name can not be too long !\n(MAX 15 characters)");
    }    
}

// function process_name(name) {
//     for (var space = 13 - name.length; space > 0; space--){
//         name += "&ensp;";
//         console.log(name);
//     }
//     return name;
// }
// function process_total(total) {
//     var string = total.toString();
//     for (var space = 9 - string.length; space > 0; space--){
//         string = "&ensp;" + string;
//         console.log(string);
//     }
//     return string;
// }
// function process_highscore(highscore) {
//     var string = highscore.toString();
//     for (var space = 5 - string.length; space > 0; space--){
//         string = "&ensp;" + string;
//         console.log(string);
//     }
//     return string;
// }
