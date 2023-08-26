import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import { Db } from '../firebase/Firebase';
import { useNavigate } from "react-router-dom"


export const getStaticProps = async () => {
    const res = await fetch("https://geolocation-db.com/json/59e89620-db25-11eb-ad48-73c00c9b92a3")
    const data = await res.json();
    return ({
        props: { country: data.country_name.toUpperCase() }
    })
}
export default function Services({ country }) {
    const [data, setdata] = useState([])
    const [items, setItems] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        country = "UNITED KINGDOM";
        loaddata()
    }, [])
    async function loaddata() {

        Db.ref().child("Zapp").child("countries").child(country)
            .child("Services").on("value", snapshot => {
                let arr = []

                snapshot.forEach((item) => {

                    arr.push({
                        'categoryName': item.val().serviceName,
                        'image': item.val().image,
                        'priority': item.val().priority,
                        'key': item.key
                    })




                })

                setdata(arr)


            })

    }

    function handleClick(categoryName) {
        setItems(categoryName)
        localStorage.setItem('items', JSON.stringify(items));
        navigate('/pricingpage')
    }
    return (
        <div className="mainservicesdiv">
            <div className="service-list-title">Our Services</div>

            <p className="service-list-description">
                Zapp Laundry provides an extensive, ever-growing list of services.
            </p>

            <div style={{ marginTop: '6%', marginLeft: '10%', marginRight: '10%', paddingBottom: '20%', textAlign: 'center' }}>
                <Grid cellHeight="auto" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {data.map((tile, index) => {
                        return (
                            <Grid item xs={2} sm={4} md={4} key={index}
                            >

                                <div className="service-card">
                                    <img className="service-card-icon"
                                        src={tile.image} width="60px" height="60px" alt="" />
                                    <h5 className="service-card-title">{tile.categoryName}</h5>
                                    <button onClick={() => { handleClick(tile.categoryName) }}

                                        className="myButton" >Info + Pricing</button>
                                </div>

                            </Grid>

                        )
                    }
                      )}
                </Grid>

            </div>
        </div>
    )
}

