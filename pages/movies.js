import axios from "axios";
import React, { useEffect } from "react";

function Movies() {

    useEffect(() => {
        // TODO - This is just to test our Rest API
        (async () => {
            const response = await axios.post('http://localhost:5050/api/users/login', {
                email: "fareed3@gmail.com",
                password: "test123"
            })
            console.log(response)
        })()
    }, [])

    return (
        <div>
            Hello There
        </div>
    )
}

export default Movies;