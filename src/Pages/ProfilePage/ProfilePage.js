import { useContext, useState } from "react"
import { Address } from "../../Components/Address/Address";
import { AuthContext } from "../../Context/AuthContext";
import { DataContext } from "../../Context/DataContext"
import "./ProfilePage.css";
import { useNavigate } from "react-router";


export function ProfilePage(){

    const {items:{address}, setItems, setIsLoad}= useContext(DataContext);
    const {user, setToken, setUser}= useContext(AuthContext);
    const { firstName, lastName , email}= user;
    const navigate= useNavigate();
    const formValue = {
        name: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        mobile: "",
      };
    const [formDisplay, setFormDisplay] = useState(false);
    const [addressForm, setAddForm] = useState(formValue);

    const editAddress = (_id, name, street, city, state, country, zipCode, mobile) => {
        setFormDisplay(true);
        setAddForm((form) => ({
          ...form,
          _id,
          name,
          street,
          city,
          state,
          country,
          zipCode,
          mobile,
        }));
      };

      const logOutHandler = () => {
        setItems({
          type: "LOG_OUT",
        });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    
        setUser();
        setToken("");
        setIsLoad(true);
        setTimeout(() => {
          setIsLoad(false);
        }, 500);
        navigate("/");
      };

    return (<>
        <div className="profile-conatiner">
        <div>
            <h1>Profile Page</h1>
            <div className="info-container">
                <div className="name">
                <h3>{firstName} {lastName}</h3>
                <h4>{email}</h4>
                </div>
                <div className="address-container">
                <p className="address-title">Saved Addresses</p>
                {
                    address.length <= 0
                    ?(<h4>No Saved Address</h4>)
                    :address.map(({_id,name,street,city,state,country,zipCode,mobile})=>(
                        <li className="address-list" key={_id}>
                            <h4>{name}</h4>
                            <p>{street}, {city}, {state},</p>
                            <p>{zipCode}</p>
                            <p>{country}</p>
                            <p>Phone :{mobile}</p>
                            <button className="profile-btns" onClick={() =>
                          editAddress(_id, name, street, city, state, country, zipCode, mobile)
                        }>Edit</button>
                            <button className="profile-btns" onClick={()=>setItems({type:"DELETE_ADDRESS", payLoad:_id})}>Delete</button>
                        </li>
                    ))
                }
                </div>
                <button className="profile-btns" disabled={formDisplay} onClick={()=>{
                    setFormDisplay(true);
                    setAddForm(formValue);
                }}>+ Address</button>
                <br/>
                <button className="logout-btn" onClick={()=>logOutHandler()}>Log Out</button>
            </div>
            </div>
            <div className="address-component">
            {formDisplay
                ?<Address addressForm={addressForm}
                        setAddForm={setAddForm}
                        formDisplay={formDisplay}
                        setFormDisplay={setFormDisplay}
                        formValue={formValue}/>
                :""
            }
            </div>
        </div>
        </>
    )
}