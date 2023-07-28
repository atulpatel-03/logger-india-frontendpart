import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { CgCopyright } from "react-icons/cg";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { getAllBrand } from '../../actions/brandAction';
import { getAllCategory } from '../../actions/categoryAction';
import { getAllSubCategory} from "../../actions/subCategoryAction";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);
  const { allBrand } = useSelector((state) => state.allBrand);
  const { allCategory } = useSelector((state) => state.allCategory);
  const { allSubCategory } = useSelector((state) => state.allSubCategory);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(async () => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    await dispatch(getAllBrand());
    await dispatch(getAllCategory());
    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, getAllBrand,getAllCategory,alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("brand",brand);
    myForm.set("category", category);
    myForm.set("subcategory",subcategory);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSelectClick = async (categoryName) =>{
    const temp = allCategory.filter((t) => t.name == categoryName);
    console.log("temp",temp)
    await dispatch(getAllSubCategory(temp[0]._id));
  }

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
           
              <CgCopyright />
              <select name="brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="">Choose Brand</option>
                {allBrand.map((bran) => (
                  <option value={bran.name}>
                    {bran.name}
                  </option>
                ))}
              </select>
            </div>

           

            <div>
              <AccountTreeIcon />
              <select name="category" value={category} onChange={(e) => {setCategory(e.target.value); handleSelectClick(e.target.value)}}>
                <option value="">Choose Category</option>
                {allCategory.map((cate) => (
                  <option value={cate.name}>
                    {cate.name}
                  </option>
                ))}
              </select>
            </div>
           { allSubCategory.length != 0 && 
              <div>
              <AccountTreeIcon />
              <select name="subcategory" value={subcategory} onChange={(e) => setSubCategory(e.target.value)}>
                <option value="">Choose Sub Category</option>
                {allSubCategory.map((cate) => (
                  <option  value={cate.name}>
                    {cate.name}
                  </option>
                ))}
              </select>
            </div>
            }
           <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
