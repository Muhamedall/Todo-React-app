
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DetailStagiaire = () => {
  const {stagairesNom} = useParams();
  const listeStagiaires = useSelector((state) => state.stagiaires.listeStagiaires);
  //const stagiaire =listeStagiaires.filter((index, item) => item.nom === stagairesNom);//recherch filter
  const stagiaire = listeStagiaires.find(stagiaire => stagiaire.nom === stagairesNom);// find un seul element return first elem qui accept la codndition 
 
  return (
    <div>
    {console.log("my list is :"+JSON.stringify(listeStagiaires))}
   {console.log("thi is data:" +stagiaire.nom)} 
      <h2>Détails de {stagairesNom}</h2>
      <h2>le nom :{stagiaire.nom}</h2>
      <h2>le filier :{stagiaire.filier}</h2> 
    </div>
  );
};

export default DetailStagiaire;
