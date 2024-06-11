import {ChatMessage} from "../../../components/Communication/ChatMessage/ChatMessage.tsx";
import "./single-chat.css"
import {SendMessage} from "../../../components/Communication/SendMessage/SendMessage.tsx";
import {useChatCommunications} from "../../../hooks/useChatCommunication.ts";
import {useCustomer} from "../../../hooks/useCustomers.ts";
import {Button} from "@mui/material";
import {useLayoutEffect, useMemo} from "react";
import Page from "../../../components/base/Page.tsx";

interface Participants {
    userId: number;
    customerId: number;
}

export const SingleChat = (props: { participants: Participants }) => {
    const {data: messages, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage} = useChatCommunications({
        customerId: props.participants.customerId,
        userId: props.participants.userId
    });

    const {
        data: customer,
        isLoading: customerIsLoading,
        error: customerError
    } = useCustomer(props.participants.customerId);


    useLayoutEffect(() => window.scrollTo(0, document.body.scrollHeight), [messages?.pages[0]]);

    if (isLoading || customerIsLoading) return <div>Loading...</div>;
    if (error || customerError) return <div>Error loading messages</div>;
    const customerName = customer?.name;
    const customerEmail = customer?.email;

    return (
        <Page title="Chat communication">
            <div className="single-chat">
                <div className="chat-heading">
                    <div className="chat-heading__name">{customerName}</div>
                    <div className="chat-heading__email">{customerEmail}</div>
                </div>
                <Button
                    variant="outlined"
                    disabled={!hasNextPage || isFetchingNextPage}
                    onClick={async () => {
                        await fetchNextPage();
                    }}
                >Load more</Button>
                {messages?.pages.flatMap(page => page).reverse().map((message) => <ChatMessage message={message}
                                                                                               key={message.id}></ChatMessage>)}
                <SendMessage sendMessageProps={{
                    customerId: props.participants.customerId,
                    userId: props.participants.userId
                }}></SendMessage>
            </div>
        </Page>
    );
}
