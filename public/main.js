var socket= io.connect('http://localhost:8080', {'forceNew':true});

function setName(e){
    window.location.replace('./temas.html');
    localStorage.setItem('username', document.getElementById('username').value );

    //socket.emit('new-username', username);
    return false;
    }

socket.on('messages', function(data){
    console.log(data);
    render(data);

});


function render(data) {
       console.log(data);
        var html = data.map(function(elem,index){
            console.log(data);
            return( `<div>
                <strong>${elem.author}</strong>:
                <em>${elem.text}</em>
             </div>`);
        }).join(" ");
        console.log(html);
        document.getElementById('messages').innerHTML = html;
 }



   function addMessage(e){
    var message={
        author: localStorage.getItem('username'),
        text: document.getElementById('texto').value
    };


    socket.emit('new-message', message);
    return false;
}

