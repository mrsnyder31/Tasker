import { Button, Form, FormGroup, Input } from "reactstrap";
import { addProject } from "../modules/projectManager";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectForm() {
    const [project, setProject] = useState({
        Title: "",
        Deadline: "",
        CategoryId: 0
    })

    const navigate = useNavigate();
    return <>
        <div className="project_form">
            <Form>
                <h3>New Project</h3>
                <FormGroup >
                    <strong htmlFor="title">Title</strong>
                    <Input type="text" name="title" id="title" placeholder=""

                        onChange={(evt) => {
                            let copy = { ...project }
                            copy.Title = evt.target.value
                            setProject(copy);
                        }} />
                </FormGroup>

                <FormGroup >
                    <strong htmlFor="deadline">Deadline</strong>
                    <Input type="date" name="deadline" id="deadline" placeholder="Optional"

                        onChange={(evt) => {
                            let copy = { ...project }
                            copy.Deadline = evt.target.value
                            setProject(copy);
                        }} />
                </FormGroup>

                <FormGroup >
                    <strong htmlFor="category">Category</strong>
                    <Input type="text" name="category" id="category" placeholder="Replace with SELECT dropdown"

                        onChange={(evt) => {
                            let copy = { ...project }
                            copy.CategoryId = parseInt(evt.target.value)
                            setProject(copy);
                        }} />
                </FormGroup>

                <Button onClick={() => {
                    addProject(project).then((r) => {
                        navigate(`/project/${r.id}`)
                    })

                }}>Submit</Button>
            </Form>
        </div>
    </>
}

