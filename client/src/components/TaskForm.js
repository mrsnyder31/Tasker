import { Button, Form, FormGroup, Input } from "reactstrap";
import { addProject } from "../modules/projectManager";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTask } from "../modules/taskManager";

export default function TaskForm({ setTaskOpen, taskOpen, id }) {
    const [task, setTask] = useState({ ProjectId: id }),
        navigate = useNavigate();

    return <>
        <div className="task_form">
            <Form>
                <h3>New task</h3>
                <FormGroup >
                    <strong htmlFor="Content">Description</strong>
                    <Input type="textarea" name="Content" id="Content" placeholder=""

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
                        setTaskOpen(!taskOpen);
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        addTask(task).then(navigate(0))
                    }}
                >Submit</Button>
            </Form>
        </div>
    </>
}