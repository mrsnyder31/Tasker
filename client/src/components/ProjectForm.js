import { Button, Form, FormGroup, Input } from "reactstrap";
import { addProject } from "../modules/projectManager";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllCategories } from "../modules/categoryManager";

export default function ProjectForm() {
    const [project, setProject] = useState({
        Title: "",
        Deadline: "",
        CategoryId: 0
    }),
        [categories, setCategories] = useState([]),
        navigate = useNavigate();

    useEffect(() => {
        GetAllCategories().then(cat => setCategories(cat))
    }, [])


    return <>
        <div className="project_form m-4">
            <Form className="m-4">
                <h3>New Project</h3>

                <FormGroup className="m-4">

                    <strong htmlFor="title">Title</strong>
                    <Input type="text" name="title" id="title" placeholder=""

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
                        <option>Category</option>
                        {
                            categories.map(c => {
                                return <option value={c.id} key={`cat--${c.id}`}>{c.name}</option>
                            })
                        }
                    </select>
                </FormGroup>
                <Button className="m-4" onClick={() => {

                    navigate(`/`)


                }}>Cancel</Button>
                <Button className="m-4" onClick={() => {
                    addProject(project).then((r) => {
                        navigate(`/project/${r.id}`)
                    })

                }}>Submit</Button>
            </Form>
        </div>
    </>
}

