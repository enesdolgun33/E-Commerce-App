import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import CategoryService from '../services/CategoryService';
import { useDispatch } from 'react-redux';
import { setLoading, setProducts } from '../redux/appSlice';
import { toast } from 'react-toastify';
import ProductService from '../services/ProductService';
import type { ProductType } from '../types/Types';


function Category() {

    const dispatch = useDispatch();
    const [categories, setCategories] = useState<string[]>();

    const getAllCategories = async () => {
        try {
            dispatch(setLoading(true));
            const categories: string[] = await CategoryService.getAllCategories();
            setCategories(categories);
        } catch (error) {
            toast.error("Kategori listesi alınırken bir hata oluştu" + error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleCategory = async (e: React.ChangeEvent<HTMLInputElement>, categoryName: string) => {
        try {
            dispatch(setLoading(true))
            if (e.target.checked) {
                const products: ProductType[] = await CategoryService.getProductsByCategoryName(categoryName);
                dispatch(setProducts(products));
            } else {
                const products: ProductType[] = await ProductService.getAllProducts();
                dispatch(setProducts(products));
            }
        } catch (error) {
            toast.error("Kategoriler alınırken hata oluştu" + error)
        } finally {
            dispatch(setLoading(false));
        }

    }

    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <div style={{ marginTop: '50px', marginLeft: '20px' }}>
            <FormGroup>
                {
                    categories && categories.map((category: string, index: number) => (
                        <FormControlLabel control={
                            <Checkbox
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCategory(e, category)}
                                sx={{
                                    fontSize: '12px',
                                    "&.Mui-checked": {
                                        color: "#5f5139ff",
                                    },
                                }} />} label={category} key={index} />
                    ))
                }
            </FormGroup>
        </div>
    )
}

export default Category

