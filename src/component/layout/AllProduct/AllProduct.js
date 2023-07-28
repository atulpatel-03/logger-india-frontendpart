import React from 'react';
import { Link } from 'react-router-dom';
import "./Allproduct.css";


const AllProduct = () => {
    return (
        <div className='allproduct-div'>
        <h2 className='allproduct-heading'>PRODUCTS</h2>
        <p className='description-allproduct'>Logger India offers a wide spectrum of experiences through an extensive range of products. To complement the Sanitaryware products there is a range of faucets, tiles, shower products, kitchen sinks and personal care products.</p>
          
        <div className='product-filter container'>
        <div>
            <Link to='/sanitaryware-products' className='sanitary'>
                <div className='sanitary-img' >
                <div>
                    <h5>Sanitaryware</h5>
                    <h6>View Products »</h6>
                    </div>
                </div>
                <p>Logger India brings to you, top quality Sanitaryware closet and basin design’s with constant adaptation to new market trends. Logger India’s products are the result of a manufacturing... <Link to="/sanitaryware-products"  className="know-more">Know more</Link></p>
            </Link>
            </div>
            <div>
            <Link to='/faucets-products' className='faucets'>
                <div className='faucets-img' >
                <div>
                    <h5>Faucets</h5>
                    <h6>View Products »</h6>
                    </div>
                </div>
                <p>Logger India offers wide variety in design and functionality to choose from in Faucets. Our portfolio is the most complete, ranging from beautiful single lever, quarter tur... <Link to="/faucets-products"  className="know-more">Know more</Link></p>
            </Link>
            </div>
            <div>
            <Link to="/tiles-products" className='tiles'>
                <div className='tiles-img'>
                <div>
                    <h5>Tiles</h5>
                    <h6>View Products »</h6>
                    </div>
                </div>
                <p>Logger India is proud to be amongst the premier innovative brands in the tiles category to introduce the very latest technologies in the industry. Only the best grade of raw... <Link to="/tiles-products"  className="know-more">Know more</Link></p>
            </Link>
            </div>
            <div>
            <Link to="/wellness-products" className='wellness'>
                <div className='wellness-img' >
                <div>
                    <h5>Wellness</h5>
                    <h6>View Products »</h6>
                    </div>
                </div>
                <p>Logger India understands your world. We know that at the end of a rough day, what you need most is to come home to some comfort and care. Take your pick. The Logger India Wellness ran... <Link to="/wellness-products"  className="know-more">Know more</Link></p>
            </Link>
            </div>
            <div>
            <Link to="kitchen-products" className='kitchen'>
                <div className='kitchen-img'>
                <div>
                    <h5>Kitchen Sinks</h5>
                    <h6>View Products »</h6>
                    </div>
                </div>
                <p>Whether it’s the shape-single, double bowls and more-or the finish-take your pick from Handmade, Satin and Pearl. Go ahead and choose from a wide range of Logger India Kitchen... <Link to="/kitchen-products"  className="know-more">Know more</Link></p>
            </Link>
            </div>
            <div>
            <Link to="/mirror-products" className='mirror'>
                <div className='mirror-img' >
                <div>
                    <h5>Mirrors</h5>
                    <h6>View Products »</h6>
                    </div>
                </div>
                <p>How do we make you look your very best? Enter Logger India mirrors. A collection of mirrors that is inspired by art and luxury to inspire the very best in you. Fall in love with you... <Link to='/mirror-products'  className="know-more">Know more</Link></p>
            </Link>
            </div>
        </div>
            
        </div>
    )
}

export default AllProduct
