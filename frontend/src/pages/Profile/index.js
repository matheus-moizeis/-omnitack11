import React, {useState,useEffect} from "react";
import {Link, useHistory} from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import './style.css'
import LogoImg from "../../assets/logo.svg";

export default function Profile() {
  const [incident, setincident] = useState([])

  const history = useHistory();
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  useEffect(()=> {
    api.get('profile',{
      headers: {
        Authorization: ongId,
      }
    }).then(response =>{
      setincident(response.data)
    })
  }, [ongId])

  async function handleDeleteIncident(id){
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });

      setincident(incident.filter(incident => incident.id !== id));
    } catch (error) {
      alert('Erro ao deletar o caso');
    }
  }

  function handleLogout(){
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={LogoImg} alt="Be The Hero" />
        <span>Bem vindo a {ongName}.</span>

        <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
            <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
          {incident.map(incident => (
            <li key={incident.id} >
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

            <button onClick={()=> handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
        </li>
          ) )}
      </ul>
    </div>
  );
}
