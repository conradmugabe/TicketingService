import BaseService from "./common/base.service";
import Database from "./common/database";
import Provider from "./common/provider";
import slugify from "./common/utils/slugify";
import Project, {
  CreateProject,
  ProjectPayload,
  UpdateProject,
} from "./interfaces/project";

export default class Service extends BaseService {
  protected static _instance: Service;
  protected _database: Database;

  constructor(provider: Provider) {
    super(provider);
    this._database = provider.getDatabase();
  }

  getUserProjects = async (userId: string): Promise<Project[]> => {
    const filters = { userId };
    const projects = await this._database.readAll<Project>(filters);
    return projects;
  };

  create = async (project: ProjectPayload): Promise<Project> => {
    const { userId } = project;
    const projects = await this.getUserProjects(userId);
    const slug = slugify(project.name);

    if (projects.length === 0) {
      const newProject = await this.createNewProject({ ...project, slug });
      return newProject;
    }
    const filteredProjects = projects.filter(
      (project) => project.slug === slug
    );
    if (filteredProjects.length > 0) {
      throw new Error("Project Name already exists");
    }
    const newProject = await this.createNewProject({ ...project, slug });
    return newProject;
  };

  update = async (
    projectId: string,
    project: UpdateProject
  ): Promise<Project> => {
    const projects = await this.getUserProjects(project.userId);

    const filteredProjects = projects.filter(
      (project) => project.id === projectId
    );
    if (filteredProjects.length === 0) {
      throw new Error("Project not found");
    }
    const slug = slugify(project.name);

    const filteredProjectsWithSlug = projects.filter(
      (project) => project.slug === slug
    );
    if (filteredProjectsWithSlug.length > 0) {
      throw new Error("Project Name already exists");
    }
    const updatedProject = await this._database.update<CreateProject, Project>(
      projectId,
      { ...project, slug }
    );
    if (!updatedProject) {
      throw new Error("Database Error"); // Failed to updated database error
    }
    return updatedProject;
  };

  private createNewProject = async (
    project: CreateProject
  ): Promise<Project> => {
    const newProject = await this._database.create<CreateProject, Project>(
      project
    );
    return newProject;
  };

  static getInstance = (provider: Provider): Service => {
    if (!this._instance) {
      this._instance = new Service(provider);
    }
    return this._instance;
  };
}
