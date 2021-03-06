import { h } from 'preact'
import { useState, useCallback } from 'preact/hooks'

import { useStoreon } from 'storeon/preact'

import CartIcon from './assets/bag'

import CardComponent from './types'
import { OrderStore, OrderEvent } from '../../store/order/types'

import './card.styl'

const Card: CardComponent = ({ name, price }) => {
    let [selected, updateSelected] = useState(name[0])

    let { dispatch } = useStoreon<OrderStore, OrderEvent>('order')

    let select = useCallback((event: any) => {
        updateSelected(event.target.textContent)
    }, [])

    let addOrder = useCallback(
        () => dispatch('UPDATE_ORDER', { name: selected as string, price }),
        [dispatch, selected, price]
    )

    return (
        <li class="list">
            <article class="card">
                <header class="detail">
                    <h3 class="name">{selected}</h3>
                    <p class="price">
                        {price.toLocaleString('th', {
                            maximumFractionDigits: 0
                        })}
                        ฿
                    </p>
                </header>
                <aside class="option">
                    {name
                        .filter((name) => name !== selected && name.length)
                        .map((name) => (
                            <button key={name} class="name" onClick={select}>
                                {name}
                            </button>
                        ))}
                </aside>

                <footer class="function">
                    <section class="balloon">
                        <button class="action" onClick={addOrder}>
                            <CartIcon />
                            Order
                        </button>
                    </section>
                </footer>
            </article>
        </li>
    )
}

export default Card
