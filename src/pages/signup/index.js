import React, { useState } from "react";
import { Box, Button, Input, TextField } from "@mui/material";
import { useNavigate } from "react-router";

const Signup = ({getToggle}) => {
    const [email, setEmail]  = useState("")
    const [password, setPassword]  = useState("")
    const [confirmPassword, setConfirmPassword]  = useState("")
    const [status, setStatus]  = useState("")
    const navigate = useNavigate();

    const handleLogin = () => {
        if(password === confirmPassword) {
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
    
            fetch("http://localhost:3000/auth/", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.status === 404) {
                    setStatus(result.message)
                } else {
                    getToggle(false);
                }
            })
            .catch(error => console.log('error', error));
        } else {
            setStatus("Passwords dont match")
        }
    }

    return (
        <Box sx={{ display: "flex", 
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
                <TextField size="medium"
                        id="outlined-password-input" 
                        label="password"
                        type="password"
                        margin="dense"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        ></TextField>
                <Button size="large"
                    variant="contained" 
                    onClick={handleLogin}
                >Sign Up
                </Button>
            </Box>
    )
}

export default Signup;