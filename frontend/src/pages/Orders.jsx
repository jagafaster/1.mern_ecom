import { React, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios';

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const statusColors = {
    'Order Placed': 'bg-yellow-500',
    'Packing': 'bg-yellow-500',
    'Shipped': 'bg-yellow-500',
    'Out for delivery': 'bg-blue-500',
    'Delivered': 'bg-green-500',
    'Cancelled': 'bg-red-500',
  };

  const getStatusColor = (status) => statusColors[status] || 'bg-red-500';

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const res = await axios.post(backendUrl + '/api/order/userOrders', {}, { headers: { token } });
      if (res.data.success) {
        let allOrdersItem = [];
        res.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['paymentMethod'] = order.paymentMethod;
            item['payment'] = order.payment;
            item['date'] = order.date;
            allOrdersItem.push(item);
          })
        })
        setOrderData(allOrdersItem.reverse());
      }

    } catch (error) {

    }
  }

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl mb-3'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4'>
              <div className='flex items-start gap-5 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="image" />
                <div>
                  <p className='font-medium sm:text-base'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p >{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>

              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className={`${getStatusColor(item.status)} min-w-2 h-2 rounded-full`}></p>
                  <p className='text-sm md:text-base' onChange={(e) => setItemStatus(e.target.value)}>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders