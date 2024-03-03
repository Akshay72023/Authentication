import React,{useRef,useContext} from "react";
import AuthContext from "../store/auth-context";
import {useHistory}  from "react-router-dom";
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history= useHistory();
  const passwordRef=useRef('');
  const authCtx=useContext(AuthContext);
  const submitHandler=(e)=>{
      e.preventDefault();
      const newPassword= passwordRef.current.value;
      fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=",
      {
        method:"POST",
        body: JSON.stringify({
          idToken:authCtx.token,
          password:newPassword,
          returnSecureToken:true
        }),
        headers:{
          "Content-Type":"application/json"
      }
      }).then(res=>{
        if(res.ok){
          return res.json();
        }
      }).then(data=>{
          console.log(data);
          history.replace('/');
      })
  }
  
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordRef}/>
      </div>
      <div className={classes.action}>
        <button >Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
