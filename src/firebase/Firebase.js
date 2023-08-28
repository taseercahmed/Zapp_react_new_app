// import firebase from "firebase/app";
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";
import 'firebase/compat/messaging';

const FirebaseCredentials = {
  apiKey: "AIzaSyBI1wPPflXxyuatCMKY8yN6bKmI3E7Zoh4",
  authDomain: "zapp-laundry.firebaseapp.com",
  databaseURL: "https://zapp-laundry-default-rtdb.firebaseio.com",
  projectId: "zapp-laundry",
  storageBucket: "zapp-laundry.appspot.com",
  messagingSenderId: "235094005053",
  appId: "1:235094005053:web:0de7469281d6472eeba154"
}

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseCredentials)
}

const Db = firebase.database();

const Auth = firebase.auth();

// const messaging = firebase.messaging();

const Storageref = firebase.storage().ref();

export { Db, Auth,Storageref,firebase };

{/* <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
     
<DialogContent>
  <Box component="form" sx={{ display: 'flex',   width: 800,
height: 500 }}>
    <FormControl sx={{ m: 1, minWidth: 250 }}>

      <InputLabel htmlFor="demo-dialog-native">Choose your collections time slot</InputLabel>
      <Select
        native
        value={age}
        onChange={handleChange}
        input={<OutlinedInput label="Age" id="demo-dialog-native" />}
      >
        <option aria-label="None" value="" />
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </Select>
    </FormControl>
    <FormControl sx={{ m: 1, minWidth: 250 }}>

     <InputLabel id="demo-dialog-select-label">Choose your collections time slot</InputLabel>
      <Select
        labelId="demo-dialog-select-label"
        id="demo-dialog-select"
        value={age}
        onChange={handleChange}
        input={<OutlinedInput label="Age" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  </Box>
</DialogContent>
<DialogActions>
  <Button onClick={handleClose}>Cancel</Button>
  <Button onClick={handleClose}>Ok</Button>
</DialogActions>
</Dialog> */}