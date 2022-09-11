import socketIo from 'socket.io-client';
import { MessageType } from '../../../app/bll-dal/types';

const socket = socketIo('https://neko-back.herokuapp.com/');

export const chatAPI = {
  openConnection() {
    socket.emit('init');
  },
  initAllMessages(getAllMessages: (allMassages: MessageType[]) => void) {
    socket.on('init-messages-published', getAllMessages);
  },
  initNewMessage(getNewMessage: (message: MessageType) => void) {
    socket.on('new-message-sent', getNewMessage);
  },
  setUserName(userName: string) {
    socket.emit('client-name-sent', userName);
  },
  sentMessage(messageText: string) {
    socket.emit('client-message-sent', messageText);
  },
  closeConnection() {
    socket.disconnect();
  },
};

