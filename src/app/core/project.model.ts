export interface Project {
  title: string,
  author: string,
  course: string,
  state: string,
  description: string,
  contributors: string[],
}

export interface ProjectId extends Project {
	id: string;
}
