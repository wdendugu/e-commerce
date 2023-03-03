import { ChangeEvent, ReactElement } from "react"
import { CartItemType } from "../context/CartProvider"
import { ReducerAction } from "../context/CartProvider"
import { ReducerActionType } from "../context/CartProvider"

type PropsType = {
  item: CartItemType,
  dispatch : React.Dispatch<ReducerAction>,
  REDUCER_ACTIONS : ReducerActionType,

}

const CartLineItem = ({item, dispatch, REDUCER_ACTIONS}: PropsType) => {

  const img: string = new URL (`../images/${item.sku}.jpg`, import.meta.url).href

  const lineTotal : number = (item.qty * item.price)

  const highestQty : number = 20 > item.qty ? 20 : item.qty

  const optionValues : number[] = [...Array(highestQty).keys()].map(i => i + 1)

  const options:ReactElement[] = optionValues.map(val => {
    return <option key={`opt${val}`} value={val}>{val}</option>
  })
  
  const onChangeQty = (e:ChangeEvent<HTMLSelectElement>) => {
    dispatch ({
      type: REDUCER_ACTIONS.QTY,
      payload: {...item, qty: Number(e.target.value)},
    })
  }
  
  const onRemoveFromCart = () => {dispatch({
    type: REDUCER_ACTIONS.REMOVE,
    payload: item,
  })
  console.log("clicked")
}

  const content = (
    <li className="cart__item">
      <img src={img} alt={item.name} className="cart__img" />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Price per Item">{new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(item.price)}</div>
      <label htmlFor="itemQty" className="offscreen">Item Quantity</label>
      <select 
        name="itemQty" 
        id="itemQty" 
        className="cart__select"
        value={item.qty}
        aria-label="Item Quantity"
        onChange={onChangeQty}
        >
          {options}
        </select>
      <div className="cart__item-subtotal" aria-label="Line Subtotal">
      {new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(lineTotal)}
      <button 
        className="cart__button"
        aria-label="Remove Item Cart"
        title="Remove Item from Cart"
        onChange={onRemoveFromCart}
      >
        X
      </button>
      </div>
    </li>

  )

  return content
}

export default CartLineItem