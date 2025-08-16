import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  AccessForbidden,
  Complaint,
  Dashboard,
  Error,
  Home,
  Login,
} from "@pages/";
import { IndexLayout, UserLayout } from "./Layouts";
import { UserContextProvider } from "./contexts/UserContextProvider.jsx";
import ComplaintForm from "@pages/Form/index.jsx";
import Footer from "@components/Footer/index.jsx";
import ComplaintButton from "@components/ui/ComplaintButton.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import React from "react";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <>
          <IndexLayout />
          {<ComplaintButton />}
        </>
      }
    >
      <Route
        index
        element={
          <>
            <Home />
            <Footer />
          </>
        }
      />
      <Route path="login/" element={<Login />} />
      <Route path="access-forbidden/" element={<AccessForbidden />} />
      <Route path="*/" element={<Error />} />
      <Route path="user/" element={<UserLayout />}>
        <Route path="dashboard/" element={<Dashboard />} />
        <Route path="complaint/:complaintId" element={<Complaint />} />
        <Route path="complaint-register/" element={<ComplaintForm />} />
        <Route path="*/" element={<AccessForbidden />} />
      </Route>
    </Route>,
  ),
);

const App = () => {
  // Get the environment variable to display it for debugging
  const backendUrlFromEnv = import.meta.env.VITE_BACKEND_URL;

  return (
    <>
      {/* THIS IS THE DEBUGGING BOX */}
      <div
        style={{
          backgroundColor: "yellow",
          color: "black",
          padding: "10px",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          border: "2px solid red",
        }}
      >
        <p>
          <strong>DEBUGGING BOX:</strong>
        </p>
        <p>
          The Backend URL is:{" "}
          <strong>{backendUrlFromEnv || "!!! NOT FOUND !!!"}</strong>
        </p>
      </div>

      <QueryClientProvider client={new QueryClient()}>
        <UserContextProvider>
          <Toaster
            richColors
            duration={2000}
            position="top-right"
            style={{
              top: "5rem",
            }}
          />
          <RouterProvider router={routes} />
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
