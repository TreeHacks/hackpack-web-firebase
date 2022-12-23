import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logInWithEmailAndPassword, registerWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const Login = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            if (!loginEmail) {
                console.log('Enter email address!');
            }
            if (!loginPassword) {
                console.log('Enter password!');
            }
            if (loginEmail&&loginPassword) {
                await logInWithEmailAndPassword(loginEmail, loginPassword).then(() => {navigate("/home")});
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRegister = async () => {
        if (!registerEmail) {
            console.log('Enter email address!');
        }
        if (!registerPassword) {
            console.log('Enter password!');
        }
        if (registerEmail&&registerPassword) {
            await registerWithEmailAndPassword(registerEmail, registerPassword).then(() => {navigate("/home")});
        }
    };

    return (
        <div>
            <div className="login">
                <h1>Login</h1>

                <div className="login__container">
                    <div>
                        <label style={{textAlign: "left", fontWeight: 'bold'}}>E-mail Address: </label>
                        <input
                            type="text"
                            className="login__textBox"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail((e.target.value).toLowerCase())}
                            placeholder="E-mail Address"
                            required
                        />
                    </div>
                    <div>
                        <label style={{textAlign: "left", fontWeight: 'bold'}}>Password: </label>
                        <input
                            type="password"
                            className="login__textBox"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button
                        className="login__btn"
                        onClick={handleSignIn}
                    >
                        Login
                    </button>
                </div>
            </div>

            <div className="register">
                <h1>Register</h1>

                <div className="login__container">
                    <div>
                        <label style={{textAlign: "left", fontWeight: 'bold'}}>E-mail Address: </label>
                        <input
                            type="text"
                            className="login__textBox"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail((e.target.value).toLowerCase())}
                            placeholder="E-mail Address"
                            required
                        />
                    </div>
                    <div>
                        <label style={{textAlign: "left", fontWeight: 'bold'}}>Password: </label>
                        <input
                            type="text"
                            className="login__textBox"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button
                        className="login__btn"
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;