import "../assets/styles/ChatMessage.css";


function ChatMessage({ message }) {

  const isUser =
    message.role === "user";


  let content = message.content;


  // Safety check
  if (
    typeof content !== "string"
  ) {

    if (
      content &&
      typeof content === "object"
    ) {

      content =
        content.text ||
        JSON.stringify(content);

    } else {

      content = String(content ?? "");

    }
  }


  return (
    <div
      className={`message-row ${
        isUser
          ? "user-message"
          : "assistant-message"
      }`}
    >

      <div className="message-avatar">
        {isUser ? "J" : "AI"}
      </div>


      <div className="message-bubble">
        {content}
      </div>

    </div>
  );
}


export default ChatMessage;