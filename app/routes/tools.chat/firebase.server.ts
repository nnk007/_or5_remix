// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as firestore from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAENvNsIKbkaMIy4yx0rI7BzMuifdTBsaQ",
    authDomain: "or5-main.firebaseapp.com",
    projectId: "or5-main",
    storageBucket: "or5-main.appspot.com",
    messagingSenderId: "292218107702",
    appId: "1:292218107702:web:d79333660ec204d3562597",
    measurementId: "G-4E6SNJR0X9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const store = firestore.getFirestore(app);
const messagesRef = firestore.collection(store,'messages');

const analytics = getAnalytics(app);

class Message {
    constructor(readonly id:string, readonly author:string,readonly message:string,readonly timestamp:Date){}
    toString():string {
        return `${this.author}: ${this.message}`;
    }
}
type FirestoreMessage = {
    author:string,
    message:string,
    timestamp:Date
}
async function getMessages():Promise<Message[]> {
    'use server';
    const docs = await firestore.getDocs(firestore.collection(store, 'messages').withConverter(messageConverter));
    return docs.docs.map(doc => {
        const d = doc.data();
        return {
            id: doc.id,
            author: d.author,
            message: d.message,
            timestamp: d.timestamp
        }
    });
}


const messageConverter = {
    toFirestore:(message:firestore.WithFieldValue<Message>):firestore.DocumentData=>{
        return {
            author:message.author,
            message:message.message,
            timestamp:message.timestamp
        }
    },
    fromFirestore:(snapshot:firestore.QueryDocumentSnapshot,options?:firestore.SnapshotOptions):Message=>{
        const data = snapshot.data(options)! as FirestoreMessage;
        return new Message(snapshot.id,data.author,data.message,data.timestamp);
    }
}

async function createMessage(message:Message):Promise<string>{
    'use server';
    // const doc = firestore.doc(store,'messages').withConverter(messageConverter);
    const docRef = await firestore.addDoc(firestore.collection(store,'messages').withConverter(messageConverter),message);
    return docRef.id;
}
