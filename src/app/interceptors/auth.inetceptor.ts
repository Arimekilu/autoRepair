import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, tap} from "rxjs";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone();

    return next.handle(authReq).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse){}
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401)
              console.log('Unauthorized');
          }
        }
      )
    );
  }


  // intercept(req: HttpRequest<any> | any, next: HttpHandler): Observable<HttpEvent<any>> {
  //   if (this.firebase.isAuth) {
  //     req = req.clone({
  //       setParams: {
  //         auth: this.firebase.auth.currentUser?.uid
  //       }
  //     })
  //   }
  //   return next.handle(req)
  //     .pipe(
  //       catchError((error: HttpErrorResponse) => {
  //         console.log('Interceptor error', error)
  //         if (error.status === 401) {
  //           this.firebase.logout()
  //           this.router.navigate(['login'])
  //         }
  //         return throwError(error)
  //       })
  //     )
  // }
}
