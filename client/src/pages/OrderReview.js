import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Db, Auth } from '../../firebase/Firebase'
import slider1jpb from '../../public/images/slider1.jpg'
import { useRouter } from 'next/router'
import BraintreeDropIn from ".././components/BraintreeDropIn";

export default function OrderReview(props) {

  const [fName, setfName] = useState('')
  const [userCoordinates, setuserCoordinates] = useState({})
  const router = useRouter()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [mobile, setmobile] = useState('')
  const [creditnbr, setcreditnbr] = useState('')
  const [error, seterror] = useState('')
  const [vendorlist, setVendorlist] = useState([])
  const [selectedVendor, setselectedVendor] = useState({})
  const [country, setcountry] = useState('UNITED KINGDOM')
  const [countryInFo, setcountryInFo] = useState({})
  const [expirydate, setexpirydate] = useState('')
  const [cvv, setcvv] = useState('')
  const [paymentcomplete, setpaymentcomplete] = useState(false)
  const [showBraintreeDropIn, setShowBraintreeDropIn] = useState(true);

  useEffect(() => {
    getData()

  }, [])
  const getData = async () => {
    await getCountryData();

    //console.log(" "+aryDates);​

    console.log("112233address", router.query.address + "  " + router.query.collslot)
    await Db.ref().child("Zapp/countries/" + country + "/Vendors")
      .on('value', snapshot => {

        if (snapshot.val() != null) {

          let arr = [];
          snapshot.forEach((childsnap) => {
            console.log('11223', childsnap.key)
            Db.ref().child("Zapp/countries/" + country + "/Vendors").
              child(childsnap.key + "/profile")
              .on('value', snap => {
                console.log("112233", snap.val().firstName)

                Db.ref().child("Zapp/countries/" + country + "/Vendors").
                  child(childsnap.key + "/reviews").on('value', reviewsnap => {
                    var count = 0;
                    var rating = 0.0;
                    reviewsnap.forEach((singleRes) => {
                      count++;
                      rating += singleRes.val().rating;
                    })
                    var avg = rating / count;
                    console.log("112233", avg + " " + rating + "   count is " + count)
                    arr.push({
                      'firstName': snap.val().firstName,
                      'lastName': snap.val().lastName,
                      'lat': snap.val().lat,
                      'lng': snap.val().lng,
                      'postalCode': snap.val().postalCode,
                      'status': snap.val().status,
                      'country': snap.val().country,
                      'businessName': snap.val().businessName,
                      'businessAddress': snap.val().businessAddress,
                      'rating': avg,
                      'vendorid': childsnap.key,
                      'phone': snap.val().phone
                    })
                    setselectedVendor({
                      'firstName': snap.val().firstName,
                      'lastName': snap.val().lastName,
                      'lat': snap.val().lat,
                      'lng': snap.val().lng,
                      'postalCode': snap.val().postalCode,
                      'status': snap.val().status,
                      'country': snap.val().country,
                      'businessName': snap.val().businessName,
                      'businessAddress': snap.val().businessAddress,
                      'rating': avg,
                      'vendorid': childsnap.key,
                      'phone': snap.val().phone
                    })
                  })

              })


          })

          setVendorlist(arr)

          vendorlist.map((it) => {
            // console.log("112234rat",it.rating+" "+selectedVendor.rating)
            if (it.rating > selectedVendor.rating) {
              setselectedVendor(it)
            }
          })

          console.log("112234rat", selectedVendor.rating)

        }
      })
  }
  function handleChangeEmail(e) {
    setemail(e.target.value)
  }
  function handleChangeMobile(e) {
    setmobile(e.target.value)
  }
  function handleChangePassword(e) {
    setpassword(e.target.value)
  }
  function handleChangeCredite(e) {
    setcreditnbr(e.target.value)
  }
  function handleChangefirstName(e) {
    setfName(e.target.value)
  }
  function getRandomInt() {
    return Math.floor(100000 + Math.random() * 900000);

  }
  const getCountryData = async () => {
    const res = await fetch("https://geolocation-db.com/json/59e89620-db25-11eb-ad48-73c00c9b92a3")
    const data = await res.json();
    setcountry(data.country_name.toUpperCase())
    setuserCoordinates({
      'latitude': data.latitude,
      'longitude': data.longitude
    })
    console.log(data.country_name + "  " + data.toString())
    Db.ref().child("Zapp/serviceregions/countries").on('value', snap => {
      //  console.log(snap.key+"  key is pak "+snap.val())
      snap.forEach((childit) => {
        if (data.country_name.toLowerCase() === childit.val().name.toLowerCase()) {
          console.log(childit.key + "  key is pak " + childit.val().symbol)
          setcountryInFo({
            'country': childit.val().name,
            'symbol': childit.val().symbol,
            'currency': childit.val().currencyname,
            'minimamamount': childit.val().minimamamount
          })
        }
      })
      console.log(countryInFo.symbol)

    })
  }

  function handleSubmit(e) {
    // setShowBraintreeDropIn(true);
    e.preventDefault();
    if (email == '') {
      return seterror("Please Enter Email")
    }

    if (password == '') {
      return seterror("Password must be 6 or more characters")
    }

    // console.log(getRandomInt());
    if (Auth.currentUser != null) {
      //    
      var currentdate = new Date();

      Db.ref().child('Zapp').child('countries').child(country)
        .child('Orders')
        .child(getRandomInt()).set({

          'lat': userCoordinates.latitude,
          'lng': userCoordinates.longitude,
          'address': router.query.address,
          'currency': countryInFo.currency,
          'day': currentdate.getDay(),
          'year': currentdate.getFullYear(),
          'month': currentdate.getMonth(),
          'delivery': router.query.delivery,
          'pickUp': router.query.pickup,
          'endSlot': router.query.deliverytxt,
          'startSlot': router.query.collslot,
          'status': 'PENDING_PICKUP',
          'symbol': countryInFo.symbol,
          'frequency': "Just Once",
          'userEmail': email,
          'userId': Auth.currentUser.uid,
          'userName': fName,
          'userPhone': mobile,
          'vendorId': selectedVendor.vendorid,
          'vendorName': selectedVendor.firstName + "," + selectedVendor.lastName,
          'vendorPhone': selectedVendor.phone
        }, (error) => {
          if (error) {
            console.log("error is " + error.message)
            return alert(error.message)
            //  seterror(error.message)
          } else {
            console.log("not error ")
            router.push('/')
            return alert("Order Placed Successfully")


          }
        })

    } else {

      Auth.createUserWithEmailAndPassword(email,
        password)
        .then(s => {
          console.log("44545s4" + s);

          //   router.push('/')
          var currentdate = new Date();
          Db.ref().child('Zapp').child('countries').child(country)
            .child('Orders')
            .child(getRandomInt()).set({

              'lat': userCoordinates.latitude,
              'lng': userCoordinates.longitude,
              'address': router.query.address,
              'currency': countryInFo.currency,
              'day': currentdate.getDay(),
              'year': currentdate.getFullYear(),
              'month': currentdate.getMonth(),
              'delivery': router.query.delivery,
              'pickUp': router.query.pickup,
              'endSlot': router.query.deliverytxt,
              'startSlot': router.query.collslot,
              'status': 'PENDING_PICKUP',
              'symbol': countryInFo.symbol,
              'frequency': "Just Once",
              'userEmail': email,
              'userId': Auth.currentUser.uid,
              'userName': fName,
              'userPhone': mobile,
              'vendorId': selectedVendor.vendorid,
              'vendorName': selectedVendor.firstName + "," + selectedVendor.lastName,
              'vendorPhone': selectedVendor.phone
            }, (error) => {
              if (error) {
                console.log("error is " + error.message)
                return alert(error.message)
                //  seterror(error.message)
              } else {
                console.log("not error ")
                router.push('/')
                return alert("Order Placed Successfully")


              }
            })


        })
        .catch(e => {
          console.log("44545" + e.message);
          var errmsg = e.message + "";
          seterror(errmsg)
          console.log("44545" + e.message + "jkkdzjf ");
        })
    }
  }

  function handleChangeExpiryDate(e) {
    setexpirydate(e.target.value)
  }

  function handleChangecvv(e) {
    setcvv(e.target.value)
  }
  return (
    <div className=' rowdiv col-lg-12'>
      <div className='mainorderreviewDiv col-lg-9'>

        <h1 className="almosttitle">Almost There!</h1>
        <h3>We will make your life easier-No list of items
          necessary</h3>

        <form className="f123form" onSubmit={handleSubmit}>
          <input type="text" className="in-putorderreview"
            onChange={handleChangefirstName} value={fName} autoComplete="off"
            placeholder="First Name" id="firstname" required
          >
          </input>
          <input type="email" className="in-putorderreview" autoComplete="off"
            onChange={handleChangeEmail}
            value={email}
            placeholder="Email" id="firstname" required
          >
          </input>
          <input type="text" className="in-putorderreview" autoComplete="off"
            onChange={handleChangeMobile}
            value={mobile}
            placeholder="Mobile Number" id="firstname" required
          >
          </input>
          <input type="password" className="in-putorderreview" autoComplete="off"
            onChange={handleChangePassword} value={password}
            placeholder="Choose A Password" id="firstname" required
          >
          </input>
          {paymentcomplete ? <div></div> : <BraintreeDropIn
            show={showBraintreeDropIn}
            onPaymentCompleted={(nonce) => {
              setShowBraintreeDropIn(false);
              setpaymentcomplete(true);
              console.log(nonce)
              fetch("https://us-central1-zapp-laundry.cloudfunctions.net/expressApi/confirmBraintree", {
                "method": "POST",

                "body": JSON.stringify({
                  nonce: nonce,
                  firstName: selectedVendor.firstName,
                  lastName: selectedVendor.lastName,
                   phone: mobile,
                   email: email,
                   postalCode: router.query.address,
                  extendedAddress: router.query.address
                })
              })
                .then(response => response.json())
                .then(response => {
                  alert(`Payment completed`);
                  console.log(response)

                })
                .catch(err => {
                  alert(err.toString());
                  console.log(err);
                });
              //    setNumberOfProducts(1);
            }}
          />
          }
          {/* <input type="number" className="in-putorderreview" autoComplete="off"
            onChange={handleChangeCredite} value={creditnbr}
            placeholder="Credit or Debit Card Number" id="firstname" required
          >
          </input>
           
          <input type="text" className="in-putorderreview" autoComplete="off"
            onChange={handleChangeExpiryDate} value={expirydate}
            placeholder="Expiry Date (MM/YY)" id="firstname" required
          >
          </input>

          <input type="text" className="in-putorderreview" autoComplete="off"
            onChange={handleChangecvv} value={cvv}
            placeholder="CVV" id="firstname" required
          >
          </input> */}
          <div className="spacediv"></div>
          {
            paymentcomplete ? <input
              type="submit" value="PLACE ORDER"
              className="buttontxt" disabled={paymentcomplete}

            /> : <div></div>
          }


          <div className="spacediv"></div>
        </form>
      </div>
      <div className='col-lg-3 rightdive'>
        <h2 className='sidediv12'>Customer Information
        </h2>
        <h3 className='sidediv'>Collection Date :   {router.query.pickup}
        </h3>
        <h3 className='sidediv'>Collection TimeSlot :   {router.query.collslot}
        </h3>
        <h3 className='sidediv'> Delivery Date :   {router.query.delivery}</h3>
        <h3 className='sidediv'>Delivery TimeSlot :   {router.query.deliverytxt}
        </h3>
      </div>
    </div>
  )
}
