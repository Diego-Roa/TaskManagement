import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class HaspermissionService  {

  constructor(
  ) {}


  public checkPermission(moduleName: string, key: string) {
    const permissions: any[] = JSON.parse(localStorage.getItem('permissions')  ?? 'default');
    const modulePermission = permissions.find(p => p.menu === moduleName);
    if (modulePermission == undefined || modulePermission?.[key] === false) {
      return false;
    } 

    return true;
  }
}
