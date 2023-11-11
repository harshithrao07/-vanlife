import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, query, where, setDoc, deleteDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDZefKi4aAS1YxV05TYcAJRQ7cTiCt9mPc",
    authDomain: "van-life-48ba5.firebaseapp.com",
    projectId: "van-life-48ba5",
    storageBucket: "van-life-48ba5.appspot.com",
    messagingSenderId: "305445125398",
    appId: "1:305445125398:web:9c7b5a2b427c11c2fea437"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")
const listedVansCollectionRef = collection(db, "listedVans")

export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)
    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}

export async function getHostVans(email) {
    const q = query(listedVansCollectionRef, where("host_email", "==", email))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}

export async function addNewListedVan(van, email) {
    const listenVanSnapshot = await setDoc(doc(db, "listedVans", van.id), {
        description: van.description,
        imageUrl: van.imageUrl,
        name: van.name,
        price: van.price,
        type: van.type,
        host_email: email,
        id: van.id
    });
    console.log("added to listed vans")
}

export async function removeListedVan(id, email) {
    const q = query(
        collection(db, "listedVans"),
        where("host_email", "==", email),
        where("id", "==", id)
        );

    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            console.log(`Document successfully deleted.`);
        });

    } catch (error) {
        console.error("Error removing documents:", error);
    }
}