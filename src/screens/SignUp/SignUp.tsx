import { useState, type FC } from 'react';
import styles from './SignUp.module.scss';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button/Button';
import { Link, useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useToast } from '@chakra-ui/react';

const SignUpScreen: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordRepeat: '',
    },
    validateOnBlur: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email('Некорректная почта')
        .required('Введите почту'),
      password: Yup.string().trim().required('Введите пароль'),
      passwordRepeat: Yup.string()
        .trim()
        .oneOf([Yup.ref('password')], 'Пароли не совпадают')
        .required('Повторите пароль'),
    }),
    onSubmit: () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: `Вы зарегистрированы!`,
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
        <p className={styles.title}>Регистрация</p>
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
        <Input
          className={styles.input}
          type="password"
          label="Подтвердить пароль"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          name="passwordRepeat"
          error={formik.errors.passwordRepeat}
        />
        <Button
          disabled={Object.keys(formik.errors).length >= 1 || isLoading}
          isLoading={isLoading}
          className={styles.button}
        >
          Зарегистрироваться
        </Button>
        <p>У вас уже есть учетная запись?</p>
        <Link to={'/signin'} className={styles.link}>
          Войти
        </Link>
      </form>
    </div>
  );
};

export default SignUpScreen;
