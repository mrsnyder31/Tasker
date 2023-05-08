import { Button, Form, FormGroup, Input } from "reactstrap";
import { addProject } from "../modules/projectManager";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllTasks, editTask } from "../modules/taskManager";

export default function TaskEdit({ setEditOpen, editOpen, editId }) {
    const [task, setTask] = useState({}),
        navigate = useNavigate();

    useEffect(() => {

        GetAllTasks().then((data) => {
            data.map(d => {

                if (d.id == editId) {

                    setTask(d);
                }
            })
        })
    }, [])



    return <>
        <div className="task_form">
            <Form>
                <h3>Edit task +{editId}+</h3>
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

                <FormGroup >
                    <strong htmlFor="tag">Tags</strong>
                    <Input type="text" name="tag" id="tag" placeholder="Replace with CHECKBOXES"

                    // onChange={(evt) => {
                    //     let copy = { ...task }
                    //     copy.CategoryId = parseInt(evt.target.value)
                    //     setTask(copy); }} 
                    />
                </FormGroup>
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