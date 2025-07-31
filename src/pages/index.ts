import { lazy } from "react";

export const RegistrationListing = lazy(() =>
  import(
    /* webpackPrefetch: true, webpackChunkName: "registration-listing" */ "./registration-listing"
  )
);

export const AdminLogin = lazy(() =>
  import(
    /* webpackPrefetch: true, webpackChunkName: "admin-login" */ "./admin-login"
  )
);

export const RegistrationForInterest = lazy(() =>
  import(
    /* webpackPrefetch: true, webpackChunkName: "registration-for-interest" */ "./registration-for-interest"
  )
);
