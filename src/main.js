function initChat() {
    let allUsersCount = firebase.database().ref(`users`);
    let messageReceived = firebase.database().ref(`messages`);

    allUsersCount.on("child_added", (snapshot) => {
        online += 1;
    })

    // Message
    messageReceived.on("child_added", (snapshot) => {
        const messageVal = snapshot.val();
        snapshotV = snapshot.val();
        if (messageVal.userId === userId) userMessage(); else senderMessage();
    })
}