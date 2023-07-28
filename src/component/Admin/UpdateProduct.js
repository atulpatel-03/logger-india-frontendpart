import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { CgCopyright } from "react-icons/cg";
import { getAllBrand } from '../../actions/brandAction';
import { getAllCategory } from '../../actions/categoryAction';
import { getAllSubCategory} from "../../actions/subCategoryAction";


const UpdateProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, product } = useSelector((state) => state.productDetails);
  const { allBrand } = useSelector((state) => state.allBrand);
  const { allCategory } = useSelector((state) => state.allCategory);
  const { allSubCategory } = useSelector((state) => state.allSubCategory);
  
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

 
  // const allBrand=[
  //   "Stanley",
  //   "Black and Decker",
  //   "Dewalt",
  //   "Irwin",
  //   "Godrej",
  //   "Anchor",
  //   "Anchor panasonoic",
  //   "Cera"
  // ]

  // const categories = [
  //   "Sanitaryware",
  //   "Faucets",
  //   "Tiles",
  //   "Wellness",
  //   "Kitchen Sinks",
  //   "Mirrors",
  // ];

  // const subSanitary = [
  //    "EWCs",
  //    "Wash Basins",
  //    "Cisterns",
  //    "Seat Covers",
  //    "Urinals",
  //    "Electronic Flushing systems",
  //    "Special needs range",
  //    "Bath accessories",
  //    "Water Saving Products",
  //    "Kids range"
  // ];

  // const subFaucets = [
  //     "Foot Operated Faucet",
  //     "Single Lever Faucets",
  //     "Quarter Turn Faucets",
  //     "Half Turn Faucets",
  //     "Sensor & Touch Faucets",
  //     "Showers"
  // ];

  // const subTiles = [
  //    "Floor Tiles",
  //    "Wall Tiles"
  // ];

  // const subWellness = [
  //  "Wellness"
  // ];

  // const subKitchen = [
  //   "Kitchen Sinks"
  // ];

  // const subMirror = [
  //   "Shaving Mirror",
  //   "Normal Mirror"
  // ];

  const productId = match.params.id;

  useEffect(async () => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      console.log("asdfsalk",product.category);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      console.log("category",category)
      setBrand(product.brand);
      setSubCategory(product.subcategory);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    await dispatch(getAllBrand());
    await dispatch(getAllCategory());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    getAllBrand,
    getAllCategory,
    alert,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
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
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

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
                value={price}
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
              {brand? <option value={brand}>{brand}</option>:<option value="">Choose Brand</option>}
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
              {category? <option value={category}>{category}</option>: <option value="">Choose Category</option>}
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
              {subcategory? <option value={subcategory}>{subcategory}</option>:<option value="">Choose Sub Category</option>}
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
                value={Stock}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
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
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
