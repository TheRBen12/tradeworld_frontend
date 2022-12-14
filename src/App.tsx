import React from 'react';
import './App.scss';
import Dashboard from "./home/Dashboard";
import SecuredRoute from "./Routes/SecuredRoute";
import {
    Route, Routes,
} from 'react-router-dom';
import 'react-router-dom'
import Nav from "./Nav/Nav";
import {IntlProvider} from 'react-intl'
import de from './i18n/messages/de.json'
import en from './i18n/messages/en.json'
import "./custom.scss"
import AccountContainer from "./uaar/Account/AccountContainer";
import readCookie from "./uaar/CookieService";
import {IconContext} from "react-icons";
import { useForm } from "react-hook-form";
import AccountEditFormContainer from "./uaar/Account/AccountEditFormContainer";



const locale = 'de';
const messages = {'de': de, 'en': en}

export default function App() {

    const { register, handleSubmit } = useForm();
    function onSubmit(data: any){
        console.log(data);
    }


    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <IconContext.Provider value={{className: 'icon', color: "black"}}>
                <Nav/>
                <Routes>
                    <Route path={"/"} element={
                        <SecuredRoute sessionCookie={readCookie.readCookie('JSESSIONID')}>
                            <Dashboard/>
                        </SecuredRoute>}>
                    </Route>
                    <Route path={"/account"} element={
                       /*
                        <SecuredRoute sessionCookie={readCookie.readCookie('JSESSIONID')}>
                             </SecuredRoute>
                        */
                            <AccountContainer/>  }>

                    </Route>
                    <Route path={"/dashboard"} element={<Dashboard/>}/>

                    <Route path={"/edit"} element={<AccountEditFormContainer user={{email: "", firstName: "", lastName:"", country: "" +
                            "", city:"", joinedAt: new Date()}}/>}/>

                </Routes>
            </IconContext.Provider>




        </IntlProvider>
    );
}

