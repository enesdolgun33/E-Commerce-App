import '../css/RegisterPage.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { registerPageSchema } from '../schemas/RegisterPageSchema';
import RegisterPageService from '../services/RegisterPageService';
import type { UserType } from '../types/Types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {

    const navigate = useNavigate();

    const submit = async (values: any, actions: any) => {
        try {
            const payload: UserType = {
                username: values.username,
                password: values.password
            }
            const response = await RegisterPageService.register(payload);
            if (response) {
                clear();
                toast.success("Kullanıcı kaydedildi");
                navigate("/login");
            }
        } catch (error) {
            toast.error("Kulllanıcı kaydedilirken hata oluştu")
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
        <div className='register'>
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
                                color='info'>Kaydol</Button>
                            <Button
                                onClick={clear}
                                size='small'
                                sx={{ textTransform: 'none', height: '28px', marginLeft: '20px', backgroundColor: '#e37b36' }} variant='contained'>Temizle</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage