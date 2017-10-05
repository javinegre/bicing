import { Station } from './station';

export interface ShownStation extends Station {
    _radio: string;
    _distance: number;
}