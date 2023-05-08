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
import { GetAllTasks } from "../modules/taskManager";
import TaskEdit from "./TaskEdit";


export default function ProjectDetails() {
    const
        [project, setProject] = useState({}),
        [tasks, setTasks] = useState([]),
        [isOpen, setIsOpen] = useState(false),
        [taskOpen, setTaskOpen] = useState(false),
        [editOpen, setEditOpen] = useState(false),
        [editId, setEditId] = useState(0),
        { id } = useParams(),
        navigate = useNavigate();

    useEffect(() => {
        GetProjectById(id).then((p) => { setProject(p) })

        GetAllTasks().then((data) => {
            let list = []
            data.map(d => {
                if (d.projectId == id) {
                    list.push(d)
                }
                setTasks(list)
            })
        })
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

                <ModalBody><TaskForm setTaskOpen={setTaskOpen} taskOpen={taskOpen} id={id} /></ModalBody>
                <ModalFooter>

                </ModalFooter>
            </Modal>
        )
    }

    const EditTaskModal = () => {
        return (
            <Modal isOpen={editOpen}>

                <ModalBody>
                    <TaskEdit setEditOpen={setEditOpen} editOpen={editOpen} editId={editId} />
                </ModalBody>
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

            {
                tasks.map(t =>
                (<CardText className="m-3" key={`task--${t.id}`}>
                    {t.content}

                    <button className="btn btn-primary m-4" onClick={() => {
                        setEditId(t.id)

                        setEditOpen(!editOpen)
                    }} >Edit Task</button>

                </CardText>
                ))
            }

            <button className="btn m-4" onClick={() => {
                setTaskOpen(!taskOpen)
            }} >Add Task</button>

        </Card >
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
        <EditTaskModal />


    </>
}
