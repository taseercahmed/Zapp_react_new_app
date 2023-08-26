import React,{useEffect,useState} from 'react'

import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { Db } from '../firebase/Firebase';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';

import OurClients from './OurClients'
import { useNavigate } from 'react-router-dom';
// import ServicedetailorderPlace from '../ServicedetailorderPlace';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
   
     
      
    },
  }));
  export default function ServiceDetail() {
    const navigate=useNavigate()
    const [data, setdata] = useState([])
    const [country, setcountry] = useState('UNITED KINGDOM')
    const [product, setproduct] = useState('')
   

    useEffect(() => {
       // console.log("id "+product+country)
      // country="";
      //let items=JSON.parse(localStorage.getItem('items'));
      console.log(JSON.parse(localStorage.getItem('items')))
    //  if(items){
        setproduct(JSON.parse(localStorage.getItem('items')))
    //  }
       //GetCountry()
        loaddata()
       
    }, [])

    const GetCountry = async () => {
      const res = await fetch("https://geolocation-db.com/json/59e89620-db25-11eb-ad48-73c00c9b92a3")
      const data = await res.json();
      setcountry(data.country_name)
      

    }
    async function loaddata(){
   
        if(country!=null && country!=""){
            Db.ref().child("Zapp").child("countries").child(country)
        .child("Services").on("value",snapshot=>{
        
            let arr2=[]
           snapshot.forEach((item)=>{
            if(item.val().serviceName==product){
                console.log("length is"+ item.val().serviceName)
                if(item.val().Items!=null){
          
                    var ob=[]
              
                    ob=item.val().Items;
                    const propertyNames = Object.values(ob);
                 
              
                    propertyNames.map((it)=>{
                        console.log(it.serviceName+"abc")
                        arr2.push({
                          'serviceName':it.serviceName,
                          'price':it.price,
                          'description':it.description,
                          'symbol':it.symbol,
                          'currency':it.curencyname,
                          'categoryName':item.val().serviceName,
                          'servicekey':it.key
                        })
                      })
    
                      setdata(arr2.reverse())
    
                      console.log("length is"+ arr2.length)
              
                    }
             }
             })
              })
        }
         } 
            
   return (
        <div>
         
         <div className="bottomdiv" >
         <div  className="title-wrapper">
      
         <h1 className="h1style">{product}</h1> 
         <a href="/"><button className="myButton2">Check Prices</button></a>
       
      </div>
     
    
      </div>
         <OurClients></OurClients>
      <div id="pricerate">
      <div style={{textAlign:'start',letterSpacing:'10px',
      marginLeft:'50px',marginTop:'30px',marginBottom:'50px',fontSize:'30px'}}>
      <span>{product} PRICES</span>
    </div>
    <div  style={{marginTop:'50px',textAlign:'center'}}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}  >
        {data.map((tile,index) =>{
           if(tile.categoryName==product){
            return(
          <Grid item xs={2} sm={4} md={4} key={index}>
         
         <div className="serviceclass">
        <div>
          <span className="spanelement">{tile.serviceName}</span>
          <span>{tile.symbol}{tile.price}</span>
          
        </div>
        <hr></hr>
        </div>


       
       </Grid>
         ) 
           }
        }
         
          
        )}
      </Grid>

    </div>
      </div>
      
      {/* <ServicedetailorderPlace></ServicedetailorderPlace> */}
        </div>
    )
}

 
//  export async function getStaticPaths() {
//     return {
//       paths: [
//         { params: { id:"5f0f502b9cb9363990f3de6c" } } 
//       ],
//       fallback: false
//   }
// }
// export async function getStaticProps({params:{id}}) {
//     const res = await fetch("https://geolocation-db.com/json/59e89620-db25-11eb-ad48-73c00c9b92a3")
//     const data = await res.json();
//     return {
//       props: {product:id,country: data.country_name.toUpperCase()}
//     }
//   }