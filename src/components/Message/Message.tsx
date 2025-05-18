import type { FC } from 'react';
import styles from './Message.module.scss';
import clsx from 'clsx';
import type { IMessage } from '../../types/Message';
import { AnimatePresence, motion } from 'framer-motion';

const Message: FC<IMessage> = ({ id, sender, content, date }) => {
  return (
    <AnimatePresence mode="wait">
      <div className={styles.wrapper}>
        <motion.div
          key={id}
          initial={
            sender == 'me'
              ? { left: -20, opacity: 0 }
              : { right: -20, opacity: 0 }
          }
          animate={
            sender == 'me' ? { left: 0, opacity: 1 } : { right: 0, opacity: 1 }
          }
          exit={
            sender == 'me'
              ? { left: -20, opacity: 0 }
              : { right: -20, opacity: 0 }
          }
          transition={{ duration: 0.5 }}
          className={clsx(styles.message, {
            [`${styles.me}`]: sender == 'me',
            [`${styles.ai}`]: sender == 'ai',
          })}
        >
          {date && (
            <p
              className={clsx(styles.date, {
                [`${styles.dateLeft}`]: sender == 'ai',
                [`${styles.dateRight}`]: sender == 'me',
              })}
            >
              {date}
            </p>
          )}
          {content}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Message;
