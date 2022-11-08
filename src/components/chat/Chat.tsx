import React, { FC, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/bll-dal/store';
import { sendNewMessageTextTC } from './bll-dal/chat-reducer';
import style from './chat.module.scss';
import { Button, Paper } from '@mui/material';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { Options } from 'overlayscrollbars';

export const Chat: FC<ChatPropsType> = ({ setIsOpenChat }) => {

  const dispatch = useAppDispatch();
  const [textMessage, setTextMessage] = useState('');

  const messages = useAppSelector(state => state.chat.messages);
  const userName = useAppSelector(state => state.profile.name);

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



  //SCROLL
  const [scrollDown, setScrollDown] = useState(false);

  const getScroll = (refCurrent: OverlayScrollbarsComponent): { scrollPosition: number; overflowAmount: number } => ({
    scrollPosition: refCurrent.osInstance()?.scroll().position.y!,
    overflowAmount: refCurrent.osInstance()?.getState('overflowAmount.y'),
  });

  const chatMessagesRef = useRef<OverlayScrollbarsComponent>(null);
  const onContentSizeChanged = () => {
    if (chatMessagesRef.current) {
      const { overflowAmount, scrollPosition } = getScroll(chatMessagesRef.current);

      if (overflowAmount - scrollPosition > 100) {
        if (scrollDown && chatMessagesRef.current) {
          chatMessagesRef.current.osInstance()?.scroll({ y: '100%' });
          setScrollDown(false);
        } else {
          chatMessagesRef.current.osInstance()?.scroll({ y: scrollPosition });
        }
      } else {
        chatMessagesRef.current.osInstance()?.scroll({ y: '100%' });
      }
    }
  };

  const onScrollStop = (): void => {
    if (chatMessagesRef.current) {
      const { overflowAmount, scrollPosition } = getScroll(chatMessagesRef.current);
    }
  };

  const onHostSizeChanged = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.osInstance()?.scroll({ y: '100%' });
    }
  };

  const options: Options = {
    scrollbars: {
      clickScrolling: true,
      autoHide: 'leave',
      autoHideDelay: 0,
    },
    callbacks: {
      onContentSizeChanged,
      onScrollStop,
      onHostSizeChanged,
    },
  };

  return (
    <Paper className={style.main}>
      <h3>Chat</h3>
      <OverlayScrollbarsComponent
        className={style.messages}
        ref={chatMessagesRef}
        options={options}>
        {messages.map(el => {
          if (el.user.name === userName) {
            return (
              <div key={el._id}
                   className={style.message}
                   style={{ textAlign: 'right' }}>
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
      </OverlayScrollbarsComponent>
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

