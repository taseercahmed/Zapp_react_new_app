import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Carousel from 'react-material-ui-carousel'
import Image from 'next/image';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Tag, } from "reactstrap";
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import slider1jpb from '../../public/images/slider1.jpg'
// import slider1 from '../../public/images/slideimg1.jpg'
// import slider2 from '../../public/images/slideimg2.png'
// import slider3 from '../../public/images/slideimg3.png'
import { Paper, Button } from '@material-ui/core'
import { Db, Auth } from '../../firebase/Firebase'
import { DropdownButton, Dropdown } from 'react-bootstrap'

import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
//import DropdownMenu from 'react-overlays/esm/DropdownMenu';

function Example(props) {
  var items = [
    {
      name: "Random Name #1",
      img: "/images/slideimg2.png",
      description: "Probably the most random thing you have ever seen!",
      color: 'white',
      secondcolor: "#F0F0F0"
    },
    {
      name: "Random Name #2",
      img: "/images/slideimg2.png",
      description: "Hello World!",
      color: 'white',
      secondcolor: "#F0F0F0"
    },
    {
      name: "Random Name #3",
      img: "slideimg2.png",
      description: "Taser Ahmed!",
      color: 'white',
      secondcolor: "#F0F0F0"
    }
  ]
  const [postalcodelist, setPostalcodelist] = useState([])
  const [filterpostalcodelist, setFilterpostalcodelist] = useState([])
  const [timeslotslist, setTimeslotslist] = useState([])
  const [filtertimeslotslist, setfilterTimeslotslist] = useState([])
  const [filterEndtimeslotslist, setfilterEndTimeslotslist] = useState([])
  const [timeslottxt, settimeslottxt] = useState('')
  const [endtimeslottxt, setendtimeslottxt] = useState('')
  const [pickup, setpickup] = useState('')
  const [delivery, setdelivery] = useState('')
  const [address, setaddress] = useState('')
  const [radius, setradius] = useState()
  const [model, setmodel] = useState(false);
  const [firstbolean, setFirstBolean] = useState(false);
  const [abolean, setabolean] = useState(false);
  const [abolean2, setabolean2] = useState(false);

  const router = useRouter()
  useEffect(() => {
    Db.ref().child("Zapp").child("postalcodes").on('value', snapshot => {

      if (snapshot.val() != null) {
        let arr = [];

        snapshot.forEach((itm) => {
          arr.push({
            'address': itm.val().address

          })
          // console.log(""+itm.val().address)
        })
        setFilterpostalcodelist(arr)
        setPostalcodelist(arr)

      }
    })



    Db.ref().child("Zapp/countries/UNITED KINGDOM/timeslots").on('value', snapshot => {
      if (snapshot.val() != null) {
        let arr = [];

        snapshot.forEach((itm) => {

          Db.ref().child("Zapp/countries/UNITED KINGDOM/timeslots").child(itm.key).on('value', childSnapshot => {

            childSnapshot.forEach((subitem) => {

              Db.ref().child("Zapp/countries/UNITED KINGDOM/timeslots")
                .child(itm.key).child(subitem.key).on('value', subchildSnapshot => {

                  subchildSnapshot.forEach((newsubitem) => {

                    arr.push({

                      'postalcode': itm.key,
                      'day': subitem.key,
                      'key': newsubitem.key,
                      'echo': newsubitem.val().echo,
                      'slot': newsubitem.val().slot

                    })

                  })

                })
            })

          })

        })
        // setfilterTimeslotslist(arr)
        // setTimeslotslist(arr)
        // setfilterEndTimeslotslist(arr)
        var startDate = new Date();
        GetDates(startDate, 7, arr);
        //  aryDates.map((itm)=>{
        //      console.log(itm)
        //  })
      }
    })

  }, [])

  function handleChange(e) {
    e.preventDefault();

    if (e.target.value === '') {
      setaddress('')
      setFirstBolean(false);

    } else {
      setaddress(e.target.value)
      let arr = []
      postalcodelist.map((it) => {
        var a = it.address.toLowerCase()
        if (a.includes(e.target.value)) {
          arr.push(it);
        }
      })
      setFilterpostalcodelist(arr)
      setFirstBolean(true);

    }


  };
  function ClickItem(it) {
    setaddress(it.address)
    //setFilterpostalcodelist([])
    setFirstBolean(false);
  }
  function changeTimeSlot(e) {
    if (e.target.value === '') {
      settimeslottxt('')
      setabolean(false);

    } else {
      if (address === '') {
        return alert("please fill postal Address");
      }
      settimeslottxt(e.target.value)
      setabolean(true);
    }
  }

  function changeEndTimeSlot(e) {
    if (e.target.value === '') {
      setendtimeslottxt('')

      setabolean2(false)

    } else {
      setendtimeslottxt(e.target.value)
      setabolean2(true)
    }
  }
  function handleSelect(address) {
    let placeid = ''
    geocodeByAddress(address)
      .then(results => {
        console.log("place id ", results[0].place_id);


        return getLatLng(results[0])

      }).then(latLng => {
        // this.setState({ mapcenter: latLng })

        setaddress(address)
        // this.setState({ address })

        console.log("address is " + address);
      })
      .catch(error => console.error('Error 544', error));



  };

  function handleSubmit(e) {
    e.preventDefault();

    router.push({
      pathname: '/orders/OrderReview', query: {
        'collslot': timeslottxt,
        'deliverytxt': endtimeslottxt,
        'address': address,
        'pickup':pickup,
        'delivery':delivery
      }
    })
    console.log("112233", "hellow ")
  }
  function GetDates(startDate, daysToAdd, arr) {
    var aryDates = [];
    console.log(arr.length+" size is ")
    for (var i = 0; i <= daysToAdd; i++) {
      var currentDate = new Date();
      currentDate.setDate(startDate.getDate() + i);

      arr.map((it) => {
        var d=DayAsString(currentDate.getDay()) + ", " + currentDate.getDate() + " " + MonthAsString(currentDate.getMonth()) + " " + currentDate.getFullYear()
        aryDates.push({
          'slot': it.slot,
          'postalcode': it.postalcode,
          'day': it.day,
          'key': it.key,
          'echo': it.echo,
          'timedate': d
        });
        //  if(aryDates.length>0){
        //   aryDates.map((ardates)=>{
        //     if(ardates.slot.toLowerCase()===it.slot.toLowerCase()
        //     && aryDates.timedate===d){
        //       console.log(" 123yes")
        //       aryDates.push({
        //         'slot': it.slot,
        //         'postalcode': it.postalcode,
        //         'day': it.day,
        //         'key': it.key,
        //         'echo': it.echo,
        //         'timedate': d
        //       });
        //   }else{
        //     aryDates.push({
        //       'slot': it.slot,
        //       'postalcode': it.postalcode,
        //       'day': it.day,
        //       'key': it.key,
        //       'echo': it.echo,
        //       'timedate': d
        //     });
        //     }
        //   })
         
        //  }else{
          
        //  }
     
       
      })


    }
    //console.log("list size is"+aryDates.length)
    setTimeslotslist(aryDates)
    setfilterTimeslotslist(aryDates)
    setfilterEndTimeslotslist(aryDates)
    // return aryDates;
  }
  function MonthAsString(monthIndex) {
    var d = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    return month[monthIndex];
  }

  function DayAsString(dayIndex) {
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";

    return weekdays[dayIndex];
  }
  function Clickstarttimeslot(it) {
    settimeslottxt(it.slot)
    setpickup(it.timedate)

    setabolean(false);
  }
  function Clickendtimeslot(it) {
    setendtimeslottxt(it.slot)
    setdelivery(it.timedate)
    // setfilterEndTimeslotslist([])
    setabolean2(false);
  }
  return (
    <>

      <Carousel timeout={1000} indicators={false}>
        {
          items.map((item, i) => {
            return (
              <Paper className="maindivContainer" key={i}>
                <Image src={item.img} 
                  width="100%" height="56%" layout="responsive" objectFit="contain"
                  alt=""
                />
                <div className="innerdivContainer">
                  <div className=" section">
                    <div className="section-h1" style={{ color: item.color }}>

                      <h1>DRY CLEANING & LAUNDRY <br></br><span className="color-chng">DELIVERY SERVICE</span></h1>

                    </div>
                    <div className="section-h2" style={{ color: item.color }}>

                      <ul>
                        <h2>We Collect Clean and Deliver</h2>
                        <h2>Directly to your Door</h2>
                      </ul>
                    </div>
                  </div>
                  <div className="form">
                    <form className="divsize" onSubmit={handleSubmit}>

                      <span className="form-para" style={{
                        color: item.color,
                        display: 'block', fontSize: '17px'
                      }}>

                        CHECK TIMES FOR YOUR ADDRESS
                      </span>
                      <i className="cis-accessibility"></i>


                      <span className="material-icons-outlined"></span>
                      <input type="text" className="in-put" autoComplete="off"
                      onChange={handleChange} value={address}
                        placeholder="POSTCODE" id="firstinput" required
                      >

                      </input>


                      <input type="text" className="in-put" autoComplete="off"
                       placeholder="Collection slot"
                        id="secondinput" value={timeslottxt} onChange={changeTimeSlot}
                        required />
                      {
                        timeslottxt != '' ? <input type="text" autoComplete="off"
                        className="in-put"
                          placeholder="Dropoff slot"
                          id="secondinput" value={endtimeslottxt} onChange={changeEndTimeSlot}
                          required /> : null
                      }

                      <input
                        type="submit" value="PLACE ORDER" className="btn-form" />
                      <div>

                      </div>
                    </form>
                  </div>

                  <div className="maindivrow">
                    {
                      firstbolean ? <div className="designdropdownlist">
                        {
                          filterpostalcodelist.map((it) => {
                            return <h1 key={it.address}
                            className="titleheading34" onClick={() => {
                              ClickItem(it)

                            }}

                            >{it.address} </h1>
                          })
                        }
                      </div>
                        : null
                    }
                    {
                      abolean ? <div className="designdropdownlist21">
                        {
                          filtertimeslotslist.map((it) => {
                            return <div key={it.timedate}
                            className="designdropdownlist21inner" onClick={() => {
                                Clickstarttimeslot(it)

                              }}>


                              <span className="datetimestyle">{it.timedate}</span>
                              <h1 className="titleheading" >{it.slot} </h1>
                            </div>

                          })
                        }
                      </div>
                        : null
                    }
                    {
                      abolean2 ? <div 
                      className="designdropdownlist22">
                        {
                          filterEndtimeslotslist.map((it) => {
                            return <div key={it.timedate}
                            className="designdropdownlist22inner" onClick={() => {
                                Clickendtimeslot(it)

                              }}>


                              <span className="datetimestyle">{it.timedate}</span>
                              <h1 className="titleheading" >{it.slot} </h1>
                            </div>
                          })
                        }
                      </div>
                        : null
                    }
                  </div>
                </div>


              </Paper>
            )
          }
          )
        }
      </Carousel>
    </>
  )
}


export default Example
// export default GoogleApiWrapper({
//   apiKey: ('AIzaSyCCrW2ufRZqxNtJ5kqfnU5s2YZ4DgLYZEU')
// })(Example)

