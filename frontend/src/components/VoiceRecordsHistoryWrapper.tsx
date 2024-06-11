import React from 'react';
import { useParams } from 'react-router-dom';
import { VoiceRecordsHistory } from '../pages/communications/VoiceRecordsHistory/VoiceRecordsHistory.tsx';

const VoiceRecordsHistoryWrapper = () => {
    const { userId, customerId } = useParams<{ userId: string; customerId: string }>();

    const participants = {
        userId: Number(userId),
        customerId: Number(customerId),
    };

    return <VoiceRecordsHistory participants={participants} />;
};

export default VoiceRecordsHistoryWrapper;
