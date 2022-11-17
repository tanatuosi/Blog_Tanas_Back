import LoginBox from './LoginBox';
import LoginBg from './LoginBg';
import s from './index.module.scss';

const Login = () => {
    return (
        <div className={s.loginPage}>
            <LoginBg />
            <LoginBox />
        </div>
    );
};

export default Login;
