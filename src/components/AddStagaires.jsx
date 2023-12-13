import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { ajouterStagiaire } from './StagairesSlice'; 



const Addstagaire= () => {
  const dispatch = useDispatch();
  const urlRef=useRef("");
  const nameRef=useRef("");
  const prenomRef=useRef("");
 


  const handleAjouterStagiaire = () => {
    const urlRefValue=urlRef.current.value;
    const nameRefValue=nameRef.current.value;
    const prenomRefValue=prenomRef.current.value;
    const nouveauStagiaire = { 
      imageUrl:urlRefValue,
       nom:nameRefValue,
       filier:prenomRefValue,
    };
    dispatch(ajouterStagiaire(nouveauStagiaire));
    urlRef.current.value="";
   nameRef.current.value="";
   prenomRef.current.value="";

    console.log("this is new stagaire :"+JSON.stringify(nouveauStagiaire))
  };

  return (
    <div>

        <input type='text' placeholder='tapez votre url ' name='url'ref={urlRef}/>
        <input type='text'    placeholder='tapez votr name ' name='nome'ref={nameRef}/>
      <input type='text' placeholder='tapez votre filer ' name='prenom'ref={prenomRef}/>
      <button onClick={handleAjouterStagiaire}>Ajouter Stagiaire</button>
    </div>
  );
};
export default Addstagaire;