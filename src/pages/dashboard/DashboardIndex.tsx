import { useAuthStore } from "../../zustand/auth";
import PartnerHome from "./components/PartnerHome";

const DashboardIndex = () => {
  const role = useAuthStore((state) => state.user?.role);

  return (
    <div className="px-4 py-6">
      {role && role === "PARTNER" && <PartnerHome />}
    </div>
  );
};

export default DashboardIndex;
