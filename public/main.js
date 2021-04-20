var socket= io.connect('http://localhost:8080', {'forceNew':true});

function setName(e){
    window.location.replace('./temas.html');
    localStorage.setItem('username', document.getElementById('username').value );
    return false;
    }

function setView(e, view){
        localStorage.setItem('viewToSave', view);
        socket.emit('view', view)
        //window.location.replace('./index'+view+'.html');
        return false;
}

function getView(view){
    return localStorage.getItem('viewToSave');
}

socket.on('messages', function(data){
    render(data);
});

function render(data) {
    var view= parseInt(localStorage.getItem('viewToSave'));
    console.log(data);
        var html = data[view-1].map(function(elem,index){
            return( `<div>
                <strong>${elem.author}</strong>:
                <em>${elem.text}</em>
             </div>`);
        }).join(" ");
        document.getElementById('messages').innerHTML = html;
 }



function addMessage(e){
    var view= localStorage.getItem('viewToSave');
    var message={
        author: localStorage.getItem('username'),
        text: document.getElementById('texto').value,
        view: view
    };
    socket.emit('new-message', message);
    return false;
}

