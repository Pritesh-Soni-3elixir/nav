const env = process.env.REACT_APP_API_ENV;
const ver = process.env.REACT_APP_VERSION;
let STRIPKEY =
  "pk_test_51Jm19XI6P7rGb1sA72FfTOAikxE4fu7KtCtPrBpcpdYpQuso0wqAIss2n08dk7lX5zd5lnB5J5a4yfLwUDTrvo0b002F65q3pq";

if (process.env.REACT_APP_STRIPE_KEY !== undefined) {
  STRIPKEY = process.env.REACT_APP_STRIPE_KEY;
}
const ACCOUNT_SPACE_URL = "https://accounts.ilmiya.com/__/auth/space";
const ACCOUNT_PLAN_URL = "https://accounts.ilmiya.com/auth/plans";
console.log("Current Environment V" , env);
let defaults = {
  MMSAPIURL: "https://api.ilmiya.com/tenant",
  CONNECTURL: "https://api.ilmiya.com/tenant",
  EDIFYAPI: "https://edify.api.ilmiya.com/edify",
  loginURL: "https://accounts.ilmiya.com?redirect=" + window.location.href,
  AUTH_URL: "https://api.ilmiya.com/auth",
  LOGOUT_URL: "https://accounts.ilmiya.com/logout",
  IAM_URL: "https://api.ilmiya.com/iam",
  GATE_URL: "https://api.ilmiya.com/payment",
  IdAPI: "https://api.ilmiya.com/id/",
  RELAY_API: "https://relay.api.ilmiya.com/relay",
  PLAY_URL: "https://play.api.ilmiya.com/play",
  LIVE_URL: "https://live.ilmiya.com",
  PaymentLink: "https://studio.ilmiya.com",
  EVENT_URL: "https://times.api.ilmiya.com",
  SQL_URL: "https://api.ilmiya.com/tenant/api/v1/",
  STRIPKEY,
  ACCOUNT_SPACE_URL,
  ACCOUNT_PLAN_URL,
  CHECKOUTS_URL: "https://api.ilmiya.com/checkouts",
  CODES_URL: "https://api.ilmiya.com/codes",
  // GATEWAYS_URL: "http://localhost:5000/gateways",
  GATEWAYS_URL: "https://api.ilmiya.com/gateways",
  NOTIFY_URL: "https://api.ilmiya.com/notify",
  PAYMENT_URL: "https://api.ilmiya.com/payment",
  PLANS_URL: "https://api.ilmiya.com/plans",
  SUBSCRIPTIONS_URL: "https://api.ilmiya.com/subscriptions",
  TRANSACTIONS_URL: "https://api.ilmiya.com/transactions",
  CLIENTS_URL: "https://api.ilmiya.com/contacts/api/v1/",
  GROUPS_URL: "https://api.ilmiya.com/groups/api/v1/",
  MEMBERS_URL: "https://api.ilmiya.com/members/api/v1/",
  ORGS_URL: "https://api.ilmiya.com/orgs/api/v1/",
  PRODUCT_URL: "https://api.ilmiya.com/product/api/v1/",
  SPACES_URL: "https://api.ilmiya.com/spaces/api/v1/",
  STUDENTS_URL: "https://api.ilmiya.com/users/api/v1/",
  TAGS_URL: "https://api.ilmiya.com/tags/api/v1/",
  USERS_URL: "https://api.ilmiya.com/sso/api/v1/",

  TRESHOLD_URL: "https://api.ilmiya.com/threshold/api/v1/",
  BRANDS_URLS: "https://api.ilmiya.com/brand/api/v1/",
  CHANNELS_URL: "https://api.ilmiya.com/channels/api/v1/",
  VV_URL: "https://api.ilmiya.com/vv/api/v1/",
  DOMAIN_URL: "https://api.ilmiya.com/domains/api/v1/",

  CONSOLE_URL: "https://console.ilmiya.com/",
  ACCOUNT_URL: "https://account.ilmiya.com/",
};


if (env == "staging") {
  defaults = {
    MMSAPIURL: "https://api.ilmiya.dev/tenant",
    CONNECTURL: "https://api.ilmiya.dev/tenant",
    EDIFYAPI: "https://edify.api.ilmiya.com/edify",
    loginURL: "https://accounts.ilmiya.dev?redirect=" + window.location.href,
    AUTH_URL: "https://api.ilmiya.dev/auth",
    LOGOUT_URL: "https://accounts.ilmiya.dev/logout",
    IAM_URL: "https://api.ilmiya.dev/iam",
    GATE_URL: "https://api.ilmiya.dev/payment",
    IdAPI: "https://api.ilmiya.dev/id/",
    RELAY_API: "https://relay.api.ilmiya.dev/relay",
    PLAY_URL: "https://play.api.ilmiya.dev/play",
    LIVE_URL: "https://live.ilmiya.dev",
    PaymentLink: "https://studio.ilmiya.dev",
    EVENT_URL: "https://times.api.ilmiya.dev",
    SQL_URL: "https://api.ilmiya.dev/tenant/api/v1/",
    STRIPKEY,
    ACCOUNT_SPACE_URL,
    ACCOUNT_PLAN_URL,
    CHECKOUTS_URL: "https://api.ilmiya.dev/checkouts",
    CODES_URL: "https://api.ilmiya.dev/codes",
    GATEWAYS_URL: "https://api.ilmiya.dev/gateways",
    NOTIFY_URL: "https://api.ilmiya.dev/notify",
    PAYMENT_URL: "https://api.ilmiya.dev/payment",
    // PAYMENT_URL: "http://127.0.0.1:5000/payment",
    PLANS_URL: "https://api.ilmiya.dev/plans",
    SUBSCRIPTIONS_URL: "https://api.ilmiya.dev/subscriptions",
    // SUBSCRIPTIONS_URL: "http://127.0.0.1:5000/subscriptions",
    TRANSACTIONS_URL: "https://api.ilmiya.dev/transactions",
    CLIENTS_URL: "https://api.ilmiya.dev/contacts/api/v1/",
    GROUPS_URL: "https://api.ilmiya.dev/groups/api/v1/",
    MEMBERS_URL: "https://api.ilmiya.dev/members/api/v1/",
    // MEMBERS_URL: "http://localhost:8080/members/api/v1/",
    ORGS_URL: "https://api.ilmiya.dev/orgs/api/v1/",
    // ORGS_URL: "http://localhost:8080/orgs/api/v1/",
    PRODUCT_URL: "https://api.ilmiya.dev/product/api/v1/",
    // SPACES_URL: "http://localhost:8080/spaces/api/v1/",
    SPACES_URL: "https://api.ilmiya.dev/spaces/api/v1/",
    STUDENTS_URL: "https://api.ilmiya.dev/users/api/v1/",
    TAGS_URL: "https://api.ilmiya.dev/tags/api/v1/",
    USERS_URL: "https://api.ilmiya.dev/sso/api/v1/",

    TRESHOLD_URL: "https://api.ilmiya.dev/threshold/api/v1/",
    BRANDS_URLS: "https://api.ilmiya.dev/brand/api/v1/",
    CHANNELS_URL: "https://api.ilmiya.dev/channels/api/v1/",
    VV_URL: "https://api.ilmiya.dev/vv/api/v1/",
    DOMAIN_URL: "https://api.ilmiya.dev/domains/api/v1/",

    CONSOLE_URL: "https://console.ilmiya.dev/",
    ACCOUNT_URL: "https://account.ilmiya.dev/",
  };
}
console.log('Config Console',defaults)

export default defaults;
