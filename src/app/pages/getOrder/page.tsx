'use client'
import Header from '@/app/component/Header';
import { Card } from '@/components/ui/card';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import LoaderSign from '@/app/component/Loader';
import { getSession } from 'next-auth/react';
import { DialogConfirm } from '@/app/component/DialogueConfirm';

interface Product {
    _id: string;
    product: string;
    imageUrl: string;
    price: number;
    size: string;
    quantity: number;
    status: string;
}

interface Order {
    products: Product[];
    totalAmount: number;
    status: string;
}

export default function Page() {
    const [user, setUser] = useState<string>('');
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            const session = await getSession();

            if (session?.user?.id) {
                setUser(session.user.id);
                try {
                    const response = await axios.get('/api/allOrder', {
                        params: { userId: session.user.id },
                    });
                    console.log('API Response:', response.data); // Debug API response
                    setOrders(response.data.orders || []);
                } catch (err) {
                    console.error('Fetch error:', err); // Debug error
                    setError(err.message || 'An error occurred');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false); // No user id means no data to fetch
            }
        };

        fetchOrder();
    }, []); // Empty dependency array to run only once

    if (loading)
        return (
            <div className='w-[100vw] h-[100vh]'>
                <LoaderSign />
            </div>
        );
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Header/>
            {orders.length > 0 ? (
                orders.map((order, index) => (
                    <div key={index}>
                        {order.products.map((product, productIndex) => (
                            <div key={productIndex}>
                                <Card className='flex py-4'>
                                    <div className='grid place-content-center'>
                                        <Image src={product.imageUrl} width={100} height={50} alt='Order image' />
                                    </div>
                                    <div className='p-4'>
                                        <p className='text-xl font-semibold text-slate-600'>
                                            Price: {product.price}
                                        </p>
                                        <p className='text-xl font-semibold text-slate-600'>
                                            Size: {product.size}
                                        </p>
                                        <p className='text-xl font-semibold text-slate-600'>
                                            Qty: {product.quantity}
                                        </p>

                                        <div className='py-2'>
                                            {product.status === 'cancelled' ? (
                                                <p className='text-red-600 line-through'>
                                                    Order Status: Cancelled
                                                </p>
                                            ) : (<>

                                            <DialogConfirm productId={product._id} />
                                    <p className='content-center'>Order Status: {product.status}</p>
                                            </>
                                            )}
                                        </div>

                                    </div>
                                </Card>
                            </div>
                        ))}
                        <div>
                            <Card className='text-xl font-bold text-slate-600'>
                                Total Amount: {order.totalAmount}
                            </Card>
                        </div>
                    </div>
                ))
            ) : (
                <Card>No orders found</Card>
            )}
        </div>
    );
}
