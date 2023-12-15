
import React from 'react';

const PurchaseHistoryComponent = ({ purchases }) => {
  return (
    <div>
      <h2>Purchase History</h2>
      <ul>
        {purchases.map((purchase, index) => (
          <li key={index}>
            {purchase.eventName} - {purchase.transactionDetails} - {purchase.billingInfo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseHistoryComponent;
