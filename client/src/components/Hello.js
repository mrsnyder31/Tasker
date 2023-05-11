import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllProjects } from "../modules/projectManager";
import { Link } from "react-router-dom";
import { me } from "../modules/authManager";
import { GetAllTasks, editTask } from "../modules/taskManager";
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
import { GetAllProjectTags, GetAllTags, addProjectTag } from "../modules/tagManager";


export default function Hello() {

    const
        [projects, setProjects] = useState([]),
        [tasks, setTasks] = useState([]),
        [list, setList] = useState([]),
        [tags, setTags] = useState([]),
        [projectTags, setProjectTags] = useState([]),
        [isComplete, setIsComplete] = useState(false),
        [user, setUser] = useState({}),
        navigate = useNavigate();

    useEffect(() => {
        let list = []
        GetAllProjects()
            .then((res) => {
                res.map(CUP => {
                    if (CUP.userId == 1) {
                        list.push(CUP)
                    }
                })
                setProjects(list)
            })
        GetAllTags().then((res) => { setTags(res) })
        GetAllProjectTags().then((res) => { setProjectTags(res) })

    }, [])

    useEffect(() => {
        let list = []
        GetAllTasks()
            .then((res) => {
                res.map(task => {
                    if (task.projectId == projects[0].id) {
                        list.push(task)
                    }
                })
                setTasks(list)
            })
    }, [projects])

    useEffect(() => {
        let list = []
        for (const task of tasks) {
            list.push(task)
        }
        for (const project of projects) {
            list.push(project)
        }
        setList(list)
    }, [tasks])

    const sortedArray = list.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    const sortedProjects = projects.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));




    return <>

        <div className="home_container m-4">


            <div className="home_project">
                {
                    list ?
                        <Card className="m-4">
                            <CardBody>
                                <Link to={`/project/${sortedProjects[0]?.id}`}>
                                    <CardTitle tag='h3'>{sortedProjects[0]?.title}</CardTitle>
                                </Link>
                            </CardBody>

                            {
                                tasks.map(task =>
                                (
                                    <React.Fragment key={`tasksde--${task.id}`}>
                                        <CardText className="m-3 home_task_item" style={
                                            { backgroundColor: task.isComplete ? 'aquamarine' : 'rebeccapurple' }
                                        } onClick={() => {
                                            if (task.isComplete) {
                                                task.isComplete = false
                                                setIsComplete(!isComplete)
                                                editTask(task)
                                            }
                                            else {
                                                task.isComplete = true

                                                // addProjectTag({ ProjectId: sortedProjects[0]?.id, TagId: 5, TaskId: task.id });
                                                editTask(task)

                                            }
                                        }}>
                                            <CardText className="home_task_content">
                                                <h5>{task.content}</h5>
                                            </CardText>

                                            <div className="home_tag">
                                                {
                                                    projectTags.map(tag => {

                                                        if (tag.projectId == sortedProjects[0]?.id && tag.taskId == task.id) {
                                                            return <React.Fragment key={`taasfdg--${tag.id}`}>
                                                                {
                                                                    tags.map(tt => {
                                                                        if (tt.id == tag.tagId) {
                                                                            return <div className="tag_name" key={`tewqft--${tt.id}`}>
                                                                                -{tt.name}
                                                                            </div>

                                                                        }
                                                                    })
                                                                }
                                                            </React.Fragment>
                                                        }
                                                    })
                                                }
                                            </div>

                                        </CardText >
                                    </React.Fragment>

                                ))
                            }
                            <CardBody className="m-4">
                                {/* <Button className="btn btn-info m-4" onClick={() => {
                                    // setTaskOpen(!taskOpen)
                                }} >Add Task</Button> */}
                            </CardBody>

                            {/* <CardText className="m-4">{category.name}</CardText> */}
                        </Card >
                        :
                        <h3><Button onClick={() => { navigate("/project/new") }}>Create Project</Button></h3>
                }
            </div>

            <div className="home_deadline">
                <h3>Deadlines</h3>


                {
                    sortedArray.map(LI => {
                        if (LI.title) {
                            return <div key={LI.id}>
                                Project -
                                <Link to={`/project/${LI.id}`}>
                                    {LI.title}
                                </Link> - {new Date(LI.deadline).toLocaleDateString()}
                            </div>
                        }
                        else {
                            return <div key={LI.id}>
                                Task -
                                <Link to={`/project/${LI.projectId}`}>
                                    {LI.content}
                                </Link> -
                                {new Date(LI.deadline).toLocaleDateString()}
                            </div>
                        }
                    })
                }








            </div>

        </div >
    </>
}