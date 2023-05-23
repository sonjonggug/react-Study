import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import Chatting from './Chatting';
import axios from 'axios';


/**
 * Chatting 컴포넌트 불러오기
 * @param {*} param0 
 * @returns 
 */
function PrivateRoute({isLoggedIn}) {
  return isLoggedIn ? (      
    <Chatting  />
  ) : (
    <Navigate to="/login" replace /> // 리다이렉트 replace는 새고로침 안됨
  );
}

function App() {

  // 상태 값 설정 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  /**
   * 비동기 로그인 함수 
   */
  const handleLogin = async (e) => {
    //  이벤트의 기본 동작을 취소하는 메서드
    e.preventDefault();

    try {
      // axios를 사용하여 서버에 로그인 요청을 보냅니다.
      const response = await axios.post('http://211.253.25.72:8080/api/members/login', 
      { email :  email ,
        password: password
      });       
               
      // 로그인 성공 여부에 따라 setIsLoggedIn을 설정합니다.
      if (response.data.statusCode === "2.00") {
        alert("로그인에 성공하였습니다.");
        setEmail(email);        
        setIsLoggedIn(true);                
      } else {
        alert("로그인에 실패하였습니다.");
        setIsLoggedIn(false);
      }
    } catch (error) {
      alert("로그인에 실패하였습니다.");
      console.error('Error during login:', error);       
    }
  };
  
  return (
    // 라우터는 경로와 컴포넌트 간의 매핑을 설정하는 역할
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
              // 
              <text></text>
            ) : (              
              <button type="submit">Login</button>            
            )}           
      </form>
      {isLoggedIn ? (
             <Routes>        
             <Route path="/Chatting" element={<PrivateRoute isLoggedIn={isLoggedIn} />} />
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
