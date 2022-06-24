export interface User {
    id: string,
    name: string,
    dateOfBirth: Date,
    email: string,
    position: WorkingPosition,

}

export enum WorkingPosition {
    ASE="ASE",
    SE="SE",
    SSE="SSE",
    PSE="PSE",
}