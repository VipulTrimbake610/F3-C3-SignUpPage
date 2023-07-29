if(localStorage.getItem('loggedInUser')){
    location.href = '/profile';
}
else{

    const fullname = document.getElementById('iName');
    const email = document.getElementById('iEmail');
    const password = document.getElementById('iPassword');
    const cpassword = document.getElementById('icPassword');
    const btncontinue = document.getElementById('btnContinue');
    const errorBlock = document.getElementsByClassName('errorBlock')[0];
    
    function checkIfUserExist(email){
        let users = JSON.parse(localStorage.getItem('users'));
        const obj = users.find(userObj=>{
            return userObj.email === email;
        })
        if(obj) return true;
    else return false;
}
function saveUser(name,email,password){
    const randomString = generate16ByteString();
    let userObj = {
        fullname:name,
        email:email,
        password:password,
        token:randomString,
    }
    let users = JSON.parse(localStorage.getItem('users'));
    if(users === null){
        users = [];
    }
    users.push(userObj);
    localStorage.setItem('users',JSON.stringify(users))
    localStorage.setItem('loggedInUser',randomString)
    alert('Sign Up Successful!');
    location.href = '/profile';
}
function generate16ByteString() {
    const numBytes = 16;
    const array = new Uint8Array(numBytes);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}


btncontinue.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log(localStorage.getItem('users'));
    if(fullname.value.trim() === '' || email.value.trim() === '' || password.value.trim() === '' || cpassword.value.trim() === ''){
        errorBlock.innerText = "Error : All Fields Are Mandatory!";
    }else{
        if(password.value.trim() !== cpassword.value.trim()) {
            errorBlock.innerText = 'Password Should be Same!';
        }else{
            if(localStorage.getItem('users')){
                if(checkIfUserExist(email.value)){
                    alert('email is linked with another account');
                }else{
                    saveUser(fullname.value,email.value, password.value);
                }
            }else{
                saveUser(fullname.value,email.value, password.value);
            }
        }
    }
});
}