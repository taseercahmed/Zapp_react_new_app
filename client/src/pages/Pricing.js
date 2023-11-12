import React from 'react'
import { Button } from '@mui/material'

 
export default function Pricing() {
  return (
    <div className="mainhowwork col-lg-12">
      <div>
        <h3 className="pricetxt"> Pricing</h3>
        <hr className="hrstyle"></hr>
      </div>
      <div className="rowdivprice">
        <div className="columndivprice col-lg-4 col-md-6 col-sm-12">
          <div className="pricing-item-image">
        <img src="/images/vector5.svg" width="100px" height="100px" alt=""/> 
          </div>

          <div className="pricing-item-title">
          <h5>Shirts</h5>
          </div>

          <div className="pricing-item-description">Washed and Pressed</div>

          <div className="pricing-item-price">From £2</div>

        </div>
        <div className="columndivprice col-lg-4 col-md-6 col-sm-12">
          <div className="pricing-item-image">
          <img src="/images/vector6.svg" width="100px" height="100px"></img>
          </div>

          <div className="pricing-item-title">
          <h5>Day Dress</h5>
        </div>

        <div className="pricing-item-description">Dry Clean</div>
        
          <div className="pricing-item-price">From £10.50</div>

        </div>

        <div className="columndivprice col-lg-4 col-md-6 col-sm-12">
          <div className="pricing-item-image">
          <img src="/images/vector4.svg" width="100px" height="100px" alt="sjkdj"></img>
          </div>

          <div className="pricing-item-title">
          <h5>Service Wash</h5>
        </div>

        <div className="pricing-item-description">Wash, Dry and Fold</div>
        
          <div className="pricing-item-price">From £14.50</div>
        

        </div>
      


      </div>


      <Button href="/pricingpage" color='primary' variant='outlined'
           >Full Price List</Button>
    </div>
  )
}
