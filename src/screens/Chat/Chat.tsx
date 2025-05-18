import { useEffect, useRef, useState, type FC } from 'react';
import styles from './Chat.module.scss';
import { Avatar, CircularProgress, useToast } from '@chakra-ui/react';
import avatar_img from '@/assets/user.png';
import { Dropdown, type MenuProps } from 'antd';
import { SendHorizontal } from 'lucide-react';
import { Link } from 'react-router';
import TextArea from 'antd/es/input/TextArea';
import Button from '../../components/UI/Button/Button';
import Message from '../../components/Message/Message';
import type { IMessage } from '../../types/Message';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useAI } from '../../hooks/useAI';
import dayjs from 'dayjs';

const menuList: MenuProps['items'] = [
  {
    label: (
      <Link className={styles.exit} to={'/signin'}>
        Выйти
      </Link>
    ),
    key: 0,
  },
];

const ChatScreen: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [listMessages, setListMessages] = useState<IMessage[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isLoading, mutate } = useAI(
    ({ data }) => {
      setListMessages(prev => [
        ...prev,
        {
          id: data.id,
          content: data.choices[0].message.content,
          date: dayjs().format('HH:mm'),
          sender: 'ai',
        },
      ]);
    },
    () => {
      toast({
        title: 'Не удалось отправить запрос',
        description: 'Возможно, вы забыли включить VPN',
        status: 'error',
      });
    },
  );
  const toast = useToast();

  useEffect(() => {
    wrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    textareaRef.current?.focus();
  }, [listMessages]);

  const handleSubmit = () => {
    if (isLoading || !inputValue) return;
    setListMessages(prev => [
      ...prev,
      {
        id: String(listMessages.length),
        content: inputValue,
        date: dayjs().format('HH:mm'),
        sender: 'me',
      },
    ]);

    mutate({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: inputValue }],
    });
    setInputValue('');
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <header className={styles.header}>
        {/* <Select
          defaultValue={'RU'}
          suffixIcon={<ChevronDown size={16} />}
          style={{ width: 90 }}
          options={[
            { value: 'RU', label: '🇷🇺 RU' },
            { value: 'EN', label: '🇬🇧 EN' },
          ]}
        /> */}
        <Dropdown menu={{ items: menuList }} trigger={['click']}>
          <Avatar className={styles.avatar} src={avatar_img} name="Fake fake" />
        </Dropdown>
      </header>
      <div className={styles.messages}>
        <AnimatePresence mode="wait" initial={false}>
          <div className={styles.messagesContainer}>
            {listMessages.map(message => (
              <Message {...message} />
            ))}
            {isLoading && (
              <Message
                id="loading"
                sender="ai"
                content={
                  <CircularProgress size={6} isIndeterminate color="blue" />
                }
              />
            )}
          </div>
        </AnimatePresence>
      </div>
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
          className={clsx(styles.form, {
            [`${styles.formDown}`]: listMessages.length >= 1,
          })}
        >
          <AnimatePresence mode="wait" initial={false}>
            {listMessages.length == 0 && (
              <motion.h1
                className={styles.title}
                key={'title'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                Чем я могу помочь?
              </motion.h1>
            )}
          </AnimatePresence>
          <div className={styles.content}>
            <TextArea
              className={styles.textarea}
              ref={textareaRef}
              placeholder={
                !isLoading ? 'Найдите что-нибудь' : 'Пожалуйтса, подождите...'
              }
              autoSize={{ minRows: 1, maxRows: 2 }}
              value={inputValue}
              disabled={isLoading}
              onChange={e => {
                setInputValue(e.target.value);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <Button disabled={isLoading} className={styles.button}>
              {!isLoading ? (
                <SendHorizontal size={20} strokeWidth={2} />
              ) : (
                <CircularProgress size={6} isIndeterminate color="blue" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
