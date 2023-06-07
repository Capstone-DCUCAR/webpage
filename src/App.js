import "./App.css";
import React, { useState } from "react";
import mainimg from "./map/main.png";
import Modal from "react-modal";
import "./modal.css";

Modal.setAppElement("#root");

function App() {
  const [imageSrc, setImageSrc] = useState(mainimg);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [selectedRoomNumber, setSelectedRoomNumber] = useState("");
  const [flag, setFlag] = useState(0);

  const classes = {
    501: ['강의실', -20.5, 60], 502: ['강의실', -32.315, 60], 503: ['강의실', -41.247, 60], 504: ['프로그래밍실습실1', -51.5, 54.6], 505: ['강의실', -51.5, 37.2], 506: ['학생회실', -51.5, 35], 507: ['소프트웨어 스타트업 동아리실', -51.5, 28.9], 508: ['오픈소스 소프트웨어 동아리실', -51.5, 24.5], 
    509: ['소프트웨어 창작 동아리실', -51.5, 20], 510: ['촬영실', -51.5, 16.5], 511: ['소프트웨어 세미나실', -50, 1.5], 512: ['인지정보처리시스템 연구실', -38, 1.5], 513: ['모바일멀티미디어 연구실', -34.5, 1.5], 514: ['이동인터넷 연구실', -31, 1.5], 515: ['소프트웨어융합대학 학장실', -26.5, 1.5], 
    516: ['컴퓨터소프트웨어 학부 사무실', -25.3, 1.5], 517: ['컴퓨터네트워크보안 실습실', -20, 1.5], 518: ['HCI 실습 준비실', -15.5, 1.5], 519: ['데이터베이스시스템 연구실', -6.5, 1.5], 520: ['프로그래밍실습실2', 1.3, 1.5], 521: ['소프트웨어 융합실습실', 4.5, 8], 
    "521-1": ['서동만 교수님 연구실', 4.5, -3], "521-2": ['김미혜 교수님 연구실', 4.5, -4.5], 522: ['전수빈 교수님 연구실', -1.3, -0.2], 523: ['김병창 교수님 연구실', -5.3, -0.2], 524: ['이종학 교수님 연구실', -9.5, -0.2], 525: ['지능SW컴퓨팅 심화실습실', -12.5, -0.2], 
    526: ['IoT 심화실습실', -15.5, -0.2], 529: ['변태영 교수님 연구실', -31, -0.2], 530: ['배인한 교수님 연구실', -34.5, -0.2], 531: ['조용현 교수님 연구실', -38, -0.2], 532: ['김행곤 교수님 연구실', -43, -0.2], 533: ['소프트웨어공학 연구실', -47.6, -0.2], 534: ['소프트웨어공학 실습실', -47.6, -0.2], 
    535: ['모바일멀티미디어 실습실', -53, 14.5], 536: ['첨단표준형 임베디드 실습실', -53, 24.5], 539: ['현장 미러형 실습실', -53, 46.7], 540: ['강의실', -53, 48.352], 541: ['LINC+ 동아리실', '', ''], 551: ['신정훈 교수님 연구실', 5, 24], 552: ['길준민 교수님 연구실', 5, 28.5], 
    553: ['이경률 교수님 연구실', 5, 33], 554: ['김기성 교수님 연구실', 5, 34.5], 555: ['메카트로닉스공학 준비실', 5, 38.7], 556: ['강의실', 6, 51], 557: ['강의실', 5.5, 58], 558: ['사이버보안 소프트웨어 실습실', 2.8, 19.5], 559: ['IoT 프로그래밍 실습실', 2.8, 26] 
  };
  
  const buttons = [
    ...Array.from({ length: 21 }, (_, i) => ({
      label: `${501 + i}호`,
      roomNumber: `${501 + i}`,
    })),
    { label: "521-1호", roomNumber: "521-1" },
    { label: "521-2호", roomNumber: "521-2" },
    ...Array.from({ length: 5 }, (_, i) => ({
      label: `${522 + i}호`,
      roomNumber: `${522 + i}`,
    })),
    ...Array.from({ length: 8 }, (_, i) => ({
      label: `${529 + i}호`,
      roomNumber: `${529 + i}`,
    })),
    ...Array.from({ length: 3 }, (_, i) => ({
      label: `${539 + i}호`,
      roomNumber: `${539 + i}`,
    })),
    ...Array.from({ length: 9 }, (_, i) => ({
      label: `${551 + i}호`,
      roomNumber: `${551 + i}`,
    })),
  ];

  const handleButtonClick = (roomNumber) => {
    const images = require(`./map/map${roomNumber}.png`);
    // const navButton = document.getElementById('nav');
    // navButton.disabled = false;
    setImageSrc(images)
    setSelectedRoomNumber(roomNumber);
    rosConnect();
  };

  const navButtonClick = () => {
    setModalContent(
      `${selectedRoomNumber}호 ${classes[selectedRoomNumber][0]}`
    );
    setModalIsOpen(true);
    setFlag(0);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleStartGuide = () => {
    const audioFile = require(`./MAP_TTS/room${selectedRoomNumber}.mp3`);
    const audio = new Audio(audioFile);
    audio.play();
    closeModal();
    setFlag(1);
  };

  const rosConnect = () => {
    const ROSLIB = require('roslib');
    const ros = new ROSLIB.Ros({
      url : 'ws://192.168.109.128:9090'
    });

    const topic = new ROSLIB.Topic({
      ros : ros,
      name : 'my_topic',
      messageType : 'std_msgs/String'
    });

    const msg = new ROSLIB.Message({
      // data : classes[selectedRoomNumber][1]
      data : JSON.stringify(classes[selectedRoomNumber])
    });

    topic.publish(msg);
  };

  return (
    <div className="App">
      <div class="homecontainerStyle">
        <div class="mainimgStyle">
          <div>
            {flag === 1 ? (
              <div className="navStyle">
                <h1>다른 사용자가 이용하고 있습니다</h1>
              </div>
              ) : (
                <div class="headerStyle">
                  <h1>안내를 원하는 장소를 선택하세요</h1>
                </div>
            )}
          </div>
          <div class="contentStyle">
            <img src={imageSrc} alt="snslab" className="img"/>
            <div class="buttonsStyle">
              {buttons.map((button) => (
                <button
                  key={button.roomNumber}
                  class="btn"
                  onClick={() => handleButtonClick(button.roomNumber)}
                >
                  <br/><br/>
                  {button.label}
                  <p class='a'>{classes[button.roomNumber][0]}</p>
                </button>
              ))}
            </div>
          </div>
          <button id="nav" class="nav_btn" onClick={() => navButtonClick()}>안 내 시 작</button>
        </div>
        <div className="creator">
          <p>© DCUCAR 조혜원 김동현 박성주</p>
        </div>
      </div>
      {/* <p className="creator">DCUCAR 조혜원 김동현 박성주</p> */}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <section>
          <header>
            안 내
            <button onClick={closeModal}>x</button>
          </header>
          <main>
            <p>선택하신 목적지는 <b><u>{modalContent}</u></b>입니다.</p>
            <p>해당 목적지로 안내를 시작할까요?</p>
            </main>
          <footer>
            <button onClick={handleStartGuide}>예</button>
            <button onClick={closeModal}>아니요</button>
          </footer>
        </section>
      </Modal>
    </div>
  );
}

export default App;