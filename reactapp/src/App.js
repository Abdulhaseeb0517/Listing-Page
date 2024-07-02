// import React, { useState } from "react";

// export default function App() {
//   const[users, setUser] = useState([
//     { name:"Haseeb", age: 20, country: "Pakistan"},
//   ]);
//   const submitForm = (e) => {
//     const user = {
//       name: 'Hassan',
//       age: 23,
//       country: 'Pakistan'
//     };
//     setUser([...users, user])
    
//   }
//   return (
//     <div>
//     {users.map((user) => {
//       return <div>
//         <h1>{user.name} - {user.age}</h1>

//         <p>{user.country}</p>
//       </div>
//     })}
//       <button onClick={submitForm}>Click</button>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";

// function App(){
//     const [count, setCount] = useState(0);


//     const handleIncrement = () => {
//         setCount(count + 1);
//     };

//     useEffect(() => {
//         console.log("Use Effect Called");
//     }, );
//     return (
//         <>
//             <h1>Count Up: {count}</h1>
//             <button onClick={handleIncrement}>Increment</button>

          
//         </>
//     );
// }

// export default App;


// import React, { useState, useEffect} from "react";
// function App()
// {
//     const[count, setCount] = useState(0);

//     const handleIscrement = () => {
//         setCount(count + 1);
//     };
//     useEffect(() => {
//         console.log("Use Effect Called");
//     });
//     return (
//         <>
//             <h1>Count Up:{count} </h1>
//             <button onClick={handleIscrement}>Increment</button>
//         </>
//     )
// }

//  export default App;




// import React, { useReducer } from "react";
// import myReducer from "./Reducer";
// function App() {
//     const [state, dispatch] = useReducer(myReducer, {
//         count: 1,
//         oddEven: "Odd",
//     });
//     return (
//         <>
//             <h2>{state.count}</h2>
//             <p>{state.oddEven}</p>
//             <button onClick={()=> dispatch({ type: "check"})}>Count</button>
//         </>
//     );
// }
// export default App;
 


import React from 'react'
import Navbar from "./Navbar.js"
// import TextFrom from "./TextFrom"

function App() {

    return(
        <>
            <Navbar />
            {/* <TextFrom /> */}
        </>
    )
}
export default App;