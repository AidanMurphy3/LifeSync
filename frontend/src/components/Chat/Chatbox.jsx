import { useEffect, useState } from "react";
import io from "socket.io-client";

function Chatbox({ roomId, user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  return (
    <section className="bg-[var(--ls-bg)] h-screen flex flex-col">
      {/* header */}
      <div
        className="mx-auto w-fit"
        style={{
          fontSize: "20px",
          fontWeight: "Bold",
          marginBottom: "10px",
        }}
      >
        Chat
      </div>
      {/* chat contents */}
      <div>content</div>
      <input
        type="text"
        className="mt-auto self-end bg-[var(--ls-surface-soft)] w-full h-[50px]"
        placeholder="Type a message"
      />
    </section>
  );
}

export default Chatbox;
