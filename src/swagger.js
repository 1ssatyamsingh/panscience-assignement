import swaggerJSDoc from "swagger-jsdoc";

const options = {

  definition: {
    openapi: "3.0.0",

    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "Task management system API"
    },

    servers: [
      {
        url: "http://localhost:8000"
      }
    ],

    components: {

      securitySchemes: {

        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;