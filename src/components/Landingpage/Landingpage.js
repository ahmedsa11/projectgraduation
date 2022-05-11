import react from "react";
import './landingpage.css'
import logo from '../../img/log.png'
import intro from '../../img/Girl with PC on zoom meeting 1.png'
import icon8 from '../../img/icons8-closed-captioning-32.png'
const LandingPage = () => {
//   const tempuser = localStorage.getItem("user");
// //   let user = JSON.parse(tempuser);
//   if (tempuser === null) {
//     return <Redirect to="/" />;
//   }
 
  return (
    <react.Fragment>
        <div className="landing">
            <div className="land">
                <div className="navbarr">
                    <img src={logo} alt="logo"/>
                    <ul className="ulnav">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Service</a></li>
                    </ul>
                    <button>Login</button>
                </div>
                <div className="intro">
                <div className="textintro">
                    <h2>Social communication<br/> system for the signer and <br/> non-signer people </h2>
                    <ul>
                        <li>Sign language to text </li>
                        <li>Speech to text </li>
                        <li>video communication </li>
                    </ul>
                    </div>
                    <div className="imgintro">
                        <img src={intro}/>
                    </div>
                  
                </div>
            </div>
            <div className="feature">
                <h1>Check Out All Feature</h1>
              
                <div className="row">
                    <div className="col-md-4">
                        <div className="featuericon">
                           <img src={icon8} alt="icon8"/>
                           <h3>ahmed</h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="featuericon">
                           <img src={icon8} alt="icon8"/>
                           <h3>ahmed</h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="featuericon">
                           <img src={icon8} alt="icon8"/>
                           <h3>ahmed</h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="featuericon">
                            
                           <img src={icon8} alt="icon8"/>
                           <h3>ahmed</h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="featuericon">
                           <img src={icon8} alt="icon8"/>
                           <h3>ahmed</h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="featuericon">
                           <img src={icon8} alt="icon8"/>
                           <h3>ahmed</h3>
                        </div>
                    </div>
                </div>
               
            </div>

            <div className="about">
            <div className="abouttext">
                    <h2>asdad</h2>
                    <p>asdad</p>
                </div>
                <div className="aboutimg">
                    <img src={intro} alt="aa"/>
                </div>
            </div>
            <div className="about">
            <div className="abouttext">
                    <h2>asdad</h2>
                    <p>asdad</p>
                </div>
                <div className="aboutimg">
                    <img src={intro} alt="aa"/>
                </div>
            </div>
            <div className="about">
            <div className="abouttext">
                    <h2>asdad</h2>
                    <p>asdad</p>
                </div>
                <div className="aboutimg">
                    <img src={intro} alt="aa"/>
                </div>
            </div>





            <div className="footer" >
                <div className="container">
                    <div className="row">
                        <div class ="col-md-6">
                        <h2> <img src={logo}alt="as"/> Connect</h2>
                            <a><i className="fab fa-facebook"></i></a>
                            <a><i className="fab fa-twitter"></i></a>
                            <a><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <div class ="col-md-6">
                        <ul>
                                <li><a href="index.html"><i className="fas fa-chevron-right"></i>Home</a></li>
                                <li><a href="index.html"><i className="fas fa-chevron-right"></i>About Us</a></li>
                                <li><a href="index.html"><i className="fas fa-chevron-right"></i>Service</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </react.Fragment>
  );
};

export default LandingPage;
