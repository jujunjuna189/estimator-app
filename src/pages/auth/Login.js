import { useEffect, useState } from "react";
import { LGlogo1 } from "../../assets";
import { authSignIn, getLocalAuth } from "../../services/auth/AuthService";

function Login() {

    const [visibilityProp, setVisibilityProp] = useState({ frame: 'opacity-0' });
    const [fieldEmailProp, setFieldEmailProp] = useState('');
    const [fieldPasswordProp, setFieldPasswordProp] = useState('');

    useEffect(function () {
        let auth = getLocalAuth();
        if (auth) {
            pageDispose();
        } else {
            pageDidDefault();
        }
    }, []);

    const pageDidDefault = () => {
        setVisibilityProp({
            frame: 'opacity-100',
        });
    }

    const pageDispose = () => {
        setVisibilityProp({
            frame: 'ease-out duration-300 opacity-0'
        });
        setTimeout(function () {
            setVisibilityProp({
                frame: 'hidden'
            });
        }, 300);
    }

    const signIn = () => {
        authSignIn({
            email: fieldEmailProp,
            password: fieldPasswordProp,
        }).then(function (data) {
            pageDispose();
        });
    }

    const clearForm = () => {
        setFieldEmailProp('');
        setFieldPasswordProp("");
    }

    const onHandleSubmitSignIn = (e) => {
        e.preventDefault();
        signIn();
        clearForm();
    }

    return (
        <div className={`absolute flex justify-center items-center right-0 left-0 bottom-0 top-0 bg-white bg-opacity-20 backdrop-blur-md rounded drop-shadow-lg ${visibilityProp.frame}`}>
            <div className="bg-white px-20 pt-12 pb-20 rounded-lg shadow-md">
                <div className="flex justify-center">
                    <div className="inline-block rounded-md shadow-sm">
                        <img src={LGlogo1} alt="Logo Handex" className="w-60" />
                    </div>
                </div>
                <div className="mt-14">
                    <form onSubmit={(e) => onHandleSubmitSignIn(e)}>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input value={fieldEmailProp} onChange={(e) => setFieldEmailProp(e.target.value)} id="email-address" name="email" type="text" autoComplete="email" required className="border rounded-md px-3 py-2 w-[20rem] focus:outline-none focus:border-slate-500" placeholder="Email address" />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input value={fieldPasswordProp} onChange={(e) => setFieldPasswordProp(e.target.value)} id="password" name="password" type="password" autoComplete="password" required className="border rounded-md px-3 py-2 w-[20rem] focus:outline-none focus:border-slate-500" placeholder="Password..." />
                        </div>
                        <div className="mt-5">
                            <button type="submit" className="rounded-md font-medium border py-2 px-4 w-full bg-slate-900 text-white">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default Login;