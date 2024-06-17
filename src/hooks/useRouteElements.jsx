import { useRoutes } from "react-router-dom";
import OverviewPage from "../modules/overview/pages/OverviewPage";

import MainLayout from "../layouts/MainLayout";
import ChatPage from "../modules/chat/pages/ChatPage";
import PricePage from "../modules/price/pages/PricePage";
import LocationPage from "../modules/locations/pages/LocationPage";
import DonationPage from "../modules/donations/pages/DonationPage";
import MaterialsPage from "../modules/materials/pages/MaterialsPage";
import AchivementLevelPage from "../modules/achivements/AchivementLevelPage";
import EmployeePage from "../modules/employees/EmployeePage";
import DetectResponsePage from "../modules/detect_response/DetectResponsePage";

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          <OverviewPage />
        </MainLayout>
      ),
    },
    {
      path: "/flights",
      element: (
        <MainLayout>
          <DonationPage />
        </MainLayout>
      ),
    },
    {
      path: "/locations",
      element: (
        <MainLayout>
          <LocationPage />
        </MainLayout>
      ),
    },

    {
      path: "/materials",
      element: (
        <MainLayout>
          <MaterialsPage />
        </MainLayout>
      ),
    },

    {
      path: "/achivement_levels",
      element: (
        <MainLayout>
          <AchivementLevelPage />
        </MainLayout>
      ),
    },

    {
      path: "/employees",
      element: (
        <MainLayout>
          <EmployeePage />
        </MainLayout>
      ),
    },
    {
      path: "/detect-response",
      element: (
        <MainLayout>
          <DetectResponsePage />
        </MainLayout>
      ),
    },

    {
      path: "*",
      element: <h1>Not Found</h1>,
    },
  ]);

  return routeElements;
}
