import { useParams } from "react-router-dom"
import Container from '@mui/material/Container';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/appSlice";
import { toast } from "react-toastify";
import productService from "../services/ProductService";
import type { ProductType } from "../types/Types";
import Button from "@mui/material/Button";


function ProductDetail() {

    const { productId } = useParams();
    const dispatch = useDispatch();

    const [count, setCount] = useState<number>(0);

    const [product, setProduct] = useState<ProductType | null>();

    const getProductById = async (productId: number) => {
        try {
            dispatch(setLoading(true))
            const response: ProductType = await productService.getProductById(productId);
            setProduct(response);
        } catch (error) {
            toast.error("Ürün getirilirken hata oluştu : " + error)
        }
        finally {
            dispatch(setLoading(false))
        }

    }

    useEffect(() => {
        getProductById(Number(productId))
    }, [])

    return (
        <Container maxWidth="lg">
            {product && <>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: '60px' }}>
                    <div style={{ userSelect: 'none' }}>
                        <img src={product.image} width={300} height={400} alt="" />
                    </div>
                    <div style={{ marginLeft: '60px', marginTop: '60px' }}>
                        <div style={{ fontFamily: 'arial', fontSize: '20px', fontWeight: 'bolder' }}>{product.title}</div>
                        <div style={{ fontFamily: 'arial', fontSize: '15px', marginTop: '25px', height: '100px' }}>{product.description}</div>

                        <div style={{ fontFamily: 'arial', fontSize: '25px', fontWeight: 'bold' }}>{product.price} ₺</div>

                        <div style={{ userSelect: 'none' }}>
                            <span onClick={() => setCount(count - 1)} style={{ fontSize: '60px', fontWeight: 'normal', cursor: 'pointer', marginRight: '10px' }}> - </span>
                            <span style={{ fontSize: '40px', fontFamily: 'arial', fontWeight: 'bold', cursor: 'pointer' }}>{count}</span>
                            <span onClick={() => setCount(count + 1)} style={{ fontSize: '40px', fontWeight: 'bold', cursor: 'pointer', marginLeft: '10px', userSelect: 'none' }}> + </span>
                        </div>
                        <div>
                            <Button variant="contained" size="medium" sx={{ textTransform: 'none', marginTop: '20px', marginLeft: '3px', color: 'white', bgcolor: '#5f5139ff' }}>Sepete Ekle</Button>
                        </div>
                    </div>
                </div>
            </>}
        </Container>
    )
}

export default ProductDetail