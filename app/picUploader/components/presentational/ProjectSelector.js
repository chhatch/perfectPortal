const ProjectSelector = (props) => {console.log(props);
    return (
        <div>
            Please select a project.
            <select id="projectSeletor">
                {props.currentProjects.map((project) => {
                    return (<option value={project}> {project} </option>);
                })}
            </select>
        </div>
    );
}

 export default ProjectSelector;