import React from 'react'

export default function OurClients() {
    return (
        <div className="col-lg-12" >
            <div className="rowdivclient">
                <div className="columndivclient col-lg-4 col-sm-12">
                    <img src="/images/vector11.svg"  className="heiglight_img" 
                    width="200px" height="100px" alt=""/>
                    <p className="highlights__text">"London s Best Digi Cleaner"</p>
                </div>
                <div className="columndivclient col-lg-4 col-sm-12">
                    <img src="/images/vector9.svg" 
                        className="heiglight_img" width="200px" height="100px" alt=""/>
                    <p className="highlights__text">"For A Hassle-free Life"</p>
                </div>
                <div className="columndivclient col-lg-3 col-sm-12">
                    <img src="/images/vector12.svg" 
                        className="heiglight_img" width="200px" height="100px" alt=""/>
                    <p className="highlights__text">
                        "Britain s Best Delivery Service"
                    </p>
                </div> 


            </div>
        </div>
    )
}
