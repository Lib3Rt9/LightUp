function toggle(id) {
    if (document.getElementById(id).style.visibility == "hidden") {
        document.getElementById(id).style.visibility = "visible";
    } else {
        document.getElementById(id).style.visibility = "hidden";
    }
};

const togglePassword = document.getElementById('togglePassword');
const username = document.getElementById('username');
const password = document.getElementById('password');
const nation = document.getElementById('nation');
 
function real_eyes() {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    togglePassword.classList.toggle('fa-eye-slash');
};

function validateSignUp(event) {
    if (username.value.length > 15){
        alert('Username can not be too long !\n(MAX 15 characters)');
        if(event.preventDefault){
            event.preventDefault();
        }   
        else{
            event.returnValue = false;
        }
        username.focus();
    } else {
        if(confirm('Create new account ?\n(The Username will be used in the game)\nNote that you can change your national flag !') == false){
            if(event.preventDefault){
                event.preventDefault();
            }   
            else{
                event.returnValue = false;            
            }
            username.focus();
        } 
        else {
            event.returnValue = true;
        }
    }
}
function validateModify(event) {
    if (username.value.length > 15){
        alert('Username can not be too long !\n(MAX 15 characters)');
        if(event.preventDefault){
            event.preventDefault();
        }   
        else{
            event.returnValue = false;
        }
        username.focus();
    } else {
        if(confirm('Modify your account ?') == false){
            if(event.preventDefault){
                event.preventDefault();
            }   
            else{
                event.returnValue = false;            
            }
            username.focus();
        } 
        else {
            event.returnValue = true;
        }
    }
}