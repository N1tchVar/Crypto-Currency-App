import Markets from "../components/Markets"
import Trending from "../components/Tranding"

const Cryptofy: React.FC = () => {
  return (
    <div className="wrapper-container">
      <Trending />
      <Markets />
    </div>
  )
}

export default Cryptofy
