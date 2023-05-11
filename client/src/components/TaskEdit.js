import { Button, Form, FormGroup, Input } from "reactstrap";
import { addProject } from "../modules/projectManager";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllTasks, editTask } from "../modules/taskManager";
import { GetAllTags, addProjectTag } from "../modules/tagManager";

export default function TaskEdit({ setEditOpen, editOpen, editId }) {
    const [task, setTask] = useState({}),
        [tags, setTags] = useState([]),
        navigate = useNavigate();

    useEffect(() => {

        GetAllTasks().then((data) => {
            data.map(d => {

                if (d.id == editId) {

                    setTask(d);
                }
            })
        })
        GetAllTags().then((res) => { setTags(res) })
    }, [])



    return <>
        <div className="task_form">
            <Form>
                <h3>Edit Task</h3>
                <FormGroup >
                    <strong htmlFor="Content">Description</strong>
                    <Input type="textarea" name="Content" id="Content" placeholder={task.content}

                        onChange={(evt) => {
                            let copy = { ...task }
                            copy.Content = evt.target.value
                            setTask(copy);
                        }} />
                </FormGroup>

                <FormGroup >
                    <strong htmlFor="deadline">Deadline</strong>
                    <Input type="date" name="deadline" id="deadline" placeholder="Optional"

                        onChange={(evt) => {
                            let copy = { ...task }
                            copy.Deadline = evt.target.value
                            setTask(copy);
                        }} />
                </FormGroup>

                {/* <FormGroup >
                    <strong htmlFor="tag">Tags</strong>
                    <div className="checkbox_container">
                        {

                            tags.map(c => {
                                return (

                                    <div className="checkboxes"  >
                                        < Input type="checkbox" value={c.name} key={`tag--${c.id}`} />
                                        {c.name}
                                    </div>
                                )

                            })
                        }
                    </div>
                </FormGroup> */}
                <Button
                    onClick={() => {
                        setEditOpen(!editOpen);
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        editTask(task)
                            .then(navigate(0))
                    }}
                >Submit</Button>
            </Form>
        </div>
    </>
}