import { authService, firebaseInstance } from 'fBase';
import React, { useState } from 'react';

const Auth = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ newAccount, setNewAccount ] = useState(true);
  const [ error, setError ] = useState("");
  const onChange = (event) => {
    const {target: {name, value}} = event;
    if(name === "email"){
      setEmail(value)
    } else if(name === "password"){
      setPassword(value)
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if(newAccount){
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        )
        } else {
        data = await authService.signInWithEmailAndPassword(
            email, 
            password
            );
        }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  }
  const toggleAccount = () => setNewAccount((prev) => !prev)
  const onSocialClick = async (event) => {
    const { target : {name}} = event;
    let provider;
    if(name === "google"){
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github"){
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  }
  return (
  <div>
    <form onSubmit={onSubmit}>
      <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} required />
      <input type="password" name="password" placeholder="Password" value={password} onChange={onChange} required />
      <input type="submit" value={newAccount ? "신규가입" : "로그인"} />
      { error }
    </form>
    <span onClick={toggleAccount}>{ newAccount ? "로그인" : "계정생성" }  </span>
    <div>
      <button onClick={onSocialClick} name="github">깃헙 로그인</button>
      <button onClick={onSocialClick} name="google">구글 로그인</button>
    </div>
  </div>
  )
}
export default Auth;