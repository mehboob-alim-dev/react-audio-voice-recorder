import React, { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

function App() {
  const [mp3Recording, setMp3Recording] = useState(null);

  const handleRecordingComplete = (blob) => {
    setMp3Recording(blob);
  };
  console.log("audio", mp3Recording);
  const handleSave = () => {
    if (mp3Recording) {
      const url = URL.createObjectURL(mp3Recording);
      const a = document.createElement("a");
      a.href = url;
      a.download = "voice_note.mp3";
      a.click();
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "azure",
      }}
    >
      <div>
        {mp3Recording ? (
          <div>
            <audio src={URL.createObjectURL(mp3Recording)} controls />
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <AudioRecorder
            onRecordingComplete={handleRecordingComplete}
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
            }}
            downloadOnSavePress={false} // Disable automatic download on save press
            downloadFileExtension="mp3"
          />
        )}
      </div>
    </div>
  );
}

export default App;
