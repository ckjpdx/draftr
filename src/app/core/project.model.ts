export interface Project {
  title: string,
  authorName: string,
  authorId: string,
  course: string,
  ideaState: boolean,
  description: string
}

export interface ProjectId extends Project {
	id: string;
}
