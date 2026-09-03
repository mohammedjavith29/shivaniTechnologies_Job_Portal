import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

// ==================== COMPONENTS ====================
import AdminLayout from "./components/AdminLayout";

// ==================== HOME & AUTH ====================
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import CandidateProfile from "./pages/Candidate/CandidateProfile";
import Register from "./pages/Auth/Register";

// ==================== ADMIN DASHBOARD ====================
import AdminDashboard from "./pages/Admin/AdminDashboard";

// ==================== CATEGORY ====================
import CategoryList from "./pages/Admin/Category/CategoryList";
import AddCategory from "./pages/Admin/Category/AddCategory";
import EditCategory from "./pages/Admin/Category/EditCategory";

// ==================== COMPANY ====================
import CompanyList from "./pages/Admin/Company/CompanyList";
import AddCompany from "./pages/Admin/Company/AddCompany";
import EditCompany from "./pages/Admin/Company/EditCompany";

// ==================== DESIGNATION ====================
import DesignationList from "./pages/Admin/Designation/DesignationList";
import AddDesignation from "./pages/Admin/Designation/AddDesignation";
import EditDesignation from "./pages/Admin/Designation/EditDesignation";

// ==================== JOB ====================
import JobList from "./pages/Admin/Job/JobList";
import AddJob from "./pages/Admin/Job/AddJob";
import EditJob from "./pages/Admin/Job/EditJob";

// ==================== LOCATION ====================
import LocationList from "./pages/Admin/Location/LocationList";
import AddLocation from "./pages/Admin/Location/AddLocation";
import EditLocation from "./pages/Admin/Location/EditLocation";

// ==================== SKILL ====================
import SkillList from "./pages/Admin/Skill/SkillList";
import AddSkill from "./pages/Admin/Skill/AddSkill";
import EditSkill from "./pages/Admin/Skill/EditSkill";

// ==================== USER ====================
import Users from "./pages/Admin/Users";
import UserList from "./pages/Admin/User/UserList";
import AddUser from "./pages/Admin/User/AddUser";
import EditUser from "./pages/Admin/User/EditUser";

// ==================== CANDIDATE ====================
import CandidateLogin from "./pages/Candidate/CandidateLogin";
import CandidateDashboard from "./pages/Candidate/CandidateDashboard";
import CandidateResume from "./pages/Candidate/CandidateResume";
import JobSearch from "./pages/Candidate/JobSearch";

// ==================== CANDIDATE ADMIN MANAGEMENT ====================
import CandidateList from "./pages/Candidate/CandidateList";
import AddCandidate from "./pages/Candidate/AddCandidate";
import EditCandidate from "./pages/Candidate/EditCandidate";

// ==================== APPLICATION ====================
import ApplicationList from "./pages/Applications/ApplicationList";
import AddApplication from "./pages/Applications/AddApplication";
import EditApplication from "./pages/Applications/EditApplication";
import ViewApplication from "./pages/Applications/ViewApplication";

// ==================== EMPLOYEE ====================
import EmployeeList from "./pages/Employee/EmployeeList";
import AddEmployee from "./pages/Employee/AddEmployee";
import EditEmployee from "./pages/Employee/EditEmployee";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";

// ==================== EMPLOYER ====================
import EmployerList from "./pages/Employer/EmployerList";
import AddEmployer from "./pages/Employer/AddEmployer";
import EditEmployer from "./pages/Employer/EditEmployer";
import EmployerDashboard from "./pages/Employer/EmployerDashboard";
import EmployerApplicationList from "./pages/Employer/EmployerApplicationList";
import ApplicationReview from "./pages/Employer/ApplicationReview";
import CompanyRegistration from "./pages/Employer/CompanyRegistration";
import CompanyVerification from "./pages/Employer/CompanyVerification";

// ==================== INTERVIEW ====================
import InterviewList from "./pages/Interview/InterviewList";
import AddInterview from "./pages/Interview/AddInterview";
import EditInterview from "./pages/Interview/EditInterview";
import ViewInterview from "./pages/Admin/Interview/ViewInterview";

