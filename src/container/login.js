import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../routes/authProvider';
import { LoginCard } from '../components/SignInComponent';
import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Typography } from '@material-tailwind/react';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setAuthStatus } = useAuth();

    const handleLogin = async () => {
        try {
            // Make a POST request to the login endpoint
            const response = await axios.post('https://authorization-jwt.onrender.com/login', {
                username,
                password
            });

            const accessToken = response.data.accessToken;


            localStorage.setItem('accessToken', accessToken);

            setAuthStatus(true);
            navigate("/");

        } catch (error) {
            console.error('Login failed:', error.response.data);
            alert('Invalid username or password');
        }
    };


    return (
        <div className='flex items-center justify-center w-full h-[100vh]'>
            <Card className="w-96">
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Sign In
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Email" size="lg" />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password" size="lg" />

                </CardBody>
                <CardFooter className="pt-0">
                    <Button onClick={handleLogin} variant="gradient" fullWidth>
                        Sign In
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Don&apos;t have an account?
                        <Typography
                            onClick={() => navigate('/register')}
                            as="a"
                            href="#signup"
                            variant="small"
                            color="blue-gray"
                            className="ml-1 font-bold"
                        >
                            Sign up
                        </Typography>
                    </Typography>
                </CardFooter>
            </Card>
        </div>

    );
}

export default Login;
