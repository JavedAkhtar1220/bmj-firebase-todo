import React, { useEffect, useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

// Protected Routes 
import PublicRoute from './config/PublicRoute';
import PrivateRoute from './config/PrivateRoute';

// Pages 
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import ProfilePage from './pages/ProfilePage';

// Firebase 
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDoc, doc, } from "firebase/firestore";
import { auth, db } from './config/firebase';

import './App.css';

const App = () => {

  const [isLogin, setIsLogin] = useState();
  const [userUid, setUserUid] = useState('');
  const [userDetail, setUserDetail] = useState({});

  const getData = async (uid) => {

    const ref = doc(db, "users", uid);

    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      setUserDetail(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
        getData(user.uid);
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, [])

  return (
    <>

      <Router>

        <Routes>

          <Route path='/' element={<PrivateRoute isLogin={isLogin} />}>
            <Route path='/' element={<Home currentUserUid={userUid} />} />
          </Route>
          <Route path='/profile' element={<PrivateRoute isLogin={isLogin} />}>
            <Route path='/profile' element={<ProfilePage userDetail={userDetail} />} />
          </Route>
          <Route path='/login' element={<PublicRoute isLogin={isLogin} />}>
            <Route path='/login' element={<Login />} />
          </Route>
          <Route path='/register' element={<PublicRoute isLogin={isLogin} />}>
            <Route path='/register' element={<Register />} />
          </Route>
          <Route path='/reset-password' element={<PublicRoute isLogin={isLogin} />}>
            <Route path='/reset-password' element={<ResetPassword />} />
          </Route>

        </Routes>

      </Router>
    </>

  )
}

export default App
