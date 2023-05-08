import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { GetAllProjects } from "../modules/projectManager";
import { Link } from "react-router-dom";
import { me } from "../modules/authManager";
import { GetAllTasks } from "../modules/taskManager";


export default function Hello() {

    const
        [projects, setProjects] = useState([]),
        [tasks, setTasks] = useState([]),
        [user, setUser] = useState({}),
        navigate = useNavigate();

    useEffect(() => {
        GetAllProjects()
            .then((res) => {
                let list = []
                res.map(CUP => {
                    if (CUP.userId == 1) {
                        list.push(CUP)
                    }
                })
                setProjects(list)
            })

        GetAllTasks()
            .then(t => setTasks(t))

    }, [])


    return <>

        <div className="home_container m-4">


            <div className="home_project">
                <h3><Button onClick={() => { navigate("/project/new") }}>Create Project</Button></h3>
            </div>

            <div className="home_deadline">
                <h3>Deadlines</h3>
                {
                    projects.map(p => {

                        return <div key={p.id}>
                            Project -
                            <Link to={`/project/${p.id}`}>
                                {p.title}
                            </Link> - {new Date(p.deadline).toLocaleDateString()}
                        </div>

                    })

                }
                {
                    tasks.map(p => {

                        return <div key={p.id}>
                            Task -
                            <Link to={`/project/${p.projectId}`}>
                                {p.content}
                            </Link> -
                            {new Date(p.deadline).toLocaleDateString()}
                        </div>

                    })

                }


            </div>

        </div >
    </>
}