import prisma from './prisma'

const searchUser = async(idTrip:string, idUser:string) =>{
    const searchUser = await prisma.usersOnTrips.findFirst({
        where:{
            userid:idUser,
            tripId:idTrip
        }
    })
    return searchUser ? true : false
}

export default searchUser;