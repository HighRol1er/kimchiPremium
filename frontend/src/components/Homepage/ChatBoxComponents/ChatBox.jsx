import { useEffect, useRef, useState } from "react";

import { io } from 'socket.io-client';
import Cookies from "js-cookie";
import MessageBox from "./MessageBox";
import ButtonGroup from "./ButtonGroup";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : import.meta.env.CLIENT_URL;

// 배포 전 
// const socket = io('http://localhost:5000'); 
// 배포 
const socket = io(API_URL); 


const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [receiveMsg, setReceiveMsg] = useState([]);
  const [username, setUsername] = useState("");

  const chatContainerRef = useRef(null);  // 최신 메시지에 스크롤을 맞추기 위한 ref

  const InitializeUsername = () => {
    const cookieValue = Cookies.get('username'); // 쿠키 값 없으면 undefined 반환 

    // 쿠키 없을 때 기본 이름 설정
    if(cookieValue === undefined) {
      Cookies.set('username', '가즈아');
      return setUsername("가즈아");
    }
    setUsername(cookieValue);
  };

  useEffect(() => {
    InitializeUsername();

    const handleReceiveMessage = (data) => {
      setReceiveMsg((prevMessages) => [...prevMessages, `${data.username}: ${data.message}`]);
    };

    socket.on("chat_message", handleReceiveMessage);

     // (cleanup) 함수 추가
    return () => {
      // socket.off("set_cookie");
      socket.off("chat_message", handleReceiveMessage);  // 리스너를 제거하여 중복 등록 방지
      // socket.off("user_id");
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({ 
        top: chatContainerRef.current.scrollHeight, 
        behavior: "smooth" 
      });
    }
  }, [receiveMsg]); // receiveMsg가 변경될 때마다 실행



  // client -> server 메세지 보내기
  const sendMsgWithEnter = (e) => {
    if(e.key === "Enter") {
      if (!changeNameCommand(message)) {
        socket.emit("send_message", { username: username, message: message });
      }
      setMessage("");
    }
  };

  // 이름 바꾸기 
  function changeUsername(newName) {
    Cookies.set('username', newName);
    setUsername(newName);
  };

  const changeNameCommand = (msg) => {
    const commandPrefix = ".호칭";
    if (msg.startsWith(commandPrefix)) {
      const newName = msg.slice(commandPrefix.length).trim(); // ".호칭" 다음의 이름 추출
      if (newName) {
        changeUsername(newName);
      }
      return true;  // 메시지가 이름 변경 명령이었다면 처리 완료 후 true 반환
    }
    return false;  // 아닐 경우 false 반환
  };

  // 호칭 버튼 누르면 자동으로 input칸에 .호칭 출력
  const onClickAutoCompleteChangeNameCommand = () => {
    setMessage(".호칭 ");
  }

  return (
    <div className='flex flex-col justify-between h-full'>
      <div>
        <div className="text-center font-bold" >Chat Box</div>
        <ButtonGroup onClickAutoCompleteChangeNameCommand={onClickAutoCompleteChangeNameCommand}/>
        <hr className="mt-1 w-full bg-red-100"/>
        <div className="h-[700px] overflow-y-auto" ref={chatContainerRef}>
          <ul className="ml-3 mt-2 h-full">
            {receiveMsg.map((msg, i) => (
              <MessageBox key={i} msg={msg} receiveMsg={receiveMsg}/>
            ))}
          </ul>
        </div>
      </div>

      <input 
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={sendMsgWithEnter}
        className='bg-slate-600 h-10 rounded-lg m-1'
      />
    </div>
  )
}

export default ChatBox