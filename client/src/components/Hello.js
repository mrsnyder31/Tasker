import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllProjects } from "../modules/projectManager";
import { Link } from "react-router-dom";
import { GetAllTasks, editTask } from "../modules/taskManager";
import {
    Button,
    Card,
    CardBody,
    CardText,
    CardTitle,

} from "reactstrap";
import { GetAllProjectTags, GetAllTags } from "../modules/tagManager";


export default function Hello({ isLoggedIn }) {

    const
        [projects, setProjects] = useState([]),
        [projectDisplay, setProjectDisplay] = useState(),
        [tasks, setTasks] = useState([]),
        [list, setList] = useState([]),
        [tags, setTags] = useState([]),
        [projectTags, setProjectTags] = useState([]),
        navigate = useNavigate();

    useEffect(() => {
        let list = []
        GetAllProjects()
            .then((res) => {
                res.map(CUP => {
                    if (CUP.userId == 17) {

                        list.push(CUP)
                    }
                })
                setProjects(list)
            })
        GetAllTags().then((res) => { setTags(res) })
        GetAllProjectTags().then((res) => { setProjectTags(res) })


    }, [isLoggedIn])

    useEffect(() => {
        let list = []
        GetAllTasks()
            .then((res) => {
                res.map(task => {
                    if (task.projectId == projectDisplay?.id) {
                        list.push(task)
                    }
                })
                setTasks(list)
            })


    }, [projects, projectDisplay])

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
    let sortedProjects = projects.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    return <>

        <div className="home_container m-4">

            <div className="home_project">
                {
                    projectDisplay ? <>

                        <select className="home_select" onChange={(evt) => {
                            projects.find(p => {
                                if (evt.target.value == p.id) {
                                    setProjectDisplay(p)
                                }


                            })
                        }}>
                            <option value={0}>Select a Project</option>
                            {
                                projects.map(p => {
                                    return < option value={p.id} key={`hippaviolation${p.id}`} > {p.title}</option>
                                })
                            }
                        </select>
                        < Card className="m-4">
                            <CardBody>
                                <Link to={`/project/${projectDisplay?.id}`}>
                                    <CardTitle tag='h4'>{projectDisplay?.title}</CardTitle>
                                </Link>
                            </CardBody>

                            {
                                tasks.map(task => {

                                    if (task.projectId === projectDisplay?.id) {
                                        return <React.Fragment key={`tasksde--${task.id}`}>

                                            <CardText className="m-3 home_task_item"
                                                style={{ backgroundColor: task.isComplete ? 'rgba(175, 240, 155, 0.781)' : ' rgba(240, 240, 221, 0.781)' }}
                                                onClick={() => {
                                                    if (task.isComplete) {

                                                        task.isComplete = false
                                                        editTask(task)


                                                    }
                                                    else {

                                                        task.isComplete = true
                                                        editTask(task)

                                                    }
                                                }}>
                                                <CardText className="home_task_content">
                                                    <h5>{task.content}</h5>
                                                    {/* <p>Deadline - {new Date(task.deadline).toLocaleDateString()}</p> */}
                                                </CardText>

                                                <div className="home_tag">
                                                    {
                                                        projectTags.map(tag => {

                                                            if (tag.projectId == projectDisplay?.id && tag.taskId == task.id) {
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
                                    }
                                })

                            }
                            <CardBody className="m-4">

                            </CardBody>


                        </Card >
                    </>
                        :
                        <>

                            <select className="home_select" onChange={(evt) => {
                                projects.find(p => {
                                    if (evt.target.value == p.id) {
                                        setProjectDisplay(p)
                                    }


                                })
                            }}>
                                <option value={0}>Select a Project</option>
                                {
                                    projects.map(p => {
                                        return < option value={p.id} key={`hippaviolation${p.id}`} > {p.title}</option>
                                    })
                                }
                            </select>
                            <div className="home_select">

                                <h3><Button onClick={() => { navigate("/project/new") }}>Create Project</Button></h3>
                            </div>
                        </>
                }
            </div>

            <div className="home_deadline">

                <h3>Deadlines</h3>
                <Card className="deadline_card">
                    {
                        sortedArray.map(LI => {
                            if (LI.title) {
                                return <div className="home_deadline_item_p" key={LI.id}>
                                    Project -
                                    <Link to={`/project/${LI.id}`}>
                                        {LI.title}
                                    </Link> - {new Date(LI.deadline).toLocaleDateString()}
                                </div>
                            }
                            else {
                                return <div className="home_deadline_item_t" key={LI.id}>
                                    Task -
                                    <Link to={`/project/${LI.projectId}`}>
                                        {LI.content}
                                    </Link> -
                                    {new Date(LI.deadline).toLocaleDateString()}
                                </div>
                            }
                        })
                    }
                </Card>
            </div>

        </div >
    </>
}