# HTML Chat App

This is a HTML5 chat app created using HTML, CSS, JS, and Firebase.

 Feature include:
 - Send and Recive messages in real time
 - Adjustable
- User firendly
- Makes sure every user has a different username
- Group chat

You can preview the chat app through this [link](https://susjejesus.github.io/chat-app/index.html)  or view the images below:

![Chat-app Image](https://susjejesus.github.io/images/Capture11.PNG)

You can view the sign up screen below:
![Chat-app sign up screen](https://susjejesus.github.io/images/Capture22.PNG)

> **Note** - Instead of entering your gmail or signing-in with your google account to use this chat-app,  you just have to enter in your desired username and sign up. (You will get an error if the username already exists in the database). You also don't have to login the next time you use this app because it will log you in automatically everytime (as long as you are on the same google account)

## Data

This app only collects your username (specific to you) , user id (specific to your computer, it will change if you change your google account or if your chat-app account is deleted in the database), and date & time of your account creating. It saves this data so, the next time you use this app, it will log you in automatically and give you the same username you signed-up with. This chat-app also stops a person from having the same username as another person's username in the database.
 
# Downloading

To download this app:
1.  click on the **green code button** and Download ZIP. 
2. Then extract the zipped files.
3.  Set up a firebase database and link it to the **index.html** file (View next section)
4. Run **index.html**.

> You don't have to run **index.html** on a live server since, it's set up so you can run it as a **file** in your browser.

## Setting up and linking your Firebase database

To make your own firebase database, follow these steps

1. Go to the firebase website and make a new project. 
2. Enable the anonymous login methond in the **authentication tab**. 
3. Create a **Realtime Database**.

The **rules** in the realtime database should be as follows:
**{
  "rules": {
    ".read": "auth != null",
    ".write": false,
      "messages": {
      ".write": "auth != null"
    },
    "users": {
      ".write": "auth != null"
    },
    "names": {
      ".write": "auth != null",
      ".read": true
    },
  },
}**

> **Note** - You might want to modify these rules a little bit to work for you since, **these rules are not very secure**.

### Linking your firebase database to the app

To link your firebase database to your chat-app, follow these steps:
1.  Go to the **Project Overview** tab in your firebase project. 
2.  Click on the icon to use your project in a script tab
3.  Copy the **const firebaseConfig**. 
4. Finally, open the **index.html** file in a text editor and replace the existing **const firebaseConfig** with your **const firebaseConfig**. 

You can see an example in the picture below:

![Firebase Configration example](https://susjejesus.github.io/images/Capture.PNG)

Now your chat-app is ready to go.

> You will  need to replace the existing firebase configuration with your firebase configuration for chat-app to work. This chat app will put you in a group chat with everyone who has used it so, everyone will be able to see your messages.
