import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { ProductType } from '../types/Types'

interface ProductCardProps {
    product: ProductType,
}

function ProductCard(props: ProductCardProps) {

    const { id, title, price, description, category, image, rating } = props.product;

    return (
        <Card sx={{
            width: '330px',
            height: '600px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '50px 10px',
            boxShadow: '1px 5px 5px lightgray',
            cursor: 'pointer'
        }}>
            <img src={image} width={230} height={230} />
            <CardContent sx={{ height: '250px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {title.substring(0, 70)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description.substring(0, 200)}...
                </Typography>
            </CardContent>
            <div>
                <h2 className='price'>{price} ₺</h2>
            </div>
            <CardActions>
                <Button sx={{ color: '#5f5139ff', borderColor: '#5f5139ff' }} size="small" variant='outlined'>Detay</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard