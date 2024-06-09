import {ChatMessage} from "../../../components/Communication/ChatMessage/ChatMessage.tsx";
import "./single-chat.css"
import { SendMessage } from "../../../components/Communication/SendMessage/SendMessage.tsx";

interface Participants {
    senderId: number;
    receiverId: number;
}

export const SingleChat = (props: { participants: Participants }) => {
    // TODO loading messages and name from backend
    const message1 = {
        text: "Hello, how are you? m,acmabs ckjhbascjkhabs cjkhabskjchvajh cvahjkcvaskjch vjhkawkzu fgwecwveuzkhjvc",
        createdAt: new Date(),
        isOutgoing: true,
    }

    const message2 = {
        text: "r u ok broo?",
        createdAt: new Date(),
        isOutgoing: false,
    }

    const message3 = {
        text: "yeah just *hlasy v mojí hlavě*",
        createdAt: new Date(),
        isOutgoing: true,
    }
    const message4 = {
        text: "Now seriously...",
        createdAt: new Date(),
        isOutgoing: false,
    }

    const message5 = {
        text: "What do you mean?",
        createdAt: new Date(),
        isOutgoing: true,
    }

    const message6 = {
        text: "Well... Deadline is near and I am not sure if I can make it...",
        createdAt: new Date(),
        isOutgoing: false,
    }

    const message7 = {
        text: "Yeah, sure you can! Just keep calm and work hard!",
        createdAt: new Date(),
        isOutgoing: true,
    }

    const message8 = {
        text: "Now I need longer text, so here is some poem by chat: In the land where code and dreams unite,\n" +
            "Lies a tale of joy and plight.\n" +
            "The coder begins with hope so bright,\n" +
            "\"React will set my troubles right!\"\n" +
            "\n" +
            "Components first, a seamless dance,\n" +
            "States and props, a new romance.\n" +
            "But soon the code grows complex and vast,\n" +
            "The ease of React feels like the past.\n" +
            "\n" +
            "Hooks bring joy mixed with despair,\n" +
            "\"UseEffect!\" becomes a snare.\n" +
            "Errors pop up, patience frays,\n" +
            "Red screens haunt their coding days.\n" +
            "\n" +
            "Yet through the chaos, humor shines,\n" +
            "In every bug, a lesson finds.\n" +
            "For every groan, a feature stands,\n" +
            "Crafted by their weary hands.\n" +
            "\n" +
            "In this tale of code and tact,\n" +
            "Lies the heart of developing in React.\n" +
            "With laughter and tears, they push on through,\n" +
            "For the journey's the prize, ever new.",
        createdAt: new Date(),
        isOutgoing: true,
    }

    const message9 = {
        text: "Wooow, great job! :D",
        createdAt: new Date(),
        isOutgoing: false,
    }

    const message10 = {
        text: "Thanks, I know, I know :D",
        createdAt: new Date(),
        isOutgoing: true,
    }

    const messages = [message1, message2, message3, message4, message5, message6, message7, message8, message9, message10];
    for (let i = 0; i < 100; i++) {
        messages.push({
            text: "This is a message number " + i,
            createdAt: new Date(),
            isOutgoing: i % 2 === 0,

        })
    }

    const customerName = "Michal";
    const customerEmail = "email@seznam.cz";

    return (
        <div className="single-chat">
            <div className="chat-heading">
                <div className="chat-heading__name">{customerName}</div>
                <div className="chat-heading__email">{customerEmail}</div>
            </div>
            {messages.map((message) => <ChatMessage message={message}></ChatMessage>)}
            <SendMessage></SendMessage>
        </div>
    );
}