// ==================== MAIL & SMS ====================
import Mail from "./pages/Mail";
import Sms from "./pages/Sms";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* ================= HOME ================= */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* ================= AUTH ================= */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* ================= ADMIN DASHBOARD ================= */}

                <Route
                    path="/admin"
                    element={
                        <AdminLayout>
                            <AdminDashboard />
                        </AdminLayout>
                    }
                />


                {/* ================= CATEGORY ================= */}

                <Route
                    path="/categories"
                    element={
                        <AdminLayout>
                            <CategoryList />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/categories/add"
                    element={
                        <AdminLayout>
                            <AddCategory />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/categories/edit/:id"
                    element={
                        <AdminLayout>
                            <EditCategory />
                        </AdminLayout>
                    }
                />


                {/* ================= COMPANY ================= */}

                <Route
                    path="/companies"
                    element={
                        <AdminLayout>
                            <CompanyList />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/companies/add"
                    element={
                        <AdminLayout>
                            <AddCompany />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/companies/edit/:id"
                    element={
                        <AdminLayout>
                            <EditCompany />
                        </AdminLayout>
                    }
                />


                {/* ================= DESIGNATION ================= */}

                <Route
                    path="/designations"
                    element={
                        <AdminLayout>
                            <DesignationList />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/designations/add"
                    element={
                        <AdminLayout>
                            <AddDesignation />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/designations/edit/:id"
                    element={
                        <AdminLayout>
                            <EditDesignation />
                        </AdminLayout>
                    }
                />


                {/* ================= JOB ================= */}

                <Route
                    path="/jobs"
                    element={
                        <AdminLayout>
                            <JobList />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/jobs/add"
                    element={
                        <AdminLayout>
                            <AddJob />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/jobs/edit/:id"
                    element={
                        <AdminLayout>
                            <EditJob />
                        </AdminLayout>
                    }
                />


                {/* ================= LOCATION ================= */}

                <Route
                    path="/locations"
                    element={
                        <AdminLayout>
                            <LocationList />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/locations/add"
                    element={
                        <AdminLayout>
                            <AddLocation />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/locations/edit/:id"
                    element={
                        <AdminLayout>
                            <EditLocation />
                        </AdminLayout>
                    }
                />


                {/* ================= SKILL ================= */}

                <Route
                    path="/skills"
                    element={
                        <AdminLayout>
                            <SkillList />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/skills/add"
                    element={
                        <AdminLayout>
                            <AddSkill />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/skills/edit/:id"
                    element={
                        <AdminLayout>
                            <EditSkill />
                        </AdminLayout>
                    }
                />


                {/* ================= USERS ================= */}

                <Route
                    path="/users"
                    element={
                        <AdminLayout>
                            <Users />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/users/list"
                    element={
                        <AdminLayout>
                            <UserList />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/users/add"
                    element={
                        <AdminLayout>
                            <AddUser />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/users/edit/:id"
                    element={
                        <AdminLayout>
                            <EditUser />
                        </AdminLayout>
                    }
                />


                {/* ==================================================
                    CANDIDATE
                ================================================== */}

                <Route
                    path="/candidate/login"
                    element={<CandidateLogin />}
                />

                <Route
                    path="/candidate"
                    element={<CandidateDashboard />}
                />

                <Route
                    path="/candidate-dashboard"
                    element={<CandidateDashboard />}
                />

                <Route
    path="/candidate/profile"
    element={<CandidateProfile />}
/>

                <Route
                    path="/candidate/jobs"
                    element={<JobSearch />}
                />

                <Route
                    path="/candidate/resume"
                    element={<CandidateResume />}
                />


                {/* ================= CANDIDATE APPLICATIONS ================= */}

                <Route
                    path="/candidate/applications"
                    element={
                        <ApplicationList />
                    }
                />


                {/* ================= CANDIDATE INTERVIEWS ================= */}

                <Route
                    path="/candidate/interviews"
                    element={
                        <InterviewList />
                    }
                />


                {/* ==================================================
                    ADMIN CANDIDATE MANAGEMENT
                ================================================== */}

                <Route
                    path="/candidates"
                    element={
                        <AdminLayout>
                            <CandidateList />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/candidates/add"
                    element={
                        <AdminLayout>
                            <AddCandidate />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/candidates/edit/:id"
                    element={
                        <AdminLayout>
                            <EditCandidate />
                        </AdminLayout>
                    }
                />


                {/* ================= ADMIN APPLICATIONS ================= */}

                <Route
                    path="/applications"
                    element={
                        <AdminLayout>
                            <ApplicationList />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/applications/add"
                    element={
                        <AdminLayout>
                            <AddApplication />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/applications/edit/:id"
                    element={
                        <AdminLayout>
                            <EditApplication />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/applications/view/:id"
                    element={
                        <AdminLayout>
                            <ViewApplication />
                        </AdminLayout>
                    }
                />


                {/* ================= EMPLOYEE ================= */}

                <Route
                    path="/employees"
                    element={
                        <AdminLayout>
                            <EmployeeList />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/employees/add"
                    element={
                        <AdminLayout>
                            <AddEmployee />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/employees/edit/:id"
                    element={
                        <AdminLayout>
                            <EditEmployee />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/employee-dashboard"
                    element={<EmployeeDashboard />}
                />


                {/* ================= EMPLOYER ================= */}

                <Route
                    path="/employers"
                    element={
                        <AdminLayout>
                            <EmployerList />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/employers/add"
                    element={
                        <AdminLayout>
                            <AddEmployer />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/employers/edit/:id"
                    element={
                        <AdminLayout>
                            <EditEmployer />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/employer-dashboard"
                    element={<EmployerDashboard />}
                />

                <Route
                    path="/employer/applications"
                    element={
                        <AdminLayout>
                            <EmployerApplicationList />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/employer/application-review/:id"
                    element={
                        <AdminLayout>
                            <ApplicationReview />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/company-registration"
                    element={
                        <AdminLayout>
                            <CompanyRegistration />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/company-verification"
                    element={
                        <AdminLayout>
                            <CompanyVerification />
                        </AdminLayout>
                    }
                />


                {/* ================= INTERVIEWS ================= */}

                <Route
                    path="/interviews"
                    element={
                        <AdminLayout>
                            <InterviewList />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/interviews/add"
                    element={
                        <AdminLayout>
                            <AddInterview />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/interviews/edit/:id"
                    element={
                        <AdminLayout>
                            <EditInterview />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/interviews/view/:id"
                    element={
                        <AdminLayout>
                            <ViewInterview />
                        </AdminLayout>
                    }
                />


                {/* ================= MAIL ================= */}

                <Route
                    path="/mail"
                    element={
                        <AdminLayout>
                            <Mail />
                        </AdminLayout>
                    }
                />


                {/* ================= SMS ================= */}

                <Route
                    path="/sms"
                    element={
                        <AdminLayout>
                            <Sms />
                        </AdminLayout>
                    }
                />


                {/* ================= 404 ================= */}

                <Route
                    path="*"
                    element={
                        <div
                            style={{
                                textAlign: "center",
                                padding: "80px 20px"
                            }}
                        >
                            <h1>404</h1>
                            <h2>Page Not Found</h2>

                            <p>
                                The page you are looking for does not exist.
                            </p>
                        </div>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;