import ManageProcessingOrderAdmin from "@/components/Modules/Order/ManageProcessingOrder";
import React from "react";
export interface ManageProcessingOrderAdminProps {
  Processing: string;
}
const ProcessingOrderPage = () => {
  return (
    <div>
      <ManageProcessingOrderAdmin Processing="Processing" />
    </div>
  );
};

export default ProcessingOrderPage;
