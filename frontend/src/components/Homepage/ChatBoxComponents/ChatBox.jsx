import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react"
import { io } from 'socket.io-client';
import Cookies from "js-cookie";
import MessageBox from "./MessageBox";

const socket = io('http://localhost:3010'); 

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [receiveMsg, setReceiveMsg] = useState([]);
  const [username, setUsername] = useState("가즈아");
  const [changeName, setChangeName] = useState("");

  const setCookie = () => {
    Cookies.set('username', '가즈아');
  };

  function getCookieFormStorage() {
    const cookiesValue = Cookies.get('username');
    setUsername(cookiesValue || '가즈아');  // 쿠키값 없으면 '가즈아'로 설정
  };

  function changeUsername() {
    Cookies.set('username', changeName);
    setUsername(changeName);
  };

  useEffect(() => {
    setCookie();
    getCookieFormStorage();

    // 메시지를 수신할 때마다 실행
    const handleReceiveMessage = (data) => {
      setReceiveMsg((prevMessages) => [...prevMessages, `${data.username}: ${data.message}`]);
    };

    socket.on("chat_message", handleReceiveMessage);
    // socket.on("user_id", setUserId);
     // (cleanup) 함수 추가
    return () => {
      socket.off("set_cookie");
      socket.off("chat_message", handleReceiveMessage);  // 리스너를 제거하여 중복 등록 방지
      socket.off("user_id");
    };
  }, []);

  // client -> server 메세지 보내기
  const sendMsgWithEnter = (e) => {
    if(e.key === "Enter") {
      socket.emit("send_message", { username: username, message: message });
      setMessage("");
    }
  };

  return (
    <div className='flex flex-col justify-between h-full'>
      <div className="m-2 ">
      <Button size="xs" colorScheme="blue">호칭</Button>
        <hr className="mt-2 w-full"/>
        <ul>
          {receiveMsg.map((msg, i) => (
            <div 
              className="p-1" 
              key={i}
            >
              {msg}
            </div>
            // <MessageBox key={i} msg={msg}/>
          ))}
        </ul>
      </div>
      <input 
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={sendMsgWithEnter}
        className='bg-slate-600 h-10 rounded-lg m-2'
      />
    </div>
  )
}

export default ChatBox