import {useQuery} from "@tanstack/react-query";
import audioApi from "../api/audioApi.ts";

export const useAudioFile = (id: number) => {
    return useQuery({
        queryKey: ['audioFile', id],
        queryFn: () => audioApi.getAudioFile(id),
    });
};