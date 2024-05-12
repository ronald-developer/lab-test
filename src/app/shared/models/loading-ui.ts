export abstract class LoadingUi {
    id: string;
    public abstract loading: () => void;
    completed: () => void;
}
