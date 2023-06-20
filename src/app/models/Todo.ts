import Status from "./status";

export default interface Todo {
    id: string | null,
    name: string;
    description: string;
    status: Status
    createdAt?: Date | null,
    updatedAt?: Date | null,
}



