import React, { useContext, useEffect, useState } from 'react'

import { CartContext } from '../../Context/CartContext'


export default function Allorders() {

  let {clearCart} = useContext(CartContext);

  useEffect(()=> {
     clearCart()
  } , [])

  return <>
  <h2 className="text-3xl">Allorders</h2>
  </>
}


