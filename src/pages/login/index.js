import { Box, Button, Input, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Signup from "../signup";

const Login = () => {
    const [email, setEmail]  = useState("")
    const [password, setPassword]  = useState("")
    const [status, setStatus]  = useState("")
    const [toggle, setToggle]  = useState(false)
    const navigate = useNavigate();

    const handleLogin = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "user": {
        "email": email,
        "password": password
    }
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:3000/auth/sign_in", requestOptions)
    .then(response => response.json())
    .then(result => {
        if(result.status === 404) {
            setStatus(result.message)
        } else {
            navigate('/home');
        }
    })
    .catch(error => console.log('error', error));
    }

    return (
        <Box sx={{  '& button': { marginTop: 1 }, 
                     display: "flex", 
                     flexDirection: "column", 
                     width: "30vw", 
                     margin: "auto", 
                     marginTop: "25vh"}}>
            {!toggle ? <Box sx={{ display: "flex", 
                     flexDirection: "column" }}>
                <Box sx={{ color: "red",
                        position: "absolute",
                        marginTop: "-25px"
                        }}>{status}
                </Box>
                <TextField  size="medium" 
                        id="outlined-basic" 
                        label="email" 
                        margin="dense"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        ></TextField>
                <TextField size="medium"
                        id="outlined-password-input" 
                        label="password"
                        type="password"
                        margin="dense"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        ></TextField>
                <Button size="large"
                    variant="contained" 
                    onClick={handleLogin}
                >Log In
                </Button>
                <Box sx={{ color: "red",
                       marginTop: "10px",
                       color: "#1876d2",
                       fontWeight: 600,
                       cursor: "pointer"
                       }}
                       onClick={() => setToggle(!toggle)}
                       >Or Sign Up
            </Box>
            </Box>: <Signup getToggle={(data) => setToggle(data)}/>}
        </Box>
    )
}

export default Login;