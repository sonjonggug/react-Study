import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function ChatApp() {
  /**
   * 컴포넌트의 로컬 상태 관리: useState를 사용하여 컴포넌트 내에서 로컬 상태를 선언하고 업데이트할 수 있습니다.
   * 예를 들어, 버튼의 클릭 여부, 입력 필드의 값을 저장하는 등의 상태를 관리할 수 있습니다.
   */
  const [messages, setMessages ] = useState([]); // 채팅 메시지 배열 | messages = key | setMessages = value
  const [inputText, setInputText] = useState(''); // 사용자 입력값
  const [isWaiting, setIsWaiting] = useState(false); // 응답 대기 여부 상태
  const chatMessagesRef = useRef(null); // chat-messages 요소에 대한 ref

  

  useEffect(() => {
    // 컴포넌트가 렌더링될 때마다 스크롤을 아래로 내립니다.
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [messages]);

  /**
   * 사용자 메시지 전달 
   * 전달 후 입력값 초기화 후 readOnly 상태로 변경 및 placeholder 값 변경
   */
  const sendMessage = async () => {
    try {
      
      // 입력 창을 초기화합니다.
      setInputText('');
      // 응답 대기 중임을 표시
      setIsWaiting(true); 
      // 사용자 입력값을 서버의 API에 전송합니다.
      const response = await axios.post('http://211.253.25.72:8080/api/external/chatGpt', { request: "채팅하듯이 : "+ inputText });

      let result = response.data.msg +" [" + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + "]";
      // 새로운 메시지를 기존 메시지 배열에 추가합니다.
      const newMessage = { text: inputText +" [" + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + "]", response: result};
      setMessages([...messages, newMessage]);
     
    } catch (error) {
      alert("알수없는 에러---> " + error);   
    }  finally {
      setIsWaiting(false); // 응답 대기 종료
    }
  };

  /**
   * 엔터 사용 가능하게끔 
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-app">
      {/* 채팅 입력창과 전송 버튼을 렌더링하고 상태와 이벤트 핸들러를 연결합니다 */}
      <div className="chat-input">       
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress} // 엔터 키 이벤트 처리를 위한 핸들러 추가
          placeholder={isWaiting ? '응답을 대기중입니다' : '메시지를 입력하세요'} // 응답 대기 여부에 따라 플레이스홀더 변경
          readOnly={isWaiting} // 응답 대기 중일 때는 읽기 전용으로 설정
          style={{ border: "1px solid black", width: "450px" , marginBottom: "7px"}}
          
        />
        <button onClick={sendMessage}>Send</button>
      </div>

       {/* 채팅 대화창에 메시지를 표시합니다 */}
       <div className="chat-messages" style={{ border: "1px solid black", width: "500px", height: "300px", overflowY: "auto" }} ref={chatMessagesRef}> 
        {messages.map((message, index) => (
          <div key={index} className="message">
            <div>사용자: {message.text}                        
            </div>
            <div>응답: {message.response}</div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default ChatApp;
