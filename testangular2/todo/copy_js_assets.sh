# cannot reach into node_modules from express so need to move...

_PATHS=(
"zone.js/dist/zone.js"
"reflect-metadata/Reflect.js"
"rxjs/bundles/Rx.umd.js"
"@angular/core/bundles/core.umd.js"
"@angular/common/bundles/common.umd.js"
"@angular/compiler/bundles/compiler.umd.js"
"@angular/platform-browser/bundles/platform-browser.umd.js"
"@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js"
"@angular/http/bundles/http.umd.js"
)

for p in $_PATHS; do
  dst=`dirname "$p"`
  mkdir -p "public/javascripts/$dst"
  cp "node_modules/$p" "public/javascripts/$dst"
done
