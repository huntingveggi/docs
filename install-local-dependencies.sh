#!/bin/sh
cd /home/dennis/dev/projects/docs &&

cd formatter &&
echo
echo -----------------------------------------------------
echo - INSTALL FORMATTER DEPS
echo -----------------------------------------------------
echo
echo   Install formatter-pdfkit into formatter ...
echo
npm install --save ../formatter-pdfkit &&
echo
echo   Install formatter-components into formatter ...
echo
npm install --save ../formatter-components &&

cd ../formatter-server
echo
echo -----------------------------------------------------
echo - INSTALL FORMATTER-SERVER DEPS
echo -----------------------------------------------------
echo
echo   Install formatter into formatter-server ...
echo
npm install --save ../formatter
