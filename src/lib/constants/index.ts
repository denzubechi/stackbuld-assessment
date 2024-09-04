export const GLOBAL = {
     APP_NAME: "Product Listing App",
     APP_TITLE: "Nzubechi Eccomerce",
     APP_DESC: "Prodcut Listing",
}

export const ROUTE = {
     HOME: "/",
     DASHBOARD: "/",

     PRODUCTS: {
          INDEX: "/products",
     },
    
}

export const STATUS = {
     ACTIVE: { TEXT: "ACTIVE", COLOR: "cyan" },
     COMPLETED: { TEXT: "COMPLETED", COLOR: "green" },
     PAID: { TEXT: "PAID", COLOR: "green" },
     PUBLISHED: { TEXT: "PUBLISHED", COLOR: "green" },
     DRAFT: { TEXT: "DRAFT", COLOR: "green" },
     NEW: { TEXT: "NEW", COLOR: "green" },
     VERIFIED: { TEXT: "VERIFIED", COLOR: "rose" },
     UNVERIFIED: { TEXT: "UNVERIFIED", COLOR: "rose" },
     PENDING: { TEXT: "PENDING", COLOR: "amber" },
     RESTRICTED: { TEXT: "RESTRICTED", COLOR: "amber" },
     DOWNGRADE: { TEXT: "DOWNGRADE", COLOR: "rose" },
     UPGRADE: { TEXT: "UPGRADE", COLOR: "green" },
     CANCEL: { TEXT: "CANCEL", COLOR: "red" },
     CANCELLED: { TEXT: "CANCELLED", COLOR: "red" },
     REJECTED: { TEXT: "REJECTED", COLOR: "red" },
     BANNED: { TEXT: "BANNED", COLOR: "red" },
     RENEW: { TEXT: "RENEW", COLOR: "green" }
} as const;

export type StatusType = keyof typeof STATUS;

