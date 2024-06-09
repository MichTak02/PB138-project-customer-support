import {VoiceCommunicationDto} from "../../../models/voiceCommunication.ts";
import {VoiceRecord} from "../../../components/audio/VoiceRecord/VoiceRecord.tsx";
import "./voice-records-history.css";
import Page from "../../../components/base/Page.tsx";

interface Participants {
    senderId: number;
    receiverId: number;
}

export const VoiceRecordsHistory = (props: { participants: Participants }) => {
    const voiceComm1: VoiceCommunicationDto = {
        id: 1,
        start: new Date(Date.now() - 62000),
        end: new Date(),
        isUserStarted: false,
        customerId: 1,
        userId: 2
    };

    const voiceComm2: VoiceCommunicationDto = {
        id: 2,
        start: new Date(Date.now() - 153000),
        end: new Date(),
        isUserStarted: true,
        customerId: 1,
        userId: 2
    };
    const comms = [voiceComm1, voiceComm2]; // TODO load from backend

    return (
        <>
            <Page title="Page">
                <div className="voice-records-history">
                    {comms.map((comm) => <VoiceRecord callInfo={comm}></VoiceRecord>)}
                </div>
            </Page>
        </>
    );
}
