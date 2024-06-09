import "./chat-message.css"
import "../../../index.css"

interface Message {
    text: string;
    createdAt: Date;
    isOutgoing: boolean;
}

export const ChatMessage = (props: { message: Message }) => {
    const date = props.message.createdAt;
    const messageClass: string = props.message.isOutgoing ? "chat-message chat-message--sent" : "chat-message chat-message--received";
    const messageTextClass: string = props.message.isOutgoing ? "chat-message-text chat-message-text--sent" : "chat-message-text chat-message-text--received";

    return (
        <div className={messageClass}>
            <div className="chat-message-date">{date.toLocaleString()}</div>
            <div className={messageTextClass}>
                {props.message.text}
            </div>
        </div>
    );
}
