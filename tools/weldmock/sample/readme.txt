Schema Genration for the given data: 
https://www.liquid-technologies.com/online-json-to-schema-converter

or 

python based schema generation (array wont generate)
pip install genson

Generate random json data for given schema
https://github.com/ncarlier/genjson

genjson -s data-schema.json  | jq . | http post http://localhost:8080/data

genjson -s dashboard-schema.json | jq . | http post http://localhost:8080/data