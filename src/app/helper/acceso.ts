import { Router } from "@angular/router";


export const acceso = (router: Router, permiso: string): boolean => {

    if (permiso === "NO") {
        router.navigateByUrl('/dashboard')
        return false
    }
    return true
}