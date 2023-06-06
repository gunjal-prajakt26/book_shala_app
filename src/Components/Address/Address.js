import { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import "./Address.css";
import { v4 as uuid } from "uuid";

export function Address({
    addressForm,
    setAddForm,
    formDisplay,
    setFormDisplay,
    formValue,
  }){

    const {setItems}= useContext(DataContext);
    const {_id, name, street, city, state, country, zipCode, mobile}=addressForm;
    const saveOnClick=()=>{
        if(name && street && city && state && country && zipCode && mobile !==""){
        addressForm._id
        ?setItems({type:"UPDATE_ADDRESS", payLoad:{address:addressForm}})
        :setItems({type: "ADD_ADDRESS", payLoad:{address:{_id:uuid(),...addressForm}}})
        setFormDisplay(false);
        }
    }

    const cancelForm = () => {
        setFormDisplay(false);
        setAddForm(formValue);
      };

    return (
        <div className="address-page">
            <h3>Address Form</h3>
            <input placeholder="Enter Name" value={addressForm.name} type="text" required onChange={(e)=>setAddForm((prev) => ({ ...prev, name: e.target.value }))} />

            <input placeholder="Enter House No. , Road , Colony" value={addressForm.street} type="text" required onChange={(e)=>setAddForm((prev) => ({ ...prev, street: e.target.value }))}/>

            <input placeholder="Enter City" value={addressForm.city} type="text" required onChange={(e)=>setAddForm((prev) => ({ ...prev, city: e.target.value }))}/>

            <input placeholder="Enter State" value={addressForm.state} type="text" required onChange={(e)=>setAddForm((prev) => ({ ...prev, state: e.target.value }))}/>

            <input placeholder="Enter Country" value={addressForm.country} type="text" required onChange={(e)=>setAddForm((prev) => ({ ...prev, country: e.target.value }))}/>

            <input placeholder="Enter Postal Code" value={addressForm.zipCode} type="text" required onChange={(e)=>setAddForm((prev) => ({ ...prev, zipCode: e.target.value }))}/>

            <input placeholder="Enter Mobile Number" value={addressForm.mobile} type="text" required onChange={(e)=>setAddForm((prev) => ({ ...prev, mobile: e.target.value }))}/>

            <div className="address-page-btns">
            <button className="profile-btns" onClick={()=>saveOnClick()}>Save</button>
            <button className="profile-btns" onClick={()=>cancelForm()}>Cancel</button>
            </div>
        </div>
    )
}