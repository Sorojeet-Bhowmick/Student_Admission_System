import { useState } from "react";
import "./PaymentModal.css";

const PaymentModal = ({ isOpen, onClose }) => {
  const [paymentType, setPaymentType] = useState("semester");
  const [amount, setAmount] = useState("");
  const [studentId, setStudentId] = useState("");

  if (!isOpen) return null;

  const handlePayment = (e) => {
    e.preventDefault();
    if (!amount || !studentId) {
      alert("Please fill in all required fields.");
      return;
    }
    // Simulate payment processing
    alert(`Processing payment of ₹${amount} for Student ID: ${studentId}...`);
    setTimeout(() => {
      alert("Payment Successful! This is a mock transaction.");
      onClose();
    }, 1500);
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal-content">
        <button className="payment-modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="payment-modal-header">
          <h2>Online Payment</h2>
          <p>Secure payment gateway for GMIT</p>
        </div>
        
        <form onSubmit={handlePayment} className="payment-modal-form">
          <div className="form-group">
            <label>Payment Type</label>
            <select 
              value={paymentType} 
              onChange={(e) => setPaymentType(e.target.value)}
              className="payment-input"
            >
              <option value="semester">Semester Fee</option>
              <option value="application">Application Fee</option>
              <option value="hostel">Hostel Fee</option>
              <option value="other">Other Fees</option>
            </select>
          </div>

          <div className="form-group">
            <label>Student ID</label>
            <input 
              type="text" 
              placeholder="e.g. GMIT2024-001" 
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="payment-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Amount (₹)</label>
            <input 
              type="number" 
              placeholder="Enter amount" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="payment-input"
              required
              min="1"
            />
          </div>

          <div className="payment-methods">
            <span>Accepted Methods:</span>
            <div className="payment-icons">
              💳 UPI / Credit Card / Debit Card / Net Banking
            </div>
          </div>

          <button type="submit" className="payment-submit-btn">
            Proceed to Pay ₹{amount || "0"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
