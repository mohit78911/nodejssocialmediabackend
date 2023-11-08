const friendRequest = require('../Model/FriendRequest')


async fucntion sendFriendRequest (sendId,receiverId){
    try{
        new request = new friendRequest({sender : sendId,receiver : receiverId})
        
    }
}