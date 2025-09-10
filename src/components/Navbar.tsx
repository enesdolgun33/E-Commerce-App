import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch } from 'react-redux';
import { filterProducts, setCurrentUser, setProducts } from '../redux/appSlice';
import { toast } from 'react-toastify';
import productService from '../services/ProductService';
import type { ProductType } from '../types/Types';

function Navbar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logout = () => {
        localStorage.removeItem("currentUser");
        dispatch(setCurrentUser(null));
        navigate("/login");
        toast.success("Çıkış yapıldı")
    }

    const handleFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.value) {
                dispatch(filterProducts(e.target.value));
            } else {
                const products: ProductType[] = await productService.getAllProducts();
                dispatch(setProducts(products));
            }
        } catch (error) {
            toast.error("Filtreleme yaparken hata oluştu" + error);
        }

    }

    return (
        <AppBar position="static" sx={{ backgroundColor: '#5f5139ff' }}>
            <Toolbar>
                <IconButton
                    onClick={() => navigate("/")}
                    edge="start"
                    color="inherit"
                    sx={{ mr: 3 }}
                >
                    <img src={Logo} width={60} height={60} style={{ scale: 1.5, color: 'white' }} />
                </IconButton>
                <Typography onClick={() => navigate("/")} variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'revert-layer', fontSize: '30px', color: '#FFFFFF', fontWeight: 'bold', cursor: 'pointer' }}>
                    Veloria
                </Typography>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TextField
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilter(e)}
                        sx={{ width: '200px', marginBottom: '5px', marginRight: '20px' }}
                        id="searchInput"
                        placeholder="Ara"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">

                                    </InputAdornment>
                                ),
                                style: {
                                    color: 'lightgray',
                                    borderBottom: '1px solid lightgray',
                                    fontSize: '14px'
                                }
                            },
                        }}
                        variant="standard"
                    />

                    <Button onClick={logout} sx={{ textTransform: 'none' }} color="inherit">Çıkış Yap</Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar