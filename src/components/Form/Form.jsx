import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const[city, setCity] = useState('');
    const[street, setStreet] = useState('');
    const[number, setNumber] = useState('');
    const[name, setName] = useState('');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            city,
            street,
            number,
            name
        }
        tg.sendData(JSON.stringify(data));
    }, [city, street, number, name])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Відправити дані'
        })
    }, [])

    useEffect(() => {
        if(!street || !number) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    })

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
