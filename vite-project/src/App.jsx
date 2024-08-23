import { useEffect, useRef, useState } from 'react';
import chatlogo from './assets/chatgpt.svg';
import './App.css';
import addbtn from "./assets/add-30.png";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import send from "./assets/send.svg";
import usericon from "./assets/user-icon.png";
import chatgptimglogo from "./assets/chatgptLogo.svg";
import axios from 'axios';

function App() {
  const [value, setValue] = useState("");
  const messend = useRef(null);
  const [message, setMessage] = useState([
    
    {
      text: "Hi I am chat bot for your assistant",
      isBot: true,
    },
  ]);

  useEffect(()=>{
    messend.current.scrollIntoView();
  },[message]);
   const handelinputkey = async (e) =>{
     if(e.key== 'Enter') await sendingPrompt();
   }
  const sendingPrompt = async () => {
    const apiKey = 'AIzaSyDWcrNve7-0g96B5u2VA9gz4nSbXNpdurI'; // Replace with your actual API key
    
     let res = " please give the response in short informative easy word.do not give any type of special charecter expect '.'  ans must be either in point format and highlight the point";
     let finalquery = value + res;
     const text = value;
      setValue("");
     try {
      
      setMessage(prevMessage => [
        ...prevMessage,
        { text, isBot: false },
      ]);
     
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          "contents": [
            {
              "parts": [
                {
                  "text": finalquery
                }
              ]
            }
          ]
        }
      );
     
      const responseData = response.data.candidates[0].content.parts[0].text;
      console.log(responseData);
      setMessage(prevMessage => [
        ...prevMessage,
        { text: responseData, isBot: true },
      ]);
    } catch (error) {
      console.error('Error sending prompt to Gemini API:', error);
    }
  };

  return (
    <div className='App'>
      <div className='sidebar'>
        <div className='upperside'>
          <div className='uppersidetop'>
            <img src={chatlogo} alt='' className='logo' />
            <span className='brand'>Chatgpt</span>
          </div>
          <button className='midbtn'>
            <img src={addbtn} alt='' className='addbtn' onClick={() =>window.location.reload()} />New Chat
          </button>
          <div className='uppersidebutton'>
            <button className='query' onClick={()=> setValue("what is programming")}>what is programming</button>
          </div>
        </div>
        <div className='lowerside'>
          <div className='listItems'>
            <img src={home} alt='' className='listitemImages' />Home
          </div>
          <div className='listItems'>
            <img src={saved} alt='' className='listitemImages' />About
          </div>
        </div>
      </div>
      <div className='main'>
        <div className='chats'>
          {message.map((msg, ind) => (
            <div key={ind} className={msg.isBot ? 'chat bot' : 'chat'}>
              <img src={msg.isBot ? chatgptimglogo : usericon} alt='' className="chatimgs" />
              <p className='txt'>{msg.text}</p>
            </div>
          ))}
         <div ref={messend}/>
        </div>

        
        <div className='chatfooter'>
          <div className='inp'>
            <input 
              type='text' 
              placeholder='send a message' onKeyDown={handelinputkey} 
              onChange={(e) => setValue(e.target.value)}
            />
            <button className='send'  onClick={sendingPrompt}>
              <img src={send} alt='send'/>
            </button>
          </div>
          <p>It may produce errors so please check with the original data source.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
