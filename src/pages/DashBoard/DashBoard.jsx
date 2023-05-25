import React,{useState,useEffect} from 'react'
import './DashBoard.css';
import UserLibrary from '../../components/UserLibrary';
import MyPurchasedCourse from '../../components/MyPurchasedCourse';
import { getDoc,doc, } from 'firebase/firestore';
import { db,auth } from '../../firebase';
const DashBoard = () => {
  const [user,setUser]=useState()
  useEffect(()=>{
getDoc(doc(db,'student',auth?.currentUser?.uid)).then((docSnap)=>{
  if (docSnap?.exists){
    setUser(docSnap?.data())
  }
})
  },[])
  return (
    <div className="shy">
      <UserLibrary user={user} />
      <MyPurchasedCourse />
    </div>
  );
}

export default DashBoard