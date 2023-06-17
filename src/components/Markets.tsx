import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrendingDown, TrendingUp } from '../Icons/Icon';
import { Link } from 'react-router-dom';

interface CryptoCoins {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const Market: React.FC = () => {
  const [cryptoCoins, setCryptoCoins] = useState<CryptoCoins[]>([]);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get<CryptoCoins[]>(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
        );
        setCryptoCoins(response.data);
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    fetchMarketData();
  }, []);

  return (
    <h1 className='m-2 mt-4 text-2xl'>Market</h1>
    {cryptoCoins.map((crypto) => (
         <Link to={`/coin/${crypto.id}`} key={crypto.id}>
      <div className='grid grid-cols-1 text-center sm:grid-cols-1 font-light p-2 rounded
       border-gray-200 border-b hover:bg-gray-200'>
          <div key={crypto.id}>
              <div className='flex items-center gap-1 w-full'>
                  <img className='w-6' src={crypto.image} alt={crypto.name} />
                  <div className='flex justify-center items-center w-1/4 font-regular'>
                    <p className='w-full'>{crypto.name}</p>
                    <span className='text-xs'>({crypto.symbol})</span>
                  </div>
                  <span className='w-full text-center'>${crypto.current_price}</span>
                  <span className={`flex gap-2 ${crypto.price_change_percentage_24h < 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {crypto.price_change_percentage_24h < 0 ? <TrendingDown /> : <TrendingUp />}
                    {crypto.price_change_percentage_24h}
                    </span>
              </div>
          </div>
      </div>
      </Link>
    ))}
  );
};

export default Market;