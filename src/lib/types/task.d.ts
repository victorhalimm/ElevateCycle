export type Task = {
    id: string;
    uid: string;
    title: string;
    status: 'todo' | 'done';
}