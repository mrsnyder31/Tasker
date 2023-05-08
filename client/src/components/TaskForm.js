import { Button, Form, FormGroup, Input } from "reactstrap";
import { addProject } from "../modules/projectManager";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskForm({ setTaskOpen, taskOpen }) {
    const [task, setTask] = useState({})

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
                // onClick={() => {
                //     addtask(task).then((r) => {
                //         navigate(`/task/${r.id}`)
                //     })
                // }}
                >Submit</Button>
            </Form>
        </div>
    </>
}