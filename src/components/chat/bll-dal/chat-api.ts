import socketIo from 'socket.io-client';
import { MessageType } from '../../../app/bll-dal/types';

export const chatAPI = {

  socket: null as null | SocketIOClient.Socket,

  openConnection() {
    this.socket = socketIo('https://neko-back.herokuapp.com/');
    this.socket.emit('init');
  },
  initAllMessages(getAllMessages: (allMassages: MessageType[]) => void) {
    this.socket?.on('init-messages-published', getAllMessages);
  },
  initNewMessage(getNewMessage: (message: MessageType) => void) {
    this.socket?.on('new-message-sent', getNewMessage);
  },
  setUserName(userName: string) {
    this.socket?.emit('client-name-sent', userName);
  },
  sentMessage(messageText: string) {
    this.socket?.emit('client-message-sent', messageText);
  },
  closeConnection() {
    this.socket?.disconnect();
    this.socket = null;
  },
};

