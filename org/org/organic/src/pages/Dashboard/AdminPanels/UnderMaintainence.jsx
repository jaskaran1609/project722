import React from 'react'
import { Link } from 'react-router-dom'

import "./UnderMaintainence.css"
import { Button } from '@mui/material'


const UnderMaintainence = () => {
    return (
        <section>
            <div className='notfound__container'>
                <h2>Sorry!</h2>
                <h3>This Feature is under Maintainenece</h3>
                <p>
                    The page you are looking for is under Maintainence. Please Come back after some time. But you can click the button below to go back to the
                    homepage.
                </p>

                <Link to="/">
                    <Button>Go Back to Home</Button>
                </Link>
            </div>

        </section>
    )
}


export default UnderMaintainence