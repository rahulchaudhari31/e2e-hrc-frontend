import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/common/Loader";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/AboutUsPage"));
const Employer = lazy(() => import("../pages/Employer"));
const WorkforceSolution = lazy(() => import("../pages/WorkforceSolution"));
const Employee = lazy(() => import("../pages/employee"));
const Becomepartner = lazy(()=>import("../pages/BecomePartner"))
const Blogs = lazy (()=>import("../pages/Blogs"))
const Contact = lazy(()=>import("../pages/ContactUs"))

const Approuter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/workforce-solutions" element={<WorkforceSolution />} />
        <Route path="/employer" element={<Employer />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/Become-partner" element={<Becomepartner />} />
         <Route path="/blogs" element={<Blogs />} />
         <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>

  )
}

export default Approuter