import {VoiceCommunicationDto} from "../../../models/voiceCommunication.ts";
import "../../../index.css";
import "./voice-record.css";
import Audio from "../Audio.tsx";

export const VoiceRecord = (props: { callInfo: VoiceCommunicationDto }) => {
    const totalSeconds = (props.callInfo.end.getTime() - props.callInfo.start.getTime()) / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const voiceRecordClass: string = props.callInfo.isUserStarted ? "voice-record voice-record--sent" : "voice-record voice-record--received";

    return (
        <div className={voiceRecordClass}>
            <div className="voice-record__heading">Phone call</div>
            <div className="voice-record__description">
                Start: {props.callInfo.start.toLocaleString()} <br/>
                Duration: {hours > 0 && (hours + "h")} {hours > 0 || minutes > 0 && (minutes + "m")} {seconds}s
            </div>
            <Audio id={props.callInfo.id}></Audio>
        </div>
    );
}
