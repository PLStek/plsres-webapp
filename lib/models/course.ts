export type CourseCategory = "MATH" | "ELEC" | "INFO" | "MECA";

type CourseBase = {
    code: string;
    name: string;
    category: CourseCategory;
};

export type Course = CourseBase & {
    id: number;
};

export type CourseCreateInput = CourseBase;

export type CourseUpdateInput = Partial<CourseBase>;
