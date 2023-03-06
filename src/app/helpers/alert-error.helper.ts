import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import errorTranslate from './errorTranslate.helper';

/**
 * Handle errors for an HTTP request.
 * 
 * Receives an error object and processes it by displaying an error message to 
 * the user and returning an observable that emits the error.
 * This allows the error to be handled by the catchError operator
 * in an observable that performs an HTTP request.
 * 
 * @param error - the error object
 * @returns An observable with an error object
 */
export function handleError(error: any): Observable<never> {
    // Translate the error message
    const errorMsg = errorTranslate(error.error.message);

    // Show an error message using the SweetAlert2 library.
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMsg,
    });

    // Return an observable that emits the error
    return new Observable<never>((observer) => {
        observer.error(error);
    });
}
