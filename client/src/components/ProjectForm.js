import { Button, Form, FormGroup } from "reactstrap";


export default function ProjectForm() {
    return <>
        <div className="project_form">
            <Form>
                <h3>New Project</h3>
                <FormGroup >
                    Title <input type="text"></input>
                </FormGroup>

                <FormGroup >
                    Deadline <input type="date"></input>
                </FormGroup>

                <FormGroup >
                    Category <input type="text"></input>
                </FormGroup>

                <Button>Submit</Button>
            </Form>
        </div>
    </>
}