export interface Project {
  title: string,
  authorName: string,
  authorId: string,
  course: string,
  ideaState: boolean,
  description: string,
  contributors: string[],
  limitMembers: number,
  timeStamp: number,
  timeStampFormatted: string
}

export interface ProjectId extends Project {
	id: string;
}
