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

  const classes = {
    501: '강의실', 502: '강의실', 503: '강의실', 504: '프로그래밍실습실1', 505: '강의실', 506: '학생회실', 507: '소프트웨어 스타트업 동아리실', 508: '오픈소스 소프트웨어 동아리실', 
    509: '소프트웨어 창작 동아리실', 510: '', 511: '소프트웨어 세미나실', 512: '인지정보처리시스템 연구실', 513: '모바일멀티미디어 연구실', 514: '이동인터넷 연구실', 515: '소프트웨어융합대학 학장실', 
    516: '컴퓨터소프트웨어 학부 사무실', 517: '컴퓨터네트워크보안 실습실', 518: 'HCI 실습 준비실', 519: '데이터베이스시스템 연구실', 520: '프로그래밍실습실2', 521: '소프트웨어 융합실습실', 
    "521-1": '서동만 교수님 연구실', "521-2": '김미혜 교수님 연구실', 522: '전수빈 교수님 연구실', 523: '김병창 교수님 연구실', 524: '이종학 교수님 연구실', 525: '지능SW컴퓨팅 심화실습실', 
    526: 'IoT 심화실습실', 529: '변태영 교수님 연구실', 530: '배인한 교수님 연구실', 531: '조용현 교수님 연구실', 532: '김행곤 교수님 연구실', 533: '소프트웨어공학 연구실', 534: '소프트웨어공학 실습실', 
    535: '모바일멀티미디어 실습실', 536: '첨단표준형 임베디드 실습실', 539: '현장 미러형 실습실', 540: '강의실', 541: 'LINC+ 동아리실', 551: '신정훈 교수님 연구실', 552: '길준민 교수님 연구실', 
    553: '이경률 교수님 연구실', 554: '김기성 교수님 연구실', 555: '메카트로닉스공학 준비실', 556: '강의실', 557: '강의실', 558: '사이버보안 소프트웨어 실습실', 559: 'IoT 프로그래밍 실습실' 
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
    const images = require.context("./map", false, /\.jpg$/);
    const imgFiles = images.keys().map((path) => images(path));
    const roomNumbers = Array.from({ length: 59 }, (_, i) =>
      (i + 501).toString()
    ).filter((roomNumber) => {
      return (
        (roomNumber >= "501" && roomNumber <= "521") ||
        roomNumber === "521-1" ||
        roomNumber === "521-2" ||
        (roomNumber >= "522" && roomNumber <= "526") ||
        (roomNumber >= "529" && roomNumber <= "536") ||
        (roomNumber >= "539" && roomNumber <= "541") ||
        (roomNumber >= "551" && roomNumber <= "559")
      );
    });
    const index = roomNumbers.indexOf(roomNumber);
    setSelectedRoomNumber(roomNumber);
    setModalContent(
      `선택하신 목적지는 ${roomNumber}호 ${classes[roomNumber]}입니다.`
    );
    setModalIsOpen(true);

    if (index !== -1) {
      setImageSrc(imgFiles[index]);
    } else {
      setImageSrc(mainimg);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleStartGuide = () => {
    const audioFile = require(`./MAP_TTS/room${selectedRoomNumber}.mp3`);
    const audio = new Audio(audioFile);
    audio.play();
    closeModal();
  };

  return (
    <div className="App">
      <div class="homecontainerStyle">
        <div class="mainimgStyle">
          <h1>안내를 원하는 장소를 선택하세요</h1>
          <div class="contentStyle">
            <img src={imageSrc} alt="snslab" className="img"/>
            <div class="buttonsStyle">
              {buttons.map((button) => (
                <button
                  key={button.roomNumber}
                  class="btn"
                  onClick={() => handleButtonClick(button.roomNumber)}
                >
                  {button.label}
        
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <section>
          <header>
            안 내
            <button onClick={closeModal}>x</button>
          </header>
          <main>
            {modalContent}
            <br/> 해당 목적지로 안내를 원하시면 안내시작 버튼을 눌러주세요.
            </main>
          <footer>
            <button onClick={handleStartGuide}>안내시작</button>
            <button onClick={closeModal}>닫기</button>
          </footer>
        </section>
      </Modal>
    </div>
  );
}

export default App;