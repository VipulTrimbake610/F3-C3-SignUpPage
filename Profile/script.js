if(localStorage.getItem('loggedInUser')){

    const dFullname = document.getElementById("dFullname"); 
    const dEmail = document.getElementById("dEmail");
    const dToken = document.getElementById("dToken");
    const dPassword = document.getElementById("dPassword");
    const btnLogout = document.getElementById('btnLogout');
    
    if(localStorage.getItem('users')){
        let users = JSON.parse(localStorage.getItem('users'));
        let loggedInUser = localStorage.getItem('loggedInUser');
        let currentUser = users.find(user=>{
            return user.token === loggedInUser;
        });
        
        
        dFullname.innerText = `Full Name : ${currentUser.fullname}`;
        dEmail.innerText = `Email : ${currentUser.email}`;
        dToken.innerText = `Token : ${currentUser.token}`;
        dPassword.innerText = `Password : ${currentUser.password}`;
    }
    
    btnLogout.addEventListener('click',(e)=>{
        localStorage.clear();
        console.log("hello");
        alert('Logged out Sucessful!');
        location.href = '..';
    })
}else{
    location.href = '..';
}
