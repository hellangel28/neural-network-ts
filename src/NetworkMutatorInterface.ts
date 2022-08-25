import {Network} from "./Network";

export interface NetworkMutatorInterface {
    mutate(network: Network): void;
}