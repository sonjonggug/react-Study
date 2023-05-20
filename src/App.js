import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Chatting from './Chatting';
import axios from 'axios';

function LoginPage({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        setIsLoggedIn(true);
      } else {
        alert("실패");
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      // 로그인 요청 실패 시에도 setIsLoggedIn을 설정합니다.
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
}

function PrivateRoute({ isLoggedIn, ...rest }) {
  // ...  <Route path="/chatting" element={<Chatting />} />

  return isLoggedIn ? ( 
    <Routes>
    <Route {...rest} element={<Chatting />} />
    </Routes>
  ) : (
    <Navigate to="/login" replace />
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {isLoggedIn ? (
              // 로그인 상태에 따라 다른 링크를 표시합니다.
              <Link to="/chatting">Chatting</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/chatting" element={<PrivateRoute isLoggedIn={isLoggedIn} />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
