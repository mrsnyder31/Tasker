import { Button, Form, FormGroup, Input } from "reactstrap";
import { GetProjectById, addProject, editProject } from "../modules/projectManager";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function ProjectEdit() {
    const [project, setProject] = useState({})
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        GetProjectById(id).then((p) => { setProject(p) })

    }, [])

    return <>
        <div className="project_form">
            <Form>
                <h3>Edit Project</h3>
                <FormGroup >
                    <strong htmlFor="title">Title</strong>
                    <Input type="text" name="title" id="title" placeholder={`${project.title}`}

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
                <Button
                    onClick={() => {
                        navigate(`/project/${project.id}`)
                    }}
                >
                    Cancel
                </Button>

                <Button onClick={() => {
                    editProject(project).then((r) => {
                        navigate(`/project/${project.id}`)
                    })

                }}>Submit</Button>
            </Form>
        </div>
    </>
}