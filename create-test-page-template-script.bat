
@echo off
set /p "name=PLEASE PROVIDE THE NAME OF TEST TO CREATE: "
@echo TEST NAME: %name%

echo (THIS WILL CREATE THE TEMPLATE FOR TEST PAGE %name%. PROCEED? y/n?)

rem Prompt the user for input
set /p input=YOUR ANSWER: (y,n):

if %input%==y (
  echo CREATING MODULE WITH ROUTE
  ng g m pages/%name% --routing

  echo CREATING COMPONENTS/API SERVICE
  ng g c pages/%name% --skip-tests --style none
  ng g c pages/%name%/create/create-%name%-tests --flat --skip-tests --style none
  ng g c pages/%name%/edit/edit-%name%-tests --flat --skip-tests --style none
  ng g c pages/%name%/form/%name%-form --flat --skip-tests --style none
  ng g c pages/%name%/list/%name%-list --flat --skip-tests --style none
  ng g c pages/%name%/reports/details/%name%-report-details --flat --skip-tests --style none
  ng g c pages/%name%/reports/summary/%name%-report-summary --flat --skip-tests --style none
  ng g c pages/%name%/%name%-test-result --skip-tests --style none
  ng g service pages/%name%/services/%name%-test-calculator --skip-tests
  ng g service api-services/lab-tests/%name%-test-api/%name%-test-api --flat --skip-tests
  ng g service api-services/lab-tests/%name%-test-report-api/%name%-test-report-api --flat --skip-tests

  echo CREATING TYPESCRIPT FILE
  cd %cd%/src/app/pages/%name%
  md models
  cd models
  echo //create your form description here > %name%-form-descriptor.ts
  cd ..
  md navigation
  cd navigation
  echo //create your navigation path here > %name%-navigation-path.ts
  echo //create your sidebar navigation here > %name%-sidebar-navigation.ts

  cd ..
  cd ..
  cd ..
  cd ..
  cd ..
  cd ..

  cd %cd%/src/app/api-services/lab-tests/%name%-test-api
  md models
  cd models
  echo //create your model test entry here > request-%name%-test-entry.ts
  echo //create your model search criteria here > request-%name%-test-search-criteria.ts
  echo //create your model response here > response-%name%-test-model.ts
  echo //create your model search result here > response-%name%-test-search-result.ts
  cd ..
  md requests
  cd requests
  echo //create your post create request here > post-create-%name%-test-request.ts
  echo //create your post search request here > post-search-%name%-test-request.ts
  echo //create your put update request here > put-update-%name%-test-request.ts
  cd ..
  md responses
  cd responses
  echo //create your get by id response here > get-%name%-test-by-id-response.ts
  echo //create your post search response here > post-%name%-test-response.ts
  cd ..
  cd ..
  cd %name%-test-report-api
  md models
  cd models
  echo //create model request criteria here > request-%name%-test-report-search-criteria.ts
  cd ..
  md requests
  cd requests
  echo //create request criteria details here > post-search-%name%-test-details-report-request.ts
  echo //create request criteria summary here > post-search-%name%-test-summary-report-request.ts
) else (
  echo CANCELLED.
)

echo End of script.
