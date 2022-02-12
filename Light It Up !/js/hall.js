var childnodes = first.childNodes;
var list;
childnodes[1].src = sessionStorage.ava;
childnodes[3].innerText = sessionStorage.name;



function show_player(list){
    if (player_name.value){
        list =  player_name.value;
    }
    else{
        player =  random_name;
    };
    return list;
};

function setupRules(round, time, words, toggle) {
    reference = ref(db, 'rules/');

    set(reference, {
    rounds: round,
    limit: time,
    custom: words,
    exclusive: toggle,
    });

};