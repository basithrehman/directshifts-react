import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
const Home = () => {
    const [email, setEmail]  = useState("")
    const [status, setStatus]  = useState("")
    const [toggle, setToggle]  = useState(false)

    const handleLogin = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "email": email
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:3000/orders/invitation", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.status === 500){
                setStatus(result.exception)
            } else {
                setToggle(!toggle);
            }
        })
        .catch(error => console.log('error', error));
    };

    return(
        <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            width: "30vw", 
            margin: "auto", 
            marginTop: "25vh"}}>
            {!toggle ? <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            }}>
                <Box sx={{ color: "red",
                    position: "absolute",
                    marginTop: "-25px"
                    }}>{status}
                </Box>
                <TextField size="medium"
                            id="outlined-input" 
                            label="email"
                            margin="dense"
                            value={email}
                            onChange={e => setEmail(e.target.value)}>
                </TextField>
                <Button size="large"
                    variant="contained" 
                    onClick={handleLogin}
                >Invite User
                </Button>
            </Box> : <Box fontSize="30px" >User Invited Successfully!!!
                </Box>}
        </Box>
    )
}

export default Home;