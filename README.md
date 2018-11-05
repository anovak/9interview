# 9interview

#About the code base:

1. This code base is deployed on AWS Lambda / AWS Gateway as a 'serverless' endpoint.
2. This code base provides 2 Lambdas (functions):
 a. Novak_nine_interview_shows_filter - the implementation of the "main" (POST) function for this challenge.
 b. Novak_nine_interview_options_verb - the implementation of the "OPTIONS" verb for CORS.
3. The packaging of these two lambdas into their deployment zip's is done via Gulp.
4. As AWS Lambda node version is 8.1.0 and I use ES6 module keywords which are not available, I have transpiled with Babel
5. Unit tests are run through Webstorm -> NodeJS calling the cli version of the Ava test suite.
6. Code is best edited with WebStorm at this point.
7. I have provided a typed Swagger file that should roughly describe the data passed in / out of the endpoint.
8. lambda_permissions_dev2 is a cmd file for allowing API Gateway to call Lambda via aws security policy grants.


