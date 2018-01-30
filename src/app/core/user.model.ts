export interface User{
    uid: string;
    displayName: string;
    email: string;
    currentProject?: string;
    projects?: string[];
    ideas?: string[];
    photoURL?: string;
    isTeacher: boolean;
}
