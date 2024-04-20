import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Import compat version for now
import 'firebase/compat/auth';
import { ProductList } from '../data/ProductList';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};


firebase.initializeApp(firebaseConfig);

const handlePopulate = async () => {
    console.log('Populating Firestore with JSON data...');

    const data = [...ProductList];

    const db = firebase.firestore();

    data.forEach(async (item) => {
        try {
            await db.collection('products').add(item);
            console.log('Item added to Firestore:', item);
        } catch (error) {
            console.error('Error adding item to Firestore:', error);
        }
    });
};

export { handlePopulate };

export default firebase;