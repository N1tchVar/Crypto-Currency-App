import { LogoIcon } from "../Icons/Icon"
import { useNavigate } from "react-router-dom"

const Navbar: React.FC = () => {
  const navigate = useNavigate();

    return (
      <div className="bg-zinc-900 text-white h-14 flex items-center">
        <div className="wrapper-container w-full">
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate('/') }>
            <LogoIcon />
            <p className="font-semibold text-2xl">
              <span className="text-purple-600">C</span>ryptofy
              </p>
          </div>
        </div>
      </div>
    )
  }
  
  export default Navbar
  