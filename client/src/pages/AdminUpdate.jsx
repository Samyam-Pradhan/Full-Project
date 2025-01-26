import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AdminUpdate = () =>{
    const [data, setData] = useState({
        username:"",
        email:"",
        phone:"",
    })
    const params = useParams();
    co
    //get single user data
    const getSingleUserData = async () =>{
            try{
            const response =await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = await response.json();
            console.log(`users single data: ${data}`);
            setData(data);
    /* 
            if(response.ok){
                getAllUsersData();
            } */
        }catch(error){
            console.log(error);
            
        }
        }
    
        useEffect(() => {
            getAllUsersData();
        }, [isLoggedIn, token]);
    
        if (error) {
            return <div>Error: {error}</div>;
        }
    
    useEffect (()=>{
        getSingleUserData();
    },[isLoggedIn, token])
    const handleInput = () => {};
    return(
        <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Update Users</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          

          {/* contact form content actual  */}
          <section className="section-form">
            <form>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={data.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={data.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone">Mobile</label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={data.phone}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          </section>
        </div>

        
      </section>
    )
}
export default AdminUpdate;