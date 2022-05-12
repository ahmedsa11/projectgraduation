import react from "react";
import './landingpage.css'
import logo from '../../img/log.png'
import intro from '../../img/Girl with PC on zoom meeting 1.png'
import icon8 from '../../img/icons8-closed-captioning-32.png'
import googleplay from '../../img/googleplay.png'
import imgapp from '../../img/image 28.png'
import ahmedsalama from '../../img/salama.jpeg'
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
                <div class="colorbar1"></div>
              
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


            <div className="work">
                <h1>How does it work</h1>
                <div class="colorbar1"></div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="workicon">
                            <div className="infoo">
                           <img src={icon8} alt="icon8"/>
                           <h3>ahmed</h3>
                           <p>sufdusgfussdf</p>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                        <div className="workicon">
                        <div className="infoo">
                           <img src={icon8} alt="icon8"/>
                           <h3>ahmed</h3>
                           <p>sufdusgfussdf</p>
                        </div>
                        </div>
                        <div className="ly"></div>
                        </div>
                       
                    </div>
                    <div className="col-md-4">
                        <div className="workicon">
                        <div className="infoo">
                           <img src={icon8} alt="icon8"/>
                           <h3>ahmed</h3>
                           <p>sufdusgfussdf</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ourteam">
                <h1>Meet Our Team</h1>
                <div class="colorbar1"></div>
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="ourteaminfo">
                            <div className="im">
                           <img src={ahmedsalama} alt="icon8"/>
                           </div>
                           <h3>ahmed</h3>
                           <span>asda</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="ourteaminfo">
                                 <div className="im">
                           <img src={ahmedsalama} alt="icon8"/>
                           </div>
                           <h3>ahmed</h3>
                           <span>asda</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="ourteaminfo">
                                 <div className="im">
                           <img src={ahmedsalama} alt="icon8"/>
                           </div>
                           <h3>ahmed</h3>
                           <span>asda</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="ourteaminfo">
                                 <div className="im">
                           <img src={ahmedsalama} alt="icon8"/>
                           </div>
                           <h3>ahmed</h3>
                           <span>asda</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="ourteaminfo">
                                 <div className="im">
                           <img src={ahmedsalama} alt="icon8"/>
                           </div>
                           <h3>ahmed</h3>
                           <span>asda</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="ourteaminfo">
                                 <div className="im">
                           <img src={ahmedsalama} alt="icon8"/>
                           </div>
                           <h3>ahmed</h3>
                           <span>asda</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="ourteaminfo">
                        <div className="featuerii">
                                 <div className="im">
                           <img src={ahmedsalama} alt="icon8"/>
                           </div>
                           </div>
                           <h3>ahmed</h3>
                           <span>asda</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="ourteaminfo">
                                 <div className="im">
                           <img src={ahmedsalama} alt="icon8"/>
                           </div>
                           <h3>ahmed</h3>
                           <span>asda</span>
                        </div>
                    </div>
                </div>
               
            </div>
            <div className="android">
                <div className="imgapp">
                    <img src={imgapp} alt="app" />
                </div>
                <div className="textapp">
                    <div className="textcontent">
                    <h3>Download our app </h3>
                    <h1>Get Connect App<br/> More Easily</h1>
                    <p>asdjaoijdoajodjaojdajdojaodjaojs aij oaisjd oaj oaj oj jaoijsdaa</p>
                    <img src={googleplay} alt="googleplay" />
                    </div>
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
