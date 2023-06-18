import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface CoinData {
  id: string;
  name: string;
  image: {
    small: string;
  };
  description: {
    en: string;
  };
}

const CoinDetails: React.FC = () => {
  const [coin, setCoin] = useState<CoinData | null>(null);

  const {id} = useParams();

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&sparkline=false`
        );
        const data = await response.json();
        setCoin(data);
      } catch (error) {
        console.error("Error fetching coin details:", error);
      }
    };

    fetchCoinDetails();
  }, []);

  return (
    <div className="my-6">
      {coin ? (
        <>
        <div className="flex gap-2 items-center">
          <img src={coin.image.small} alt={coin.name} />
          <h1 className="text-2xl mb-2 capitalize font-bold">
            {coin.name}</h1>
        </div>
            <p className='mt-6 p-2 text-left' dangerouslySetInnerHTML={{__html: coin.description.en}}></p>
        </>
      ) : (
        <p>Loading coin details...</p>
      )}
    </div>
  );
};

export default CoinDetails;