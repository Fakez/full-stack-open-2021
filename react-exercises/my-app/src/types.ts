interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CourseNormalPart extends CoursePartBase {
    type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseDescriptionPart extends CoursePartBase {
    type: "description";
    description: string;
}

export type CoursePartType = CoursePartBase | CourseDescriptionPart | CourseNormalPart | CourseProjectPart | CourseSubmissionPart;
