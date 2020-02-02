//@flow
$('document').ready(()=>{
    let socket = io.connect('http://localhost:3000');
    $("#part").on('click', () =>{
        window.location.href = '/participants';
    });
    $("#img").on('click', ()=>{
        window.location.href = '/paintings';
    });
    $("#auc").on('click', ()=>{
        window.location.href = '/auction';
    });
    $("#set").on('click', ()=>{
        window.location.href = '/settings';
    });
    
    let username:?string = localStorage.getItem('lab3.username');
    if(username === ""){
        $("#username").text("Guest");
        $("#auth").html("Log in");
        $("#auth").on("click", ()=>{
            window.location.href = '/';
        });
    } else {
        socket.emit('username', username);
        socket.on('identification',(res)=>{
            if(res === 'error'){
                window.location.href = '/';
            }
        })
        $("#username").text(username);
        $("#auth").html("Log out");
        $("#auth").on("click", ()=>{
            localStorage.setItem('lab3.username', "");
            window.location.href = '/';
        });
    }
})