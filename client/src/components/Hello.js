import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { GetAllProjects } from "../modules/projectManager";
import { Link } from "react-router-dom";
import { me } from "../modules/authManager";


export default function Hello() {

    const [projects, setProjects] = useState([])
    const [user, setUser] = useState({});

    useEffect(() => {
        GetAllProjects()
            .then((res) => {
                setProjects(res)
            })

    }, [])

    const navigate = useNavigate();

    return <>

        <div className="home_container m-4">


            <div className="home_project">
                <h3><Button onClick={() => { navigate("/project/new") }}>Create Project</Button></h3>
            </div>

            <div className="home_deadline">
                <h3>Deadlines</h3>
                {
                    projects.map(p => {
                        if (p.userId == 1) {

                            return <div key={p.id}>
                                <Link to={`/project/${p.id}`}>
                                    {p.title}
                                </Link> - {new Date(p.deadline).toLocaleDateString()}
                            </div>
                        }
                    })
                }
            </div>

        </div >
    </>
}