function userMessage() {
    const messageVal = snapshotV;
    const message = messageVal.message;
    const messageElement = document.createElement("div");
    const time = messageVal.time;
    messageElement.classList.add("message-holder");

    messageElement.innerHTML = (`
        <div class="user-message">
            <div id="message-holder">
                <p id="sender">${userName + ':'}</p>
                <p id="message">${message}</p>
                <p class="user-time">${time}</p>
            </div>
        </div>
    `)

    // Adds the message to the body
    body.appendChild(messageElement);

    // Message autoscrolls into view
    messageElement.scrollIntoView();
}

function senderMessage() {
    const messageVal = snapshotV;
    const message = messageVal.message;
    const messageElement = document.createElement("div");
    const time = messageVal.time;
    messageElement.classList.add("received-message-holder");

    messageElement.innerHTML = (`
        <div class="received-message">
            <div id="received-message-holder">
                <p id="sender">${messageVal.userName}</p>
                <p id="message">${message}</p>
                <p class="sender-time">${time}</p>
            </div>
        </div>
    `)

    // Adds the message to the body
    body.appendChild(messageElement);

    // Message autoscrolls into view
    messageElement.scrollIntoView();
}

function userSentMessage() {
    if (messageInput.value.length != 0) {
        // The user sent a message with data

        // Checks for if the message if bigger than 25 letter
        if (messageInput.value.length <= 25) smallerMessage(); else if (messageInput.value.length > 25 && messageInput.value.length <= 50) {
            biggerMessage();
        } else if (messageInput.value.length > 50 && messageInput.value.length <= 75) {
            evenBiggerMessage();
        } else if (messageInput.value.length > 75 && messageInput.value.length <= 100) {
            biggestMessage();
        }

        // Gets the date and time the message was sent
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + '' + time;
        let messageId = userId + dateTime;
        let timeAmPm = getTime();

        // Sends message to firebase
        messageRef = firebase.database().ref(`messages/${messageId}`);

        messageRef.set({
            userId,
            message: aMessage,
            time: timeAmPm,
            date: 'on ' + date,
            userName: userName + ':',
        });

        // Clears the send message feild after the user sends a message
        messageInput.value = '';

    } else {
        // The user tried to send an empty message
    }
}

function smallerMessage() {
    aMessage = messageInput.value;
}

function biggerMessage() {
    let f25 = messageInput.value.substring(0, 25);
    let l25 = messageInput.value.substring(25, messageInput.value.length);

    aMessage = (f25 + '<br>') + l25;
}

function evenBiggerMessage() {
    let f25 = messageInput.value.substring(0, 25);
    let s25 = messageInput.value.substring(25, 50);
    let l25 = messageInput.value.substring(50, messageInput.value.length);


    aMessage = (f25 + '<br>') + (s25 + '<br>') + l25;
}

function biggestMessage() {
    let f25 = messageInput.value.substring(0, 25);
    let s25 = messageInput.value.substring(25, 50);
    let t25 = messageInput.value.substring(50, 75);
    let l25 = messageInput.value.substring(75, messageInput.value.length);


    aMessage = (f25 + '<br>') + (s25 + '<br>') + (t25 + '<br>') + l25;
}

function getTime(){
    let today = new Date();
    let hours24 = today.getHours();
    let minutes24 = today.getMinutes();
    let minutes12 = minutes24 < 10 ? '0' + minutes24 : minutes24;
    let ampm = hours24 >= 12 ? "PM" : "AM";
    let hours12 = hours24 % 12;
    let time12 = (hours12 + ':') + (minutes12 + ' ' + ampm);

    return time12;
}