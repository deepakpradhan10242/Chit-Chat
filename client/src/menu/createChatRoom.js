const { prompt } = require('inquirer');
const joinChatRoom = require('./joinChatRoom');
const axios = require('axios');
require ('dotenv').config();
const question = [
  {
    type: 'input',
    name: 'roomName',
    message: 'Enter Room Name'
  }
]

module.exports = async function createChatRoom(client) {
  try {
    const answer = await prompt(question);
    const roomName = answer.roomName;

    const response = await axios.post(`${process.env.BACKEND_URL}/api/chatrooms`, {
      roomName
    });
    const chatRoom = response.data;
    console.log(`${chatRoom} chat room created`);
    joinChatRoom(client, chatRoom);
    return chatRoom;
  } catch (error) {
    if (error.response.data.message) {
      console.info(error.response.data.message);
      createChatRoom(client); 
    } else {
      console.error(error);
    }
  }
};
