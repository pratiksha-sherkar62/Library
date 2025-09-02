// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../assets/CSS/userlogin.css';
// import axios from 'axios';

// function UserLogin() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isFlying, setIsFlying] = useState(false);

//   const handleLogin = async(e) => {
//     e.preventDefault();

//     try{
//       const Stud = await axios.post("http://localhost:5000/api/student/login", {
//         email : username,
//         password : password
//       });


//       if(Stud.data.student){
//         setIsFlying(true);
//         setTimeout(() => {
//           navigate('/userhome');
//         }, 1000);
//         return
//       }
//     } catch (error) {
//       try {
//         const staff = await axios.post("http://localhost:5000/api/staff/login", {
//           email : username,
//           password : password
//         });

//       if (staff.data.success) {
//         setIsFlying(true);
//         setTimeout(() => {
//           navigate('/userhome');
//         }, 1000);
//       } else {
//         alert('❌ Invalid credentials. Try user/password');
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert('❌ An error occurred. Please try again later.');
//     }
//   }
//   };

//   return (
//     <div className="login-page green-teal d-flex justify-content-center align-items-center vh-100">
//       <div className="login-card shadow-lg animate-fade-up p-4">
//         <h2 className="text-center mb-4 text-gradient fw-bold">User Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Username</label>
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="Enter username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               autoFocus
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Password</label>
//             <input
//               type="password"
//               className="form-control form-control-lg"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="d-grid">
//             <button type="submit" className="btn btn-gradient btn-lg shadow-sm">
//               <span className={isFlying ? 'rocket-fly' : ''}>🚀</span> Login
//             </button>
//           </div>
//         </form>
//         <p className="text-center mt-4 text-light small opacity-75">
//           Default: <strong>user / password</strong>
//         </p>
//         <p className="text-center mt-3">
//   Don't have an account?{" "}
//   <span
//     className="text-gradient fw-bold"
//     style={{ cursor: "pointer" }}
//     onClick={() => navigate("/register")}
//   >
//     Register here
//   </span>
// </p>
//       </div>
//     </div>
//   );
// }

// export default UserLogin;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/CSS/userlogin.css';
import axios from 'axios';

function UserLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFlying, setIsFlying] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        email: username,
        password: password
      });

      if (response.data.success) {
        // Save JWT token
        localStorage.setItem("token", response.data.token);

        setIsFlying(true);
        setTimeout(() => {
          navigate('/userhome');
        }, 1000);
      } else {
        alert("❌ Invalid credentials. Try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("❌ An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-page green-teal d-flex justify-content-center align-items-center vh-100">
      <div className="login-card shadow-lg animate-fade-up p-4">
        <h2 className="text-center mb-4 text-gradient fw-bold">User Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-gradient btn-lg shadow-sm">
              <span className={isFlying ? 'rocket-fly' : ''}>🚀</span> Login
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-light small opacity-75">
          Default: <strong>user / password</strong>
        </p>
        <p className="text-center mt-3">
          Don&apos;t have an account?{" "}
          <span
            className="text-gradient fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/userRegister")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;
