const ProjectSelector = (props) => {
    return (
        <div>
            Please select a project.
            <select id="projectSeletor" onChange={props.selectProject}>
                {props.currentProjects.map((project) => {
                    return (<option value={project.name}> {project.name} </option>);
                })}
            </select>
        </div>
    );
}

 export default ProjectSelector;