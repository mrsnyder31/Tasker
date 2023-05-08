import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"
import { GetProjectById, deleteProject } from "../modules/projectManager";
import {
    Button,
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    CardTitle,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import TaskForm from "./TaskForm";


export default function ProjectDetails() {
    const [project, setProject] = useState({})
    const [isOpen, setIsOpen] = useState(false);
    const [taskOpen, setTaskOpen] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        GetProjectById(id).then((p) => { setProject(p) })
    }, [])

    const DeletePostModal = () => {
        return (
            <Modal isOpen={isOpen}>
                <ModalBody>Are you sure you want to delete this project?</ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="btn btn-danger m-4"
                        onClick={() => {
                            deleteProject(id)
                            navigate(`/project`);
                        }}
                    >
                        Delete
                    </Button>
                </ModalFooter>
            </Modal>
        );
    };

    const NewTaskModal = () => {
        return (
            <Modal isOpen={taskOpen}>

                <ModalBody><TaskForm setTaskOpen={setTaskOpen} taskOpen={taskOpen} /></ModalBody>
                <ModalFooter>


                </ModalFooter>
            </Modal>
        )
    }

    return <>

        <Card className="m-4">
            <CardBody>
                <Link to={`/project/${project.id}`}>
                    <CardTitle tag='h3'>{project.title}</CardTitle>
                </Link>
            </CardBody>

            <CardText>
                <button className="btn m-4" onClick={() => {
                    setTaskOpen(!taskOpen)
                }} >Add Task</button>
            </CardText>
        </Card>
        <Button
            className="btn m-4"
            onClick={() => {
                navigate(`/project/edit/${project.id}`)
            }}
        >
            Edit Project
        </Button>
        <Button
            className="btn btn-danger m-4"
            onClick={() => {
                setIsOpen(!isOpen);
            }}
        >
            Delete Project
        </Button>
        <NewTaskModal />
        <DeletePostModal />


    </>
}
