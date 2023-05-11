
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"
import { GetProjectById, deleteProject } from "../modules/projectManager";
import {
    Button,
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    CardTitle,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import TaskForm from "./TaskForm";
import { GetAllTasks, deleteTask } from "../modules/taskManager";
import TaskEdit from "./TaskEdit";
import { GetAllCategories } from "../modules/categoryManager";
import { GetAllProjectTags, GetAllTags, addProjectTag, deleteProjectTag } from "../modules/tagManager";


export default function ProjectDetails() {
    const
        [project, setProject] = useState({}),
        [tasks, setTasks] = useState([]),
        [tags, setTags] = useState([]),
        [projectTags, setProjectTags] = useState([]),
        [category, setCategory] = useState({}),
        [isOpen, setIsOpen] = useState(false),
        [tagOpen, setTagOpen] = useState(false),
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
        GetAllTags().then((res) => { setTags(res) })
        GetAllProjectTags().then((res) => { setProjectTags(res) })

    }, [])

    useEffect(() => {
        GetAllCategories()
            .then((cat) => {
                cat.map(c => {

                    if (c.id == project.categoryId) {
                        setCategory(c)
                    }
                })
            })

    }, [project])


    const DeletePostModal = () => {
        return (
            <Modal isOpen={isOpen}>
                <ModalBody>Are you sure you want to delete this project?</ModalBody>
                <ModalBody>
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
                </ModalBody>
            </Modal>
        );
    };

    const EditTagModal = () => {
        return (
            <Modal isOpen={tagOpen}>
                <ModalBody>

                    <ModalHeader>Tags</ModalHeader>
                    <div className="m-4 checkbox_container">

                        {

                            tags.map(c => {
                                return (

                                    <div className="checkboxes" key={`tagmein--${c.id}`} >
                                        < Input className="check_check" type="checkbox" value={c.name}
                                            onChange={
                                                (e) => {

                                                    if (e.target.checked) {

                                                        addProjectTag({ ProjectId: parseInt(id), TagId: c.id, TaskId: parseInt(editId) });
                                                    }
                                                }}
                                        />  {c.name}

                                        < Input className="check_check" type="checkbox" value={c.name}
                                            onChange={
                                                (e) => {
                                                    projectTags.map(PT => {
                                                        if (e.target.checked && c.id === PT.tagId) {

                                                            deleteProjectTag(PT.id)
                                                        }
                                                    })
                                                }}
                                        /> X


                                    </div>
                                )
                            })
                        }
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => {
                            // setTagOpen(!tagOpen);
                            navigate(0);
                        }}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </Modal >
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
                tasks.map(task =>
                (
                    <React.Fragment key={`task--${task.id}`}>
                        <CardText className="m-3 task_item" >
                            <CardText className="task_content">
                                {task.content}
                            </CardText>

                            <CardText className="task_tag">
                                {
                                    projectTags.map(tag => {

                                        if (tag.projectId == project.id && tag.taskId == task.id) {
                                            return <React.Fragment key={`tag--${tag.id}`}>
                                                {
                                                    tags.map(tt => {
                                                        if (tt.id == tag.tagId) {
                                                            return <div className="tag_name" key={`tt--${tt.id}`}>
                                                                {tt.name}
                                                            </div>

                                                        }
                                                    })
                                                }
                                            </React.Fragment>
                                        }
                                    })
                                }
                            </CardText>
                            <div className="task_buttons">
                                <Button className="btn-info task_button" onClick={() => {
                                    setEditId(task.id)

                                    setTagOpen(!tagOpen)
                                }} >Edit Tag</Button>
                                <Button className="btn-primary task_button" onClick={() => {
                                    setEditId(task.id)

                                    setEditOpen(!editOpen)
                                }} >Edit Task</Button>

                                <Button className="btn-danger task_button" onClick={() => {
                                    deleteTask(task.id).then(navigate(0))


                                }} >Delete Task</Button>
                            </div>

                        </CardText >
                    </React.Fragment>

                ))
            }
            <CardBody className="m-4">
                <Button className="btn btn-info m-4" onClick={() => {
                    setTaskOpen(!taskOpen)
                }} >Add Task</Button>
            </CardBody>

            <CardText className="m-4">{category.name}</CardText>
            <div className="project_buttons">

                <Button
                    className="btn btn-primary m-4"
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
            </div>
        </Card >
        <NewTaskModal />
        <EditTagModal />
        <DeletePostModal />
        <EditTaskModal />

    </>
}
