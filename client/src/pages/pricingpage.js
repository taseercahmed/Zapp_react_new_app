import React,{useState,useEffect} from 'react'
import { makeStyles } from '@mui/styles';
// import GridList from '@material-ui/core/GridList';
import Grid from '@mui/material/Grid';
import { Db } from '../firebase/Firebase';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';


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

export const getStaticProps= async()=>{
  const res=await fetch("https://geolocation-db.com/json/59e89620-db25-11eb-ad48-73c00c9b92a3")
  const data=await res.json();
  return({
      props:{country:data.country_name.toUpperCase()}
  })
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export default function Pricingpage({country}) {
  
  
   const[selectedcategory,setselectedcategory]=useState("")
   const[data,setdata]=useState([])
   const[servicesData,setServiceData]=useState([])
   const[Mainlist,setMainlist]=useState([])
 
  country="UNITED KINGDOM";
 useEffect(()=>{
    loaddata();

 },[])

 async function loaddata(){

  Db.ref().child("Zapp").child("countries").child(country)
  .child("Services").on("value",snapshot=>{
   let arr=[]
   let arr2=[]

    snapshot.forEach((item)=>{
      // console.log(item.val().Items)
      arr.push({
        'categoryName':item.val().serviceName,
        'image':item.val().image,
        'priority':item.val().priority,
        'key':item.key
      })
      
   
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


      }
      
          
    
  
    })
   
    setdata(arr.reverse())
    setServiceData(arr2.reverse())
    setMainlist(arr2.reverse())
    let newarr=arr.reverse()
    setselectedcategory(newarr[0].categoryName)
    
  })

}

const handleClick=(tile)=>{
  console.log(tile.categoryName+" name is ")
 setselectedcategory(tile.categoryName)
}

const searchFilter=(e)=>{
  if(e.target.value==''){
    setServiceData(Mainlist)
    return;
  }
  let arr=[]
         Mainlist.map((itm)=>{
             if(itm.categoryName==selectedcategory){

               if(itm.serviceName.toLowerCase().includes(e.target.value.toLowerCase())){
                arr.push(itm)
               }
              
             }
         })
         setServiceData(arr)

}

    return (
      <div >
      <img src="https://cdn.shopify.com/s/files/1/0018/8556/9136/files/home-banner-mb_a0b71566-5de1-4577-a1bf-05e05556b55c_2048x.jpg?v=1571660305"
       width='100%' height="50%" alt="" />
        <div className="title_maindiv col-lg-12">
         <div className=" title_div col-lg-6 col-md-6 col-sm-12">
         <h2 className="prices-title ">What service do you require?</h2></div>
         <div className="title_div col-lg-6 col-md-6 col-sm-12">
         <input className="prices-search-input " placeholder="Search" onChange={searchFilter} />

         </div>
          </div>
          <div  style={{marginTop:'5%',marginLeft:'5%',marginRight:'5%',marginBottom:'5%',textAlign:'center'}}>
          <Box sx={{ flexGrow: 1 }}  >
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data.map((tile, index) => {
          return(
            (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Item onClick={()=>{handleClick(tile)}}>{tile.categoryName}</Item>
              </Grid>
            )
          )
        })}
      </Grid>
    </Box>
          </div>
          <div style={{marginLeft:"4%"}}>
    <h2> Price List</h2>
    </div>
    <div  style={{marginTop:'5%',marginLeft:'5%',marginRight:'5%',marginBottom:'5%',textAlign:'center'}}>
    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {servicesData.map((tile,index) => {
           if(tile.categoryName==selectedcategory){
            return(
              <Grid item xs={2} sm={4} md={4} key={index}>
              <div className="serviceclass">
           
           <div className='serviceclassinner'>
             <span className="spanelement">{tile.serviceName}</span>
             <span 
             style={{textAlign:'center',marginTop:'100px'}}
             >{tile.symbol}{tile.price}</span>
             
           </div>
           <hr></hr>
           </div>
            </Grid>
            );
           
           }
         })}
      </Grid>
    </Box>
      </div>
       </div>
  
    )

}

 