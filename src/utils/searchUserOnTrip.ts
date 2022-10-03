import axios from 'axios';

const searchUser = async(idTrip:string, idUser:string) => {
    const searchUser = await axios.get(`/api/users?id=${idUser}&tripID=${idTrip}`);

    return searchUser.data;
}

export default searchUser;