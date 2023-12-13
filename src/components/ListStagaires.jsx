import React from 'react';
import { useSelector } from 'react-redux';


import Stagiaire from './Stagaires'; 




const ListStagiaire = () => {
 

  
  
  const listeStagiaires = useSelector((state) => state.stagiaires.listeStagiaires); 

  const handleStagiaireClick = () => {
     

  };

  return (
    <div >
      {listeStagiaires.length?
      listeStagiaires.map((stagiaire,idx) => (
        <div key={idx} onClick={() => handleStagiaireClick(stagiaire.nom)}>
          <Stagiaire stagiaire={stagiaire} />

        </div>
      )):<p>List is vide </p>}
    </div>
  );
};

export default ListStagiaire;
