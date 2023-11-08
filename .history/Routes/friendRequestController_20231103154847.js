const friendRequest = require('../Model/FriendRequest')


 fucntion sendFriendRequest (sendId,receiverId){
    try{
        const request = new friendRequest({sender : sendId,receiver : receiverId})
        await request.save()
        return request
    }catch(error){
        console.log(error)
    }
}


module.exports = {
    sendFriendRequest
}