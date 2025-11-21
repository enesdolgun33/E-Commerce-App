import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { setDrawer, updateBalance } from '../redux/appSlice';
import type { ProductType, UserType } from '../types/Types';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { calculateBasket, removeProductFromBasket, setBasket } from '../redux/basketSlice';
import { toast } from 'react-toastify';

function BasketDetails() {

    const { drawer, currentUser } = useSelector((state: RootState) => state.app);
    const { basket, totalAmount } = useSelector((state: RootState) => state.basket);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calculateBasket());
    }, [basket])

    const closeDrawer = () => {
        dispatch(setDrawer(false));
    }

    const removeProduct = (productId: number) => {
        dispatch(removeProductFromBasket(productId));
    }

    const buy = () => {
        if (currentUser?.balance && currentUser?.balance < totalAmount) {
            toast.warn("Bakiyeniz yeterli değil!")
            return;
        }

        if (currentUser?.balance) {
            const remaningTotal = currentUser?.balance - totalAmount;
            const payload: UserType = {
                ...currentUser,
                balance: remaningTotal
            }
            dispatch(updateBalance(payload))
            dispatch(setBasket([]));
            localStorage.removeItem("basket");
            toast.success("Ürünler satın alınmıştır.")
        }
    }




    return (
        <>
            <Drawer open={drawer} anchor='right' sx={{ width: '400px' }} onClose={closeDrawer}>
                {
                    basket && basket.map((product: ProductType) => (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', padding: '20px 10px' }}>
                                <div style={{ marginRight: '25px' }}><img src={product.image} width={65} height={70} /></div>
                                <div style={{ width: '300px' }}>
                                    <div style={{ fontFamily: 'arial', fontWeight: 'bold' }}>{product.title.substring(0, 35)}</div>
                                    <div>{product.description.substring(0, 50)}</div>
                                </div>
                                <div style={{ marginRight: '50px' }}>{product.count}</div>
                                <div style={{ width: '70px', fontSize: '15px', fontFamily: 'arial', fontWeight: 'bold' }}>{product.price}$</div>
                                <div><Button onClick={() => removeProduct(product.id)} size='small' variant='outlined' sx={{ textTransform: 'none', height: '25px', color: '#5f5139ff', borderColor: '#5f5139ff' }}>Çıkar</Button></div>
                            </div>
                        </>
                    ))
                }
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {
                        totalAmount > 0 ? (
                            <>
                                <div style={{ fontFamily: 'arial', fontSize: '18px', marginTop: '30px', marginLeft: '50px', marginRight: '50px' }}>Toplam Tutar: {totalAmount}$ </div>
                                <div><Button onClick={buy} sx={{ textTransform: 'none', height: '25px', marginTop: '25px' }} size='small' variant='contained' color='success'>Satın Al</Button></div>
                            </>
                        ) : (
                            <div style={{ fontFamily: 'arial', fontSize: '18px', marginTop: '30px', marginLeft: '50px', marginRight: '50px' }}>Sepet boş </div>
                        )
                    }
                </div>
            </Drawer>
        </>
    )
}

export default BasketDetails