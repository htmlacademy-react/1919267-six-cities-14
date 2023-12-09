import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Offer } from '../types/offer';
import { APIRoute, AppRoute, BACKEND_URL, REQUEST_TIMEOUT } from '../const';

type LoadOfferInfo = {
  isOfferInfoLoading: boolean;
  offerInfo: Offer | undefined;
}

function useLoadOfferInfo(): LoadOfferInfo {
  const params = useParams();
  const navigate = useNavigate();
  const url = `${BACKEND_URL}${APIRoute.Offers}/${params.offerId}`;
  const [offerInfo, setOfferInfo] = useState<Offer | undefined>();
  const [isOfferInfoLoading, setOfferLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<Offer>(url, {timeout: REQUEST_TIMEOUT})
      .then((response) => {
        setOfferInfo(response.data);
        setOfferLoading(false);
      })
      .catch((err: AxiosError) => {
        setOfferLoading(false);
        if (err.response?.status === 404) {
          navigate(`${AppRoute.NotFound}`);
        }
      });
  },[url, navigate]);

  return {isOfferInfoLoading, offerInfo};
}

export {useLoadOfferInfo};
