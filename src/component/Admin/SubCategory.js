import React, {Fragment, useState, useEffect} from 'react';
import "./Brand.css";
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import SideBar from './Sidebar';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { getAllCategory } from '../../actions/categoryAction';
import { getAllSubCategory, generateSubCategory, deleteSubCategory } from "../../actions/subCategoryAction";

const SubCategory = () => {

  const dispatch = useDispatch();
  const alert  = useAlert();

  const { allCategory } = useSelector((state) => state.allCategory);
  const { loading, error, allSubCategory } = useSelector((state) => state.allSubCategory);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  
  useEffect(async () =>{
    if(error){
        alert.error(error);
    }
    await dispatch(getAllCategory());
    console.log("asdfadf",allCategory)
},[getAllCategory,error])

  const onSubmit = async e =>{
    e.preventDefault();
    console.log("id,",categoryId)
    await dispatch(generateSubCategory({name: subCategoryName},categoryId));
    await dispatch(getAllCategory());
    await dispatch(getAllSubCategory(categoryId));
    alert.success("Sub Category added")
    setSubCategoryName("");
  }


  const handleDelete = async (id) =>{
    console.log("id",id)
    await dispatch(deleteSubCategory(id));
    await dispatch(getAllCategory());
    await dispatch(getAllSubCategory(categoryId));
}

const handleSelectClick = async (id) =>{
  console.log("chala",id)
  await dispatch(getAllSubCategory(id));
}
  return <Fragment>
  <MetaData title={`Create Sub Category - Admin`} />

<div className="dashboard">
<SideBar />
<div className='generateBrandContainer'>
<form className="brandform" onSubmit={onSubmit}>
          <select  className='form-control select-category' name="categoryId" value={categoryId} onChange={(e) => {setCategoryId(e.target.value); handleSelectClick(e.target.value)}}>
          <option value="">Choose Cateogry</option>
            {allCategory.map((t) =>(
              <option value={t._id}>{t.name}</option>
            ))}
          </select>

          <div className="form-group">
              <input
                  type="text"
                  className="form-control brand-input"
                  placeholder="Enter Sub Category"
                  name="subCategoryName"
                  value={subCategoryName}
                  onChange={e => setSubCategoryName(e.target.value)}
                  required
              />
          </div>
          <button type="submit" class="btn btn-primary add-brand-btn">Add SubCategory</button>
    </form>
{
loading ?
<Loader /> :
<div className='my-all-brands'>
 {allSubCategory.map((t) =>(
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

export default SubCategory;
