const constant = {
  SOCKET_URL: "",
  CLIENT: "Contact",
  CLIENTS: "Contacts",
  STUDENTS: "Users",
  STUDENT: "User",
  PaymentLink: "https://console.ilmiya.com",
  ConsoleLink: "https://console.ilmiya.com",
  PAYMENTSURL: "/payments",
  PEOPLEURL: "/people",
  LIVEURL: "/live",
  BILLINGURL: "/payments",
  SUB_TYPE_MONTH: "/month",
  ACTIONSURL: "/actions",
  REPORTINGURL: "/reports",
  PAYMENTSURL: "/payments",
  ADMINURL: "/admin",
  CONNECTSURL: "/connect",
  DASHBOARDURL: "/dashboard",
  ASSIGNURL: "/assign",
  SESSIONSURL: "/sessions",
  ENGAGEURL: "/engage",
  LIVEURL: "/live",
  EVENTSURL: "/events",
  ANALYSISURL: "/analysis",

  ASSIGNURL: "/assign",
  SESSIONURL: "/session",
  REPORTSURL: "/reports",
  PLANS: {
    BUSINESS: {
        ID: "prod_MU9QbV1QxTJeg2",
        NAME: "Bussiness Edition"
    },
    COMMUNITY: {
        ID: "prod_MU9RehXxbUzHTQ",
        NAME: "Community Edition"
    },
    PROFESSIONAL: {
        ID: "prod_MU9O9R1lZArDPg",
        NAME: "Professional Edition"
    },
},
BUSINESS_PRODUCT_ID: "prod_MU9QbV1QxTJeg2",



  DRAWER_WIDTH: 120,
  Durations: [
      {
          label: "Monthly",
          value: "month",
      },
      {
          label: "Yearly",
          value: "year",
      },
  ],
  PaymentButtons: [
      {
          label: "Pay",
          value: 0,
      },
      {
          label: "Sign Up",
          value: 1,
      },
      {
          label: "Donate",
          value: 2,
      },
      {
          label: "Subscribe",
          value: 3,
      },
  ],
  messageType: {
      SENT: "SENT",
      RECIEVED: "RECIEVED",
      DELIVERED: "DELIVERED",
      ACKNOWLEDGE: "ACKNOWLEDGE",
      FAILED: "FAILED",
      DELETED: "DELETED",
  },
  Grades: [
      {
          label: "Kindergarten",
          value: 0,
      },
      {
          label: "Grade 1",
          value: 1,
      },
      {
          label: "Grade 2",
          value: 2,
      },
      {
          label: "Grade 3",
          value: 3,
      },
      {
          label: "Grade 4",
          value: 4,
      },
      {
          label: "Grade 5",
          value: 5,
      },
      {
          label: "Grade 6",
          value: 6,
      },
      {
          label: "Grade 7",
          value: 7,
      },
      {
          label: "Grade 8",
          value: 8,
      },
      {
          label: "Grade 9",
          value: 9,
      },
      {
          label: "Grade 10",
          value: 10,
      },
      {
          label: "Grade 11",
          value: 11,
      },
      {
          label: "Grade 12",
          value: 12,
      },
  ],
  STRIPE_PAYMENT_STATUS: {
      INCOMPLETE: "incomplete",
      incomplete_expired: "incomplete_expired",
      TRIALING: "trialing",
      ACTIVE: "active",
      PAST_DUE: "past_due",
      CANCELLED: "canceled",
      UNPAID: "unpaid",
  },
};
export default constant;
