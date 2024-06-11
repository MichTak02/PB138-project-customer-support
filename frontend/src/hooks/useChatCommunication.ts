import {useQuery, useMutation, useQueryClient, useInfiniteQuery} from '@tanstack/react-query';
import {
    ChatCommunicationDto,
    ChatCommunicationExtendedDto,
    ChatCommunicationCreateDto,
    ChatCommunicationUpdateDto,
    ChatCommunicationFilters
} from '../models/chatCommunication.ts';
import ApiService, {GET_MANY_SIZE} from "../api/apiService.ts";

const chatCommunicationsApi =
    new ApiService<ChatCommunicationDto, ChatCommunicationExtendedDto, ChatCommunicationCreateDto, ChatCommunicationUpdateDto, ChatCommunicationFilters>('/chatCommunications');

export const useChatCommunications = (filter?: ChatCommunicationFilters) => {
    return useInfiniteQuery({
        queryKey: ['chatCommunication', filter],
        queryFn: ({pageParam}) => chatCommunicationsApi.getMany(pageParam, filter),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _pages) => lastPage.length === GET_MANY_SIZE ? lastPage[lastPage.length - 1].id : undefined,
    });
};

export const useChatCommunication = (id: number) => {
    return useQuery<ChatCommunicationExtendedDto>({
        queryKey: ['chatCommunication', id],
        queryFn: () => chatCommunicationsApi.get(id),
    });
};

export const useCreateChatCommunication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: chatCommunicationsApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['chatCommunication']});
        },
    });
};

export const useUpdateChatCommunication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, updateData}: { id: number, updateData: ChatCommunicationUpdateDto }) =>
            chatCommunicationsApi.update(id, updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
        },
    });
};
