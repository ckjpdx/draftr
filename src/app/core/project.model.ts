export interface Project {
  title: string,
  authorName: string,
  authorId: string,
  course: string,
  ideaState: boolean,
  description: string,
  contributors: string[],
  limitMembers: number
}

export interface ProjectId extends Project {
	id: string;
}
