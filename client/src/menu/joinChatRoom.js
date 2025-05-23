const { prompt } = require('inquirer');
const axios = require('axios');
require ('dotenv').config();

module.exports = async function joinChatRoom(client, chatRoom = null) {
    if (chatRoom) {
        client.emit('join', chatRoom);
    } else {
        const response = await axios.get(`${process.env.BACKEND_URL}/api/chatrooms`);
        const chatRooms = response.data;
        const chatRoomsOption = [
            {
                type: 'list',
                name: 'selectedRoom',
                message: 'Choose a Chat Room:',
                choices: chatRooms,
            },
        ]
        const { selectedRoom } = await prompt(chatRoomsOption);
        client.emit('join', selectedRoom);
        return selectedRoom;
    }
}
