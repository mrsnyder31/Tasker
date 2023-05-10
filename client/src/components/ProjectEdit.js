import { Button, Form, FormGroup, Input } from "reactstrap";
import { GetProjectById, addProject, editProject } from "../modules/projectManager";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllCategories } from "../modules/categoryManager";


export default function ProjectEdit() {
    const [project, setProject] = useState({}),
        [categories, setCategories] = useState([]),
        { id } = useParams(),
        navigate = useNavigate();


    useEffect(() => {
        GetProjectById(id).then((p) => { setProject(p) })
        GetAllCategories().then(cat => setCategories(cat))

    }, [])

    return <>
        <div className="project_form">
            <Form>
                <h3>Edit Project</h3>
                <FormGroup className="m-4" >
                    <strong htmlFor="title">Title</strong>
                    <Input type="text" name="title" id="title" placeholder={`${project.title}`}

                        onChange={(evt) => {
                            let copy = { ...project }
                            copy.Title = evt.target.value
                            setProject(copy);
                        }} />
                </FormGroup>

                <FormGroup className="m-4">
                    <strong htmlFor="deadline">Deadline</strong>
                    <Input type="date" name="deadline" id="deadline" placeholder="Optional"

                        onChange={(evt) => {
                            let copy = { ...project }
                            copy.Deadline = evt.target.value
                            setProject(copy);
                        }} />
                </FormGroup>

                <FormGroup className="m-4">
                    <select onChange={(evt) => {
                        let copy = { ...project }
                        copy.CategoryId = parseInt(evt.target.value)
                        setProject(copy);

                    }} >
                        <option disabled selected>Category</option>
                        {
                            categories.map(c => {
                                return <option value={c.id} key={`cat--${c.id}`}>{c.name}</option>
                            })
                        }
                    </select>
                </FormGroup >
                <Button className="m-4"
                    onClick={() => {
                        navigate(`/project/${project.id}`)
                    }}
                >
                    Cancel
                </Button>

                <Button className="m-4" onClick={() => {
                    editProject(project).then((r) => {
                        navigate(`/project/${project.id}`)
                    })

                }}>Submit</Button>
            </Form>
        </div>
    </>
}