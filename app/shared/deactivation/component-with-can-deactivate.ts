export interface ComponentWithCanDeactivate {
    canDeactivate(): Promise<boolean>;
}