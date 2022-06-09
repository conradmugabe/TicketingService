export default interface Project {
  id: string;
  name: string;
  description: string;
  slug: string;
  userId: string;
  updatedAt: string;
  createdAt: string;
}

export type ProjectPayload = Pick<Project, "name" | "description" | "userId">;

export type CreateProject = Pick<
  Project,
  "name" | "description" | "userId" | "slug"
>;

export type UpdateProject = Pick<
  Project,
  "name" | "description" | "id" | "userId"
>;
