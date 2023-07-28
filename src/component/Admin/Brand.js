import React, {Fragment, useState, useEffect} from 'react';
import "./Brand.css";
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import SideBar from './Sidebar';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { generateBrand, getAllBrand, deleteBrand } from '../../actions/brandAction';

const Brand = () => {

  const dispatch = useDispatch();
  const alert  = useAlert();

  const { loading, error, allBrand } = useSelector((state) => state.allBrand);
  const [brandName, setBrandName] = useState("");
  const [brand, setBrand] = useState();
  const [brandPreview, setBrandPreview] = useState("/Profile.png");


  useEffect(async () =>{
    if(error){
        alert.error(error);
    }
    await dispatch(getAllBrand());
    console.log("allbrand",allBrand);

},[getAllBrand,error])

  const onSubmit = async e =>{
    e.preventDefault();
    await dispatch(generateBrand({name: brandName,image:brand}));
    await dispatch(getAllBrand());
    alert.success("Brand added")
    setBrandName("");
  }


  const handleDelete = async (id) =>{
    console.log("id",id)
    await dispatch(deleteBrand(id));
    await dispatch(getAllBrand());
}

const brandDataChange = (e) => {
  const reader = new FileReader();

  reader.onload = () => {
    if (reader.readyState === 2) {
      setBrandPreview(reader.result);
      setBrand(reader.result);
    }
  };

  reader.readAsDataURL(e.target.files[0]);
};

  return <Fragment>
        <MetaData title={`Create Brand - Admin`} />

      <div className="dashboard">
      <SideBar />
      <div className='generateBrandContainer'>
      <form className="brandform" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control brand-input"
                        placeholder="Enter Brand Name"
                        name="brandName"
                        value={brandName}
                        onChange={e => setBrandName(e.target.value)}
                        required
                    />
                </div>
                <div className='brand-imgae-logo-div'>
                  <img className='avatar-img-logog' src={brandPreview} alt="Brand Logo Preview" />
                  <input
                   placeholder="Brand Logo"
                    type="file"
                    name="brand"
                    accept="image/*"
                    onChange={brandDataChange}
                    required
                  />
                </div>
                <button type="submit" class="btn btn-primary add-brand-btn">Add Brand</button>
          </form>
    {
     loading ?
     <Loader /> :
     <div className='my-all-brands'>
       {allBrand.map((t) =>(
         <div className='single-brand'>
         <div className='brand-name'>{t.name} <i class="fas fa-trash brand-delete-btn" onClick={() =>handleDelete(t._id)}></i></div>
         {t.images.length > 0 && <img className='brand-img-logog' src={t.images.length > 0 && t.images[0].url} alt="Brand Logo Preview" />}
         </div>
       ))}
      </div> 
 }

      </div>
      </div>
  </Fragment>
;
};

export default Brand;
