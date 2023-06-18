import CoinDetails from "../components/CoinDetails"
import HistoryChart from "../components/HistoryChart"

const CryptofyDetails: React.FC = () => {
    return (
      <div className="wrapper-container mt-10">
        <HistoryChart />
        <CoinDetails />
      </div>
    )
  }
  
  export default CryptofyDetails
  