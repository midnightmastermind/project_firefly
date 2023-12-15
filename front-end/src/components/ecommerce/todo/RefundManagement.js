import React from 'react';

const RefundManagementComponent = ({ purchases, onRefund }) => {
  const handleRefund = (purchaseId) => {
    // Implement the refund logic here
    onRefund(purchaseId);
  };

  return (
    <div>
      <h2>Refund Management</h2>
      <ul>
        {purchases.map((purchase, index) => (
          <li key={index}>
            {purchase.eventName} - {purchase.transactionDetails} - {purchase.billingInfo}
            <button onClick={() => handleRefund(purchase._id)}>Refund</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RefundManagementComponent;