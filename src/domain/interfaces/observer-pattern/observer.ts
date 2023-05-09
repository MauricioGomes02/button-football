import { ISubject } from "./subject";

export interface IObserver {
    update(subject: ISubject): void
}