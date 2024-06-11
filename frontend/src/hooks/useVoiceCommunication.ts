import ApiService, {GET_MANY_SIZE} from "../api/apiService.ts";
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    VoiceCommunicationCreateDto,
    VoiceCommunicationDto,
    VoiceCommunicationExtendedDto, VoiceCommunicationFilters, VoiceCommunicationUpdateDto
} from "../models/voiceCommunication.ts";

const voiceCommunicationsApi =
    new ApiService<VoiceCommunicationDto, VoiceCommunicationExtendedDto, VoiceCommunicationCreateDto, VoiceCommunicationUpdateDto, VoiceCommunicationFilters>('/voiceCommunications');

export const useVoiceCommunications = (filter?: VoiceCommunicationFilters) => {
    return useInfiniteQuery({
        queryKey: ['voiceCommunication'],
        queryFn: ({pageParam}) => voiceCommunicationsApi.getMany(pageParam, filter),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _pages) => lastPage.length === GET_MANY_SIZE ? lastPage[lastPage.length - 1].id : undefined,
    });
};

export const useVoiceCommunication = (id: number) => {
    return useQuery<VoiceCommunicationExtendedDto>({
        queryKey: ['voiceCommunication', id],
        queryFn: () => voiceCommunicationsApi.get(id),
    });
};

export const useCreateVoiceCommunication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: voiceCommunicationsApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['voiceCommunication']});
        },
    });
};

export const useUpdateVoiceCommunication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, updateData}: { id: number, updateData: VoiceCommunicationUpdateDto }) =>
            voiceCommunicationsApi.update(id, updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
        },
    });
};
