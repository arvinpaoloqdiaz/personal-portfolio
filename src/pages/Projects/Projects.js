import styles from "./Projects.module.css";
import { Row, Col, Container } from "react-bootstrap";
import { useProjects } from "../../contexts/ProjectContext";
import { Link } from "react-router-dom";

export default function Projects() {
  const { projects, loading, error, getAllGroups } = useProjects();

  if (loading) {
    return (
      <Container className="pt-5 text-center">
        <p>Loading projects...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="pt-5 text-center">
        <p className="text-danger">
          Failed to load projects. Please try again later.
        </p>
      </Container>
    );
  }

  const groups = getAllGroups();
  const allGroups = [...groups, { name: "All Projects", slug: "all" }];

  return (
    <Container className="pt-5">
      <Row>
        <h1 className="text-center my-5">Projects</h1>
      </Row>

      <Row>
        {allGroups.map((group, index) => {
          const projectCount =
            group.slug === "all"
              ? projects.length
              : projects.filter((p) => p.group_slug === group.slug).length;

          let browseText;

          if (group.slug === "all") {
            browseText = (
              <>
                <p className={styles.highlightAll}>all</p> projects
              </>
            );
          } else {
            browseText = (
              <>
                <p className={styles.highlightNumber}>{projectCount}</p>{" "}
                project{projectCount === 1 ? "" : "s"}
              </>
            );
          }

          return (
            <Col xs={12} md={6} lg={4} key={`group-${index}`} className="my-3">
              <Link
                to={group.slug === "all" ? "/projects" : `/projects/${group.slug}`}
                className="text-decoration-none"
              >
                <div
                  className={`h-100 text-center d-flex flex-column justify-content-center bg-white ${styles.groupCard}`}
                >
                  <p className="m-3 h5 text-brand fw-bold h1">{group.name}</p>
                  <div
                    className={`d-flex align-items-center justify-content-center ${styles.groupBody}`}
                  >
                    <p className={styles.groupText}>{browseText}</p>
                  </div>
                </div>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
