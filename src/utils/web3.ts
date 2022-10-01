import axios from "axios";
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
  return response.data
};
