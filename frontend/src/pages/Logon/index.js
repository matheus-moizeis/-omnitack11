import React from 'react';
import {Link} from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi'

import './styles.css';

import LogoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {
  return( 
    <div className="logon-container">
        <section className="form">
            <img src={LogoImg} alt="Be The Hero"/>

            <form action="">
                <h1>Faça seu logon</h1>

                <input placehold="Sua ID" />
                <button className="button" type="submit">Entrar</button>

                <Link to="/register">
                    <FiLogIn size={16} color='#E02041' />
                    Não tenho cadastro
                </Link>
            </form>

        </section>
        <img src={heroesImg} alt="Herores"/>
    </div>
  );
}
