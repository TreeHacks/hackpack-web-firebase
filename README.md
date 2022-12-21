# Web App with Firebase Tutorial 2023
Created by Ameya Jadhav

Updated by Ameya Jadhav

### Overview
For this Hackpack, we are going to develop a simple online **Personal To-Do List** - a website where you can log in and keep track of your to-do items. In this tutorial, you'll learn the basic process behind making React web apps using Firebase backend for authentication and data storage. Let's get started!

### Start create-react-app
* If you don't have Node.js and npm already installed on your computer, install it from [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

* We will be using Visual Studio Code in this hackpack. Feel free to use any code editor, but using Visual Studio Code is recommended.

* Run the command `npx create-react-app hackpack-web-firebase`. A directory titled hackpack-web-firebase will be created.

* In the directory, run the command `npm start`. The create-react-app starter project will be shown in your localhost window (as seen below).

![](/docs_assets/create-react-app.png)

### Building template

We will be creating several files and directories before we start coding.

* Create a new `\src\routes\Login\login.component.jsx` file.
* Create a new `\src\routes\ToDoListHome\to-do-list-home.component.jsx` file.
* Create a new `\src\utils\firebase\firebase.utils.js` file.
* Create a new `\.env` file.

The `login.component.jsx` file will be our landing page asking the user to log into their account. The `to-do-list-home.component.jsx` will be our home page after the user logs in where he/she can manage their to-do list. The `firebase.utils.js` file will be the interface file to connect to our Firebase Authentication and Firestore services. The `.env` file will securely hold our Firebase tokens and secrets.

### Connecting to Firebase

We will now connect our project to our Firebase account. Please go ahead and complete ONLY step 1 from this [Firebase docs website](https://firebase.google.com/docs/web/setup). We will complete the other steps together.

* Run `npm install firebase` in your project directory to install the necessary Firebase support libraries.
* Copy the firebaseConfig keys into your `\.env` file. These keys should be listed on your console as below...

```
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaDJSAIDjsmsSIj92SDJIEWmfioadYEI",
  authDomain: "hackpack-web-firebase.firebaseapp.com",
  projectId: "hackpack-web-firebase",
  storageBucket: "hackpack-web-firebase.appspot.com",
  messagingSenderId: "9847851385",
  appId: "1:89798123132:web:sd84d6a3w8f98as1563486"
};
```
and should be formatted as below in your '\.env' file.
```
REACT_APP_API_KEY=AIzaDJSAIDjsmsSIj92SDJIEWmfioadYEI
REACT_APP_AUTH_DOMAIN=hackpack-web-firebase.firebaseapp.com
REACT_APP_PROJECT_ID=hackpack-web-firebase
REACT_APP_STORAGE_BUCKET=hackpack-web-firebase.appspot.com
REACT_APP_MESSAGING_SENDER_ID=9847851385
REACT_APP_APP_ID=1:89798123132:web:sd84d6a3w8f98as1563486
```
## What Next

There are lot of things that you can do on top of this application.


### More Resources



### License
MIT

# About HackPacks 🌲

HackPacks are built by the [TreeHacks](https://www.treehacks.com/) team and contributors to help hackers build great projects at our hackathon that happens every February at Stanford. We believe that everyone of every skill level can learn to make awesome things, and this is one way we help facilitate hacker culture. We open source our hackpacks (along with our internal tech) so everyone can learn from and use them! Feel free to use these at your own hackathons, workshops, and anything else that promotes building :) 

If you're interested in attending TreeHacks, you can apply on our [website](https://www.treehacks.com/) during the application period.

You can follow us here on [GitHub](https://github.com/treehacks) to see all the open source work we do (we love issues, contributions, and feedback of any kind!), and on [Facebook](https://facebook.com/treehacks), [Twitter](https://twitter.com/hackwithtrees), and [Instagram](https://instagram.com/hackwithtrees) to see general updates from TreeHacks. 
