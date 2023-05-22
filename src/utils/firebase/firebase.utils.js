// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdD0Wm52ZClO801P77M1ddAdRj4ir1qJQ",
  authDomain: "crwn-clothing-db-4a4b0.firebaseapp.com",
  projectId: "crwn-clothing-db-4a4b0",
  storageBucket: "crwn-clothing-db-4a4b0.appspot.com",
  messagingSenderId: "540129219899",
  appId: "1:540129219899:web:3b17c2b9e07a50b29e531e",
};

// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

//collectionKey是指category名字，后面是json对象
export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = collection(db, collectionKey);

  //Batch意为批处理
  const batch = writeBatch(db);

  //map() 函数适用于需要转换或映射原始数组的情况，它返回一个新数组，避免了直接修改原始数组的副作用。
  //而 forEach() 函数适用于对数组元素进行迭代和执行副作用的情况，它没有返回值。
  objectToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done!");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const queruSnapshot = await getDocs(q);
  return queruSnapshot.docs.map(docSnapshot => docSnapshot.data());
};

//用于在数据库创建用户信息
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  //检测登陆信息
  if (!userAuth) return;
  //userDocRef 是一个指向用户文档的 Firestore 文档引用（Document Reference）。它用于表示用户在数据库中的位置。具体来说，它是通过在 db（Firestore 实例）中的 "users" 集合中使用 userAuth.uid（用户的唯一标识符）来创建的文档引用。
  const userDocRef = doc(db, "users", userAuth.uid);
  //userSnapshot 是通过使用 userDocRef 获取用户文档的快照（Snapshot）。它表示了用户文档的当前状态。getDoc(userDocRef) 是一个异步操作，返回一个 Promise，该 Promise 解析为表示用户文档的快照。
  const userSnapshot = await getDoc(userDocRef);
  //使用快照的方式来修改数据是常见的做法，因为快照提供了一种安全和有效的方式来处理数据更新。
  //使用快照的好处是它是一个不可变对象，即使在其他地方对数据库进行了修改，快照的内容也不会改变。这使得可以对快照进行多次读取和比较，而不会受到其他并发操作的影响。
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      //setDoc会在数据库存储数据
      //这里注意对 {}对象 的使用
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
};

//工具函数，仅创造数据，不在前端存储数据
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

//邮箱密码登陆，类似谷歌登陆
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

//用于注销auth
export const signOutUser = async () => await signOut(auth);

//监听auth状态
export const onAuthStateChangeListener = callback =>
  onAuthStateChanged(auth, callback);
