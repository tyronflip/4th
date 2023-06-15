import React, { useState } from "react";
import './Form.css';


const Form = () => {

    const[city, setCity] = useState('');
    const[street, setStreet] = useState('');
    const[number, setNumber] = useState('');
    const[name, setName] = useState('');

    const onChangeCity = (e) => {
        setCity(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeNumber = (e) => {
        setNumber(e.target.value)
    }

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    return(
        <div className={"form"}>
            <h3>Заповніть ваші дані</h3>
            <input className={"input"} type='text' placeholder="Місто" value={city} onChange={onChangeCity}/>
            <input className={"input"} type='text' placeholder="Вулиця" value={street} onChange={onChangeStreet}/>
            <input className={"input"} type='text' placeholder="Номер телефону" value={number} onChange={onChangeNumber}/>
            <input className={"input"} type='text' placeholder="ФІО" value={name} onChange={onChangeName}/>
        </div>
    );
};


export default Form;