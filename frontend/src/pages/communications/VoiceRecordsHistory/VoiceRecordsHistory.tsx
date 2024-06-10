import {VoiceRecord} from "../../../components/audio/VoiceRecord/VoiceRecord.tsx";
import "./voice-records-history.css";
import Page from "../../../components/base/Page.tsx";
import {useVoiceCommunications} from "../../../hooks/useVoiceCommunication.ts";
import {useCustomer} from "../../../hooks/useCustomers.ts";
import {useLayoutEffect, useMemo, useState} from "react";
import "../SingleChat/single-chat.css";
import {Button} from "@mui/material";

interface Participants {
    userId: number;
    customerId: number;
}

export const VoiceRecordsHistory = (props: { participants: Participants }) => {
    const {data: voices, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage} = useVoiceCommunications({
        customerId: props.participants.customerId,
        userId: props.participants.userId
    });

    const {
        data: customer,
        isLoading: customerIsLoading,
        error: customerError
    } = useCustomer(props.participants.customerId);

    const [currentPage, setCurrentPage] = useState(0);
    const voicesList = useMemo(() => voices?.pages.flatMap(page => page), [voices?.pages]);
    useMemo(() => window.scrollTo(0, document.body.scrollHeight), []);
    useLayoutEffect(() => window.scrollTo(0, document.body.scrollHeight), []); // TODO fix initial scroll
    if (isLoading || customerIsLoading) return <div>Loading...</div>;
    if (error || customerError) return <div>Error loading voice records</div>;
    const customerName = customer?.name;
    const customerEmail = customer?.email;


    return (
            <Page title="Page">
                <div className="voice-records-history">
                    <div className="chat-heading">
                        <div className="chat-heading__name">{customerName}</div>
                        <div className="chat-heading__email">{customerEmail}</div>
                    </div>
                    <Button
                        variant="outlined"
                        disabled={!hasNextPage || isFetchingNextPage}
                        onClick={() => {
                            fetchNextPage().then(() => setCurrentPage(currentPage + 1));
                        }}
                    >Load more</Button>
                    {voicesList?.reverse().map((comm) => <VoiceRecord callInfo={comm} key={comm.id}></VoiceRecord>)}
                </div>
            </Page>
    );
}
