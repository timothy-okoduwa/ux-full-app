import React,{useState,useEffect} from 'react'
import './DashBoard.css';
import UserLibrary from '../../components/UserLibrary';
import MyPurchasedCourse from '../../components/MyPurchasedCourse';
import { getDoc,doc,updateDoc } from 'firebase/firestore';
import { db,auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
const DashBoard = () => {
  const navigate = useNavigate()
  const [user,setUser]=useState()
  useEffect(()=>{
getDoc(doc(db,'student',auth?.currentUser?.uid)).then((docSnap)=>{
  if (docSnap?.exists){
    setUser(docSnap?.data())
  }
})
  },[])

  const handleLogOut=async()=>{
    if (user) {
      const studentDocRef =doc(db,'student',auth?.currentUser?.uid)
await updateDoc(studentDocRef,{isOnLine:false})
    }
    auth.signOut()
    navigate('/')
  }
  return (
    <div className="shy">
      <UserLibrary user={user} handleLogOut={handleLogOut} />
      <MyPurchasedCourse />
    </div>
  );
}

export default DashBoard