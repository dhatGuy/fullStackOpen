interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartDesc extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartDesc {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDesc {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CoursePartRequirement extends CoursePartDesc {
  requirements: string[];
  type: "special";
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CoursePartRequirement;
