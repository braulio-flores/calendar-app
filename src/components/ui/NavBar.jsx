import React from 'react'

const NavBar = () => {
  return (
    <nav className='navbar navbar-dark bg-dark mb-4'>
        <span className='navbar-brand'>
            Nombre
        </span>

        <button className='btn btn-outline-danger'>
            <i className='fas fa-sign-out-alt'> </i>
            <span> Salir</span>
        </button>
    </nav>
  )
}

export default NavBar