import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {ComponentWithCanDeactivate} from "./component-with-can-deactivate";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class LeaveComponentGuard implements CanDeactivate<ComponentWithCanDeactivate> {

    guardStated = new Subject<any>();
    guardFinished = new Subject<any>();

    canDeactivate(component: ComponentWithCanDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        this.guardStated.next(null);
        return component
                .canDeactivate()
                .then(result => {
                    this.guardFinished.next(null);
                    return result;
                });

    }

}