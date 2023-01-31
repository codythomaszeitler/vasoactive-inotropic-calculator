export NODE_OPTIONS=--openssl-legacy-provider
rm -rf web-build  && npx expo export:web && cd web-build && aws s3 sync  . s3://vaso-calc && cd ..
unset NODE_OPTIONS

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome https://vaso-calc.s3.us-west-2.amazonaws.com/index.html