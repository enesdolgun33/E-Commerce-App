import '../css/LoginPage.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { registerPageSchema } from '../schemas/RegisterPageSchema';
import loginPageService from '../services/LoginPageService'
import { useDispatch } from 'react-redux';
import { setCurrentUser, setLoading } from '../redux/appSlice';
import type { UserType } from '../types/Types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface CheckUserType {
    result: boolean,
    currentUser: UserType | null
}

function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkUser = (userList: UserType[], username: String, password: String): CheckUserType => {
        const response: CheckUserType = { result: false, currentUser: null }

        userList.forEach((user: UserType) => {
            if (user.username === username && user.password === password) {
                response.result = true;
                response.currentUser = user;
            }
        })

        return response;
    }

    const submit = async (values: any) => {
        try {
            dispatch(setLoading(true))
            const response: UserType[] = await loginPageService.login();
            if (response) {
                const checkUserResponse: CheckUserType = checkUser(response, values.username, values.password);
                if (checkUserResponse.result && checkUserResponse.currentUser) {
                    // kullanıcı adı ve şifre doğru
                    dispatch(setCurrentUser(checkUserResponse.currentUser));
                    localStorage.setItem("currentUser", JSON.stringify(checkUserResponse.currentUser));
                    navigate("/");
                } else {
                    // Yanlış
                    toast.error("Kullanıcı adı veya şifre hatalı");
                }
            }
        } catch (error) {
            toast.error("Giriş yapılırken hata oluştu" + error)
        } finally {
            dispatch(setLoading(false));
        }
    }

    const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: submit,
        validationSchema: registerPageSchema
    });


    const clear = () => {
        resetForm();
    }

    return (
        <div className='login'>
            <div className='main' >
                <form onSubmit={handleSubmit}>
                    <div className='form-div'>
                        <TextField
                            sx={{ width: '300px', padding: '6px 5px', marginBottom: '25px', backgroundColor: 'inherit', borderRadius: '3px' }}
                            id="username"
                            placeholder="Kullanıcı Adı"
                            value={values.username}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IoPersonCircleSharp className='user-icon' />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="standard"
                            helperText={errors.username && <span className='helpertext'>{errors.username}</span>}
                        />

                        <TextField
                            sx={{ width: '300px', padding: '5px 5px', marginBottom: '25px', backgroundColor: 'inherit', borderRadius: '3px' }}
                            id="password"
                            type='password'
                            placeholder='Şifre'
                            value={values.password}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            < FaLock />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="standard"
                            helperText={errors.password && <span className='helpertext'>{errors.password}</span>}
                        />
                        <div>
                            <Button
                                type='submit'
                                size='small'
                                sx={{ textTransform: 'none', height: '28px' }}
                                variant='contained'
                                color='info'>Giriş Yap</Button>
                            <Button
                                onClick={clear}
                                size='small'
                                sx={{ textTransform: 'none', height: '28px', marginLeft: '20px', backgroundColor: '#e37b36' }} variant='contained'>Temizle</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>)
}

export default LoginPage