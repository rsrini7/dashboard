CORS
http://testingfreak.com/how-to-fix-cross-origin-request-security-cors-error-in-firefox-chrome-and-ie/
https://medium.com/@siddhartha.ng/disable-cross-origin-on-chrome-for-localhost-c644b131db19

Chrome : clone chrome then try below
@echo off
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --chrome --allow-file-access-from-files --disable-web-security --user-data-dir --disable-features=CrossSiteDocumentBlockingIfIsolating --incognito --disable-pinch --overscroll-history-navigation=0

firefox : install CORS-everywhere extension
or about:config -> security.fileuri.strict_origin_policy -> double click


react-admin with rest-server:

https://github.com/marmelab/react-admin/blob/master/packages/ra-data-simple-rest/README.md

https://stackoverflow.com/questions/54718199/cookie-based-authentication-via-rest-api-in-react-admin
https://stackoverflow.com/questions/47245456/error-the-content-range-header-is-missing-in-the-http-response
https://stackoverflow.com/questions/51349519/connect-existing-nodejs-express-api-with-react-admin
https://stackoverflow.com/questions/51447738/list-view-throwing-typeerror?rq=1
