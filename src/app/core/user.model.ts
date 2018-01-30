export interface User{
  uid: string;
	name: string;
  email: string;
  currentProject?: string;
	projects?: string[];
	ideas?: string[];
  avatar?: string;
  isTeacher: boolean;
}
