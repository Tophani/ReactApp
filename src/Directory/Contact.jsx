// import './App.css';
import React, {useState} from 'react';


function Contact() {

  const [formData, setFormData] = useState({
    name:"",
    address:"",
    telephone:"",

    IsEdit:false
  });

  const [list, setList] = useState([]);
  

  const handleChange= (event)=>{
    let {name, value} = event.target;

    setFormData({
      ...formData,
      [name]:value
    })
  };

  const handleSave=()=>{
    let item = {
      name:formData.name,
      address:formData.address,
      telephone:formData.telephone,
      id:Number(list.length)  +1
      
    }
     setList(list.concat(item))
    
  }
  const handleUpdate =()=>{
    const newList = list.filter((ls)=>ls.id!==formData.id);
    setList(newList.concat(formData))
    setFormData({
      name:"",
      address:"",
      telephone:"",
      IsEdit:false
    })
  }
   const handleDelete= (id)=>{
    const newList= list.filter((ls)=>ls.id!==id)
    setList(newList)
   }

   const handleEdit=(ls)=>{
    setFormData({
      ...ls,
      IsEdit:true
    })
   }
    
    
   
  return (
    <div className='container'>
      <div className='card mt-3'>
        <div className='card-body'>
      <h5>Add New Contact</h5>
      <div className='border border-primary border-2 p-3'>

        <form action=''>
        <div className='row'>
            <div className='col-md-12'> 
              <div className='form-group'>
                <label htmlFor className='mb-2 fw-bold'>Contact Name</label>
                <input 
                type="text"
                name="name"
                value= {formData.name}
                 className='form-control'
                 onChange={handleChange}
                 />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-12'> 
              <div className='form-group'>
                <label htmlFor='' className='mb-2 fw-bold'>Station Address</label>
                <input 
                type='text' 
                name="address"
                value={formData.address}
                className='form-control'
                onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className='row mt-2'>
            <div className='col-md-12'> 
              <div className='form-group'>
                <label className='mb-2 fw-bold'>Telephone Number</label>
                <input type='text' className='form-control' name='telephone' value={formData.telephone}/>
              </div>
            </div>
          </div>
          <hr />

          <button type='button' className={formData.IsEdit?'btn btn-success':'btn btn-primary'}
           onClick={formData.IsEdit?handleUpdate:handleSave}> 
            {formData.IsEdit? "Update Contact":"Save Contact"}</button>  
        </form>
      </div>

      <div className='border border-primary mt-5 p-3 fw-bold'>
        <h5>Contact List</h5>
        {list.map((ls, index)=>
       
         <div className='text-wrapper' key={index}>
        <div>
        <h5>{ls.name}</h5>
        <p>{ls.address} <span className='text-danger fw-bold'>{ls.telephone}</span></p>
        </div>
        
          <div className='btn-group'>
            <button type='button' className='btn btn-warning'>Edit</button>
            &nbsp;
            <button type='button' className='btn btn-danger' onClick={()=>handleDelete (ls.id)}>Delete</button>
          </div>
        </div>   
        )}
      </div>
    </div>
  </div>
</div>

    
  );
}

export default Contact