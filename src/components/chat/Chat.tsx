import { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/bll-dal/store';
import { sendNewMessageTextTC } from './bll-dal/chat-reducer';
import style from './chat.module.scss';
import { Button, Paper } from '@mui/material';

export const Chat: FC<ChatPropsType> = ({ setIsOpenChat }) => {

  const dispatch = useAppDispatch();
  const scrollRef = useRef<null | HTMLElement>(null);
  const [textMessage, setTextMessage] = useState('');

  const messages = useAppSelector(state => state.chat.messages);
  const userName = useAppSelector(state => state.profile.name);

  useEffect(() => {scrollRef.current?.scrollIntoView({ behavior: 'smooth' });}, [messages]);

  const sendMessageHandler = () => {
    if (textMessage.trim() !== '') {
      dispatch(sendNewMessageTextTC(textMessage));
      setTextMessage('');
    }
  };

  const onkeypressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpenChat(false);
    } else if (e.key === 'Enter') {
      sendMessageHandler();
    }
  };

  return (
    <Paper className={style.main}>
      <h3>Chat</h3>
      <div className={style.messages}>
        {messages.map(el => {
          if (el.user.name === userName) {
            return (
              <div key={el._id} className={style.message} style={{ textAlign: 'right' }}>
                <span className={style.item}>{el.message}</span>
              </div>);
          } else {
            return (
              <div key={el._id} className={style.message}>
                  <span className={style.item}>
                  <span><b>{el.user.name}:</b> </span>
                  <span>{el.message}</span>
                  </span>
              </div>);
          }
        })}
        <span ref={scrollRef} />
      </div>
      <div className={style.sendBlock}>
        <input
          autoFocus
          value={textMessage}
          onChange={e => {setTextMessage(e.target.value);}}
          onKeyDown={onkeypressHandler} />
        <Button
          variant="contained"
          onClick={sendMessageHandler}>send</Button>
      </div>
    </Paper>
  );
};

type ChatPropsType = {
  setIsOpenChat: (isOpenChat: boolean) => void
}

