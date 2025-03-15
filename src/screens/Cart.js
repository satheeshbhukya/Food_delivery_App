// import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  let navigate = useNavigate();

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem('userEmail');
    let response = await fetch('http://localhost:5000/api/orderData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    if (response.status === 200) {
      dispatch({ type: 'DROP' });
      navigate('/');
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <style>
        {`
          .hover-bold-white:hover {
            font-weight: bold;
            color: white;
          }
        `}
      </style>

      {data.length === 0 ? (
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      ) : (
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
          <table className='table '>
            <thead className='text-success fs-4'>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Option</th>
                <th scope='col'>Amount</th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody style={{ color: 'white' }}>
              {data.map((food, index) => (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td className='hover-bold-white'>{food.name}</td>
                  <td className='hover-bold-white'>{food.qty}</td>
                  <td className='hover-bold-white'>{food.size}</td>
                  <td className='hover-bold-white'>{food.price}</td>
                  <td>
                    <button type='button' className='btn p-0'>
                      <img
                        src='https://uxwing.com/wp-content/themes/uxwing/download/user-interface/red-trash-can-icon.png'
                        alt='delete'
                        style={{ height: '20px' }}
                        onClick={() => { dispatch({ type: 'REMOVE', index: index }) }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <h1 className='fs-2 text-white hover-bold-white'>Total Price: {totalPrice}/-</h1>
          </div>
          <div>
            <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
          </div>
        </div>
      )}
    </div>
  );
}
