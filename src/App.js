import React, { useState } from "react";
import "./App.css";
import YouTube from "react-youtube";

function App() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [ccs, setCcs] = useState([]);

  const onChange = (event) => {
    setUrl(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const id = extractVideoId(url);
    setVideoId(id);
    getCC(id);
  };

  async function getCC(videoId) {
    const response = await fetch("/main/youtube_script/", {
      method: "POST",
      body: JSON.stringify({
        video_id: videoId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setCcs(data.transcript);
  }

  const extractVideoId = (url) => {
    const urlPattern = "https://www.youtube.com/watch?v=";
    let videoId = "";
    if (url.startsWith(urlPattern)) {
      videoId = url.substring(urlPattern.length);
    }
    return videoId;
  };

  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="app-container">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={url}
          placeholder="Youtube 주소를 넣으세요."
          onChange={onChange}
        />
        <button type="submit">Load</button>
      </form>
      <div className="video-and-text">
        <div className="video-container">
          <YouTube videoId={videoId} opts={opts} />
        </div>
        <div className="text-box">
          <p>{ccs.map((cc) => cc.text).join(" ")}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
