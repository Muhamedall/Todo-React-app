import React from 'react';
import { Link } from "react-router-dom";

const Stagiaire = ({ stagiaire }) => {
  return (
    <div >
      <div>
        image : <Link to={`/detail/${stagiaire.nom}`}><img src={stagiaire.imageUrl} alt={stagiaire.nom}  /></Link>
      <h2> le nom: {stagiaire.nom}</h2>
      <h2> filier :{stagiaire.filier}</h2>
      </div>
    </div>
  );
};

export default Stagiaire;
