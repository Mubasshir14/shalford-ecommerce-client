import ManageCompletedOrderAdmin from '@/components/Modules/Order/ManageCompletedOrder';
import React from 'react';

export interface ManageCompletedOrderAdminProps {
  Completed: string;
}
const CompletedOrderPage = () => {
    return (
        <div>
            <ManageCompletedOrderAdmin Completed="Completed"/>
        </div>
    );
};

export default CompletedOrderPage;