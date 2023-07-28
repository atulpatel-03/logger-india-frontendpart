import React, {Fragment, useEffect , useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import "./generateCoupon.css";
import SideBar from './Sidebar';
import MetaData from "../layout/MetaData";
import { generateCoupon, getAllCoupon, deleteCoupon } from '../../actions/couponAction';
import Loader from '../layout/Loader/Loader';


const GenerateCoupon = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { loading, error, allCoupon } = useSelector((state) => state.myCoupons);
    const [addCouponShow, setAddCouponShow] = useState(false);
    const [couponDetail, setCouponDetail] = useState({
        couponCode:'',
        percent:'',
        uptoAmount:'',
    });

    const { couponCode, percent, uptoAmount } = couponDetail;

    useEffect(async () =>{
        if(error){
            alert.error(error);
        }
        await dispatch(getAllCoupon());

    },[getAllCoupon,error])

  const onChange = (e) =>{
      setCouponDetail({
                ...couponDetail,
                [e.target.name]: e.target.value
            })
  }

    const showAddModel = () =>{
        setAddCouponShow(true);
        setCouponDetail({
            couponCode:'',
            percent:'',
            uptoAmount:''
        })
    }

    const onSubmit = async e =>{
        e.preventDefault();
        await dispatch(generateCoupon(couponDetail));
        await dispatch(getAllCoupon());
        setAddCouponShow(false);
        setCouponDetail({
            couponCode:'',
            percent:'',
            uptoAmount:''
        });


    }

    const handleShow = () =>{
        setAddCouponShow(false);
        setCouponDetail({
            couponCode:'',
            percent:'',
            uptoAmount:''
        })
    }

    const handleDelete = async (id) =>{
        console.log("id",id)
        await dispatch(deleteCoupon(id));
        await dispatch(getAllCoupon());
    }

  return <Fragment>
            <MetaData title={`Generate Coupon - Admin`} />

                <div className="dashboard">
                <SideBar />
                <div className='generateCouponContainer'>
                <div className='all-coupon-div'>
            <button type="button" className="btn btn-primary new-coupon" data-toggle="modal" data-target="#exampleModal" onClick={showAddModel}>
                Generate new Coupon
            </button>

            {addCouponShow &&  <div className="modal-primary-container">
                <div className="modal-primary search-modal">
                    <form className="gameform" onSubmit={onSubmit}>
                <div className="gamedetail">
                <div className="form-group">
                    <label>Coupon Code</label>
                    <input
                        type="text"
                        className="form-control coupon-input-generate"
                        placeholder="Coupon code"
                        name="couponCode"
                        value={couponCode}
                        onChange={onChange}
                        maxlength = "10"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Discount Percent</label>
                    <input 
                        type="number"
                        class="form-control" 
                        name="percent" 
                        placeholder='Enter discount percent'
                        onChange={onChange} 
                        value={percent} 
                        min="1"
                        max="100"
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Maximum Discount Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Maximum Discount Amount"
                        name="uptoAmount"
                        value={uptoAmount}
                        onChange={onChange}
                        required
                    />
                </div>
            </div>
            <button type="button" class="btn btn-secondary model2-btn2" onClick={handleShow}>Cancel</button>
            <button type="submit" class="btn btn-primary model2-btn1">Generate Coupon</button>
           
   
        </form>
        </div>
        </div>}
        </div>
           {
               loading ?
               <Loader /> :
               <div className='my-all-coupons'>
                    {allCoupon.map((t) =>(
                        <div className='single-coupon'>
                            <div className='coupon-code'>{t.code}</div>
                            <div className='coupon-percent'>Discount Percent: {t.percent} %</div>
                            <div className='coupon-uptoAmount'>Max Amount: ₹{t.uptoAmount} <i class="fas fa-trash delete-btn" onClick={() =>handleDelete(t._id)}></i></div>
                        </div>
                    ))}
                </div> 
           }

                </div>
                </div>
            </Fragment>
    ;
};

export default GenerateCoupon;
