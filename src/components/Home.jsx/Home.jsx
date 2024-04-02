import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { AuthLogin } from '../../App';




const Home = () => {
  const [movies, setMovies] = useState([]);
  const [Loader, setLoader] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthLogin)

  const navigate = useNavigate();


  const handleNavigation = (id) => {
    navigate(`/home/${id}`)
  }

  async function getData() {

    try {
      const config = {
        "category": "movies",
        "language": "kannada",
        "genre": "all",
        "sort": "voting"
      }
      const response = await axios.post("https://hoblist.com/api/movieList", config);
      console.log(response)
      setMovies(response.data.result)
      setLoader(false)
    } catch (error) {
      console.log(error)
      setLoader(false);
    }
  }

  useEffect(() => {
    getData();
  }, [])


  if (isLoggedIn) {
    return (
      <div style={{width:"100vw ", display: 'flex', justifyContent: "center", backgroundColor: "gainsboro"}}>
        <div className='productsmainparent'>
        {Loader ? "loading ..." : movies.map((item) => (
          <div key={item._id} className='product_1stChild'>
            <div className="leftrightcenter">

              <div className="leftvote">

                <span style={{cursor: "pointer"}}><IoIosArrowDropupCircle /></span>
                <span>{item.totalVoted}</span>
                <span style={{cursor: "pointer"}}><IoIosArrowDropdownCircle /></span>
                <span  style={{ fontSize: "9px" }}>Votes</span>

              </div>

              <div className="rightcontent">
                <div className="leftImage">
                  <img className='MoviePosterHeightImage' src={item?.poster} alt="" />
                </div>
                <div className="rightmaincontent">
                  <div className="headingandcontent">
                    <span>{item.title}</span>
                    <span style={{ color: 'GrayText' }}>Genre: <span style={{ color: 'black' }}>{item.genre}</span></span>
                    <span style={{ color: 'GrayText', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Director: <span style={{ color: 'black', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.director[0]}</span></span>
                    <span style={{ color: 'GrayText', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Starring: <span style={{ color: 'black', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.stars[0]}</span></span>
                    <span>Mins | Eng | 2Apr</span>
                  </div>
                  <div className="votesandstuff">
                    <span style={{ color: '#2196F3' }}>{item.pageViews} views | Voted by {item.voting} People</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="watchtrailer">
              <button onClick={() => handleNavigation(item._id)} className='btndesign'>Watch Trailer</button>
            </div>
          </div>
        ))}
      </div>
      </div>
    )
  } else {
    return (
      <div style={{width: "100vw", height: "100vh" , display: 'flex', justifyContent: 'center', alignItems: "center"}}>
        <h1>Login First</h1>
      </div>
    )
  }

}

export default Home
