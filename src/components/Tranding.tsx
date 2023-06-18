import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  small: string;
  item: any;
}

const Trending: React.FC = () => {
  const [trendingCoins, setTrendingCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const response = await axios.get<{ coins: Coin[] }>('https://api.coingecko.com/api/v3/search/trending');
        setTrendingCoins(response.data.coins);
      } catch (error) {
        console.error('Error fetching trending coins:', error);
      }
    };

    fetchTrendingCoins();
  }, []);

  return (
    <div>
      <h1 className='text-3xl mb-2 mt-2 p-3 font-semibold'>Trending Coins:</h1>
      <div>
        {trendingCoins.map((coin) => (
          <Link to={`/coin/${coin.item.id}`} key={coin.item.id}>
            <div className='sans border-2 rounded-xl border-purple-900 w-full p-2 mb-1 flex items-center gap-3 hover:bg-purple-950 transition duration-300 '>
              <span className='text-1xl font-regular'>{coin.item.score+1}.</span>
              <div>
                <img src={coin.item.small} alt={coin.name} />
              </div>
              <div className='flex justify-center items-center font-regular text-1xl gap-2 font-regular'>
                <p>{coin.item.name}</p>
                <p>({coin.item.symbol})</p>
              </div>
            </div>
          </Link>
          
        ))}
      </div>
    </div>
  );
};

export default Trending;