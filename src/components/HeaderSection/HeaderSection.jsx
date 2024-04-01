import React, { useContext } from 'react'
import CompanyInfo from '../CompanyInfo/CompanyInfo'
import { AuthLogin, LoginInfo } from '../../App';
import { useNavigate } from 'react-router-dom';

const HeaderSection = () => {
  const {LoginButton, setLoginButton} = useContext(LoginInfo);
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthLogin)

  const navigate = useNavigate();
  const handleLogOut = () =>{
    localStorage.removeItem("user");
    setIsLoggedIn(false)


    if(!isLoggedIn){
      navigate("/")
    }
  }
  return (
    <div  style={{width: "100vw"}}>
      <div className='parentheadersec'>
        <div className="leftMenuSystem">
            <div onClick={()=> navigate("/home")} className="logo" style={{cursor: 'pointer'}}>FilmMania</div>
        </div>
        <div  className="rightmenuSystem">
            <div className='rightmenuSystemsubchild'>
                <li style={{cursor: "pointer"}}  onClick={handleLogOut}>{isLoggedIn ? "Logged In" : "Logged Out"}</li>
                <li style={{cursor: 'pointer'}} onClick={()=> setLoginButton(!LoginButton)}>Company Info</li>
            </div> 
        </div>
      </div>
      <CompanyInfo />
    </div>
  )
}

export default HeaderSection
