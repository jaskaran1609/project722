import React from 'react'
import { Link } from 'react-router-dom'

import "./notfound.css"
import { Button } from '@mui/material'


const NotFound = () => {
  return (
    <section>
      <div className='notfound__container'>
        <h2>404</h2>
        <h3>UH OH! You're lost.</h3>
        <p>
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage.
        </p>

        <Link to="/">
          <Button>Go Back to Home</Button>
        </Link>
      </div>

    </section>
  )
}


export default NotFound