import React,{useState,useEffect} from 'react'
import { makeStyles } from '@mui/styles'
import Grid from '@mui/material/Grid';
import {Db,Auth} from '../firebase/Firebase'
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
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Services_areas() {
    const [areaslist, setareaslist] = useState([])
    const [output, setoutput] = useState([])
  //  let output=[];

    useEffect(() => {

        
       loaddata();
        
       
    }, [])

    function loaddata(){
        Db.ref().child("Zapp").child("postalcodes").on('value',snapshot=>{

                 if(snapshot.val()!=null){
                      let arr=[];

                   snapshot.forEach((itm)=>{
                        arr.push({
                            'address':itm.val().address

                        })
                   }) 
                   
                  
                  // const output1 = ;
                  setoutput(Object.values(
                    arr.reduce((a, item) => {
                      const letter = item.address[0];
                   //   console.log(letter+" letter is  "+a[letter]);
                      if (!a[letter]) 
                      a[letter] = [];
                      a[letter].push(item);
                      return a;
                    }, {})
                  ))
             // output.sort(compareBylastNom)
             output.sort((a, b) => a[0].address[0].localeCompare(b[0].address[0]));
                

                 }
        })
    }

    function handleClick(tile){

    }

    const compareBylastNom = (a, b) => {
    
      const name1 = a.last_nom.toUpperCase();
      const name2 = b.last_nom.toUpperCase();
  
      let comparison = 0;
  
      if (name1 > name2) {
          comparison = 1;
      } else if (name1 < name2) {
          comparison = -1;
      }
      return comparison;
  }

    return (
        <div className="col-lg-12">
           <div className="neworderservicesarea ">
                <div className="mdn-header__container">
                    <h1 className="mdn-header__title">Location Directory</h1>
                    <p className="subtitle">Areas we currently serve</p>
                </div>
                <div className="formservice" >
            <form>
                 
                    <h6 className="form-paraservice"  >

                    CHECK TIMES FOR YOUR ADDRESS
                    </h6>
                    <i className="cis-accessibility"></i>

                  
                    <span className="material-icons-outlined"></span>
                    <input type="text" className="in-put" placeholder="POSTCODE" id="firstinput" required/>
                 
                    <input type="text" className="in-put" placeholder="TIME SLOTS" id="secondinput"
                     onClick="firstinp()" required/>
                    <input type="submit" value="PLACE ORDER" className="in-put bgplaceorder" />

                   
                    </form>
            </div>  
           </div> 

           <div className="   " style={{marginLeft:'5%',marginTop:'50px'}}>
               <h5 className="" style={{marginTop:'20px',letterSpacing:'10px'}}>A | B | C | D | E | F | G | H | I | J | K | L | M | N   </h5>
               <h5 className="" style={{marginTop:'40px',letterSpacing:'10px'}}>  | O | P | Q | R | S | T | U | V | W | X | Y | Z</h5>
           </div>
           <div  style={{marginTop:'5%',marginLeft:'5%',marginBottom:'5%',marginRight:'5%'
           ,textAlign:'center'}}>
      <Grid cellHeight={100} className={useStyles.gridList} cols={3} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
     
      
      {
           output.map((newobj,index)=>{
             return(
                  <Grid  item xs={2} sm={4} md={4} key={index}>
                    <Item>
                    <div key={newobj[0].address[0]} style={{color:'black',marginTop:'5%',marginLeft:'5%',marginRight:'5%',marginBottom:'5%'}} 
                 >
                  <h1>{newobj[0].address[0]}</h1>
                  {
                    newobj.map((it)=>{
                  
                   return(
                   <small key={it.address}
                   style={{display:'block'}}>
                   {it.address}</small>
                   )
                 })
                  }
                  </div>
                    </Item>
                    </Grid>
                )

             })
       }
                   
            
                
      
      </Grid>

    </div>
        </div>
    )
}
