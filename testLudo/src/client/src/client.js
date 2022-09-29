

const writeEvent = (text) => {
    //<ul> element
    const parent = document.querySelector('#events');
    //<li> element
    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);
};

const onFormSubmitted = (e) => {
    e.preventDefault();


    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = '';

    sock.emit('message', text);

};

const addButtonListeners = () => {
    ['rock', 'paper', 'scissors'].forEach((id) => {
        const button = document.getElementById(id);
        button.addEventListener('click', () => {
            sock.emit('turn', id);
        });
    }); 
};
writeEvent('welcome to rps');

//const sock = io();


const io = require("socket.io-client");
const sock = io("https://api.localhost:8100", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

sock.on('message', writeEvent);



addButtonListeners();
document
    .querySelector('#chat-form')
    .addEventListener('submit', onFormSubmitted);

 
