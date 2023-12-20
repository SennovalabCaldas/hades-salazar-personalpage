import React from "react";
import { Route, Routes } from "react-router-dom";

import { Users } from "../components/DashboardComponents/Users/Users";
import { Services } from "../components/DashboardComponents/Services/Services";
import { LayoutTemplate } from "../layouts/LayoutTemplate";
import { AcademicExperience } from "../components/DashboardComponents/AcademicExperience/AcademicExperience";
import { ProffessionalExperience } from "../components/DashboardComponents/ProffessionalExperience/ProffessionalExperience";
import { Slides } from "../components/DashboardComponents/Slides/Slides";
import { Dashboard } from "../components/DashboardComponents/Dashboard/Dashboard";
import { Categories } from "../components/DashboardComponents/Categories/Categories";
import { Forum } from "../components/DashboardComponents/Forum/Forum";
import { Calendar } from "../components/DashboardComponents/Calendar/Calendar";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <LayoutTemplate>
            <Dashboard />
          </LayoutTemplate>
        }
      />
      <Route
        path="/admin/slides"
        element={
          <LayoutTemplate>
            <Slides />
          </LayoutTemplate>
        }
      />
      <Route
        path="/admin/users"
        element={
          <LayoutTemplate>
            <Users />
          </LayoutTemplate>
        }
      />
      <Route
        path="/admin/academic-experience"
        element={
          <LayoutTemplate>
            <AcademicExperience />
          </LayoutTemplate>
        }
      />
      <Route
        path="/admin/proffessional-experience"
        element={
          <LayoutTemplate>
            <ProffessionalExperience />
          </LayoutTemplate>
        }
      />
      <Route
        path="/admin/category-services"
        element={
          <LayoutTemplate>
            <Categories />
          </LayoutTemplate>
        }
      />
      <Route
        path="/admin/services"
        element={
          <LayoutTemplate>
            <Services />
          </LayoutTemplate>
        }
      />
      <Route
        path="/admin/forum"
        element={
          <LayoutTemplate>
            <Forum />
          </LayoutTemplate>
        }
      />
      <Route
        path="/admin/calendar"
        element={
          <LayoutTemplate>
            <Calendar />
          </LayoutTemplate>
        }
      />
      <Route path="/*" element={<LayoutTemplate><Dashboard /></LayoutTemplate>} />
    </Routes>
  );
};

export default AdminRoutes;
