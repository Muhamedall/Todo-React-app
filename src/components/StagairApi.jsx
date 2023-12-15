import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StagiaireAPI = () => {
  const [stagiaires, setStagiaires] = useState([]);
  const [isLoad ,setIsload]=useState(true)

  useEffect(() => {
    // Effect to fetch data from the API
    const fetchData = async () => {
        setIsload(true)
      try {
        const response = await axios.get('https://www.ofppt.ma/stagiaire');
        if (response.status === 200) {
          setStagiaires(response.data); // Set fetched data to state
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally{
        setIsload(false)
      }
    };

    fetchData(); // Fetch data when component mounts
  }, []);

  return (
    <div>
      <h2>Liste des Stagiaires</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Filière</th>
           
          </tr>
        </thead>
        <tbody>
          {stagiaires.map((stagiaire, index) => (
            <tr key={index}>
              <td>{stagiaire.id}</td>
              <td>{stagiaire.nom}</td>
              <td>{stagiaire.prenom}</td>
              <td>{stagiaire.filiaire}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StagiaireAPI;