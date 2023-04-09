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
      `선택하신 목적지는 ${roomNumber}호 입니다. 해당 목적지로 안내를 원하시면 안내시작 버튼을 눌러주세요.`
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
            <img src={imageSrc} alt="snslab" />
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
          <main>{modalContent}</main>
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