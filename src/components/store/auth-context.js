import React,{useState} from "react";

const AuthContext=React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
});

export const AuthContextProvider=(props)=>{
    const intitalToken=localStorage.getItem('token');
    const[token,setToken]=useState(intitalToken);
    const userLoggedIn=!!token;
    const loginhandler=(token)=>{
        localStorage.setItem("token",token);
        setToken(token);
    };
    const logoutHandler=()=>{
        localStorage.removeItem('token');
        setToken(null);
    };

    const contextValue={
        token: token,
        isLoggedIn:userLoggedIn,
        login:loginhandler,
        logout:logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
};

export default AuthContext;