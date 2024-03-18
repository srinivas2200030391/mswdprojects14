// import React, { useEffect } from 'react'
// import Profile from './Profile'

// export default function ParentComponent() 
// {
//     const [userData,setUserData] = useState(null)
//     const username = userData.username

//     useEffect(() => {
//       const fetchUserData = async (username)=>{
//         try{
//             const response = await fetch(`http://localhost:2014/user/${username}`)
//             if(response.ok)
//             {
//                 const userData = await response.json()
//                 setUserData(userData)
//             }
//             else{
//                 console.log("Failed to fetch user data")
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message)
//         }
//       }



//       fetchUserData(username)
//     }, [])
    
//   return (
//     <div>
      
//       {console.log(userData)}
//         {userData?<Profile {...userData}/>:<p>Loading User Data ... </p>}
//     </div>
//   )
// }
// ParentComponent.jsx

import React, { useState, useEffect } from 'react';
import Profile from './Profile';

const ParentComponent = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        // Send request to server to get user data using JWT token
        const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
        const response = await fetch('http://localhost:2014/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}` // Attach JWT token to the request headers
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          console.log("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Welcome to Your Profile</h1>
      {userData ? <Profile userData={userData} /> : <p>Loading user data...</p>}
    </div>
  );
};

export default ParentComponent;
