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

### Setting up Firebase - Authentication & Firestore

Begin setup of Authentication on Firebase online console...
* Add the "Email/Password" Native provider when asked to set up a sign-in provider
* Do not enable passwordless sign-in

![](/docs_assets/auth.png)

Begin setup of Firestore Database on Firebase online console...
* Click Create Database
* Use all default/recommended options and set up.

Once set up, you should see sometime similar to the below image.

![](/docs_assets/firestoredb.png)

Click on the Rules tab and replace the current database rules with the following, pressing Publish when finished.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
```

## Now Let's Start Building our Todo-List Web App

Our web app will have two different aspects. One part will be the front-end code to show the web app, and the other part will be the "backend" calls to our Firebase service to authenticate the user and store/retrieve the to-do list.

We will first set up `App.js` file. `App.js` is the starting point of our app. The app component is the main component in React which will act as a container for all of our other components. Replace the template code in `App.js` with the following...

```
import { React } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

import Login from './routes/Login/login.component';
import ToDoListHome from './routes/ToDoListHome/to-do-list-home.component';

import './App.css';

function App() {
  return (
    <div className='Root'>
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element ={ <Login /> } />
                    <Route exact path="/home" element ={ <ToDoListHome /> } />
                </Routes>
            </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
```
This code is linking our two other components (`Login` and `ToDoListHome`) to specific url paths for our app - `/` and `/home` respectively.

Next, we will write the `\src\utils\firebase\firebase.utils.js` file which will hold our "backend" calls to our Firebase service to authenticate the user and store/retrieve the to-do list. Copy the following code into `\src\utils\firebase\firebase.utils.js`.

```
import { initializeApp } from "firebase/app";

import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword
} from "firebase/auth";
import {
    getFirestore,
    getDoc,
    doc,
    updateDoc,
    setDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const logInWithEmailAndPassword = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmailAndPassword = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await setDoc(doc(db, "to-do", email), {
        items: [],
    });
};

export const logout = () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const getToDoList = async (email) => {
    try {
        const docSnap = await getDoc(doc(db, "to-do", email));

        return docSnap.data().items;
    } catch (error) {
        console.error(error);
    }
};

export const addToDoItem = async (currentItems, email, newItem) => {
    await updateDoc(doc(db, "to-do", email), {
        items: [...currentItems, newItem],
    });
};

export const deleteToDoItem = async (currentItems, email, deleteItem) => {
    var newItems = currentItems;
    
    const index = newItems.indexOf(deleteItem);

    if (index > -1) {
        newItems.splice(index, 1);
    }

    await updateDoc(doc(db, "to-do", email), {
        items: [...newItems],
    });
};
```


Set up app.js
three new files

```
npm install react-router-dom
npm install react-firebase-hooks 
```


## What Next

There are lot of things that you can do on top of this application.

Sign in with Google, React Redux, 


### More Resources



### License
MIT

# About HackPacks 🌲

HackPacks are built by the [TreeHacks](https://www.treehacks.com/) team and contributors to help hackers build great projects at our hackathon that happens every February at Stanford. We believe that everyone of every skill level can learn to make awesome things, and this is one way we help facilitate hacker culture. We open source our hackpacks (along with our internal tech) so everyone can learn from and use them! Feel free to use these at your own hackathons, workshops, and anything else that promotes building :) 

If you're interested in attending TreeHacks, you can apply on our [website](https://www.treehacks.com/) during the application period.

You can follow us here on [GitHub](https://github.com/treehacks) to see all the open source work we do (we love issues, contributions, and feedback of any kind!), and on [Facebook](https://facebook.com/treehacks), [Twitter](https://twitter.com/hackwithtrees), and [Instagram](https://instagram.com/hackwithtrees) to see general updates from TreeHacks. 
