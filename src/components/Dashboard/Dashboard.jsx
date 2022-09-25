import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [token, setToken] = React.useState("");
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    const getData = JSON.parse(sessionStorage.getItem("user"));
    if (getData) {
      let token = getData.token;
      setToken(token)
      getUsers(token);
    } else {
      navigate("login");
    }
  }, []);

  const getUsers = async (token) => {
    let url = 'http://127.0.0.1:5000/';
    const res = await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } });
    // console.log(res.data.users);
    setUsers(res.data.users);

  }
  // console.log(typeof users)

  const handleDelete = async (id)=>{
    try {
      let url = `http://127.0.0.1:5000/${id}`;
      const res = await axios.delete(url);
      alert(res.data.msg);
      getUsers(token);
    } catch (error) {
      console.log(error.message);
    }
  }


  const handleLogout = ()=>{
    sessionStorage.clear();
    navigate('/login');
  }
  return (
    <div className='container-fluid p-0'>
      <header className='dashboard-header px-5 py-2 mb-3 bg-dark text-white'>
        <h3>Dashboard</h3>
        <button className='btn btn-warning' onClick={handleLogout}>Logout</button>
      </header>
      <h3>List of users</h3>
      <table className="table table-striped">
        <thead>
          <tr className="table-active">
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((item,index)=>{
              // console.log(item);
              return (
                <tr key={index+1}>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <button className='btn btn-danger' onClick={()=>{handleDelete(item._id)}}>Delete</button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard