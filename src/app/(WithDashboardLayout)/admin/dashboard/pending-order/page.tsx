import ManagePendingOrderAdmin from "@/components/Modules/Order/ManagePendingOrderAmin";
import React from "react";
export interface ManagePendingOrderAdminProps {
  Pending: string;
}
const ManageOrderAdminPage = () => {
  return (
    <div>
      <ManagePendingOrderAdmin Pending="Pending" />
    </div>
  );
};

export default ManageOrderAdminPage;
