import {NextRequest,NextResponse} from 'next/server'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as firestore from 'firebase/firestore';
import EventEmitter from 'events';
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
const q = firestore.query(firestore.collection(store,'messages'));
const unsub = firestore.onSnapshot(q,(qSnap)=>{
    const docs:any[] = [];
    qSnap.forEach((doc)=>{
        docs.push({id:doc.id,...doc.data()})
    })
    EE.emit('update',docs)
    //res docs
})

const EE = new EventEmitter();

export async function GET(request:NextRequest){
    const d = await new Promise((res,rej)=>{
        EE.on('update',docs=>{
            res(docs);
        })
    })
    console.log('Update',Date.now());
    return new Response(JSON.stringify(d),{status:200});
}