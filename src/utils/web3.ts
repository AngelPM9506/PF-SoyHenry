import axios from "axios";
import EthIcon from "./img/etherLogo.png";
import UsdcIcon from "./img/usd-coin-usdc-logo.png";
import UsdtIcon from "./img/tether-usdt-logo.png";
import DaiIcon from "./img/multi-collateral-dai-dai-logo.png";
export const getEthPrice = async () => {
  const ethPrice = await axios.get(
    "http://api.coingecko.com/api/v3/coins/ethereum"
  );
  return ethPrice.data;
};

export const validateWeb3Payment = async (userId: string, tripId: string) => {
  const response = await axios.post(`/api/payment/web3`, {
    userId: userId,
    tripId: tripId,
  });
  return response.data;
};

export const tokenOptions = [
  { value: undefined, label: "ETH", icon: EthIcon },
  {
    value: "0xE4482fC3231F430B05BDCCdacC2F8A8Ce45B184f",
    label: "USDC",
    icon: UsdcIcon,
  },
  {
    value: "0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60",
    label: "DAI",
    icon: DaiIcon,
  },
  {
    value: "0x955f77e4c86652F792DEcd962199106F191bE758",
    label: "USDT",
    icon: UsdtIcon,
  },
];
