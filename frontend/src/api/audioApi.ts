import BaseApi from "./baseApi.ts";

const AUDIO_PREFIX = 'voiceCommunications/audioFile';

const getAudioFile = async (voiceCommId: number) => {
    const data = await BaseApi.get<ArrayBuffer>(`${AUDIO_PREFIX}/${voiceCommId}`, {responseType: 'arraybuffer'})
    const audioBlob = new Blob([data], { type: 'audio/mpeg' });
    return URL.createObjectURL(audioBlob);
}

const AudioApi = {
    getAudioFile
};

export default AudioApi;