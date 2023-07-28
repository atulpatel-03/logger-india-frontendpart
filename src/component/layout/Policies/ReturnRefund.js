import React from 'react';
import "./ReturnRefund.css";
const ReturnRefund = () => {
  return (
  <div className="return-refund-policy" >
<h2 className='policy-heading'>Refund and Returns Policy</h2>
<div className='container refund-policy-detail'>
<div>
  <h3>Overview</h3>
  <div className='refund-div'>
    <p>Our refund and returns policy lasts 07 days. If 07 days have passed since your purchase, we can’t offer you a full refund or exchange.</p>
    <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
  </div>
</div>
<div>
  <h3>Refunds</h3>
  <div className='refund-div'>
    <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
  <p>If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</p>
  <div className='small-heading-refund'>Late or missing refunds</div>
  <p>If you haven’t received a refund yet, first check your bank account again.</p>
  <p>Then contact your credit card company, it may take some time before your refund is officially posted.</p>
  <p>Next contact your bank. There is often some processing time before a refund is posted.</p>
  <p>If you’ve done all of this and you still have not received your refund yet, please contact us at <a href="mailto:info@logger-india.com" className='refund-mail'>info@logger-india.com</a> </p>
  <div className='small-heading-refund'>Sale items</div>
  <p>Only regular priced items may be refunded. Sale items cannot be refunded.</p>
  </div>
</div>
<div>
  <h3>Exchanges</h3>
  <div className='refund-div'>
    <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at <a href="mailto:info@logger-india.com" className='refund-mail'>info@logger-india.com</a> and send your item to:  <span>55-A, Mohan Nagar II, Iskcon Rd, Mansarovar, Jaipur, Rajasthan 302020,India</span></p>
  </div>
</div>
<div>
  <h3>Shipping returns</h3>
  <div className='refund-div'>
  <p>To return your product, you should mail your product to:<span>55-A, Mohan Nagar II, Iskcon Rd, Mansarovar, Jaipur, Rajasthan 302020,India</span></p>
  <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
  <p>Depending on where you live, the time it may take for your exchanged product to reach you may vary.</p>
  <p>If you are returning more expensive items, you may consider using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.</p>
  </div>
</div>
<div className='need-help-div'>
  <h3 className='need-help'>Need help?</h3>
</div>
<div className='need-help-div'>
  <h3 className='need-help'>Delivery Time</h3>
  <div className='refund-div'>
    <p>We Deliver our Products to you within 15days.</p>
    <p>Contact us at <a href="mailto:info@logger-india.com" className='refund-mail'>info@logger-india.com</a> for questions related to refunds and returns.</p>
  </div>
</div>
</div>
  </div>
  )};

export default ReturnRefund;
