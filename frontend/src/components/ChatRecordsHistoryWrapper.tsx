import React from 'react';
import { useParams } from 'react-router-dom';
import { SingleChat } from '../pages/communications/SingleChat/SingleChat';

const ChatRecordsHistoryWrapper = () => {
    const { userId, customerId } = useParams<{ userId: string; customerId: string }>();

    const participants = {
        userId: Number(userId),
        customerId: Number(customerId),
    };

    return <SingleChat participants={participants} />;
};

export default ChatRecordsHistoryWrapper;
