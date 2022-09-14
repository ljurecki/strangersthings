import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logout, token }) => {
  return (
    <header>
      <p id="headertitle">Stranger's Things</p>
      <div id='nav'>
        <nav>
          <Link to='/' className='navlink'>Home</Link>

          {
            token ? (
              <>
                <Link to='/posts' className='navlink'>Posts</Link>
                <Link to='/profile' className='navlink'>Profile</Link>
                <Link to='/' onClick={() => logout()} className='navlink'>Logout</Link>
              </>
            ) : (
              <>
                < Link to='/register' className='navlink'>Register</Link>
                <Link to='/login' className='navlink'>Login</Link>
              </>
            )
          }
        </nav>
      </div>
    </header >
  )
}

export default Navbar;