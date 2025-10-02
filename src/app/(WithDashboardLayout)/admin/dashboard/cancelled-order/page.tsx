import ManageCancelledOrderAdmin from "@/components/Modules/Order/ManageCancelledOrder";
import React from "react";
export interface ManageCancelledOrderAdminProps {
  Cancelled: string;
}
const CancelledOrderPage = () => {
  return (
    <div>
      <ManageCancelledOrderAdmin Cancelled="Cancelled" />
    </div>
  );
};

export default CancelledOrderPage;
