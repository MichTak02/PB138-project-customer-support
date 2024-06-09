import BaseApi from './baseApi';
import { Offer, OfferBasic } from '../models/offer';

const OFFERS_PREFIX = '/offers';

async function getAllOffers() {
    return BaseApi.getAll<Offer[]>(OFFERS_PREFIX);
}

async function createOffer(offer: OfferBasic) {
    return BaseApi.postSingle<Offer>(OFFERS_PREFIX, offer);
}

async function updateOffer(id: number, offer: OfferBasic) {
    return BaseApi.putSingle<Offer>(`${OFFERS_PREFIX}/${id}`, offer);
}

async function deleteOffer(id: number) {
    return BaseApi.deleteSingle<Offer>(`${OFFERS_PREFIX}/${id}`);
}

const OffersApi = {
    getAllOffers,
    createOffer,
    updateOffer,
    deleteOffer,
};

export default OffersApi;
