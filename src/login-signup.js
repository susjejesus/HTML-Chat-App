firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Logged in

        // Creates a specific string that will store the users name and information
        subStringId = user.uid;
        subString = createSubstring(subStringId);

        if (clicked === 1) {
            clicked = 0;
            nameRef = firebase.database().ref(`names/account/${subString}`);

            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let accountCreated = date + '' + time;

            nameRef.set({
                userName,
                id: user.uid,
                accountCreated,
                subString
            })
        } else {
            const firebaseRef = firebase.database().ref(`names/account`);
            firebaseRef.once("value", function (snapshot) {
                snapshot.forEach(function (element) {
                    if (subString === element.val().subString) {
                        userName = element.val().userName;
                    }
                })
            });
        }

        document.querySelector('.parent-container').style.display = "flex";
        document.querySelector('.title-container').remove();
        document.querySelector('.login-container').remove();

        // Put the owners user id here
        if (user.uid === 'OWNERNAMEHERE') {
            owner = true;
            // The owners name here
            userName = "<h5 style='color:red'>[Owner] </h5>";
        } else owner = false;

        // Checks for when the user sends a message
        sendMessage.addEventListener('click', () => {
            userSentMessage();
        });
        document.addEventListener('keypress', (event) => {
            switch (event.key) {
                case 'Enter':
                    userSentMessage();
                    break;
            }
        })

        userId = user.uid;
        userRef = firebase.database().ref(`users/${userId}`);

        userRef.set({
            id: userId,
            userName,
            owner
        });

        // Remove user when the log out
        userRef.onDisconnect().remove();

        // Begin when I sign in
        initChat();

    } else {
        // Logged out

        const firebaseRef = firebase.database().ref(`names/account`);
        firebaseRef.once("value", function (snapshot) {
            snapshot.forEach(function (element) {
                allNames.push(element.val().userName);
                // console.log(allNames);
            })
        });

        // console.log(allNames);

        name.value = userName;

        signUpButton.addEventListener('click', () => {
            for (var i = 0; i < allNames.length; i++) {
                if (name.value != allNames[i]) {

                } else if (name.value === allNames[i]) {
                    nameTaken.push(allNames[i]);
                }
            }

            window.setTimeout(function () {
                if (name.value.length != 0) {
                    if (name.value != nameTaken[0]) {
                        firebase.auth().signInAnonymously().catch((error) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            // ...
                            console.log(errorCode, errorMessage);
                        });

                        userName = name.value;
                        clicked = 1;
                    } else {
                        nameTaken = [];
                        document.getElementById("error-message").innerHTML = "That name already exists";
                    }
                } else {
                    document.getElementById("error-message").innerHTML = "You must have a name to sign up";
                }
            }, 1000)
        });

        signUpButton.addEventListener('click', () => {
        });

        name.addEventListener('click', () => {
            document.getElementById("error-message").innerHTML = "";
        });
    }
});
