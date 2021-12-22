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
}