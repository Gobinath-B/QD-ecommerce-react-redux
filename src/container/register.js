import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../routes/authProvider';
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from '@material-tailwind/react';


function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const navigate = useNavigate();
    const { setAuthStatus } = useAuth();

    const handleRegister = async () => {
        try {
            // Make a POST request to the login endpoint
            const response = await axios.post('https://authorization-jwt.onrender.com/signup', {
                username,
                password,
                email,
                phone
            });

            const accessToken = response.data.accessToken;


            localStorage.setItem('accessToken', accessToken);

            setAuthStatus(true);
            navigate("/");

        } catch (error) {
            console.error('Process failed:', error.response.data);
            alert('ICannot Create Account');
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
                        Sign Up
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Username" size="lg" />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password" size="lg" />
                    <Input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email" size="lg" />
                    <Input
                        type="phone"
                        placeholder="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        label="Phone" size="lg" />
                </CardBody>
                <CardFooter className="pt-0">
                    <Button onClick={handleRegister} variant="gradient" fullWidth>
                        Sign up
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Already have an account?
                        <Typography
                            onClick={() => navigate('/login')}
                            as="a"
                            href="#signup"
                            variant="small"
                            color="blue-gray"
                            className="ml-1 font-bold"
                        >
                            Sign in
                        </Typography>
                    </Typography>
                </CardFooter>
            </Card>
        </div>
        // <div>
        //     <input
        //         type="text"
        //         placeholder="Username"
        //         value={username}
        //         onChange={(e) => setUsername(e.target.value)}
        //     />
        //     <input
        //         type="password"
        //         placeholder="Password"
        //         value={password}
        //         onChange={(e) => setPassword(e.target.value)}
        //     />
        //      <input
        //         type="email"
        //         placeholder="email"
        //         value={email}
        //         onChange={(e) => setEmail(e.target.value)}
        //     />
        //      <input
        //         type="phone"
        //         placeholder="phone"
        //         value={phone}
        //         onChange={(e) => setPhone(e.target.value)}
        //     />
        //     <button onClick={handleRegister}>Register</button>
        // </div>
    );
}

export default Register;
