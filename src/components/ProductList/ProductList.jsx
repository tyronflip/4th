import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', img:"https://smak-lucky.com/files/products/neopolitana.465x465.jpg?ebec22dbe10caf9fc088fc3bca6e892d", title: 'Неаполітана', price: 350, description: 'Курка, томати, солодкий перець, базилік, шампіньони, моцарела'},
    {id: '2', title: 'Гавайська', price: 300, description: 'Курка, ананаси, цибуля, моцарела, соус'},
    {id: '3', title: '4 сира', price: 320, description: 'Моцарела, пармезан, горгонзола, чеддер'},
    {id: '4', title: 'Цезар', price: 350, description: 'Курка, томати чері, Айсберг, моцарела, пармезан, соус'},
    {id: '5', title: 'Карбонара', price: 350, description: 'Балик, моцарела, пармезан, яйце, соус'},
    {id: '6', title: 'Овочева', price: 250, description: 'Томати, солодкий перець, солоний огірок, маслини, моцарела, соус'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;
