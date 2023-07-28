import React from 'react';
import "./DownloadApp.css";
const DownloadApp = () => {
    return (
        <div className='download-div'>
             <div className='heading-download'>
            Download Our App
        </div>
     
        <div className='download-main-div container'>
       
            <div className='appstore'>
              <img src="https://res.cloudinary.com/logger-india/image/upload/v1642168853/frontend-side/Appstore_snxumr.png" />
            </div>
            <div className='playstore'>
              <img src="https://res.cloudinary.com/logger-india/image/upload/v1642168872/frontend-side/playstore_ftka2w.png" />
            </div>
        </div>
        </div>
    )
}

export default DownloadApp
