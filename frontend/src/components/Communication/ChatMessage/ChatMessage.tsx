import "./chat-message.css"
import "../../../index.css"
import {ChatCommunicationDto} from "../../../models/chatCommunication.ts";

export const ChatMessage = (props: { message: ChatCommunicationDto }) => {
    const date = new Date(props.message.timestamp).toLocaleString();
    const messageClass: string = props.message.isUserSent ? "chat-message chat-message--sent" : "chat-message chat-message--received";
    const messageTextClass: string = props.message.isUserSent ? "chat-message-text chat-message-text--sent" : "chat-message-text chat-message-text--received";

    return (
        <div className={messageClass}>
            <div className="chat-message-date">{date}</div>
            <div className={messageTextClass}>
                {props.message.message}
            </div>
        </div>
    );
}
