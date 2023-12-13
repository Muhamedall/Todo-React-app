import { Link, Outlet } from "react-router-dom";
export default function Header (){
    return (
        <>
        <nav className="NavbarHome ">
        <ul>
          <li>
            <Link to="/" className="linkTo">List Stagaires </Link>
          </li>
          <li>
            <Link to="AddStagaires" className="linkTo">Ajoute Stagires </Link>
          </li>
          

         
         
            
            
           
       
          
         
        </ul>
      </nav>

  
      <Outlet />
        
        </>
    )

}

