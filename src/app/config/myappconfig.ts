export default {
  auth: {
    domain: "https://dev-uykzi6asbd5gf0c2.us.auth0.com",
    clientId: "fQJKORP17MCmL1iK5S3fykli0CvylGS9",
    authorizationParams: {
      redirect_uri: "http://localhost:4200",
      audience: "http://localhost:8080",
    },
  },
  httpInterceptor: {
    allowedList: [
      'http://localhost:8080/orders/**',
      'http://localhost:8080/checkout/purchase'
    ],
  },
}