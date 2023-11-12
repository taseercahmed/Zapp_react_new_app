import React,{useState} from 'react'

export default function Footer() {
    const [email, setemail] = useState("")

    const handleemail=(e)=>{
           setemail(e.target.value)
    }

    return (
        <footer >
            <div className="col-lg-12 footer-top " style={{textAlign:'center'}}>



                {/* <div className="col-lg-8 col-md-6 firstdiv " style={{  }}>
                    <div className="footer-top-title">Subscribe to our newsletter:</div>
                    <div className="sub2-newsletter-content">
                        <form 
                        >
                            <div id="mc_embed_signup_scroll" className="sub2-form-container">
                                <input type="email" value={email} onChange={handleemail}
                                 name="EMAIL" className="sub2-input" id="mce-EMAIL" placeholder="email address" required="" />
                            
                                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="sub2-button" />
                            </div>
                        </form>
                    </div>
                </div> */}

            
                <div className="col-lg-4 col-md-6 footer-app-stores" >
                    <div className="footer-top-title4">Download our new app:</div>
                     <h5>
                     <a className="ios-link"
                      href="https://testflight.apple.com/join/ZKtoSHQv">
                    Download on the App Store:   https://testflight.apple.com/join/ZKtoSHQv
                        {/* <img className='iosapp'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFJXc2wOsStzxpnj7y4NZmFNoQ8H-KHTFN7DRNxcRHqw&s"
                            width="190px" height="65px" alt="Download on the App Store" /> */}
                    </a>
                     </h5>
                    <h5>  <a className="android-link" 
                    href="https://play.google.com/store/apps/details?id=com.zapplaundry">
                        Get it on Google Play:  https://play.google.com/store/apps/details?id=com.zapplaundry
                        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png"
                            width="190px" height="40px" alt="Get it on Google Play" /> */}
                    </a></h5>
                
                </div>
                
            </div>


        </footer>
    )
}
//    © 2021 ZAPPLAUNDRY.
// All rights reserved.