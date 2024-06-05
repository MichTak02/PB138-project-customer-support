import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import OffersApi from '../api/offerApi';
import { Offer, OfferBasic } from '../models/offer';

export const useOffers = () => {
  return useQuery<Offer[]>({
    queryKey: ['offers'],
    queryFn: OffersApi.getAllOffers,
  });
};

export const useCreateOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: OffersApi.createOffer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
  });
};

export const useUpdateOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, offer }: { id: number; offer: OfferBasic }) =>
      OffersApi.updateOffer(id, offer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
  });
};

export const useDeleteOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => OffersApi.deleteOffer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
  });
};
