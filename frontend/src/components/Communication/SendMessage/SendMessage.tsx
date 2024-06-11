import TextField from "@mui/material/TextField"
import "./send-message.css"
import {Button} from "@mui/material";
import {useCreateChatCommunication} from "../../../hooks/useChatCommunication.ts";
import {useState} from "react";
import {UseMutationResult} from "@tanstack/react-query";
import {ChatCommunicationCreateDto, ChatCommunicationDto} from "../../../models/chatCommunication.ts";

interface SendMessageProps {
    userId: number;
    customerId: number;
}

const handleCreateChatCommunication = (message: string, userId: number, customerId: number, mutation: UseMutationResult<ChatCommunicationDto, Error, ChatCommunicationCreateDto, unknown>) => {
    const chatCommunication = {
        message: message,
        userId: userId,
        customerId: customerId,
        isUserSent: true
    }
    if (message.length > 0) {
        mutation.mutate(chatCommunication);
    }
}

export const SendMessage = (props: { sendMessageProps: SendMessageProps }) => {
    const mutation = useCreateChatCommunication();
    const [message, setMessage] = useState("");

    return (
        <div className="send-message">
            <TextField sx={{width: "80%", textWrap: "wrap"}} multiline={true}
                       onChange={(text) => setMessage(text.target.value)}
                       value={message}
            ></TextField>
            <Button variant="contained" sx={{width: "20%"}} onClick={() => {
                setMessage("");
                handleCreateChatCommunication(message, props.sendMessageProps.userId, props.sendMessageProps.customerId, mutation)

            }}>Send</Button>
        </div>
    )
}
