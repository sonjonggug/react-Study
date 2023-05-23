import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Chatting from './Chatting';
import axios from 'axios';


/**
 * {...rest}는 PrivateRoute 컴포넌트에 전달된
 * 나머지 모든 prop들을 <Route> 컴포넌트에 전달함을 의미합니다.
 * @param {*} param0 
 * @returns 
 */
function PrivateRoute({ isLoggedIn,email}) {
  return isLoggedIn ? (      
    <Chatting  />
  ) : (
    <Navigate to="/login" replace /> // 리다이렉트 replace는 새고로침 안됨
  );
}

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  

  const handleLogin = async (e) => {
    //  이벤트의 기본 동작을 취소하는 메서드
    e.preventDefault();
  
    try {
      // axios를 사용하여 서버에 로그인 요청을 보냅니다.
      const response = await axios.post('http://211.253.25.72:8080/api/members/login', 
      { email :  email ,
        password: password
      }
      );
        // 로그인에 필요한 데이터 (예: 이메일, 비밀번호)
      
  
      // 로그인 성공 여부에 따라 setIsLoggedIn을 설정합니다.
      if (response.data.statusCode === "2.00") {
        alert("성공");
        setEmail(email);        
        setIsLoggedIn(true);                
      } else {
        alert("실패");
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      // 로그인 요청 실패 시에도 setIsLoggedIn을 설정합니다.     
    }
  };

  return (
    <Router>
    <div>
    {isLoggedIn ? (
              // 로그인 상태에 따라 다른 링크를 표시합니다.
              <h1>채팅방</h1>
            ) : (
              <h1>로그인</h1>
            )}      
      <form onSubmit={handleLogin}>
      {isLoggedIn ? (
              // 로그인 상태에 따라 다른 링크를 표시합니다.
              <text></text>
            ) : (              
              <input type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            )} 
            {isLoggedIn ? (
              // 로그인 상태에 따라 다른 링크를 표시합니다.
              <text>반갑습니다! {email} 님!!</text>
            ) : (              
              <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            )}                 
        {isLoggedIn ? (
              // 로그인 상태에 따라 다른 링크를 표시합니다.
              <text></text>
            ) : (              
              <button type="submit">Login</button>            
            )}           
      </form>
      {isLoggedIn ? (
             <Routes>        
             <Route path="/Chatting" element={<PrivateRoute isLoggedIn={isLoggedIn} email={email} />} />
              email={email}        
           </Routes>
            ) : (
              <text></text>
            )}
    </div>
   
    </Router>

  );
}

export default App;
