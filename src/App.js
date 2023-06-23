import { useEffect, useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import User from './Components/User';
import AddUser from './Components/AddUser';
import EditUser from './Components/EditUser';

function App() {
  const [userData, setUserData] = useState([]);

  useEffect(()=>{
    const getUser = async()=>{
      try {
        const res = await fetch("https://643d2495f0ec48ce90536438.mockapi.io/Users",{
          method: "GET",
        })
        const data = await res.json();
        setUserData(data);
        
      } catch (error) {
        console.log(error);        
      }
    }
    getUser();
  },[])

  return (
    <div className="App">
      <Switch>

        <Route exact path='/'>
          <AddUser
          
          />
        </Route>

        <Route path='/user'>
          <User
          userData={userData}
          setUserData={setUserData}
          />
        </Route>

        <Route path='/edit/:id'>
          <EditUser
          userData={userData}
          setUserData={setUserData}
          />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
