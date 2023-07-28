import React, {Fragment, useState, useEffect} from 'react';
import "./Brand.css";
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import SideBar from './Sidebar';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { generateCategory, getAllCategory, deleteCategory } from '../../actions/categoryAction';

const Category = () => {
  const dispatch = useDispatch();
  const alert  = useAlert();

  const { loading, error,allCategory } = useSelector((state) => state.allCategory);
  const [categoryName, setCategoryName] = useState("");
  
  useEffect(async () =>{
    if(error){
        alert.error(error);
    }
    await dispatch(getAllCategory());
    console.log("allbrand",allCategory);

},[getAllCategory,error])

  const onSubmit = async e =>{
    e.preventDefault();
    await dispatch(generateCategory({name: categoryName}));
    await dispatch(getAllCategory());
    alert.success("Category added")
    setCategoryName("");
  }


  const handleDelete = async (id) =>{
    console.log("id",id)
    await dispatch(deleteCategory(id));
    await dispatch(getAllCategory());
}
  return <Fragment>
  <MetaData title={`Create Category - Admin`} />

<div className="dashboard">
<SideBar />
<div className='generateBrandContainer'>
<form className="brandform" onSubmit={onSubmit}>
          <div className="form-group">
              <input
                  type="text"
                  className="form-control brand-input"
                  placeholder="Enter Category"
                  name="categoryName"
                  value={categoryName}
                  onChange={e => setCategoryName(e.target.value)}
                  required
              />
          </div>
          <button type="submit" class="btn btn-primary add-brand-btn">Add Category</button>
    </form>
{
loading ?
<Loader /> :
<div className='my-all-brands'>
 {allCategory.map((t) =>(
   <div className='single-brand'>
   <div className='brand-name'>{t.name} <i class="fas fa-trash brand-delete-btn" onClick={() =>handleDelete(t._id)}></i></div>
   </div>
 ))}
</div> 
}

</div>
</div>
</Fragment>
;
};

export default Category;
