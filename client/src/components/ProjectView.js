import { useEffect, useState } from "react"
import { GetAllProjects } from "../modules/projectManager"
import { Link } from "react-router-dom";

export default function ProjectView() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        GetAllProjects()
            .then((res) => {
                setProjects(res)
            })
    }, [])

    return <>
        <div className="project_container">
            <div className="project_filter">
                <h3>Filter Options</h3>
                <p>Select Date</p>
                <p>Select Category</p>
                <p>Checkbox Tags</p>
            </div>
            <div className="project_list">
                <h3>Project List</h3>
                {
                    projects.map(p => {
                        return <div key={p.id}>
                            <Link to={`/project/${p.id}`}>
                                {p.title}
                            </Link>
                        </div>
                    })
                }
                <br></br>

            </div>
        </div>
    </>
}