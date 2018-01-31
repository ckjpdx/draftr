export interface Project {
  title: string,
  authorName: string,
  authorId: string,
  course: string,
  stage: string,
  description: string,
  inspiration: string,
  contributors: string[],
  limitMembers: number,
  timeStamp: number,
  timeStampFormatted: string
}

export interface ProjectId extends Project {
	id: string;
}
