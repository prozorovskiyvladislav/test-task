import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { HomeScreen } from "./home-screen/home-screen.component";
import { MainScreen } from "./main-screen/main-screen.component";
import { ResultScreen } from "./result-screen/result-screen.component";
import { ErrorPageComponent } from "./error-page/error-page.component";

export const AppRouter: React.FC = () => {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route index path="/" element={<HomeScreen />} />
      <Route path="/question/:page" element={<MainScreen />} />
      <Route path="/result" element={<ResultScreen />} />
      <Route path="*" element={<ErrorPageComponent />} />
    </Routes>
  );
};

export default AppRouter;
