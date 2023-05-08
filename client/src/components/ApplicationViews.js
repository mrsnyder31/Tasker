import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import ProjectView from "./ProjectView";
import ProjectForm from "./ProjectForm";
import ProjectDetails from "./ProjectDetails";
import ProjectEdit from "./ProjectEdit";



export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
                    />
                    <Route path="project" element={<ProjectView />}></Route>
                    <Route path="project/new" element={<ProjectForm />}></Route>
                    <Route path="project/edit/:id" element={<ProjectEdit />}></Route>
                    <Route path="project/:id" element={<ProjectDetails />}></Route>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route>
            </Routes>
        </main>
    );
}
