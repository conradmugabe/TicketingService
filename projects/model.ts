import { model, Document, Schema, Model } from "mongoose";

interface ProjectAttrs {
  name: string;
  description: string;
  slug: string;
}

interface ProjectDoc extends Document {
  name: string;
  description: string;
  slug: string;
}

interface ProjectModel extends Model<ProjectDoc> {
  build(project: ProjectAttrs): ProjectDoc;
}

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

ProjectSchema.statics.build = (project: ProjectAttrs) => {
  return new Project(project);
};

const Project = model<ProjectDoc, ProjectModel>("Project", ProjectSchema);

export default Project;
