// Import necessary dependencies
import { useRouteError } from 'react-router-dom';

/*
This component will be rendered when a route's errorElement is rendered.
It will be passed the error object that was thrown.
If no errorElement is provided, the router will render a generic error page.
*/
export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string, message: string };

  return (
    <div id="error-page">
      <h1>404</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
