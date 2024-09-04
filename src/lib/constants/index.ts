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
     INACTIVE: { TEXT: "INACTIVE", COLOR: "rose" },
     
} as const;

export type StatusType = keyof typeof STATUS;

