import { useState, type FC } from 'react';
import styles from './SignIn.module.scss';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button/Button';
import { Link, useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useToast } from '@chakra-ui/react';

const SignInScreen: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnBlur: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email('Некорректная почта')
        .required('Введите почту'),
      password: Yup.string().trim().required('Введите пароль'),
    }),
    onSubmit: value => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: `Добро пожаловать, ${value.email}!`,
          status: 'success',
          position: 'bottom-right',
          containerStyle: {
            color: 'white',
          },
        });
        setTimeout(() => navigate('/chat'), 500);
      }, 500);
    },
  });
  return (
    <div className={styles.page}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <p className={styles.title}>Вход</p>
        <Input
          className={styles.input}
          type="email"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          name="email"
          error={formik.errors.email}
          label="Адрес электронной почты"
        />
        <Input
          className={styles.input}
          type="password"
          label="Пароль"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          name="password"
          error={formik.errors.password}
        />
        <Link to={'/'} className={styles.password}>
          Забыли пароль?
        </Link>
        <Button
          disabled={Object.keys(formik.errors).length >= 1 || isLoading}
          isLoading={isLoading}
          className={styles.button}
        >
          Войти
        </Button>
        <p>У вас еще нету учетной записи?</p>
        <Link to={'/signup'} className={styles.link}>
          Регистрация
        </Link>
      </form>
    </div>
  );
};

export default SignInScreen;
