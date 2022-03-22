import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './login.css'


export const Login = ()=>(
    <div className={'login-container'}>
        <Stack spacing={2} direction="row" >
        {['Google', 'Apple', 'Facebook'].map((connectMethod)=>
                <Button variant="contained">{connectMethod}</Button>
        )}
        </Stack>
    </div>

)

