import { useEffect, useState } from 'react';
import { Offer } from '../types/offer';
import { useParams } from 'react-router';
import { APIRoute, BACKEND_URL, REQUEST_TIMEOUT } from '../const';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type LoadNearbyOffers = {
  isNearbyDataLoading: boolean;
  nearbyOffers: Offer[];
}

function useLoadNearbyOffers (): LoadNearbyOffers {
  const params = useParams();
  const [isNearbyDataLoading, setIsNearbyDataLoading] = useState<boolean>(true);
  const url = `${BACKEND_URL}${APIRoute.Offers}/${params.offerId}${APIRoute.NearbyOffers}`;
  const [nearbyOffers, setNearbyOffers] = useState<Offer[]>([]);

  useEffect(() => {
    axios.get<Offer[]>(url, {timeout: REQUEST_TIMEOUT})
      .then((response) => {
        setIsNearbyDataLoading(false);
        setNearbyOffers(response.data);
      })
      .catch ((error: AxiosError) => {
        setIsNearbyDataLoading(false);
        toast(error.message);
      });
  }, [url]);

  return {isNearbyDataLoading, nearbyOffers};
}

export {useLoadNearbyOffers};
